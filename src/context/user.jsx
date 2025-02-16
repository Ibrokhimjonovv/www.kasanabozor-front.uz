import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { usersApi } from "../SuperVars";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
        `${usersApi}accounts/00000000-0000-0000-0000-000000000000/`
      );
      if (response.status == 200) {
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
      } else {
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
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const login = async ({ phone, password }) => {
    const response = await axios.post(`${usersApi}accounts/login/`, {
      phone,
      password,
    });

    if (response.status == 200) {
      setIsAuthenticated(true);

      window.localStorage.setItem("access", response.data.access);
      window.localStorage.setItem("refresh", response.data.refresh);
    }
  };

  return (
    <>
      <UserContext.Provider
        value={{
          isAuthenticated,
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
          loading
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};

export { UserContext, UserProvider };
