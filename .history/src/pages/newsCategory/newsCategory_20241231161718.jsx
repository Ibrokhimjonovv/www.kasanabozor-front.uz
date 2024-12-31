import React, { useContext } from "react";
import "./newsCategory.scss";
import { Link, useParams } from "react-router-dom";
import aaa from "./Без имени-2 1.png";
import { MyContext } from "../../context/myContext";
import Weather from "../../components/weather/weather";
import NewsInnerRight from "../../components/newsInnerRight/newsInnerRight";

const NewsCategory = () => {
  const { category } = useParams();
  const { newsList } = useContext(MyContext);
  function formatCategory(category) {
    if (!category) return "";
    const formattedCategory = category
      .replace(/-/g, " ") 
      .split(" ");
    formattedCategory[0] =
      formattedCategory[0][0].toUpperCase() + formattedCategory[0].slice(1); // Birinchi harfni katta qilish
    return formattedCategory.join(" "); // So'zlarni qayta birlashtirish
  }

  const legislativeNews = newsList.filter(
    (news) => news.category === formatCategory(category)
  );

  return (
    <div id="newsCategory">
      <div className="to-back">
        <div className="backInner">
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
          <Link to="/news">Yangiliklar</Link>
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
          <span>{formatCategory(category)}</span>
        </div>
      </div>
      <div className="allProductsPoster">
        <div className="posterInner">
          <h2>{formatCategory(category)} yangiliklari</h2>
          <img src={aaa} alt="" />
        </div>
      </div>
      <div className="newsInner">
        <div className="news-documents">
          <div className="news-cards">
            {legislativeNews.length > 0 ? (
              legislativeNews.map((news, index) => (
                <Link to={`${news.id}`} className="news-card-link">
                  <div className="news-card">
                    <div className="img-cont">
                      <img src={news.img} alt={news.title} />
                    </div>
                    <div className="time">
                      <span id="date-time">
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
                        {news.date}
                      </span>
                      <span id="views-count">
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
                        {news.views}
                      </span>
                    </div>
                    <div className="news-title">{news.title}</div>
                    <div className="news-description">{news.description}</div>
                    <div className="type">{news.type}</div>
                  </div>
                </Link>
              ))
            ) : (
              <p>Yangiliklar mavjud emas</p>
            )}
          </div>
        </div>
        <NewsInnerRight />
      </div>

      <div className="weather-data">
        <Weather />
      </div>
    </div>
  );
};

export default NewsCategory;
