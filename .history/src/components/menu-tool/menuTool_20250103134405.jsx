import React from "react";
import { Link } from "react-router-dom";
import "./menuTool.scss"

const MenuTool = () => {
  return (
    <div className="menu-tool">
      <ul>
        <li>
          <Link to="#">Onlayn bozor</Link>
        </li>
        <li>
          <Link to="#">E'lonlar</Link>
        </li>
        <li>
          <Link to="#">Yangiliklar</Link>
        </li>
        <li>
          <Link to="#">Kurslar</Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuTool;
