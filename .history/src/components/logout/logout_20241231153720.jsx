import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/myContext";
import "./Logout.scss";

const Logout = () => {
  const { setSelectedLanguage, setLanguages, setToken, setIsAuthenticated } = useContext(MyContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setSelectedLanguage("");
    setToken('');
    setIsAuthenticated(false)
    navigate("/");
  };

  return (
    <div>
      <button id="logout" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
