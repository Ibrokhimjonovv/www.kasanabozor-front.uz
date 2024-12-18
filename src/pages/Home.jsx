<<<<<<< HEAD
import HeroSwiper from '../components/hero-swiper/hero-swiper';
import AboutKasana from '../components/aboutKasana/AboutKasana';
import KasanaTypes from '../components/kasanaTypes/KasanaTypes';
import Documents from '../components/documents/Documents';
import Courses from '../components/courses/Courses';
import History from '../components/history/History';
import News from '../components/news/News';
import Announcements from '../components/announcements/Announcements';
import LittlePoster from '../components/littlePoster/LittlePoster';
import Success from '../components/success/Success';
import Questions from '../components/questions/questions';
import { MyContext } from '../context/myContext';
import { useContext } from 'react';


const Home = () => {
  const {} = useContext(MyContext);
=======
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
>>>>>>> 93d4ab598bebfcdd83611ed0f0d2f643fd9a3237

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
<<<<<<< HEAD

=======
>>>>>>> 93d4ab598bebfcdd83611ed0f0d2f643fd9a3237
