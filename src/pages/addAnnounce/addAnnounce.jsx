import React from "react";
import { Link } from "react-router-dom"
import "./addAnnounce.scss";

const AddAnnounce = () => {
  return (
    <div id="addAnnounce">
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

        <Link to="/services/1">
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

        <Link to="/add-announce" id="addAnn-link">
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

      <div className="announce-from-container">
        E'lon qo'shish
      </div>
    </div>
  );
};

export default AddAnnounce;
