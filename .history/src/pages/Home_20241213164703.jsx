import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../context/myContext";
import HeroSwiper from "../components/hero-swiper/hero-swiper";
import AboutKasana from "../components/aboutKasana/AboutKasana";
import KasanaTypes from "../components/kasanaTypes/KasanaTypes";
import Documents from "../components/documents/Documents";
import Courses from "../components/courses/Courses";
import History from "../components/history/History";
import News from "../components/news/News";
import Announcements from "../components/announcements/Announcements";
import LittlePoster from "../components/littlePoster/LittlePoster";
import Success from "../components/success/Success";
import Questions from "../components/questions/questions";
import "./Home.scss"

const Home = () => {
  const { loginSuccess, isAuthenticated } = useContext(MyContext);

  return (
    <div>
      {loginSuccess && (
        <div id="succ">Muvaffaqiyatli ro'yxatdan o'tildi</div>
      )}
      <HeroSwiper />
      <AboutKasana />
      <KasanaTypes />
      <Documents />
      <Courses />
      <History />
      <News />
      <Announcements />
      <LittlePoster />
      <Success />
      <Questions />
    </div>
  );
};

export default Home;
