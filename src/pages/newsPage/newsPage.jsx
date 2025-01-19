import React, { useContext, useState, useEffect } from "react";
import "./newsPage.scss";
import backgroundImg from "./backgroundImg.png";
// import posterImg from "./newsimg.png";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/myContext";
import posterImg2 from "./posterImg2.png";
// import HistoryOfSuccess from "../../components/historyOfSuccess/historyOfSuccess";
// import newsCardImage from "./news-card-image.png";
import Weather from "../../components/weather/weather";
import CurrencyRates from "../../components/converter/converter";
import Documents from "../../components/documents/Documents";

const NewsPage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
  };

  const { newsList } = useContext(MyContext);
  const legislativeNews = newsList.filter(
    (news) => news.category === "Qonunchilik"
  );
  const normativeLegalNews = newsList.filter(
    (news) => news.category === "Meyoriy huquqiy hujjatlar"
  );
  
  const [visibleNews, setVisibleNews] = useState(4);
  const [visibleNews2, setVisibleNews2] = useState(4);
  
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
  
  return (<>
    <div id="newsDetail">
    { /* <div className="newsFirstPoster" style={backgroundStyle}>
        <div className="text">Yangiliklar</div>
        <img src={posterImg} alt="" />
      </div>
      <div className="newsInner">
        <div className="left-side">
          <div className="img-container">
            <img src={newsCardImage} alt="" />
            <div className="texts">
              <h1>O‘zini o‘zi band qilgan shaxslar</h1>
              <p>
                «Kasanachilikni yanada rivojlantirishga oid qo‘shimcha
                chora-tadbirlar to‘g‘risida»gi
              </p>
              <div className="date">
                <Link to="CATEGORY_YOZISH_KERAK">Qonunchilik</Link>
                <div className="date-inner">
                  <div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_600_4192)">
                        <path
                          d="M10.0013 5V10L13.3346 11.6667M18.3346 10C18.3346 14.6024 14.6037 18.3333 10.0013 18.3333C5.39893 18.3333 1.66797 14.6024 1.66797 10C1.66797 5.39763 5.39893 1.66667 10.0013 1.66667C14.6037 1.66667 18.3346 5.39763 18.3346 10Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.9987 12.5C11.3794 12.5 12.4987 11.3807 12.4987 9.99999C12.4987 8.61928 11.3794 7.49999 9.9987 7.49999C8.61799 7.49999 7.4987 8.61928 7.4987 9.99999C7.4987 11.3807 8.61799 12.5 9.9987 12.5Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    2567
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-side">
          <Link to="#">
            <div className="row">
              <div className="row-right">
                <img src={newsCardImage} alt="" />
              </div>
              <div className="row-left">
                <div className="row-new-title">
                  O‘zini o‘zi band qilgan shaxslar, o‘z maqsadlariga erishish
                  uchun turli xil faoliyatlar
                </div>
                <div className="row-new-date">
                  <div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_600_4192)">
                        <path
                          d="M10.0013 5V10L13.3346 11.6667M18.3346 10C18.3346 14.6024 14.6037 18.3333 10.0013 18.3333C5.39893 18.3333 1.66797 14.6024 1.66797 10C1.66797 5.39763 5.39893 1.66667 10.0013 1.66667C14.6037 1.66667 18.3346 5.39763 18.3346 10Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.9987 12.5C11.3794 12.5 12.4987 11.3807 12.4987 9.99999C12.4987 8.61928 11.3794 7.49999 9.9987 7.49999C8.61799 7.49999 7.4987 8.61928 7.4987 9.99999C7.4987 11.3807 8.61799 12.5 9.9987 12.5Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    2567
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="#">
            <div className="row">
              <div className="row-right">
                <img src={newsCardImage} alt="" />
              </div>
              <div className="row-left">
                <div className="row-new-title">
                  O‘zini o‘zi band qilgan shaxslar, o‘z maqsadlariga erishish
                  uchun turli xil faoliyatlar
                </div>
                <div className="row-new-date">
                  <div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_600_4192)">
                        <path
                          d="M10.0013 5V10L13.3346 11.6667M18.3346 10C18.3346 14.6024 14.6037 18.3333 10.0013 18.3333C5.39893 18.3333 1.66797 14.6024 1.66797 10C1.66797 5.39763 5.39893 1.66667 10.0013 1.66667C14.6037 1.66667 18.3346 5.39763 18.3346 10Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.9987 12.5C11.3794 12.5 12.4987 11.3807 12.4987 9.99999C12.4987 8.61928 11.3794 7.49999 9.9987 7.49999C8.61799 7.49999 7.4987 8.61928 7.4987 9.99999C7.4987 11.3807 8.61799 12.5 9.9987 12.5Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    2567
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="#">
            <div className="row">
              <div className="row-right">
                <img src={newsCardImage} alt="" />
              </div>
              <div className="row-left">
                <div className="row-new-title">
                  O‘zini o‘zi band qilgan shaxslar, o‘z maqsadlariga erishish
                  uchun turli xil faoliyatlar
                </div>
                <div className="row-new-date">
                  <div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_600_4192)">
                        <path
                          d="M10.0013 5V10L13.3346 11.6667M18.3346 10C18.3346 14.6024 14.6037 18.3333 10.0013 18.3333C5.39893 18.3333 1.66797 14.6024 1.66797 10C1.66797 5.39763 5.39893 1.66667 10.0013 1.66667C14.6037 1.66667 18.3346 5.39763 18.3346 10Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.9987 12.5C11.3794 12.5 12.4987 11.3807 12.4987 9.99999C12.4987 8.61928 11.3794 7.49999 9.9987 7.49999C8.61799 7.49999 7.4987 8.61928 7.4987 9.99999C7.4987 11.3807 8.61799 12.5 9.9987 12.5Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    2567
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="#">
            <div className="row">
              <div className="row-right">
                <img src={newsCardImage} alt="" />
              </div>
              <div className="row-left">
                <div className="row-new-title">
                  O‘zini o‘zi band qilgan shaxslar, o‘z maqsadlariga erishish
                  uchun turli xil faoliyatlar
                </div>
                <div className="row-new-date">
                  <div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_600_4192)">
                        <path
                          d="M10.0013 5V10L13.3346 11.6667M18.3346 10C18.3346 14.6024 14.6037 18.3333 10.0013 18.3333C5.39893 18.3333 1.66797 14.6024 1.66797 10C1.66797 5.39763 5.39893 1.66667 10.0013 1.66667C14.6037 1.66667 18.3346 5.39763 18.3346 10Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.9987 12.5C11.3794 12.5 12.4987 11.3807 12.4987 9.99999C12.4987 8.61928 11.3794 7.49999 9.9987 7.49999C8.61799 7.49999 7.4987 8.61928 7.4987 9.99999C7.4987 11.3807 8.61799 12.5 9.9987 12.5Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    2567
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div> */ }
      
      <Documents />
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
      
      { /* <HistoryOfSuccess /> */ }
      
      <h2 className="currency-title">Foydali ma'lumotlar</h2>
      <p className="currency-little-title">Iqlim va valyuta ma'lumotlari</p>
      <div className="g-container">
        <Weather />
        <CurrencyRates />
      </div>
      <br />
    </div>
  </>);
};

export default NewsPage;
