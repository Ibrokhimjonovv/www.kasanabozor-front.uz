import React from "react";

import "./index.scss";

import backgroundImg from "./backgroundImg.png";
import img from "./posterImg.png";
import posterImg2 from "./posterImg2.png";

import TopProducts from "../../../components/TopProductsComponent";
import ShopSwiper from "../../../components/ShowSwiperComponent/shopSwiper";
import News from "../../../components/NewsFromWorkersComponent/index";
import Offers from "../../../components/OffersComponent/index";
import Success from "../../../components/SuccessComponent/Success";
import SearchBar from "../../../components/SearchbarComponent/searchBar";

import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();

  document.title = `${t("Online shop")} - Kasana.uz`;

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
  };

  return (
    <div id="onlineShop">
      <div className="search-bar-container search-bar-mobile-version">
        <SearchBar />
      </div>

      <div className="miniPoster" style={backgroundStyle}>
        <div className="container">
          <div className="text">Kasanachilik onlayn bozori</div>
        </div>
        <img src={img} alt="" />
      </div>

      <TopProducts />

      <ShopSwiper />

      <div className="forBackgroundColor">
        <div className="poster">
          <div className="container">
            <div className="text-container">
              <div className="left">
                <p className="title">Ipakchilikdagi <br/>muvaffaqiyatli tajriba</p>
                <div className="description">
                  Ipakchilikdagi muvaffaqiyatli tajriba, bu sohada amalga
                  oshirilgan innovatsion yondashuvlar va zamonaviy
                  texnologiyalar yordamida erishilgan natijalar haqida.
                </div>
              </div>
              <div className="right">
                <div className="worker-info">
                  <div className="fullname">Mubina Ismatjonova</div>
                  <div className="job">Kasanachi, ipakchi</div>
                </div>
              </div>
            </div>

            <div className="image-container">
              <div className="shape"></div>
              <img src={posterImg2} alt="" />
            </div>
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

export default HomePage;
