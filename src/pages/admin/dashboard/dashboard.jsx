import React, { useContext, useState } from "react";
import "./dashboard.scss";
import { NavLink, Link } from "react-router-dom";
import profile from "./profile.png";
import { MyContext } from "../../../context/myContext";
import Logout from "../../../components/logout/logout";
import { formatLink, mediaServerUrl } from "../../../SuperVars";

const Dashboard = () => {
  const {isOpen, setIsOpen, user} = useContext(MyContext);
  const sideBarFunction = () => {
    setIsOpen(!isOpen);
  };
  const [dropdownStates, setDropdownStates] = useState({
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
    menu6: false,
    menu7: false,
  });
  const toggleDropdown = (event, menu) => {
    event.preventDefault();
    setDropdownStates((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };
  return (
    <div id="dashboard">
      <div
        className={`smallBtn ${isOpen ? "close" : ""}`}
        onClick={sideBarFunction}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 14L5 10L9 6M15 14L11 10L15 6"
            stroke="#41A58D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={`side-bar ${isOpen ? "small" : ""}`}>
        <div className={`logo ${isOpen ? "logo-o" : ""}`}>
          <Link to="/">
            {isOpen ? (
              <svg
                width="22"
                height="24"
                viewBox="0 0 22 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.816 20.632C13.48 20.088 13.08 19.504 12.616 18.88C12.168 18.24 11.672 17.608 11.128 16.984C10.6 16.344 10.048 15.736 9.472 15.16C8.896 14.568 8.32 14.048 7.744 13.6V20.632H4V4H7.744V10.288C8.72 9.264 9.696 8.2 10.672 7.096C11.664 5.976 12.584 4.944 13.432 4H17.872C16.736 5.344 15.592 6.64 14.44 7.888C13.304 9.136 12.104 10.392 10.84 11.656C12.168 12.76 13.448 14.072 14.68 15.592C15.928 17.112 17.12 18.792 18.256 20.632H13.816Z"
                  fill="#41A58D"
                />
              </svg>
            ) : (
              <svg
                width="112"
                height="17"
                viewBox="0 0 112 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M111.029 6.408C110.741 6.728 110.349 7.16 109.853 7.704C109.373 8.248 108.853 8.848 108.293 9.504C107.733 10.16 107.165 10.848 106.589 11.568C106.029 12.288 105.517 12.984 105.053 13.656H111.149V16.632H100.709V14.52C101.045 13.944 101.445 13.328 101.909 12.672C102.389 12 102.885 11.328 103.397 10.656C103.925 9.984 104.445 9.336 104.957 8.712C105.469 8.072 105.941 7.496 106.373 6.984H100.997V4.008H111.029V6.408Z"
                  fill="#41A58D"
                />
                <path
                  d="M98.1923 16.2C97.5843 16.376 96.8003 16.536 95.8403 16.68C94.8803 16.84 93.8723 16.92 92.8163 16.92C91.7443 16.92 90.8483 16.776 90.1283 16.488C89.4242 16.2 88.8643 15.8 88.4482 15.288C88.0322 14.76 87.7363 14.136 87.5602 13.416C87.3842 12.696 87.2962 11.904 87.2962 11.04V4.008H90.8723V10.608C90.8723 11.76 91.0243 12.592 91.3283 13.104C91.6323 13.616 92.2002 13.872 93.0322 13.872C93.2882 13.872 93.5602 13.864 93.8483 13.848C94.1363 13.816 94.3923 13.784 94.6162 13.752V4.008H98.1923V16.2Z"
                  fill="#41A58D"
                />
                <path
                  d="M85.014 14.736C85.014 15.456 84.782 16.008 84.318 16.392C83.87 16.76 83.358 16.944 82.782 16.944C82.206 16.944 81.686 16.76 81.222 16.392C80.774 16.008 80.55 15.456 80.55 14.736C80.55 14.016 80.774 13.472 81.222 13.104C81.686 12.72 82.206 12.528 82.782 12.528C83.358 12.528 83.87 12.72 84.318 13.104C84.782 13.472 85.014 14.016 85.014 14.736Z"
                  fill="#41A58D"
                />
                <path
                  d="M73.0684 14.136C73.4204 14.136 73.7564 14.128 74.0764 14.112C74.3964 14.096 74.6524 14.072 74.8444 14.04V11.328C74.7004 11.296 74.4844 11.264 74.1964 11.232C73.9084 11.2 73.6444 11.184 73.4044 11.184C73.0684 11.184 72.7484 11.208 72.4444 11.256C72.1564 11.288 71.9004 11.36 71.6764 11.472C71.4524 11.584 71.2764 11.736 71.1484 11.928C71.0204 12.12 70.9564 12.36 70.9564 12.648C70.9564 13.208 71.1404 13.6 71.5084 13.824C71.8924 14.032 72.4124 14.136 73.0684 14.136ZM72.7804 3.672C73.8364 3.672 74.7164 3.792 75.4204 4.032C76.1244 4.272 76.6844 4.616 77.1004 5.064C77.5324 5.512 77.8364 6.056 78.0124 6.696C78.1884 7.336 78.2764 8.048 78.2764 8.832V16.272C77.7644 16.384 77.0524 16.512 76.1404 16.656C75.2284 16.816 74.1244 16.896 72.8284 16.896C72.0124 16.896 71.2684 16.824 70.5964 16.68C69.9404 16.536 69.3724 16.304 68.8924 15.984C68.4124 15.648 68.0444 15.216 67.7884 14.688C67.5324 14.16 67.4044 13.512 67.4044 12.744C67.4044 12.008 67.5484 11.384 67.8364 10.872C68.1404 10.36 68.5404 9.952 69.0364 9.648C69.5324 9.344 70.1004 9.128 70.7404 9C71.3804 8.856 72.0444 8.784 72.7324 8.784C73.1964 8.784 73.6044 8.808 73.9564 8.856C74.3244 8.888 74.6204 8.936 74.8444 9V8.664C74.8444 8.056 74.6604 7.568 74.2924 7.2C73.9244 6.832 73.2844 6.648 72.3724 6.648C71.7644 6.648 71.1644 6.696 70.5724 6.792C69.9804 6.872 69.4684 6.992 69.0364 7.152L68.5804 4.272C68.7884 4.208 69.0444 4.144 69.3484 4.08C69.6684 4 70.0124 3.936 70.3804 3.888C70.7484 3.824 71.1324 3.776 71.5324 3.744C71.9484 3.696 72.3644 3.672 72.7804 3.672Z"
                  fill="#41A58D"
                />
                <path
                  d="M54.1116 4.44C54.7196 4.264 55.5036 4.104 56.4636 3.96C57.4236 3.8 58.4316 3.72 59.4876 3.72C60.5596 3.72 61.4476 3.864 62.1516 4.152C62.8716 4.424 63.4396 4.816 63.8556 5.328C64.2716 5.84 64.5676 6.448 64.7436 7.152C64.9196 7.856 65.0076 8.64 65.0076 9.504V16.632H61.4316V9.936C61.4316 8.784 61.2796 7.968 60.9756 7.488C60.6716 7.008 60.1036 6.768 59.2716 6.768C59.0156 6.768 58.7436 6.784 58.4556 6.816C58.1676 6.832 57.9116 6.856 57.6876 6.888V16.632H54.1116V4.44Z"
                  fill="#41A58D"
                />
                <path
                  d="M45.6699 14.136C46.0219 14.136 46.3579 14.128 46.6779 14.112C46.9979 14.096 47.2539 14.072 47.4459 14.04V11.328C47.3019 11.296 47.0859 11.264 46.7979 11.232C46.5099 11.2 46.2459 11.184 46.0059 11.184C45.6699 11.184 45.3499 11.208 45.0459 11.256C44.7579 11.288 44.5019 11.36 44.2779 11.472C44.0539 11.584 43.8779 11.736 43.7499 11.928C43.6219 12.12 43.5579 12.36 43.5579 12.648C43.5579 13.208 43.7419 13.6 44.1099 13.824C44.4939 14.032 45.0139 14.136 45.6699 14.136ZM45.3819 3.672C46.4379 3.672 47.3179 3.792 48.0219 4.032C48.7259 4.272 49.2859 4.616 49.7019 5.064C50.1339 5.512 50.4379 6.056 50.6139 6.696C50.7899 7.336 50.8779 8.048 50.8779 8.832V16.272C50.3659 16.384 49.6539 16.512 48.7419 16.656C47.8299 16.816 46.7259 16.896 45.4299 16.896C44.6139 16.896 43.8699 16.824 43.1979 16.68C42.5419 16.536 41.9739 16.304 41.4939 15.984C41.0139 15.648 40.6459 15.216 40.3899 14.688C40.1339 14.16 40.0059 13.512 40.0059 12.744C40.0059 12.008 40.1499 11.384 40.4379 10.872C40.7419 10.36 41.1419 9.952 41.6379 9.648C42.1339 9.344 42.7019 9.128 43.3419 9C43.9819 8.856 44.6459 8.784 45.3339 8.784C45.7979 8.784 46.2059 8.808 46.5579 8.856C46.9259 8.888 47.2219 8.936 47.4459 9V8.664C47.4459 8.056 47.2619 7.568 46.8939 7.2C46.5259 6.832 45.8859 6.648 44.9739 6.648C44.3659 6.648 43.7659 6.696 43.1739 6.792C42.5819 6.872 42.0699 6.992 41.6379 7.152L41.1819 4.272C41.3899 4.208 41.6459 4.144 41.9499 4.08C42.2699 4 42.6139 3.936 42.9819 3.888C43.3499 3.824 43.7339 3.776 44.1339 3.744C44.5499 3.696 44.9659 3.672 45.3819 3.672Z"
                  fill="#41A58D"
                />
                <path
                  d="M32.8215 14.064C33.4775 14.064 33.9415 14 34.2135 13.872C34.4855 13.744 34.6215 13.496 34.6215 13.128C34.6215 12.84 34.4455 12.592 34.0935 12.384C33.7415 12.16 33.2055 11.912 32.4855 11.64C31.9255 11.432 31.4135 11.216 30.9495 10.992C30.5015 10.768 30.1175 10.504 29.7975 10.2C29.4775 9.88 29.2295 9.504 29.0535 9.072C28.8775 8.64 28.7895 8.12 28.7895 7.512C28.7895 6.328 29.2295 5.392 30.1095 4.704C30.9895 4.016 32.1975 3.672 33.7335 3.672C34.5015 3.672 35.2375 3.744 35.9415 3.888C36.6455 4.016 37.2055 4.16 37.6215 4.32L36.9975 7.104C36.5815 6.96 36.1255 6.832 35.6295 6.72C35.1495 6.608 34.6055 6.552 33.9975 6.552C32.8775 6.552 32.3175 6.864 32.3175 7.488C32.3175 7.632 32.3415 7.76 32.3895 7.872C32.4375 7.984 32.5335 8.096 32.6775 8.208C32.8215 8.304 33.0135 8.416 33.2535 8.544C33.5095 8.656 33.8295 8.784 34.2135 8.928C34.9975 9.216 35.6455 9.504 36.1575 9.792C36.6695 10.064 37.0695 10.368 37.3575 10.704C37.6615 11.024 37.8695 11.384 37.9815 11.784C38.1095 12.184 38.1735 12.648 38.1735 13.176C38.1735 14.424 37.7015 15.368 36.7575 16.008C35.8295 16.648 34.5095 16.968 32.7975 16.968C31.6775 16.968 30.7415 16.872 29.9895 16.68C29.2535 16.488 28.7415 16.328 28.4535 16.2L29.0535 13.296C29.6615 13.536 30.2855 13.728 30.9255 13.872C31.5655 14 32.1975 14.064 32.8215 14.064Z"
                  fill="#41A58D"
                />
                <path
                  d="M20.7559 14.136C21.1079 14.136 21.4439 14.128 21.7639 14.112C22.0839 14.096 22.3399 14.072 22.5319 14.04V11.328C22.3879 11.296 22.1719 11.264 21.8839 11.232C21.5959 11.2 21.3319 11.184 21.0919 11.184C20.7559 11.184 20.4359 11.208 20.1319 11.256C19.8439 11.288 19.5879 11.36 19.3639 11.472C19.1399 11.584 18.9639 11.736 18.8359 11.928C18.7079 12.12 18.6439 12.36 18.6439 12.648C18.6439 13.208 18.8279 13.6 19.1959 13.824C19.5799 14.032 20.0999 14.136 20.7559 14.136ZM20.4679 3.672C21.5239 3.672 22.4039 3.792 23.1079 4.032C23.8119 4.272 24.3719 4.616 24.7879 5.064C25.2199 5.512 25.5239 6.056 25.6999 6.696C25.8759 7.336 25.9639 8.048 25.9639 8.832V16.272C25.4519 16.384 24.7399 16.512 23.8279 16.656C22.9159 16.816 21.8119 16.896 20.5159 16.896C19.6999 16.896 18.9559 16.824 18.2839 16.68C17.6279 16.536 17.0599 16.304 16.5799 15.984C16.0999 15.648 15.7319 15.216 15.4759 14.688C15.2199 14.16 15.0919 13.512 15.0919 12.744C15.0919 12.008 15.2359 11.384 15.5239 10.872C15.8279 10.36 16.2279 9.952 16.7239 9.648C17.2199 9.344 17.7879 9.128 18.4279 9C19.0679 8.856 19.7319 8.784 20.4199 8.784C20.8839 8.784 21.2919 8.808 21.6439 8.856C22.0119 8.888 22.3079 8.936 22.5319 9V8.664C22.5319 8.056 22.3479 7.568 21.9799 7.2C21.6119 6.832 20.9719 6.648 20.0599 6.648C19.4519 6.648 18.8519 6.696 18.2599 6.792C17.6679 6.872 17.1559 6.992 16.7239 7.152L16.2679 4.272C16.4759 4.208 16.7319 4.144 17.0359 4.08C17.3559 4 17.6999 3.936 18.0679 3.888C18.4359 3.824 18.8199 3.776 19.2199 3.744C19.6359 3.696 20.0519 3.672 20.4679 3.672Z"
                  fill="#41A58D"
                />
                <path
                  d="M9.816 16.632C9.48 16.088 9.08 15.504 8.616 14.88C8.168 14.24 7.672 13.608 7.128 12.984C6.6 12.344 6.048 11.736 5.472 11.16C4.896 10.568 4.32 10.048 3.744 9.6V16.632H0V0H3.744V6.288C4.72 5.264 5.696 4.2 6.672 3.096C7.664 1.976 8.584 0.944 9.432 0H13.872C12.736 1.344 11.592 2.64 10.44 3.888C9.304 5.136 8.104 6.392 6.84 7.656C8.168 8.76 9.448 10.072 10.68 11.592C11.928 13.112 13.12 14.792 14.256 16.632H9.816Z"
                  fill="#41A58D"
                />
              </svg>
            )}
          </Link>
        </div>
        <div className="side-bar-items">
          <p className={`${isOpen ? "none" : ""}`}>Asosiy</p>
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <div className="item-left-side ">
                  <svg
                    className="asdasda"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.40039 8.24418C1.40039 7.85016 1.60094 7.4805 1.9386 7.25215L10.2586 1.62564C10.7027 1.32531 11.2981 1.32531 11.7422 1.62564L20.0622 7.25216C20.3998 7.4805 20.6004 7.85016 20.6004 8.24418V18.7745C20.6004 19.7829 19.7408 20.6004 18.6804 20.6004H3.32039C2.26 20.6004 1.40039 19.7829 1.40039 18.7745V8.24418Z"
                      stroke="#41A58D"
                      strokeWidth="2"
                    />
                    <path
                      d="M13.4004 12.2004C13.4004 13.5259 12.3259 14.6004 11.0004 14.6004C9.67491 14.6004 8.60039 13.5259 8.60039 12.2004C8.60039 10.8749 9.67491 9.80039 11.0004 9.80039C12.3259 9.80039 13.4004 10.8749 13.4004 12.2004Z"
                      stroke="#41A58D"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>Dashboard</span>
                  <div className="notification active"></div>
                </div>
                <div className="item-right-side arrow-none">
                  <svg
                    width="6"
                    height="10"
                    viewBox="0 0 6 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L1 9"
                      stroke="#767676"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="u"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={(event) => toggleDropdown(event, "menu2")}
              >
                <div className="item-inner">
                  <div className="item-left-side">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.2373 19.5C4.56272 17.2892 7.46759 15.7762 11.9996 15.7762C16.5316 15.7762 19.4364 17.2892 20.7619 19.5M15.5996 8.1C15.5996 10.0882 13.9878 11.7 11.9996 11.7C10.0114 11.7 8.39958 10.0882 8.39958 8.1C8.39958 6.11177 10.0114 4.5 11.9996 4.5C13.9878 4.5 15.5996 6.11177 15.5996 8.1Z"
                        stroke="#757575"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>Foydalanuvchilar</span>
                    <div className="notification"></div>
                  </div>
                  <div className="item-right-side">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L1 9"
                        stroke="#767676"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </NavLink>

              {dropdownStates.menu2 && (
                <div className="item-dropdown open">
                  <NavLink to="/dashboard/admin/users">Foydalanuvchilar</NavLink>
                  <NavLink to="/dashboard/admin/homemakers">Kasanachilar</NavLink>
                  <NavLink to="/dashboard/admin/admins">Adminlar</NavLink>
                  <NavLink to="/dashboard/admin/moderators">Moderator</NavLink>
                </div>
              )}
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/jobs"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <div className="item-inner">
                  <div className="item-left-side">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_925_10013)">
                        <path
                          d="M19 4H17.899C17.434 1.721 15.414 0 13 0H11C8.586 0 6.565 1.721 6.101 4H5C2.243 4 0 6.243 0 9V19C0 21.757 2.243 24 5 24H19C21.757 24 24 21.757 24 19V9C24 6.243 21.757 4 19 4ZM11 2H13C14.304 2 15.415 2.836 15.828 4H8.172C8.585 2.836 9.696 2 11 2ZM22 19C22 20.654 20.654 22 19 22H18V9C18 8.447 17.553 8 17 8C16.447 8 16 8.447 16 9V22H8V9C8 8.447 7.552 8 7 8C6.448 8 6 8.447 6 9V22H5C3.346 22 2 20.654 2 19V9C2 7.346 3.346 6 5 6H19C20.654 6 22 7.346 22 9V19Z"
                          fill="#767676"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_925_10013">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span>Kasblar</span>
                    <div className="notification"></div>
                  </div>
                  <div className="item-right-side arrow-none">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L1 9"
                        stroke="#767676"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="p"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={(event) => toggleDropdown(event, "menu3")}
              >
                <div className="item-inner">
                  <div className="item-left-side">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.5326 7.20039H2.46822M15 10.5004C12.6569 10.5004 9 10.5004 9 10.5004M21.6004 7.76695V19.2004C21.6004 20.5259 20.5259 21.6004 19.2004 21.6004H4.80039C3.47491 21.6004 2.40039 20.5259 2.40039 19.2004V7.76695C2.40039 7.39437 2.48714 7.02689 2.65377 6.69364L4.30288 3.39541C4.60779 2.78559 5.23106 2.40039 5.91285 2.40039H18.0879C18.7697 2.40039 19.393 2.78559 19.6979 3.39541L21.347 6.69364C21.5136 7.02689 21.6004 7.39437 21.6004 7.76695Z"
                        stroke="#767676"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Mahsulotlar</span>
                    <div className="notification"></div>
                  </div>
                  <div className="item-right-side ">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L1 9"
                        stroke="#767676"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </NavLink>
              {dropdownStates.menu3 && (
                <div className="item-dropdown open">
                  <NavLink to="/dashboard/admin/products">Mahsulotlar</NavLink>
                  <NavLink to="/dashboard/admin/categories">Kategoriyalar</NavLink>
                  {/* <NavLink to="/dashboard/admin/subcategories">Subkategoriyalar</NavLink> */}
                  {/* <NavLink to="/dashboard/admin/hashtags">Heshteglar</NavLink> */}
                </div>
              )}
            </li>
            <li>
              <NavLink
                to="c"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={(event) => toggleDropdown(event, "menu4")}
              >
                <div className="item-inner">
                  <div className="item-left-side">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_925_10034)">
                        <path
                          d="M17.846 14.217L13.453 12.325C12.516 11.922 11.441 11.922 10.505 12.327L6.14 14.217C5.417 14.53 4.968 15.214 4.967 16.001C4.966 16.788 5.414 17.473 6.135 17.788L8 18.602V21.194C8 22.168 8.57 23.06 9.454 23.467C10.223 23.821 11.079 24 12 24C12.921 24 13.777 23.82 14.548 23.467C15.43 23.06 16 22.167 16 21.194V18.594L17 18.16V21.001C17 21.554 17.447 22.001 18 22.001C18.553 22.001 19 21.554 19 21.001C19 21.001 19 16.054 19 16.001C19 15.224 18.559 14.523 17.846 14.218V14.217ZM11.3 14.163C11.732 13.975 12.23 13.975 12.662 14.161L17.012 15.938C17.012 15.952 17.005 15.963 17.004 15.977L12.669 17.86C12.233 18.049 11.733 18.049 11.297 17.858L6.934 16.053L11.299 14.163H11.3ZM14 21.193C14 21.392 13.889 21.568 13.711 21.65C12.701 22.113 11.298 22.113 10.29 21.65C10.111 21.568 10 21.392 10 21.193V19.474L10.498 19.691C10.971 19.897 11.478 20 11.986 20C12.491 20 12.996 19.898 13.467 19.693L14 19.461V21.193ZM7 4.5C7 5.328 6.328 6 5.5 6C4.672 6 4 5.328 4 4.5C4 3.672 4.672 3 5.5 3C6.328 3 7 3.672 7 4.5ZM11 4.5C11 5.328 10.328 6 9.5 6C8.672 6 8 5.328 8 4.5C8 3.672 8.672 3 9.5 3C10.328 3 11 3.672 11 4.5ZM19 0H5C2.243 0 0 2.243 0 5V17C0 19.757 2.243 22 5 22C5.552 22 6 21.553 6 21C6 20.447 5.552 20 5 20C3.346 20 2 18.654 2 17V9H22V17C22 17.731 21.734 18.436 21.251 18.983C20.886 19.397 20.925 20.029 21.34 20.394C21.752 20.759 22.385 20.721 22.751 20.305C23.557 19.393 24 18.218 24 16.999V5C24 2.243 21.757 0 19 0ZM2 7V5C2 3.346 3.346 2 5 2H19C20.654 2 22 3.346 22 5V7H2Z"
                          fill="#757575"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_925_10034">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <span>Kurslar</span>
                    <div className="notification"></div>
                  </div>
                  <div className="item-right-side ">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L1 9"
                        stroke="#767676"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </NavLink>
              {dropdownStates.menu4 && (
                <div className="item-dropdown open">
                  <NavLink to="/dashboard/admin/teachers">O'qituvchilar</NavLink>
                  <NavLink to="/dashboard/admin/pupils">O'quvchilar</NavLink>
                  <NavLink to="/dashboard/admin/courses">Kurslar</NavLink>
                </div>
              )}
            </li>
            {/* <li>
              <NavLink
                to="a"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={(event) => toggleDropdown(event, "menu5")}
              >
                <div className="item-inner">
                  <div className="item-left-side">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_925_10046)">
                        <path
                          d="M7 11C9.757 11 12 8.757 12 6C12 3.243 9.757 1 7 1C4.243 1 2 3.243 2 6C2 8.757 4.243 11 7 11ZM7 3C8.654 3 10 4.346 10 6C10 7.654 8.654 9 7 9C5.346 9 4 7.654 4 6C4 4.346 5.346 3 7 3ZM11.88 17.802C11.96 18.196 12 18.598 12 19V23C12 23.553 11.552 24 11 24C10.448 24 10 23.553 10 23V19C10 18.731 9.973 18.461 9.92 18.198C9.81 17.657 10.16 17.13 10.702 17.019C11.243 16.911 11.771 17.26 11.88 17.802ZM23 3.592V1C23 0.735 22.895 0.48 22.707 0.293C22.519 0.106 22.265 0 22 0C21.449 0 21.028 0.295 20.905 0.724C20.669 1.547 19.992 2 19 2H17C15.346 2 14 3.346 14 5C14 5.695 14.247 6.327 14.645 6.836L16.418 10.948L14.744 12.693C14.556 12.888 14.293 13.001 14.022 13.001H6C2.691 13.001 0 15.692 0 19.001V23.001C0 23.554 0.448 24.001 1 24.001C1.552 24.001 2 23.554 2 23.001V19.001C2 16.795 3.794 15.001 6 15.001H14.022C14.834 15.001 15.623 14.665 16.187 14.078C16.187 14.078 18.272 11.895 18.524 11.643C18.776 11.391 19.005 10.935 18.996 10.703C19.015 10.472 18.976 10.237 18.879 10.017L18.089 8.001H19.001C19.993 8.001 20.67 8.454 20.906 9.277C21.029 9.706 21.424 10.001 22 10.001C22.552 10.001 23 9.553 23 9.001V6.409C23.581 6.202 24.001 5.652 24.001 5.001C24.001 4.35 23.582 3.8 23.001 3.593L23 3.592ZM21 6.464C20.421 6.163 19.743 6 19 6H17C16.449 6 16 5.551 16 5C16 4.449 16.449 4 17 4H19C19.743 4 20.421 3.837 21 3.536V6.464Z"
                          fill="#757575"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_925_10046">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <span>E’lonlar</span>
                    <div className="notification active"></div>
                  </div>
                  <div className="item-right-side ">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L1 9"
                        stroke="#767676"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </NavLink>
              {dropdownStates.menu5 && (
                <div className="item-dropdown open">
                  <NavLink to="/dashboard/admin/work-announces">Ish e'lonlari</NavLink>
                  <NavLink to="/dashboard/admin/service-announces">Xizmat e'lonlari</NavLink>
                </div>
              )}
            </li> */}
            <li>
              <NavLink
                to="n"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={(event) => toggleDropdown(event,"menu6")}
              >
                <div className="item-inner">
                  <div className="item-left-side">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_925_10056)">
                        <path
                          d="M19 0H10C7.243 0 5 2.243 5 5V6H4.5C2.019 6 0 8.019 0 10.5V20.5C0 22.429 1.569 23.999 3.499 24H19C21.757 24 24 21.757 24 19V5C24 2.243 21.757 0 19 0ZM5 20.5C5 21.327 4.327 22 3.5 22C2.673 22 2 21.327 2 20.5V10.5C2 9.122 3.122 8 4.5 8H5V20.5ZM22 19C22 20.654 20.654 22 19 22H6.662C6.878 21.545 7 21.037 7 20.5V5C7 3.346 8.346 2 10 2H19C20.654 2 22 3.346 22 5V19ZM20 7C20 7.552 19.552 8 19 8H16C15.448 8 15 7.552 15 7C15 6.448 15.448 6 16 6H19C19.552 6 20 6.448 20 7ZM20 11C20 11.552 19.552 12 19 12H10C9.448 12 9 11.552 9 11C9 10.448 9.448 10 10 10H19C19.552 10 20 10.448 20 11ZM20 15C20 15.552 19.552 16 19 16H10C9.448 16 9 15.552 9 15C9 14.448 9.448 14 10 14H19C19.552 14 20 14.448 20 15ZM20 19C20 19.552 19.552 20 19 20H10C9.448 20 9 19.552 9 19C9 18.448 9.448 18 10 18H19C19.552 18 20 18.448 20 19ZM9 7V5C9 4.448 9.448 4 10 4H12C12.552 4 13 4.448 13 5V7C13 7.552 12.552 8 12 8H10C9.448 8 9 7.552 9 7Z"
                          fill="#757575"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_925_10056">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <span>Yangiliklar</span>
                    <div className="notification"></div>
                  </div>
                  <div className="item-right-side ">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L1 9"
                        stroke="#767676"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </NavLink>
              {dropdownStates.menu6 && (
                <div className="item-dropdown open">
                  <NavLink to="/dashboard/admin/admin-news">Yangiliklar</NavLink>
                  <NavLink to="/dashboard/admin/admin-news-categories">Kategoriyalar</NavLink>
                </div>
              )}
            </li>
            <li>
              <NavLink
                to="statics"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <div className="item-inner">
                  <div className="item-left-side">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_925_10065)">
                        <path
                          d="M23.707 23.707C23.512 23.902 23.256 24 23 24C22.744 24 22.488 23.902 22.293 23.707L16.324 17.738C14.599 19.15 12.397 20 10 20C4.486 20 0 15.514 0 9.99996C0 4.48596 4.486 -4.34527e-05 10 -4.34527e-05C11.758 -4.34527e-05 13.487 0.462957 15.001 1.33796C15.479 1.61496 15.643 2.22696 15.365 2.70496C15.18 3.02496 14.844 3.20396 14.499 3.20396C14.329 3.20396 14.157 3.16096 13.999 3.06996C12.79 2.36996 11.407 1.99996 10 1.99996C5.589 1.99996 2 5.58896 2 9.99996C2 11.167 2.257 12.274 2.709 13.274L6.508 8.71496C6.87 8.27896 7.404 8.01496 7.97 7.98896C8.532 7.96396 9.092 8.17696 9.494 8.57996L11.422 10.508L20.237 0.339957C20.599 -0.0790434 21.231 -0.122043 21.647 0.236957C22.065 0.597957 22.112 1.22996 21.751 1.64796L12.971 11.814C12.605 12.238 12.074 12.493 11.513 12.514C10.956 12.528 10.405 12.319 10.008 11.922L8.08 9.99396L3.817 15.069C5.285 16.857 7.512 17.999 10 17.999C14.411 17.999 18 14.41 18 9.99896C18 9.84896 17.995 9.69996 17.987 9.55196C17.958 8.99996 18.382 8.52996 18.933 8.49996C19.48 8.45996 19.955 8.89396 19.985 9.44496C19.995 9.62796 20 9.81296 20 9.99796C20 12.396 19.15 14.598 17.738 16.322L23.707 22.291C24.098 22.682 24.098 23.314 23.707 23.705V23.707Z"
                          fill="#757575"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_925_10065">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <span>Statistika</span>
                    <div className="notification"></div>
                  </div>
                  <div className="item-right-side arrow-none">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L1 9"
                        stroke="#767676"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="e"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => toggleDropdown("menu7")}
              >
                <div className="item-inner">
                  <div className="item-left-side">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.0004 13V7C11.0004 6.45 11.4504 6 12.0004 6C12.5504 6 13.0004 6.45 13.0004 7V13C13.0004 13.55 12.5504 14 12.0004 14C11.4504 14 11.0004 13.55 11.0004 13ZM12.0004 15C11.1704 15 10.5004 15.67 10.5004 16.5C10.5004 17.33 11.1704 18 12.0004 18C12.8304 18 13.5004 17.33 13.5004 16.5C13.5004 15.67 12.8304 15 12.0004 15ZM23.5804 19.88C22.8804 21.23 21.4104 22 19.5704 22H4.44039C2.59039 22 1.13039 21.23 0.430393 19.88C-0.279607 18.52 -0.0796075 16.78 0.930393 15.32L8.97039 2.6C9.68039 1.58 10.8004 1 12.0004 1C13.2004 1 14.3204 1.58 15.0004 2.57L23.0804 15.34C24.0904 16.8 24.2804 18.53 23.5704 19.88H23.5804ZM21.4304 16.46C21.4304 16.46 21.4104 16.44 21.4104 16.42L13.3404 3.67C13.0504 3.26 12.5504 3 12.0004 3C11.4504 3 10.9504 3.26 10.6404 3.71L2.59039 16.42C1.97039 17.3 1.83039 18.26 2.19039 18.95C2.54039 19.63 3.34039 20 4.43039 20H19.5504C20.6404 20 21.4404 19.63 21.7904 18.95C22.1504 18.26 22.0104 17.3 21.4204 16.46H21.4304Z"
                        fill="#757575"
                      />
                    </svg>

                    <span>E’tirozlar</span>
                    <div className="notification active"></div>
                  </div>
                  <div className="item-right-side">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L1 9"
                        stroke="#767676"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </NavLink>
              {dropdownStates.menu7 && (
                <div className="item-dropdown open">
                  <NavLink to="users-item">Foydalanuvchilar</NavLink>
                  <NavLink to="users-item">Kasanachilar</NavLink>
                  <NavLink to="users-item">Adminlar</NavLink>
                  <NavLink to="users-item">Moderator</NavLink>
                </div>
              )}
            </li> */}
          </ul>
          <p className={`other-p ${isOpen ? "none" : ""}`}>Boshqalar</p>
          <ul id="sd">
            <li>
              <NavLink
                to="notifications"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <div className="item-inner">
                  <div className="item-left-side">
                    <svg
                      width="20"
                      height="22"
                      viewBox="0 0 20 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 19.6307C7.79613 20.2337 8.84747 20.6004 10 20.6004C11.1525 20.6004 12.2039 20.2337 13 19.6307M1.57109 16.5276C1.09677 16.5276 0.831858 15.8211 1.11877 15.4286C1.78453 14.5178 2.42712 13.1819 2.42712 11.5732L2.45458 9.24216C2.45458 4.91127 5.83278 1.40039 10 1.40039C14.2286 1.40039 17.6566 4.96299 17.6566 9.35767L17.6291 11.5732C17.6291 13.1929 18.2495 14.5361 18.8882 15.4473C19.164 15.8408 18.8984 16.5276 18.43 16.5276H1.57109Z"
                        stroke="#757575"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span>Xabarnomalar</span>
                  </div>
                  <div className="notification"></div>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/messaging/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <div className="item-inner">
                  <div className="item-left-side">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.39941 8.40039H15.5994M8.39941 13.2004H12.5994M21.5994 12.0004C21.5994 13.3804 21.3082 14.6924 20.7839 15.8783L21.6012 21.5995L16.6983 20.3737C15.3094 21.1549 13.7064 21.6004 11.9994 21.6004C6.69748 21.6004 2.39941 17.3023 2.39941 12.0004C2.39941 6.69846 6.69748 2.40039 11.9994 2.40039C17.3013 2.40039 21.5994 6.69846 21.5994 12.0004Z"
                        stroke="#757575"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span>Xabarlar</span>
                  </div>
                  <div className="notification active"></div>
                </div>
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="settings"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <div className="item-inner">
                  <div className="item-left-side">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_925_10103)">
                        <path
                          d="M1 4.75026H3.736C3.95064 5.53999 4.41917 6.23715 5.06933 6.73419C5.71948 7.23123 6.51512 7.50052 7.3335 7.50052C8.15188 7.50052 8.94752 7.23123 9.59767 6.73419C10.2478 6.23715 10.7164 5.53999 10.931 4.75026H23C23.2652 4.75026 23.5196 4.6449 23.7071 4.45737C23.8946 4.26983 24 4.01548 24 3.75026C24 3.48504 23.8946 3.23069 23.7071 3.04315C23.5196 2.85562 23.2652 2.75026 23 2.75026H10.931C10.7164 1.96053 10.2478 1.26336 9.59767 0.766328C8.94752 0.269291 8.15188 0 7.3335 0C6.51512 0 5.71948 0.269291 5.06933 0.766328C4.41917 1.26336 3.95064 1.96053 3.736 2.75026H1C0.734784 2.75026 0.48043 2.85562 0.292893 3.04315C0.105357 3.23069 0 3.48504 0 3.75026C0 4.01548 0.105357 4.26983 0.292893 4.45737C0.48043 4.6449 0.734784 4.75026 1 4.75026ZM7.333 2.00026C7.67912 2.00026 8.01746 2.10289 8.30525 2.29519C8.59303 2.48748 8.81734 2.76079 8.94979 3.08056C9.08224 3.40033 9.1169 3.7522 9.04937 4.09167C8.98185 4.43113 8.81518 4.74295 8.57044 4.9877C8.3257 5.23244 8.01388 5.39911 7.67441 5.46663C7.33494 5.53416 6.98307 5.4995 6.6633 5.36705C6.34353 5.23459 6.07022 5.01029 5.87793 4.72251C5.68564 4.43472 5.583 4.09638 5.583 3.75026C5.58353 3.28629 5.76807 2.84148 6.09615 2.51341C6.42422 2.18533 6.86903 2.00079 7.333 2.00026Z"
                          fill="#757575"
                        />
                        <path
                          d="M23 10.9993H20.264C20.0497 10.2094 19.5814 9.51195 18.9313 9.01471C18.2812 8.51747 17.4855 8.24805 16.667 8.24805C15.8485 8.24805 15.0528 8.51747 14.4027 9.01471C13.7526 9.51195 13.2843 10.2094 13.07 10.9993H1C0.734784 10.9993 0.48043 11.1046 0.292893 11.2922C0.105357 11.4797 0 11.7341 0 11.9993C0 12.2645 0.105357 12.5189 0.292893 12.7064C0.48043 12.8939 0.734784 12.9993 1 12.9993H13.07C13.2843 13.7892 13.7526 14.4866 14.4027 14.9839C15.0528 15.4811 15.8485 15.7505 16.667 15.7505C17.4855 15.7505 18.2812 15.4811 18.9313 14.9839C19.5814 14.4866 20.0497 13.7892 20.264 12.9993H23C23.2652 12.9993 23.5196 12.8939 23.7071 12.7064C23.8946 12.5189 24 12.2645 24 11.9993C24 11.7341 23.8946 11.4797 23.7071 11.2922C23.5196 11.1046 23.2652 10.9993 23 10.9993ZM16.667 13.7493C16.3209 13.7493 15.9825 13.6466 15.6948 13.4544C15.407 13.2621 15.1827 12.9887 15.0502 12.669C14.9178 12.3492 14.8831 11.9973 14.9506 11.6579C15.0181 11.3184 15.1848 11.0066 15.4296 10.7618C15.6743 10.5171 15.9861 10.3504 16.3256 10.2829C16.6651 10.2154 17.0169 10.25 17.3367 10.3825C17.6565 10.5149 17.9298 10.7392 18.1221 11.027C18.3144 11.3148 18.417 11.6532 18.417 11.9993C18.4165 12.4632 18.2319 12.9081 17.9039 13.2361C17.5758 13.5642 17.131 13.7488 16.667 13.7493Z"
                          fill="#757575"
                        />
                        <path
                          d="M23 19.2503H10.931C10.7164 18.4605 10.2478 17.7634 9.59767 17.2663C8.94752 16.7693 8.15188 16.5 7.3335 16.5C6.51512 16.5 5.71948 16.7693 5.06933 17.2663C4.41917 17.7634 3.95064 18.4605 3.736 19.2503H1C0.734784 19.2503 0.48043 19.3556 0.292893 19.5432C0.105357 19.7307 0 19.985 0 20.2503C0 20.5155 0.105357 20.7698 0.292893 20.9574C0.48043 21.1449 0.734784 21.2503 1 21.2503H3.736C3.95064 22.04 4.41917 22.7372 5.06933 23.2342C5.71948 23.7312 6.51512 24.0005 7.3335 24.0005C8.15188 24.0005 8.94752 23.7312 9.59767 23.2342C10.2478 22.7372 10.7164 22.04 10.931 21.2503H23C23.2652 21.2503 23.5196 21.1449 23.7071 20.9574C23.8946 20.7698 24 20.5155 24 20.2503C24 19.985 23.8946 19.7307 23.7071 19.5432C23.5196 19.3556 23.2652 19.2503 23 19.2503ZM7.333 22.0003C6.98688 22.0003 6.64854 21.8976 6.36075 21.7053C6.07297 21.513 5.84866 21.2397 5.71621 20.92C5.58376 20.6002 5.5491 20.2483 5.61663 19.9089C5.68415 19.5694 5.85082 19.2576 6.09556 19.0128C6.3403 18.7681 6.65213 18.6014 6.99159 18.5339C7.33106 18.4664 7.68293 18.501 8.0027 18.6335C8.32247 18.7659 8.59578 18.9902 8.78807 19.278C8.98036 19.5658 9.083 19.9041 9.083 20.2503C9.08221 20.7141 8.89758 21.1588 8.56956 21.4868C8.24154 21.8148 7.79689 21.9995 7.333 22.0003Z"
                          fill="#757575"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_925_10103">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <span>Sozlamalar</span>
                  </div>
                  <div className="item-right-side arrow-none">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L1 9"
                        stroke="#767676"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </NavLink>
            </li> */}
            <p className={`ending ${isOpen ? "none" : ""}`}>
              <span>Kasana.uz</span> jamoasi
            </p>
            <p className={`ending ${isOpen ? "none" : ""}`}>
              © 2024 Barcha huquqlar himoyalangan
            </p>
          </ul>
        </div>
      </div>
      <div className={`side-bar-item ${isOpen ? "side-bar-item-width" : ""}`}>
        <div className="top">
          <Logout />
          <div className="profile">
            <Link to="#">
              <img src={`${mediaServerUrl}users${formatLink(user.pfp)}`} alt="" />
              <div className="for-status"></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
