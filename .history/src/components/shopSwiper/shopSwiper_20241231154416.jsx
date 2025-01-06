import React from 'react';
import "./shopSwiper.scss";
import shopSwiper1 from "./swiperImg1.png";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
const ShopSwiper = () => {
  return (
    <div id='shopSwiper'>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={6}
        spaceBetween={30}
        loop={true}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
        }}
        className="mySwiper"
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

      </Swiper>
    </div>
  )
}

export default ShopSwiper