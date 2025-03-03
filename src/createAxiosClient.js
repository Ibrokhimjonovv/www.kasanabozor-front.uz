import axios from "axios";
import { usersServerUrl } from "./server.js";

const access = localStorage.getItem("access");
if (access && access !== "undefined") {  
  axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
}

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");

    if (access && access !== "undefined") {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = token;
              return axios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          if (!refresh) {
            return Promise.reject(new Error("Refresh token is missing"));
          }

          const response = await axios.post(
            `${usersServerUrl}accounts/refresh/`,
            {
              refresh,
            }
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
