import React, { useState, useEffect } from "react";
import "./historyOfSuccess.scss";

import img1 from "./img1.jpg";
import img2 from "./img2.jpg";

const HistoryOfSuccess = () => {
  const successStories = useState([
    {
      id: 1,
      img: img1,
      title: "O‘zini o‘zi band qilgan shaxslar",
      description:
        "«Kasanachilikni yanada rivojlantirishga oid qo‘shimcha chora-tadbirlar to‘g‘risida»gi",
    },
    {
      id: 2,
      img: img2,
      title: "Hunarmandchilikka oid muvaffaqiyat",
      description:
        "Hunarmandlar kasbining jamiyatda qanday ahamiyatga ega ekanligi haqida hikoya.",
    },
    {
      id: 3,
      img: img1,
      title: "Texnologiya yordami bilan muvaffaqiyat",
      description: "Texnologiya va innovatsiyalarni qo‘llash orqali muvaffaqiyat.",
    },
    {
      id: 4,
      img: img2,
      title: "Milliy madaniyat va hunarmandchilik",
      description: "Madaniyatga asoslangan hunarmandchilik muvaffaqiyati.",
    },
  ]);
  const [visibleCount, setVisibleCount] = useState(2);
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 2);
  };
  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".hito:not(.revealed)");
      reveals.forEach((revealElement) => {
        const windowHeight = window.innerHeight;
        const revealTop = revealElement.getBoundingClientRect().top;
        const revealPoint = windowHeight * 0.9;
        if (revealTop < revealPoint && !revealElement.classList.contains("revealed")) {
          revealElement.classList.add("revealed");
        }
      });
    };

    window.addEventListener("scroll", reveal);

    // Birinchi ochilish uchun chaqiriladi
    reveal();

    // Scroll listenerni tozalash
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  return (
    <div id="success-history">
      <h2 className="title">Bir muvaffaqiyat tarixi</h2>
      <p className="littleText">Mashhur hunarmand va kasanachilar hikoyasi</p>
      <div className="people">
        {successStories.slice(0, visibleCount).map((story) => (
          <div key={story.id} className="hito">
            <img src={story.img} alt={story.title} />
            <div className="texts">
              <h2 className="bigText">{story.title}</h2>
              <p className="hoto-text">{story.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="showMoreBtn">
        {visibleCount < successStories.length && (
            <button className="show-more" onClick={handleShowMore}>
            Ko'proq ko'rish
            </button>
        )}
      </div>
    </div>
  );
};

export default HistoryOfSuccess;
