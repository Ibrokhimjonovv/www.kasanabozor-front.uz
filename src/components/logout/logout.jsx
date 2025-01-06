import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/myContext";
import "./Logout.scss";
import axios from 'axios';

const Logout = () => {
  const { setSelectedLanguage, setIsAuthenticated } = useContext(MyContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    // Foydalanuvchi holatini yangilash (agar kontekstdan foydalanayotgan bo'lsangiz)
    setSelectedLanguage(""); // Yoki boshqa kerakli holatlarni yangilash
    setLanguages([]); // Kerakli bo'lsa 
    setIsAuthenticated(false)

    axios.defaults.headers.common['Authorization'] = `No-Authorization`;
    // Tizimdan chiqqandan so'ng foydalanuvchini login sahifasiga yo'naltirish
    setSelectedLanguage("");
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
