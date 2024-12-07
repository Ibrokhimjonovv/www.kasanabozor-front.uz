import React, { useContext, useState, useEffect } from "react";
import "./announceDetail.scss";
import { MyContext } from "../../context/myContext";
import { Link, useParams } from "react-router-dom";
import defaultImg from "./default.png";
import Loading from "../../components/loading/loading";

const AnnounceDetail = () => {
  const [selectedDep, setSelectedDep] = useState("announce");
  const { announcements } = useContext(MyContext);
  const [currentAnnounce, setCurrentAnnounce] = useState(null);
  const { id } = useParams();

  const handleChange = (event) => {
    setSelectedDep(event.target.id);
  };

  // useEffect ni har doim chaqirish kerak
  useEffect(() => {
    const foundAnnounce = announcements.find(
      (item) => item.id === parseInt(id)
    );
    setCurrentAnnounce(foundAnnounce);
  }, [id, announcements]); // announcement o'zgarganda va id o'zgarganda qayta ishlaydi

  if (!currentAnnounce) {
    return <p>
      <Loading />
    </p>;
  }

  return (
    <div id="announceDetail">
      <div className="announceSelect">
        <input
          type="radio"
          name="dep"
          id="announce"
          checked={selectedDep === "announce"}
          onChange={handleChange}
        />
        <label htmlFor="announce" className="announce_label">
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
        </label>
        <input
          type="radio"
          name="dep"
          id="service"
          checked={selectedDep === "service"}
          onChange={handleChange}
        />
        <label htmlFor="service" className="service_label">
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
        </label>
        <input
          type="radio"
          name="dep"
          id="toAnnounce"
          checked={selectedDep === "toAnnounce"}
          onChange={handleChange}
        />
        <label htmlFor="toAnnounce" className="toAnnounce_label">
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
        </label>
      </div>
      <div className="dep-container">
        <div
          className={`datas-container announceDetail ${
            selectedDep === "announce" ? "active" : ""
          }`}
        >
          <div className="left-side">
            <div className="announcements-cards">
              {announcements.map((announcement, index) => (
                <Link
                  to={`/announcements/${announcement.id}`}
                  key={announcement.id}
                >
                  <div className="card ">
                    <p className="title">{announcement.title}</p>
                    <p className="price">{announcement.price}</p>
                    <div className="details">
                      {announcement.details.map((detail, index) => (
                        <div className="detail" key={index}>
                          {detail}
                        </div>
                      ))}
                    </div>
                    <div className="author">
                      <img src={announcement.authorImg || defaultImg} alt="" />
                      <span>{announcement.author} </span>
                    </div>
                    <div className="date-count">
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_355_2881)">
                            <path
                              d="M10.0003 5.00008V10.0001L13.3337 11.6667M18.3337 10.0001C18.3337 14.6025 14.6027 18.3334 10.0003 18.3334C5.39795 18.3334 1.66699 14.6025 1.66699 10.0001C1.66699 5.39771 5.39795 1.66675 10.0003 1.66675C14.6027 1.66675 18.3337 5.39771 18.3337 10.0001Z"
                              stroke="#767676"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_355_2881">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        {announcement.date || "Aniq emas"}
                      </span>
                      <span>
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_355_2885)">
                            <path
                              d="M1.16602 9.99992C1.16602 9.99992 4.49935 3.33325 10.3327 3.33325C16.166 3.33325 19.4993 9.99992 19.4993 9.99992C19.4993 9.99992 16.166 16.6666 10.3327 16.6666C4.49935 16.6666 1.16602 9.99992 1.16602 9.99992Z"
                              stroke="#767676"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10.3327 12.4999C11.7134 12.4999 12.8327 11.3806 12.8327 9.99992C12.8327 8.61921 11.7134 7.49992 10.3327 7.49992C8.95197 7.49992 7.83268 8.61921 7.83268 9.99992C7.83268 11.3806 8.95197 12.4999 10.3327 12.4999Z"
                              stroke="#767676"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_355_2885">
                              <rect
                                width="20"
                                height="20"
                                fill="white"
                                transform="translate(0.333008)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        {announcement.views || 0}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="right-side">
            <div className="top-side">
              <div className="top-left">
                <div className="author">
                  <img src={currentAnnounce?.authorImg || defaultImg} alt="" />
                  <span>{currentAnnounce?.author || "undefinde"}</span>
                </div>
                <div className="cur-title">{currentAnnounce.title}</div>
              </div>
              <div className="top-right">
                <span>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.9974 17.3333C16.7338 17.3333 17.3307 16.7364 17.3307 16C17.3307 15.2636 16.7338 14.6666 15.9974 14.6666C15.261 14.6666 14.6641 15.2636 14.6641 16C14.6641 16.7364 15.261 17.3333 15.9974 17.3333Z"
                      stroke="#757575"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.9974 7.99998C16.7338 7.99998 17.3307 7.40303 17.3307 6.66665C17.3307 5.93027 16.7338 5.33331 15.9974 5.33331C15.261 5.33331 14.6641 5.93027 14.6641 6.66665C14.6641 7.40303 15.261 7.99998 15.9974 7.99998Z"
                      stroke="#757575"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.9974 26.6666C16.7338 26.6666 17.3307 26.0697 17.3307 25.3333C17.3307 24.5969 16.7338 24 15.9974 24C15.261 24 14.6641 24.5969 14.6641 25.3333C14.6641 26.0697 15.261 26.6666 15.9974 26.6666Z"
                      stroke="#757575"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span>
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
                  <p>{currentAnnounce?.location || "Kiritilmagan"}</p>
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
                  <p>{ currentAnnounce?.timeWork || "Kiritilmagan"}</p>
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
                  <p>{currentAnnounce?.price || "Kiritilmagan"}</p>
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
                <div className="hashtag">
                    #quroqchilik
                </div>
                <div className="hashtag">
                    #quroqchilik
                </div>
                <div className="hashtag">
                    #quroqchilik
                </div>
                <div className="hashtag">
                    #quroqchilik
                </div>

            </div>
          </div>
        </div>
        <div
          className={`datas-container ${
            selectedDep === "service" ? "active" : ""
          }`}
        >
          <p className="title">Xizmatlar</p>
        </div>
        <div
          className={`datas-container ${
            selectedDep === "toAnnounce" ? "active" : ""
          }`}
        >
          <p className="title">E'lon berish</p>
        </div>
      </div>
    </div>
  );
};

export default AnnounceDetail;
