import React, { useContext, useEffect, useState } from "react";
import "./Announcements.scss";
import { Link } from "react-router-dom";
import defaultImg from "./default.png";
import { MyContext } from "../../context/myContext";

const Announcements = () => {
  const { announcements } = useContext(MyContext);
  //   const [announcements, setAnnouncements] = useState([]);

  // API dan ma'lumot olish
  //   useEffect(() => {
  //     const fetchAnnouncements = async () => {
  //       try {
  //         const response = await fetch("https://your-api-endpoint.com/announcements"); // API endpointni o'zgartiring
  //         const data = await response.json();
  //         setAnnouncements(data); // Ma'lumotlarni saqlash
  //       } catch (error) {
  //         console.error("E'lonlarni yuklashda xatolik:", error);
  //       }
  //     };

  //     fetchAnnouncements();
  //   }, []);

  // const { ref, inView } = useInView({
  //   threshold: 0.1,
  //   triggerOnce: true,
  // });

  useEffect(() => {
    window.addEventListener("scroll", reveal);
    function reveal() {
      let reveals = document.querySelectorAll(".scroll-fade-effect");

      for (let i = 0; i < reveals.length; i++) {
        let windowheight = window.innerHeight;
        let revealTop = reveals[i].getBoundingClientRect().top;
        let revealpoint = 0;

        if (revealTop < windowheight - revealpoint) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }
  });

  return (
    <div className="pp">
      <div id="announcements">
        <div className="title">
          <h2>E'lonlar</h2>
          <Link to="#">Ko'proq ko'rish</Link>
        </div>
        <div className="announcements-cards">
          {announcements.map((announcement, index) => (
            <Link to="#" key={announcement.id} className="scroll-fade-effect">
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
                  <img
                    src={announcement.authorImg || defaultImg}
                    alt=""
                  />
                  <span>{announcement.author}</span>
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
    </div>
  );
};

export default Announcements;
