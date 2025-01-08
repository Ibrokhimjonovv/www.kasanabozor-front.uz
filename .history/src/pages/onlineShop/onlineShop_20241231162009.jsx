import React from "react";
import "./onlineShop.scss";
import backgroundImg from "./backgroundImg.png";
import img from "./posterImg.png";
import TopProducts from "../../components/topProducts/topProducts";
import ShopSwiper from "../../components/shopSwiper/shopSwiper";
import posterImg2 from "./posterImg2.png";
import News from "../../components/newsFromWorkers/News";
import Offers from "../../components/offers/Offers";
import Success from "../../components/success/Success";
const OnlineShop = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
  };
  return (
    <div id="onlineShop">
      <div className="miniPoster" style={backgroundStyle}>
        <div className="text">Kasanachilik onlayn bozori</div>
        <img src={img} alt="" />
      </div>
      <TopProducts />
      <ShopSwiper />
      <div className="forBackgroundColor">
        <div className="poster">
          <div className="left-side">
            <div className="bigText">
              <p>Ipakchilikdagi muvaffaqiyatli tajriba</p>
              <div className="name">
                <div className="peopleName">Mubina Ismatjonova</div>
                <div className="work">Kasanachi, ipakchi</div>
              </div>
            </div>
            <div className="smallText">
              Ipakchilikdagi muvaffaqiyatli tajriba, bu sohada amalga oshirilgan
              innovatsion yondashuvlar va zamonaviy texnologiyalar yordamida
              erishilgan natijalar haqida.
            </div>
          </div>
          <div className="right-side">
            <div className="shape"></div>
            <img src={posterImg2} alt="" />
          </div>
        </div>
      </div>
      <div className="newsFromWorkers">
        <News />
      </div>
      <div className="cubes">
        <div className="cubesInner">
          <div className="cube"></div>
          <div className="cube"></div>
          <div className="cube"></div>
          <div className="cube"></div>
          <div className="cube"></div>
        </div>
      </div>
      <Offers />
      <Success />
    </div>
  );
};

export default OnlineShop;
