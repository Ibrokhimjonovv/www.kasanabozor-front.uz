import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./hero-swiper.scss";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import left_arrow from "./left-arrow.png";
import right_arrow from "./right-arrow.png";
import backgroundImg from "./background-img.png";
import people from "./people.png"
import people1 from "./people1.png"
const HeroSwiper = () => {
  const slides = [
    {
      id: 1,
      heroText: "Kasanachilikni rivojlantirish bu sohada yangi imkoniyatlar yaratishdir",
      description: "Loyiha haqida ko'proq ma'lumot berish uchun, uning maqsadlari, vazifalari va kutilayotgan natijalari haqida batafsil",
      name: "Adhamjon Soliyev",
      job: "Kasanchi, usta",
      peopleImg: people,
    },
    {
      id: 2,
      heroText: "Kasanachilikni rivojlantirish bu sohada yangi imkoniyatlar yaratishdir",
      description: "Loyiha haqida ko'proq ma'lumot berish uchun, uning maqsadlari, vazifalari va kutilayotgan natijalari haqida batafsil",
      name: "Mubina Ismatjonova",
      job: "Kasanchi, tikuvchi",
      peopleImg: people1,
    },

  ];
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null); 
  const [activeIndex, setActiveIndex] = useState(0);
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
  };
  const highlightWords = (text) => {
    const words = text.split(" ");
    if (words.length >= 2) {
      words[0] = `<span class="highlight">${words[0]}</span>`;
      words[1] = `<span class="highlight">${words[1]}</span>`;
    }
    return words.join(" ");
  };
  return (
    <div id="hero" style={backgroundStyle}>
      <div className="ss">
      <Swiper
        ref={swiperRef}
        spaceBetween={30}
        effect={"fade"}
        loop={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        autoplay={{
          delay: 250000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[EffectFade, Navigation, Autoplay]}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-cont">
              <div className="swiper-left">
                <div className="hero-text">
                  <div
                  className="title"
                    dangerouslySetInnerHTML={{
                      __html: highlightWords(slide.heroText),
                    }}
                  ></div>
                  <p className="about-product">
                    {slide.description}
                  </p>
                  <div className="line">
                    <div className="ql">
                    <Link to="#" className="more-link">Batafsil</Link>
                    <Link to="#" className="products-link">
                      Mahsulotlar
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                    </Link>
                    <div className="custom-pagination">
                      {slides.map((_, index) => (
                        <span
                          key={index}
                          className={`custom-pagination-bullet ${
                            activeIndex === index ? "active" : ""
                          }`}
                          onClick={() => swiperRef.current.swiper.slideToLoop(index)}
                        ></span>
                      ))}
                    </div>
                    </div>
                    <div className="name-work">
                      <span className="name">
                        {slide.name}
                      </span>
                      <span className="work">
                        {slide.job}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-right">
                <div className="shape"></div>
                <img src={slide.peopleImg} alt="" />

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-navigation">
        <button ref={prevRef} className="custom-prev">
          <img src={left_arrow} alt="Previous" />
        </button>
        <button ref={nextRef} className="custom-next">
          <img src={right_arrow} alt="Next" />
        </button>
      </div>
      </div>
    </div>
  );
};

export default HeroSwiper;
