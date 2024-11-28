import React, { useState, useEffect } from "react";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest(".dropdown")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setScrolled(true); // Agar pastga 1px yoki undan ko'p harakatlansa
      } else {
        setScrolled(false); // Agar yuqoriga qaytsa
      }
    };

    document.addEventListener("click", closeDropdown);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", closeDropdown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [selectedMenu, setSelectedMenu] = useState(null);

  const [help, setHelp] = useState(false);

  return (
    <div className={`tyu ${scrolled ? "scrolled" : ""}`}>
      <header className="header">
        <div className="top-side">
          <ul className="top-left">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Bosh sahifa
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about-project"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Loyiha haqida
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/partners"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Hamkorlarimiz
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Loyihalar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="contacts"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Kontaktlar
              </NavLink>
            </li>
          </ul>
          <div className="top-right">
            <ul>
              <li>
                <NavLink
                  style={{ display: "flex", gap: "8px" }}
                  to="/eye"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_470_8726)">
                      <path
                        d="M0.667969 7.99996C0.667969 7.99996 3.33464 2.66663 8.0013 2.66663C12.668 2.66663 15.3346 7.99996 15.3346 7.99996C15.3346 7.99996 12.668 13.3333 8.0013 13.3333C3.33464 13.3333 0.667969 7.99996 0.667969 7.99996Z"
                        stroke="#757575"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.0013 9.99996C9.10587 9.99996 10.0013 9.10453 10.0013 7.99996C10.0013 6.89539 9.10587 5.99996 8.0013 5.99996C6.89673 5.99996 6.0013 6.89539 6.0013 7.99996C6.0013 9.10453 6.89673 9.99996 8.0013 9.99996Z"
                        stroke="#757575"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_470_8726">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_470_8728)">
                      <path
                        d="M5.33464 12L0.667969 14.6667V4.00004L5.33464 1.33337M5.33464 12L10.668 14.6667M5.33464 12V1.33337M10.668 14.6667L15.3346 12V1.33337L10.668 4.00004M10.668 14.6667V4.00004M10.668 4.00004L5.33464 1.33337"
                        stroke="#757575"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_470_8728">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </NavLink>
              </li>
              <li className="dropdown">
                <NavLink to="#" onClick={toggleDropDown}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_470_8731)">
                      <path
                        d="M14.6654 8.00004C14.6654 11.6819 11.6806 14.6667 7.9987 14.6667M14.6654 8.00004C14.6654 4.31814 11.6806 1.33337 7.9987 1.33337M14.6654 8.00004H1.33203M7.9987 14.6667C4.3168 14.6667 1.33203 11.6819 1.33203 8.00004M7.9987 14.6667C9.66622 12.8411 10.6139 10.472 10.6654 8.00004C10.6139 5.52806 9.66622 3.15894 7.9987 1.33337M7.9987 14.6667C6.33118 12.8411 5.38353 10.472 5.33203 8.00004C5.38353 5.52806 6.33118 3.15894 7.9987 1.33337M1.33203 8.00004C1.33203 4.31814 4.3168 1.33337 7.9987 1.33337"
                        stroke="#757575"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_470_8731">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <span>UZ</span>
                  <svg
                    className="down-arrow"
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                  </svg>
                </NavLink>
                {isOpen && (
                  <ul>
                    <li>
                      <NavLink to="#">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_470_8731)">
                            <path
                              d="M14.6654 8.00004C14.6654 11.6819 11.6806 14.6667 7.9987 14.6667M14.6654 8.00004C14.6654 4.31814 11.6806 1.33337 7.9987 1.33337M14.6654 8.00004H1.33203M7.9987 14.6667C4.3168 14.6667 1.33203 11.6819 1.33203 8.00004M7.9987 14.6667C9.66622 12.8411 10.6139 10.472 10.6654 8.00004C10.6139 5.52806 9.66622 3.15894 7.9987 1.33337M7.9987 14.6667C6.33118 12.8411 5.38353 10.472 5.33203 8.00004C5.38353 5.52806 6.33118 3.15894 7.9987 1.33337M1.33203 8.00004C1.33203 4.31814 4.3168 1.33337 7.9987 1.33337"
                              stroke="#757575"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_470_8731">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <span>RU</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="#">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_470_8731)">
                            <path
                              d="M14.6654 8.00004C14.6654 11.6819 11.6806 14.6667 7.9987 14.6667M14.6654 8.00004C14.6654 4.31814 11.6806 1.33337 7.9987 1.33337M14.6654 8.00004H1.33203M7.9987 14.6667C4.3168 14.6667 1.33203 11.6819 1.33203 8.00004M7.9987 14.6667C9.66622 12.8411 10.6139 10.472 10.6654 8.00004C10.6139 5.52806 9.66622 3.15894 7.9987 1.33337M7.9987 14.6667C6.33118 12.8411 5.38353 10.472 5.33203 8.00004C5.38353 5.52806 6.33118 3.15894 7.9987 1.33337M1.33203 8.00004C1.33203 4.31814 4.3168 1.33337 7.9987 1.33337"
                              stroke="#757575"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_470_8731">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <span>EN</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <NavLink
                  to="/mail"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6M22 6L12 13L2 6"
                      stroke="#767676"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/notification"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                      stroke="#767676"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom-side">
          <div className="logo">
            {/* <img src="" alt="" /> */}
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Kasana.uz
            </NavLink>
          </div>
          <ul id="acc">
            <li>
              <NavLink
                to="/online-shop"
                onClick={() => setSelectedMenu(1)}
                className={selectedMenu === 1 ? "bottom-active-link" : ""}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_464_626)">
                    <path
                      d="M0.833008 0.833313H4.16634L6.39967 11.9916C6.47588 12.3753 6.6846 12.7199 6.9893 12.9652C7.29399 13.2105 7.67526 13.3408 8.06634 13.3333H16.1663C16.5574 13.3408 16.9387 13.2105 17.2434 12.9652C17.5481 12.7199 17.7568 12.3753 17.833 11.9916L19.1663 4.99998H4.99967M8.33301 17.5C8.33301 17.9602 7.95991 18.3333 7.49967 18.3333C7.03944 18.3333 6.66634 17.9602 6.66634 17.5C6.66634 17.0397 7.03944 16.6666 7.49967 16.6666C7.95991 16.6666 8.33301 17.0397 8.33301 17.5ZM17.4997 17.5C17.4997 17.9602 17.1266 18.3333 16.6663 18.3333C16.2061 18.3333 15.833 17.9602 15.833 17.5C15.833 17.0397 16.2061 16.6666 16.6663 16.6666C17.1266 16.6666 17.4997 17.0397 17.4997 17.5Z"
                      stroke="#303030"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_464_626">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Online bozor
              </NavLink>
            </li>

            <li>
              <NavLink
                to="announcement"
                onClick={() => setSelectedMenu(2)}
                className={selectedMenu === 2 ? "bottom-active-link" : ""}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0003 5.83333C10.0003 4.94928 9.64914 4.10143 9.02402 3.47631C8.39889 2.85119 7.55105 2.5 6.66699 2.5H1.66699V15H7.50033C8.16337 15 8.79925 15.2634 9.26809 15.7322C9.73693 16.2011 10.0003 16.837 10.0003 17.5M10.0003 5.83333V17.5M10.0003 5.83333C10.0003 4.94928 10.3515 4.10143 10.9766 3.47631C11.6018 2.85119 12.4496 2.5 13.3337 2.5H18.3337V15H12.5003C11.8373 15 11.2014 15.2634 10.7326 15.7322C10.2637 16.2011 10.0003 16.837 10.0003 17.5"
                    stroke="#303030"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                E'lonlar
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/news"
                onClick={() => setSelectedMenu(3)}
                className={selectedMenu === 3 ? "bottom-active-link" : ""}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.33301 9.16665C5.32213 9.16665 7.22979 9.95682 8.63631 11.3633C10.0428 12.7699 10.833 14.6775 10.833 16.6666M3.33301 3.33331C6.86923 3.33331 10.2606 4.73807 12.7611 7.23856C15.2616 9.73904 16.6663 13.1304 16.6663 16.6666M4.99967 15.8333C4.99967 16.2935 4.62658 16.6666 4.16634 16.6666C3.7061 16.6666 3.33301 16.2935 3.33301 15.8333C3.33301 15.3731 3.7061 15 4.16634 15C4.62658 15 4.99967 15.3731 4.99967 15.8333Z"
                    stroke="#303030"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Yangiliklar
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/courses"
                onClick={() => setSelectedMenu(4)}
                className={selectedMenu === 4 ? "bottom-active-link" : ""}
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                Kurslar
              </NavLink>
            </li>
          </ul>

          <ul id="rightt">
            <li>
              <form action="">
                <input
                  type="text"
                  placeholder="Type something..."
                  className={help ? "width" : ""}
                />
                <button type="button" onClick={() => setHelp(true)}>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </form>
            </li>

            <li>
              <Link to="/login">Kirish</Link>
            </li>
            <li>
              <button>
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
