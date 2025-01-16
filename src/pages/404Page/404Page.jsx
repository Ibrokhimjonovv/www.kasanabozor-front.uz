import React from 'react';
import { Link } from "react-router-dom";
import "./404Page.scss";
import image from "./images.png";

const NotFound = () => {
  return (
    <div id='notFound'>
      <img src={image} alt="" />
      <h2>Siz izlayotgan sahifa topilmadi!</h2>
      <p>Sahifa topilmadi, boshqa ma'lumotlarga qarab ko'ring!</p>
      <Link to="/">Bosh sahifa</Link>
    </div>
  )
}

export default NotFound