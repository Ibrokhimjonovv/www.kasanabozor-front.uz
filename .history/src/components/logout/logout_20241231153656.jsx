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

    // Foydalanuvchi holatini yangilash (agar kontekstdan foydalanayotgan bo'lsangiz)
    setSelectedLanguage(""); // Yoki boshqa kerakli holatlarni yangilash
    // setLanguages([]); // Kerakli bo'lsa 
    setToken(''); // Agar tokenni state'da saqlayotgan bo'lsangiz
    setIsAuthenticated(false)

    // Tizimdan chiqqandan so'ng foydalanuvchini login sahifasiga yo'naltirish
    navigate("/");
  };

  return (
    <div>
      <button id="logout" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
