import React from "react";
import "./shopSwiper.scss";
import shopSwiper1 from "./swiperImg1.png";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const ShopSwiper = () => {
  return (
    <div id="shopSwiper">
      {/* <Swiper
        modules={[Autoplay]}
        slidesPerView={6}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3, // 480px dan katta ekranda 2 ta slayd
            spaceBetween: 0,
          },
          840: {
            slidesPerView: 4, // 480px dan katta ekranda 2 ta slayd
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
          1400: {
            slidesPerView: 7,
          },
        }}
      >
        <SwiperSlide>
          <div className="swiperCont">
            <img src={shopSwiper1} alt="" />
            <span>#temirchilik</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiperCont">
            <img src={shopSwiper1} alt="" />
            <span>#temirchilik</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiperCont">
            <img src={shopSwiper1} alt="" />
            <span>#temirchilik</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiperCont">
            <img src={shopSwiper1} alt="" />
            <span>#temirchilik</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiperCont">
            <img src={shopSwiper1} alt="" />
            <span>#temirchilik</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiperCont">
            <img src={shopSwiper1} alt="" />
            <span>#temirchilik</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiperCont">
            <img src={shopSwiper1} alt="" />
            <span>#temirchilik</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiperCont">
            <img src={shopSwiper1} alt="" />
            <span>#temirchilik</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiperCont">
            <img src={shopSwiper1} alt="" />
            <span>#temirchilik</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiperCont">
            <img src={shopSwiper1} alt="" />
            <span>#temirchilik</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiperCont">
            <img src={shopSwiper1} alt="" />
            <span>#temirchilik</span>
          </div>
        </SwiperSlide>
      </Swiper> */}
    </div>
  );
};
export default ShopSwiper;
