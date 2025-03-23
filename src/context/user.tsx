import axios from "axios";
import { useNotifications } from "./notifications";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usersApi } from "../server";
import { useNavigate } from "react-router-dom";

interface UserContextType {
  isAuthenticated: boolean;
  guid: string;
  role: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  email: string;
  username: string;
  gender: number;
  birthday: string;
  region: string;
  district: string;
  about: string;
  biography: string;
  pfp: string;
  purposes: string;
  login: (params: {
    phone: string;
    password: string;
  }) => Promise<void | boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [guid, setGuid] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [gender, setGender] = useState<number>(0);
  const [birthday, setBirthday] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [biography, setBiography] = useState<string>("");
  const [pfp, setPfp] = useState<string>("");
  const [purposes, setPurposes] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    axios
      .get(`${usersApi}accounts/00000000-0000-0000-0000-000000000000/`)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;

          setGuid(data.guid);
          setRole(data.role);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setMiddleName(data.middle_name);
          setPhone(data.phone);
          setEmail(data.email);
          setUsername(data.username);
          setGender(data.gender);
          setBirthday(data.birthday);
          setRegion(data.region);
          setDistrict(data.district);
          setAbout(data.about);
          setBiography(data.biography);
          setPfp(data.pfp);
          setPurposes(data.purposes);

          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        setGuid("");
        setRole("");
        setFirstName("");
        setLastName("");
        setMiddleName("");
        setPhone("");
        setEmail("");
        setUsername("");
        setGender(0);
        setBirthday("");
        setRegion("");
        setDistrict("");
        setAbout("");
        setBiography("");
        setPfp("");
        setPurposes("");

        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const login = async ({
    phone,
    password,
  }: {
    phone: string;
    password: string;
  }): Promise<void | boolean> => {
    setLoading(true);

    try {
      const response = await axios.post(`${usersApi}accounts/login/`, {
        phone,
        password,
      });

      if (response.status === 200) {
        window.localStorage.setItem("access", response.data.access);
        window.localStorage.setItem("refresh", response.data.refresh);

        setIsAuthenticated(true);

        addNotification(
          "Muaffaqiyatli login",
          "Login muaffaqiyatli amalga oshdi.",
          "success"
        );
        navigate("/profile/overview/");

        return await fetchData();
      }
    } catch (error) {
      console.error("Login failed:", error);
      await logout();
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);

    window.localStorage.removeItem("access");
    window.localStorage.removeItem("refresh");

    setGuid("");
    setRole("");
    setFirstName("");
    setLastName("");
    setMiddleName("");
    setPhone("");
    setEmail("");
    setUsername("");
    setGender(0);
    setBirthday("");
    setRegion("");
    setDistrict("");
    setAbout("");
    setBiography("");
    setPfp("");
    setPurposes("");

    setIsAuthenticated(false);

    setLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        guid,
        role,
        firstName,
        lastName,
        middleName,
        phone,
        email,
        username,
        gender,
        birthday,
        region,
        district,
        about,
        biography,
        pfp,
        purposes,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserContext };
