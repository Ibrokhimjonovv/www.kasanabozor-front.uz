import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import "./AboutKasana.scss";
import img1 from "./img1.png";
import img2 from "./img2.png";
import img3 from "./img3.jfif";
import img4 from "./img4.png";
import arrow from "./arrow.png";
import Counter from "../Counter/Counter";

const AboutKasana = () => {
  const { ref: ref1, inView: inView1 } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { ref: ref3, inView: inView3 } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { ref: ref4, inView: inView4 } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { ref: ref5, inView: inView2 } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { ref: ref6, inView: inView3 } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { ref: ref7, inView: inView4 } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { ref: ref8, inView: inView4 } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  return (
    <div id="AboutKasana">
      <div className="images-container">
        <div ref={ref1} className={`tile small ${inView1 ? "visible" : ""}`}>
          <img src={img1} alt="Image 1" />
        </div>
        <div ref={ref2} className={`tile small ${inView2 ? "visible" : ""}`}>
          <img src={img2} alt="Image 2" />
        </div>
        <div className="column">
          <div ref={ref3} className={`tile small ${inView3 ? "visible" : ""}`}>
            <img src={img3} alt="Image 3" />
            <div className="text">
              {inView3 && <Counter start={0} end={12250} duration={2000} />}
              <span>Kasanachilar</span>
            </div>
          </div>
          <div ref={ref4} className={`tile small ${inView4 ? "visible" : ""}`}>
            <img src={img4} alt="Image 4" />
          </div>
        </div>
      </div>

      <div className="texts-container">
        <h1 ref={ref1} className={`${inView1 ? "visible" : ""}`}>
          Kasanachilikni rivojlantirish, bu sohada yangi imkoniyatlar yaratish va mahalliy iqtisodiyotga hissa qo'shish uchun muhimdir.
        </h1>
        <p id="desc" ref={ref2} className={`${inView2 ? "visible" : ""}`}>
          Kasanachilikni rivojlantirish, bu sohada yangi imkoniyatlar yaratish va mahalliy iqtisodiyotga hissa qo'shish uchun muhimdir. Kasanachilikni rivojlantirish orqali, biz an'anaviy hunarmandchilikni zamonaviy texnologiyalar bilan birlashtirib, yangi mahsulotlar va xizmatlar taklif etishimiz mumkin.
        </p>
        <div ref={ref3} className={`two-text ${inView3 ? "visible" : ""}`}>
          <div className="two-text-inner">
            <div className="first">
              <div className="about-shape">
                <div className="big-shape">
                  <div className="small-shape"></div>
                </div>
              </div>
            </div>
            <div className="second">
              <h1>Kasanachi</h1>
              <p>
                Kasanachilikni rivojlantirish, bu sohada yangi imkoniyatlar yaratish va mahalliy iqtisodiyotga hissa qo'shish uchun muhimdir.
              </p>
            </div>
          </div>
          <div className="two-text-inner">
            <div className="first">
              <div className="about-shape">
                <div className="big-shape"></div>
              </div>
            </div>
            <div className="second">
              <h1>Kasanachi</h1>
              <p>
                Kasanachilikni rivojlantirish, bu sohada yangi imkoniyatlar yaratish va mahalliy iqtisodiyotga hissa qo'shish uchun muhimdir.
              </p>
            </div>
          </div>
        </div>
        <div className="about-link-cont">
          <Link to="about-project" ref={ref4} className={`${inView4 ? "visible" : ""}`}>
            Loyiha haqida <img src={arrow} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutKasana;
