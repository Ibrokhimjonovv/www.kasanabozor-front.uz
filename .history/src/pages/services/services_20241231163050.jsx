import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../context/myContext";
import { Link, useParams } from "react-router-dom";
import defaultImg from "../../assets/default.png";
import Loading from "../../components/loading/loading";
import "./services.scss";
const Services = () => {
  const { services} = useContext(MyContext);
  const [currentService, setCurrentService] = useState(null);
  const { id } = useParams();
  const [savedServices, setSavedServices] = useState([]);
  useEffect(() => {
    const foundService = services.find((item) => item.id === parseInt(id));
    setCurrentService(foundService);
  }, [id, services]);
  if (!currentService) {
    return (
      <p>
        <Loading />
      </p>
    );
  }
  const handleSaveClick = (e, service) => {
    e.preventDefault();
    setSavedServices((prevServices) => {
      if (prevServices.some((saved) => saved.id === service.id)) {
        return prevServices.filter((saved) => saved.id !== service.id);
      } else {
        return [...prevServices, service];
      }
    });
  };
  const isSaved = (announcement) => {
    return savedServices.some((a) => a.id === announcement.id);
  };

  return (
    <div id="announceDetail">
      <div className="announceSelect">
        <Link to="/announcements/1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6693 17.5V15.8333C16.6693 14.9493 16.3181 14.1014 15.693 13.4763C15.0678 12.8512 14.22 12.5 13.3359 12.5H6.66927C5.78522 12.5 4.93737 12.8512 4.31225 13.4763C3.68713 14.1014 3.33594 14.9493 3.33594 15.8333V17.5M13.3359 5.83333C13.3359 7.67428 11.8436 9.16667 10.0026 9.16667C8.16165 9.16667 6.66927 7.67428 6.66927 5.83333C6.66927 3.99238 8.16165 2.5 10.0026 2.5C11.8436 2.5 13.3359 3.99238 13.3359 5.83333Z"
              stroke="#41A58D"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Ish e'lonlari
        </Link>

        <Link to="/services/1" id="ser-link">
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.8307 17.5V4.16667C13.8307 3.72464 13.6551 3.30072 13.3426 2.98816C13.03 2.67559 12.6061 2.5 12.1641 2.5H8.83073C8.3887 2.5 7.96478 2.67559 7.65222 2.98816C7.33966 3.30072 7.16406 3.72464 7.16406 4.16667V17.5M3.83073 5.83333H17.1641C18.0845 5.83333 18.8307 6.57953 18.8307 7.5V15.8333C18.8307 16.7538 18.0845 17.5 17.1641 17.5H3.83073C2.91025 17.5 2.16406 16.7538 2.16406 15.8333V7.5C2.16406 6.57953 2.91025 5.83333 3.83073 5.83333Z"
              stroke="#5A5A5A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Xizmatlar
        </Link>

        <Link to="/add-announce">
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4974 6.66669V13.3334M7.16406 10H13.8307M18.8307 10C18.8307 14.6024 15.0998 18.3334 10.4974 18.3334C5.89502 18.3334 2.16406 14.6024 2.16406 10C2.16406 5.39765 5.89502 1.66669 10.4974 1.66669C15.0998 1.66669 18.8307 5.39765 18.8307 10Z"
              stroke="#5A5A5A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          E'lon berish
        </Link>
      </div>
      <div className="dep-container">
        <div className="datas-container announceDetail">
          <div className="left-side">
            <div className="announcements-cards">
              {services.map((service) => {
                const isSaved = savedServices.some(
                  (saved) => saved.id === service.id
                );

                return (
                  <Link to={`/services/${service.id}`} key={service.id}>
                    <div className={`card ${isSaved ? "saved" : ""}`}>
                      <button
                        id="save-btn"
                        className={`${isSaved ? "saved" : ""}`}
                        onClick={(e) => handleSaveClick(e, service)}
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M25.3337 28L16.0003 21.3333L6.66699 28V6.66667C6.66699 5.95942 6.94794 5.28115 7.44804 4.78105C7.94814 4.28095 8.62641 4 9.33366 4H22.667C23.3742 4 24.0525 4.28095 24.5526 4.78105C25.0527 5.28115 25.3337 5.95942 25.3337 6.66667V28Z"
                            stroke="#757575"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <div className="hero-img-title">
                        <img className="heroImg" src={service.heroImg} alt="" />
                        <div>
                          <p className="title">{service.title}</p>
                          <p className="price">{service.price}</p>
                          <div className="details">
                            {service.details.map((detail, index) => (
                              <div className="detail" key={index}>
                                {detail}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="author">
                        <img src={service.authorImg || "/default.png"} alt="" />
                        <span>{service.author}</span>
                      </div>
                      <div className="date-count">
                        <span>{service.date || "Aniq emas"}</span>
                        <span>{service.views || 0}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="right-side">
            <div className="hero-img-detail">
              <img src={currentService?.heroImg} alt="" />
            </div>
            <div className="top-side">
              <div className="top-left">
                <div className="author">
                  <img src={currentService?.authorImg || defaultImg} alt="" />
                  <span>{currentService?.author || "undefinde"}</span>
                </div>
                <div className="cur-title">{currentService.title}</div>
              </div>
              <div className="top-right">
                <span>
                  <svg
                    width="32"
                    height="33"
                    viewBox="0 0 32 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.9993 17.8333C16.7357 17.8333 17.3327 17.2364 17.3327 16.5C17.3327 15.7636 16.7357 15.1667 15.9993 15.1667C15.263 15.1667 14.666 15.7636 14.666 16.5C14.666 17.2364 15.263 17.8333 15.9993 17.8333Z"
                      stroke="#757575"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.9993 8.50001C16.7357 8.50001 17.3327 7.90306 17.3327 7.16668C17.3327 6.4303 16.7357 5.83334 15.9993 5.83334C15.263 5.83334 14.666 6.4303 14.666 7.16668C14.666 7.90306 15.263 8.50001 15.9993 8.50001Z"
                      stroke="#757575"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.9993 27.1667C16.7357 27.1667 17.3327 26.5697 17.3327 25.8333C17.3327 25.097 16.7357 24.5 15.9993 24.5C15.263 24.5 14.666 25.097 14.666 25.8333C14.666 26.5697 15.263 27.1667 15.9993 27.1667Z"
                      stroke="#757575"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span>
                  <button
                    key={currentService.id}
                    onClick={(e) => handleSaveClick(e, currentService)}
                    className={`save-btn ${
                      isSaved(currentService) ? "saved" : "not-saved"
                    }`}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.3307 28L15.9974 21.3333L6.66406 28V6.66667C6.66406 5.95942 6.94501 5.28115 7.44511 4.78105C7.94521 4.28095 8.62349 4 9.33073 4H22.6641C23.3713 4 24.0496 4.28095 24.5497 4.78105C25.0498 5.28115 25.3307 5.95942 25.3307 6.66667V28Z"
                        stroke="#757575"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </span>

                <Link to="#">Ariza qoldirish</Link>
              </div>
            </div>
            <ul className="about-detail">
              <li>
                <span>
                  <svg
                    width="20"
                    height="28"
                    viewBox="0 0 20 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 12.3333C17.5 18.1666 10 23.1666 10 23.1666C10 23.1666 2.5 18.1666 2.5 12.3333C2.5 10.3442 3.29018 8.43653 4.6967 7.03001C6.10322 5.62349 8.01088 4.83331 10 4.83331C11.9891 4.83331 13.8968 5.62349 15.3033 7.03001C16.7098 8.43653 17.5 10.3442 17.5 12.3333Z"
                      stroke="#757575"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 14.8333C11.3807 14.8333 12.5 13.714 12.5 12.3333C12.5 10.9526 11.3807 9.83331 10 9.83331C8.61929 9.83331 7.5 10.9526 7.5 12.3333C7.5 13.714 8.61929 14.8333 10 14.8333Z"
                      stroke="#757575"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <div className="text">
                  <p>Lokatsiya</p>
                  <p>{currentService?.location || "Kiritilmagan"}</p>
                </div>
              </li>
              <li>
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_328_11769)">
                      <path
                        d="M9.9974 5.00002V10L13.3307 11.6667M18.3307 10C18.3307 14.6024 14.5998 18.3334 9.9974 18.3334C5.39502 18.3334 1.66406 14.6024 1.66406 10C1.66406 5.39765 5.39502 1.66669 9.9974 1.66669C14.5998 1.66669 18.3307 5.39765 18.3307 10Z"
                        stroke="#757575"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_328_11769">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <div className="text">
                  <p>Ish vaqti</p>
                  <p>{currentService?.timeWork || "Kiritilmagan"}</p>
                </div>
              </li>
              <li>
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.3307 9.23336V10C18.3297 11.797 17.7478 13.5456 16.6718 14.9849C15.5959 16.4242 14.0835 17.4771 12.3602 17.9866C10.6369 18.4961 8.79511 18.4349 7.10946 17.8122C5.4238 17.1894 3.98461 16.0384 3.00653 14.5309C2.02845 13.0234 1.56389 11.2401 1.68213 9.44696C1.80036 7.65383 2.49507 5.94697 3.66263 4.58092C4.83019 3.21488 6.40805 2.26285 8.16089 1.86682C9.91372 1.47079 11.7476 1.65198 13.3891 2.38336M18.3307 3.33336L9.9974 11.675L7.4974 9.17503"
                      stroke="#757575"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <div className="text">
                  <p>Ish haqqi</p>
                  <p>{currentService?.price || "Kiritilmagan"}</p>
                </div>
              </li>
            </ul>
            <div className="other-details">
              <h2>Ish vazifalari</h2>
              <ul>
                <li>
                  Novvoyga yordam berish: xamir tayyorlash, pishirish
                  jarayonlariga yordam.
                </li>
                <li>
                  Novvoyga yordam berish: xamir tayyorlash, pishirish
                  jarayonlariga yordam.
                </li>
                <li>Ish joyini toza va tartibli saqlash.</li>
              </ul>
            </div>
            <div className="other-details">
              <h2>Talablar</h2>
              <ul>
                <li>
                  Novvoychilik sohasida tajriba afzal, lekin yangi
                  o‘rganuvchilar ham qabul qilinadi.
                </li>
                <li>Jismoniy jihatdan sog‘lom va mehnatsevar bo‘lish.</li>
                <li>Jamoada ishlash ko‘nikmasi.</li>
              </ul>
            </div>
            <div className="other-details">
              <h2>Taklif qilamiz</h2>
              <ul>
                <li>Barqaror oylik maosh.</li>
                <li>O‘rganish va professional rivojlanish imkoniyati.</li>
                <li>Do‘stona va hamkorlikka asoslangan jamoa.</li>
              </ul>
            </div>
            <div className="other-details">
              <h2>Aloqa:</h2>
              <ul>
                <li>
                  Ishga qiziqqanlar o‘z rezyumesini [email yoki telefon raqamini
                  kiriting] ga yuborishlari yoki [manzilni kiriting] ga
                  kelishlari mumkin.
                </li>
              </ul>
            </div>

            <div className="hashtags">
              <div className="hashtag">#quroqchilik</div>
              <div className="hashtag">#quroqchilik</div>
              <div className="hashtag">#quroqchilik</div>
              <div className="hashtag">#quroqchilik</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
