import React, { useContext, useState } from "react";
import "./admin-hashtags.scss";
import { MyContext } from "../../../context/myContext";
import { Link } from "react-router-dom";
import Dashboard from "../dashboard/dashboard";

const AdminHashtags = () => {
  const { isOpen, setIsOpen } = useContext(MyContext);

  return (
    <div id="admin-hashtags">
      <Dashboard />
      <div className={`admin-item ${isOpen ? "wd" : ""}`}>
        <h2 className="title">Heshteglar</h2>
        <div className="hashtags-list">
          <div className="hashtags">
            <Link to="#">
              #Heshteg{" "}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.59961 3.59922H14.3996M6.39961 11.5992V6.79922M9.59961 11.5992V6.79922M11.1996 14.7992H4.79961C3.91595 14.7992 3.19961 14.0829 3.19961 13.1992V4.39922C3.19961 3.95739 3.55778 3.59922 3.99961 3.59922H11.9996C12.4414 3.59922 12.7996 3.95739 12.7996 4.39922V13.1992C12.7996 14.0829 12.0833 14.7992 11.1996 14.7992ZM6.39961 3.59922H9.59961C10.0414 3.59922 10.3996 3.24105 10.3996 2.79922V1.99922C10.3996 1.55739 10.0414 1.19922 9.59961 1.19922H6.39961C5.95778 1.19922 5.59961 1.55739 5.59961 1.99922V2.79922C5.59961 3.24105 5.95778 3.59922 6.39961 3.59922Z"
                  stroke="#5A5A5A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>
          </div>
          <p>Heshteg</p>
          <form action="">
            <div className="input-btn">
              <svg
                className="input-svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1158_7991)">
                  <path
                    d="M8 0H5C2.243 0 0 2.243 0 5V8C0 9.103 0.897 10 2 10H8C9.103 10 10 9.103 10 8V2C10 0.897 9.103 0 8 0ZM2 8V5C2 3.346 3.346 2 5 2H8V8H2ZM14 10H20C21.103 10 22 9.103 22 8V5C22 2.243 19.757 0 17 0H14C12.897 0 12 0.897 12 2V8C12 9.103 12.897 10 14 10ZM14 2H17C18.654 2 20 3.346 20 5V8H14V2ZM8 12H2C0.897 12 0 12.897 0 14V17C0 19.757 2.243 22 5 22H8C9.103 22 10 21.103 10 20V14C10 12.897 9.103 12 8 12ZM5 20C3.346 20 2 18.654 2 17V14H8V20H5ZM23.707 22.293L21.167 19.753C21.691 18.962 22 18.017 22 17C22 14.243 19.757 12 17 12C14.243 12 12 14.243 12 17C12 19.757 14.243 22 17 22C18.017 22 18.962 21.691 19.753 21.167L22.293 23.707C22.488 23.902 22.744 24 23 24C23.256 24 23.512 23.902 23.707 23.707C24.098 23.316 24.098 22.684 23.707 22.293ZM14 17C14 15.346 15.346 14 17 14C18.654 14 20 15.346 20 17C20 18.654 18.654 20 17 20C15.346 20 14 18.654 14 17Z"
                    fill="#B2B2B2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1158_7991">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <input type="text" placeholder="Nomini kiriting" required/>
              <button type="submit">
                Qo'shish
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1158_2394)">
                    <path
                      d="M11.167 14V12.6667C11.167 11.9594 10.886 11.2811 10.3859 10.781C9.88585 10.281 9.20757 10 8.50033 10H3.83366C3.12641 10 2.44814 10.281 1.94804 10.781C1.44794 11.2811 1.16699 11.9594 1.16699 12.6667V14M13.8337 5.33333V9.33333M15.8337 7.33333H11.8337M8.83366 4.66667C8.83366 6.13943 7.63975 7.33333 6.16699 7.33333C4.69423 7.33333 3.50033 6.13943 3.50033 4.66667C3.50033 3.19391 4.69423 2 6.16699 2C7.63975 2 8.83366 3.19391 8.83366 4.66667Z"
                      stroke="#E7F4F1"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1158_2394">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminHashtags;
