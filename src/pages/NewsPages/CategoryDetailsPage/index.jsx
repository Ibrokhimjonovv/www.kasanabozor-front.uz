import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./index.scss";

import poster from "./banner.png";

import Weather from "../../../components/WeatherComponent/weather";
import NewsInnerRight from "../../../components/NewsInnerRightComponent/newsInnerRight";
import SearchBar from "../../../components/SearchbarComponent/searchBar";
import CurrencyRates from "../../../components/ConverterComponent/converter";
import Loading from "../../../components/LoaderComponent/loading";

import { NewsContext } from "../../../context/news";

import { newsApi } from "../../../server";
import axios from "axios";

const CategoryDetailsPage = () => {
  const { category } = useParams();

  const { categories } = useContext(NewsContext);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryNews, setCategoryNews] = useState([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [rightWidth, setRightWidth] = useState(0);

  const firstElement = useRef(null);

  useEffect(() => {
    axios.get(`${newsApi}category/${category}/`).then((response) => {
      if (response.status == 200) {
        setCategoryNews(response.data);
      }
    });
  }, [category]);

  useEffect(() => {
    if (firstElement.current) {
      setRightWidth(firstElement.current.clientWidth);
    }
  }, [rightWidth, categoryNews, category]);

  return (
    <div id="news-category-details" className="pt-[160px]">
      <div className="breadcrumb bg-brand text-white">
        <div className="container mx-auto flex items-center gap-1">
          <Link to="/">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 18.3334V10H12.5V18.3334M2.5 7.50002L10 1.66669L17.5 7.50002V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1578 16.2754 18.3334 15.8333 18.3334H4.16667C3.72464 18.3334 3.30072 18.1578 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.50002Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <Link to="/news/">Yangiliklar</Link>

          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <span>{currentCategory ? currentCategory.title : "Barchasi"}</span>
        </div>
      </div>

      <div className="poster bg-white">
        <div className="relative relative-container w-full h-[120px]">
          <div className="container mx-auto h-full flex items-center justify-start">
            <h1 className="poster-title text-3xl text-brand font-semibold">
              Qonunchilik yangiliklari
            </h1>
          </div>
          <img src={poster} alt="" className="absolute right-0 top-0" />
        </div>
      </div>

      <div className="news-inner bg-background">
        <div className="container mx-auto flex gap-3">
          <div className="grid grid-container grid-cols-2 gap-3">
            {categoryNews[0] ? (
              categoryNews.map((value, index) => (
                <Link
                  to={`/news/_/details/${value.id}/`}
                  className="news-card bg-white rounded-md overflow-hidden hover:shadow-lg hover:shadow-placeholder/50 transition-all duration-300 ease-out"
                  key={value.guid}
                  ref={index === 0 ? firstElement : null}
                >
                  <img
                    src={`${newsApi.split("/api")[0]}${value.thumbnail}`}
                    alt={value.title}
                  />
                  <div className="news-card-body p-2.5">
                    <div className="time flex items-center justify-between text-brand mb-1.5">
                      <span className="flex items-center justify-center gap-1.5">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_355_9883)">
                            <path
                              d="M10.0003 5.00008V10.0001L13.3337 11.6667M18.3337 10.0001C18.3337 14.6025 14.6027 18.3334 10.0003 18.3334C5.39795 18.3334 1.66699 14.6025 1.66699 10.0001C1.66699 5.39771 5.39795 1.66675 10.0003 1.66675C14.6027 1.66675 18.3337 5.39771 18.3337 10.0001Z"
                              stroke="#41A58D"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_355_9883">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        {value.created_at.split("T")[0]}
                      </span>
                      <span className="flex items-center justify-center gap-1.5">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.833008 9.99992C0.833008 9.99992 4.16634 3.33325 9.99967 3.33325C15.833 3.33325 19.1663 9.99992 19.1663 9.99992C19.1663 9.99992 15.833 16.6666 9.99967 16.6666C4.16634 16.6666 0.833008 9.99992 0.833008 9.99992Z"
                            stroke="#41A58D"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.99967 12.4999C11.3804 12.4999 12.4997 11.3806 12.4997 9.99992C12.4997 8.61921 11.3804 7.49992 9.99967 7.49992C8.61896 7.49992 7.49967 8.61921 7.49967 9.99992C7.49967 11.3806 8.61896 12.4999 9.99967 12.4999Z"
                            stroke="#41A58D"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {value.views || 0}
                      </span>
                    </div>

                    <h3 className="news-title text-text text-2xl font-bold mb-2">
                      {value.title}
                    </h3>
                    <p className="news-description text-description text-md mb-2">
                      {value.short_description}
                    </p>
                    <span className="news-category text-md bg-bg-placeholder text-text-placeholder rounded-md py-1 px-2">
                      {value.category.title}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span">
                <p>Yangiliklar mavjud emas</p>
              </div>
            )}
          </div>
          <NewsInnerRight width={rightWidth} />
        </div>
      </div>

      <h2 className="currency-title">Foydali ma'lumotlar</h2>
      <p className="currency-little-title">Iqlim va valyuta ma'lumotlari</p>
      <div className="g-container">
        <Weather />
        <CurrencyRates />
      </div>
      <br />
    </div>
  );
};

export default CategoryDetailsPage;
