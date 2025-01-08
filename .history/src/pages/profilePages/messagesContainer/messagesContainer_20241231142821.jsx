import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileSideBar from "../../../components/profileSideBar/profileSideBar";
import "./likedAnnounces.scss";
import { MyContext } from "../../../context/myContext";
import left from "../../../assets/left.png";
import right from "../../../assets/right.png";
import defaultImg from "../../announcementsPage/default.png";

const MessagesContainer = () => {
  const { announcements } = useContext(MyContext);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    if (currentPage < Math.ceil(announcements.length / usersPerPage))
      setCurrentPage(currentPage + 1);
  };
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentAnnounces = announcements.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const totalPages = Math.ceil(announcements.length / usersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const startUserIndex = indexOfFirstUser + 1;
  const endUserIndex =
    indexOfLastUser < announcements.length
      ? indexOfLastUser
      : announcements.length;


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
    <div className="profile-container">
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
          <Link to="/profile">Shaxsiy kabinet</Link>
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
          <span>E'lonlarim</span>
        </div>
      </div>
      <div className="profile-inner">
        <div className="left">
          <ProfileSideBar />
        </div>
        <div className="right p-relative">
          <div className="page-title">
            <h2>Saqlangan e'lonlar</h2>
          </div>
          <div className="announcements-cards">
            {currentAnnounces.map((announcement, index) => (
              <Link
                to={`${announcement.id}`}
                key={announcement.id}
                className="scroll-fade-effect"
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
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <div className="users-pages-buttons">
                <button onClick={prevPage} disabled={currentPage === 1}>
                  <img src={left} alt="" />
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`pagination-btn ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage ===
                    Math.ceil(announcements.length / usersPerPage)
                  }
                >
                  <img src={right} alt="" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesContainer;
