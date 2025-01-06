import React from "react";
import { useInView } from "react-intersection-observer";
import "./KasanaTypes.scss";

import icon1 from "./Package.png";
import icon2 from "./Briefcase.png";
import icon3 from "./Compass.png";
import icon4 from "./Play circle.png";

import cubeImg1 from "./cube-img.png";
import cubeImg2 from "./cube-img2.png";
import cubeImg3 from "./cube-img3.png";
import cubeImg4 from "./cube-img4.png";
import Counter from "../Counter/Counter";

const KasanaTypes = () => {
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
  return (
    <div id="kasanaTypes">
      <div className="left-side">
        <h1>
          <span>Kasana.uz</span> dagi imkoniyatlaringiz
        </h1>
        <ul>
          <li ref={ref1} className={`li ${inView1 ? "visible" : ""}`}>
            <div className="icons">
              <img src={icon1} alt="" />
            </div>
            <div className="text">
              <p>Mahsulotlarni sotish va sotib olish</p>
              <p>
                Mahsulotlarni ko’rish va sotib olish jarayoni juda qulay. Siz
                turli xil mahsulotlarni ko’rib chiqib, kerakli narsalarni
                osongina tanlashingiz mumkin.
              </p>
            </div>
          </li>
          <li ref={ref2} className={`li ${inView2 ? "visible" : ""}`}>
            <div className="icons">
              <img src={icon2} alt="" />
            </div>
            <div className="text">
              <p>Ish boyicha e’lonlarni berish va kuzatib borish</p>
              <p>
                Ish e’lonlarini berish va kuzatish jarayonini kengaytirish,
                ishga qabul qilishni yaxshilash va ish beruvchilar bilan ish
                izlovchilar o'rtasida aloqani o'rnatish muhimdir.
              </p>
            </div>
          </li>
          <li ref={ref3} className={`li ${inView3 ? "visible" : ""}`}>
            <div className="icons">
              <img src={icon3} alt="" />
            </div>
            <div className="text">
              <p>Sohada mavjud eng so’nggi yangiliklar</p>
              <p>
                Sohada mavjud yangiliklar haqida qisqacha ma'lumot beramiz. Bu
                yangiliklar sizning qiziqishingizni oshirishi mumkin.
              </p>
            </div>
          </li>
          <li ref={ref4} className={`li ${inView4 ? "visible" : ""}`}>
            <div className="icons">
              <img src={icon4} alt="" />
            </div>
            <div className="text">
              <p>Juda katta kurslar bazasi</p>
              <p>
                Juda katta kurslar bazasi, ahol különböző tantárgyakat és
                témákat tanulmányozhatunk, hogy fejlesszük tudásunkat és
                készségeinket.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className="k-right-side">
        <div ref={ref1} className={`cub ${inView1 ? "visible" : ""}`}>
          <p>Kasanachilar soni</p>
          <p>{inView1 && <Counter start={0} end={12250} duration={2000} />}</p>
          <img src={cubeImg1} alt="" />
        </div>
        <div ref={ref2} className={`cub ${inView1 ? "visible" : ""}`}>
          <p>Sohalar soni</p>
          <p>{inView2 && <Counter start={0} end={120} duration={2000} />}</p>
          <img src={cubeImg2} alt="" />
        </div>
        <div ref={ref3} className={`cub ${inView1 ? "visible" : ""}`}>
          <p>Mahsulot turlari</p>
          <p>{inView3 && <Counter start={0} end={8500} duration={2000} />}</p>
          <img src={cubeImg3} alt="" />
        </div>
        <div ref={ref4} className={`cub ${inView1 ? "visible" : ""}`}>
          <p>Kasanachilarning o’rtacha oylik daromadi</p>
          <p>
            {inView4 && <Counter start={0} end={8000000} duration={2000} />}
          </p>
          <img src={cubeImg4} alt="" />
        </div>
      </div>
    </div>
  );
};
export default KasanaTypes;
