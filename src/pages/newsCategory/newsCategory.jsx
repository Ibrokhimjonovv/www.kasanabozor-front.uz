import React, { useContext, useState } from "react";
import "./newsCategory.scss";
import { Link, useParams } from "react-router-dom";
import aaa from "./Без имени-2 1.png";
import { MyContext } from "../../context/myContext";
import Weather from "../../components/weather/weather";
import NewsInnerRight from "../../components/newsInnerRight/newsInnerRight";
import SearchBar from "../../components/searchBar/searchBar";
import CurrencyRates from "../../components/converter/converter";

const NewsCategory = () => {
  const { category } = useParams();
  const { newsList } = useContext(MyContext);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const categories = [
    { id: 1, category: "Qonunchilik" },
    { id: 2, category: "Huquqiy hujjatlar" },
    { id: 3, category: "Kasanachilik" },
    { id: 4, category: "Ilmiy ommabop" },
    { id: 5, category: "Loyihalar" },
    { id: 6, category: "Video yangiliklar" },
    { id: 7, category: "Meyoriy huquqiy hujjatlar" },
  ];
  function formatCategory(category) {
    if (!category) return "";
    const formattedCategory = category.replace(/-/g, " ").split(" ");
    formattedCategory[0] =
      formattedCategory[0][0].toUpperCase() + formattedCategory[0].slice(1);
    return formattedCategory.join(" ");
  }
  const legislativeNews = newsList.filter(
    (news) => news.category === formatCategory(category)
  );

  const toggleCategory = () => {
    setCategoryOpen(!categoryOpen)
  }
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
      <div className="news-search-bar">
        <SearchBar />
        <div className="category-btn" onClick={toggleCategory}>
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.125 7.6875H5.47344C5.66734 8.23578 6.02645 8.71048 6.50131 9.04622C6.97617 9.38196 7.54344 9.56225 8.125 9.56225C8.70656 9.56225 9.27383 9.38196 9.74869 9.04622C10.2236 8.71048 10.5827 8.23578 10.7766 7.6875H16.875C17.1236 7.6875 17.3621 7.58872 17.5379 7.41291C17.7137 7.23709 17.8125 6.99864 17.8125 6.75C17.8125 6.50136 17.7137 6.2629 17.5379 6.08708C17.3621 5.91127 17.1236 5.8125 16.875 5.8125H10.7766C10.5827 5.26421 10.2236 4.78952 9.74869 4.45377C9.27383 4.11803 8.70656 3.93774 8.125 3.93774C7.54344 3.93774 6.97617 4.11803 6.50131 4.45377C6.02645 4.78952 5.66734 5.26421 5.47344 5.8125H3.125C2.87636 5.8125 2.6379 5.91127 2.46209 6.08708C2.28627 6.2629 2.1875 6.50136 2.1875 6.75C2.1875 6.99864 2.28627 7.23709 2.46209 7.41291C2.6379 7.58872 2.87636 7.6875 3.125 7.6875ZM8.125 5.8125C8.31042 5.8125 8.49168 5.86748 8.64585 5.97049C8.80002 6.07351 8.92018 6.21992 8.99114 6.39123C9.06209 6.56254 9.08066 6.75104 9.04449 6.93289C9.00831 7.11475 8.91902 7.2818 8.78791 7.41291C8.6568 7.54402 8.48975 7.63331 8.3079 7.66948C8.12604 7.70566 7.93754 7.68709 7.76623 7.61613C7.59493 7.54518 7.44851 7.42501 7.3455 7.27084C7.24248 7.11667 7.1875 6.93542 7.1875 6.75C7.1875 6.50136 7.28627 6.2629 7.46209 6.08708C7.6379 5.91127 7.87636 5.8125 8.125 5.8125ZM16.875 13.3125H15.7766C15.5827 12.7642 15.2236 12.2895 14.7487 11.9538C14.2738 11.618 13.7066 11.4377 13.125 11.4377C12.5434 11.4377 11.9762 11.618 11.5013 11.9538C11.0264 12.2895 10.6673 12.7642 10.4734 13.3125H3.125C2.87636 13.3125 2.6379 13.4113 2.46209 13.5871C2.28627 13.7629 2.1875 14.0014 2.1875 14.25C2.1875 14.4986 2.28627 14.7371 2.46209 14.9129C2.6379 15.0887 2.87636 15.1875 3.125 15.1875H10.4734C10.6673 15.7358 11.0264 16.2105 11.5013 16.5462C11.9762 16.882 12.5434 17.0622 13.125 17.0622C13.7066 17.0622 14.2738 16.882 14.7487 16.5462C15.2236 16.2105 15.5827 15.7358 15.7766 15.1875H16.875C17.1236 15.1875 17.3621 15.0887 17.5379 14.9129C17.7137 14.7371 17.8125 14.4986 17.8125 14.25C17.8125 14.0014 17.7137 13.7629 17.5379 13.5871C17.3621 13.4113 17.1236 13.3125 16.875 13.3125ZM13.125 15.1875C12.9396 15.1875 12.7583 15.1325 12.6042 15.0295C12.45 14.9265 12.3298 14.7801 12.2589 14.6088C12.1879 14.4375 12.1693 14.249 12.2055 14.0671C12.2417 13.8852 12.331 13.7182 12.4621 13.5871C12.5932 13.456 12.7602 13.3667 12.9421 13.3305C13.124 13.2943 13.3125 13.3129 13.4838 13.3839C13.6551 13.4548 13.8015 13.575 13.9045 13.7291C14.0075 13.8833 14.0625 14.0646 14.0625 14.25C14.0625 14.4986 13.9637 14.7371 13.7879 14.9129C13.6121 15.0887 13.3736 15.1875 13.125 15.1875Z"
              fill="white"
            />
            <path
              d="M13.125 15.1875C12.9396 15.1875 12.7583 15.1325 12.6042 15.0295C12.45 14.9265 12.3298 14.7801 12.2589 14.6088C12.1879 14.4375 12.1693 14.249 12.2055 14.0671C12.2417 13.8852 12.331 13.7182 12.4621 13.5871C12.5932 13.456 12.7602 13.3667 12.9421 13.3305C13.124 13.2943 13.3125 13.3129 13.4838 13.3839C13.6551 13.4548 13.8015 13.575 13.9045 13.7291C14.0075 13.8833 14.0625 14.0646 14.0625 14.25C14.0625 14.4986 13.9637 14.7371 13.7879 14.9129C13.6121 15.0887 13.3736 15.1875 13.125 15.1875Z"
              fill="white"
            />
            <path
              d="M8.125 5.8125C8.31042 5.8125 8.49168 5.86748 8.64585 5.97049C8.80002 6.07351 8.92018 6.21992 8.99114 6.39123C9.06209 6.56254 9.08066 6.75104 9.04449 6.93289C9.00831 7.11475 8.91902 7.2818 8.78791 7.41291C8.6568 7.54402 8.48975 7.63331 8.3079 7.66948C8.12604 7.70566 7.93754 7.68709 7.76623 7.61613C7.59493 7.54518 7.44851 7.42501 7.3455 7.27084C7.24248 7.11667 7.1875 6.93542 7.1875 6.75C7.1875 6.50136 7.28627 6.2629 7.46209 6.08708C7.6379 5.91127 7.87636 5.8125 8.125 5.8125Z"
              fill="white"
            />
          </svg>
          <div className={`categories categories-mobile-version ${categoryOpen ? "active" : ""}`}>
            <h2>Katgoriyalar</h2>
            <ul>
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    to={`/news/${category.category
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                  >
                    {category.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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

export default NewsCategory;
