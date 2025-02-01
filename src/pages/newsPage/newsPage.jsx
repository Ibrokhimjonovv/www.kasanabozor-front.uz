import React, { useContext, useState, useEffect } from "react";
import "./newsPage.scss";
import backgroundImg from "./backgroundImg.png";
import posterImg from "./newsimg.png";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/myContext";
import posterImg2 from "./posterImg2.png";
import HistoryOfSuccess from "../../components/historyOfSuccess/historyOfSuccess";
import newsCardImage from "./news-card-image.png";
// import Weather from "../../components/weather/weather";
import CurrencyRates from "../../components/converter/converter";
import Documents from "../../components/documents/Documents";
import { formatLink, mediaServerUrl } from "../../SuperVars";

const NewsPage = () => {
  const { newsList } = useContext(MyContext);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
  };

  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".news-card:not(.revealed)");
      reveals.forEach((revealElement) => {
        const windowHeight = window.innerHeight;
        const revealTop = revealElement.getBoundingClientRect().top;
        const revealPoint = windowHeight * 0.9;
        if (
          revealTop < revealPoint &&
          !revealElement.classList.contains("revealed")
        ) {
          revealElement.classList.add("revealed");
        }
      });
    };
    window.addEventListener("scroll", reveal);
    reveal();
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  return (
    <>
      <div id="newsDetail">
        <div className="newsFirstPoster" style={backgroundStyle}>
          <div className="text">Yangiliklar</div>
          <img src={posterImg} alt="" />
        </div>
        <div className="newsInner">
          <div className="left-side">
            {newsList[0] && (
              <>
                <div className="img-container">
                  <img
                    src={`${mediaServerUrl}news${formatLink(
                      newsList[0].thumbnail
                    )}`}
                    alt=""
                  />
                  <div className="texts">
                    <h1>{newsList[0].title}</h1>
                    <p>{newsList[0].description.split('.')[0]}.</p>
                    <div className="date">
                      <Link to={`/news/${newsList[0].category.id}`}>
                        {newsList[0].category.title}
                      </Link>
                      <div className="date-inner">
                        <div>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_600_4192)">
                              <path
                                d="M10.0013 5V10L13.3346 11.6667M18.3346 10C18.3346 14.6024 14.6037 18.3333 10.0013 18.3333C5.39893 18.3333 1.66797 14.6024 1.66797 10C1.66797 5.39763 5.39893 1.66667 10.0013 1.66667C14.6037 1.66667 18.3346 5.39763 18.3346 10Z"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_600_4192">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          Bugun
                        </div>
                        <div>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.832031 9.99999C0.832031 9.99999 4.16536 3.33333 9.9987 3.33333C15.832 3.33333 19.1654 9.99999 19.1654 9.99999C19.1654 9.99999 15.832 16.6667 9.9987 16.6667C4.16536 16.6667 0.832031 9.99999 0.832031 9.99999Z"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M9.9987 12.5C11.3794 12.5 12.4987 11.3807 12.4987 9.99999C12.4987 8.61928 11.3794 7.49999 9.9987 7.49999C8.61799 7.49999 7.4987 8.61928 7.4987 9.99999C7.4987 11.3807 8.61799 12.5 9.9987 12.5Z"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="right-side">
            {newsList.slice(1, 5).map((value, index) => (
              <Link to={`/news/${value.category.id}/${value.id}/`} key={index}>
                <div className="row">
                  <div className="row-right">
                    <img
                      src={`${mediaServerUrl}news${formatLink(
                        value.thumbnail
                      )}`}
                      alt=""
                    />
                  </div>
                  <div className="row-left">
                    <div className="row-new-title">{value.title}</div>
                    <div className="row-new-date">
                      <div>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_600_4192)">
                            <path
                              d="M10.0013 5V10L13.3346 11.6667M18.3346 10C18.3346 14.6024 14.6037 18.3333 10.0013 18.3333C5.39893 18.3333 1.66797 14.6024 1.66797 10C1.66797 5.39763 5.39893 1.66667 10.0013 1.66667C14.6037 1.66667 18.3346 5.39763 18.3346 10Z"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_600_4192">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Bugun
                      </div>
                      <div>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.832031 9.99999C0.832031 9.99999 4.16536 3.33333 9.9987 3.33333C15.832 3.33333 19.1654 9.99999 19.1654 9.99999C19.1654 9.99999 15.832 16.6667 9.9987 16.6667C4.16536 16.6667 0.832031 9.99999 0.832031 9.99999Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.9987 12.5C11.3794 12.5 12.4987 11.3807 12.4987 9.99999C12.4987 8.61928 11.3794 7.49999 9.9987 7.49999C8.61799 7.49999 7.4987 8.61928 7.4987 9.99999C7.4987 11.3807 8.61799 12.5 9.9987 12.5Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        0
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="legislative-documents">
          <div className="title">
            <h2>Yangiliklar</h2>
            <p>So’nggi haftaning eng mashhur mahsulotlari</p>
          </div>
          <div className="news-cards">
            {newsList.length > 0 ? (
              newsList.slice(0, 4).map((news, index) => (
                <Link to={`/news/${news.category.id}/${news.id}`}>
                  <div className={`news-card `}>
                    <div className="img-cont">
                      <img
                        src={`${mediaServerUrl}news${formatLink(
                          news.thumbnail
                        )}`}
                        alt={news.title}
                      />
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
                        {news.created_at.split("T")[0]}
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
                    <div className="type">{news.category.title}</div>
                  </div>
                </Link>
              ))
            ) : (
              <p>Qonunchilikga oid Yangiliklar mavjud emas</p>
            )}
            <div className="showMoreBtn">
              {/* <button onClick={handleShowMore}>Ko'proq ko'rish</button> */}
              <div className="showMoreBtn">
                <Link to={``}>Ko'proq ko'rish</Link>
              </div>
            </div>
          </div>
        </div>

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
                Ipakchilikdagi muvaffaqiyatli tajriba, bu sohada amalga
                oshirilgan innovatsion yondashuvlar va zamonaviy texnologiyalar
                yordamida erishilgan natijalar haqida.
              </div>
            </div>
            <div className="right-side">
              <div className="shape"></div>
              <img src={posterImg2} alt="" />
            </div>
          </div>
        </div>

        <HistoryOfSuccess />

        <Documents />

        <h2 className="currency-title">Foydali ma'lumotlar</h2>
        <p className="currency-little-title">Iqlim va valyuta ma'lumotlari</p>
        <div className="g-container">
          {/* <Weather /> */}
          <CurrencyRates />
        </div>
        <br />
      </div>
    </>
  );
};

export default NewsPage;
