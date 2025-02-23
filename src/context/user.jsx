import axios from "axios";
import { Notifications } from "./notifications";
import { createContext, useContext, useEffect, useState } from "react";
import { usersApi } from "../SuperVars";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { addNotification } = useContext(Notifications);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [guid, setGuid] = useState("");
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [about, setAbout] = useState("");
  const [biography, setBiography] = useState("");
  const [pfp, setPfp] = useState("");
  const [purposes, setPurposes] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const fetchData = async () => {
    setLoading(true);
    axios
      .get(`${usersApi}accounts/00000000-0000-0000-0000-000000000000/`)
      .then((response) => {
        if (response.status == 200) {
          setGuid(response.data.guid);
          setRole(response.data.role);
          setFirstName(response.data.first_name);
          setLastName(response.data.last_name);
          setMiddleName(response.data.middle_name);
          setPhone(response.data.phone);
          setEmail(response.data.email);
          setUsername(response.data.username);
          setGender(response.data.gender);
          setBirthday(response.data.birthday);
          setRegion(response.data.region);
          setDistrict(response.data.district);
          setAbout(response.data.about);
          setBiography(response.data.biography);
          setPfp(response.data.pfp);
          setPurposes(response.data.purposes);
          setIsAuthenticated(true);
        }
      })
      .catch(() => {
        setGuid("");
        setRole("");
        setFirstName("");
        setLastName("");
        setMiddleName("");
        setPhone("");
        setEmail("");
        setUsername("");
        setGender("");
        setBirthday("");
        setRegion("");
        setDistrict("");
        setAbout("");
        setBiography("");
        setPfp("");
        setPurposes("");
        setIsAuthenticated(false);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const login = async ({ phone, password }) => {
    setLoading(true);
    return axios
      .post(`${usersApi}accounts/login/`, {
        phone,
        password,
      })
      .then((response) => {
        if (response.status == 200) {
          window.localStorage.setItem("access", response.data.access);
          window.localStorage.setItem("refresh", response.data.refresh);

          setIsAuthenticated(true);
          addNotification(
            "Muaffaqiyatli login",
            "Login muaffaqiyatli amalga oshdi."
          );
          navigate("/profile/overview/");
          
          return fetchData();
        }
        setLoading(false);
      })
      .catch(() => {
        logout();
        setLoading(false);
        return false;
      });
  };

  const logout = async () => {
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
    setGender("");
    setBirthday("");
    setRegion("");
    setDistrict("");
    setAbout("");
    setBiography("");
    setPfp("");
    setPurposes("");
    setIsAuthenticated(false);
  };

  return (
    <>
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
          errors
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};

export { UserContext, UserProvider };
