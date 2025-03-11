import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { usersApi } from "./server";

const access: string | null = localStorage.getItem("access");
if (access && access !== "undefined") {
  axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
}

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axios.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError): Promise<AxiosResponse | Promise<never>> => {
    const access: string | null = localStorage.getItem("access");
    const refresh: string | null = localStorage.getItem("refresh");

    if (access && access !== "undefined") {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
              }
              return axios(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          if (!refresh) {
            return Promise.reject(new Error("Refresh token is missing"));
          }

          const response = await axios.post<{ access: string }>(
            `${usersApi}accounts/refresh/`,
            { refresh }
          );

          const newAccessToken = response.data.access;
          localStorage.setItem("access", newAccessToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;

          processQueue(null, newAccessToken);
          return axios(originalRequest);
        } catch (err) {
          processQueue(err, null);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);
