import React, { useState, useEffect, useContext } from "react";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "../searchBar/searchBar";
import { MyContext } from "../../context/myContext";
import langImg from "./Icon (3).png";
import cart from "./mobile-menu-cart.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    selectedLanguage,
    setSelectedLanguage,
    languages,
    setLanguages,
    isAuthenticated,
    user,
  } = useContext(MyContext);
  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };
  const closeDropdown = (e) => {
    if (!e.target.closest(".dropdown")) {
      setIsOpen(false);
    } else if (!e.target.closest(".dropdown-mob-color")) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setScrolled(true);
      } else {
        setScrolled(false);
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
  const handleLanguageChange = (newLanguage) => {
    const updatedLanguages = languages.filter((lang) => lang !== newLanguage);
    updatedLanguages.push(selectedLanguage);
    setSelectedLanguage(newLanguage);
    setLanguages(updatedLanguages);
    setIsOpen(false);
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const openClick = () => {
    setMenuOpen((prev) => !prev);
  };
  const divStyle = {
    backgroundImage:
      "url('https://s3-alpha-sig.figma.com/img/e29b/0345/71d5eb106854cbcd44ebf165f629d407?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EclVj312JUpAKTqEVRughAEUjJY~A9eEnWNjLxbBK9BSyPZ7gh051YOdK0dGoL-MOpwiAOFYUrgXNKwwgpgKcEFfM1UxFEFD7e8eOLkNczW1YsQwIoucXABko7jH3sLnIh4i3FEBDsExDapk3MqaQOT3efWZdTlUEPiCNGUBJFgsipYvTmSA~Lwgm0y~YhEdJPXxqKNEbiGLpnqHrWxgmJIZKGwUuDvzivavDslKxtwYHQfFss~s7NraVca08QPo1MR3N1H1RASYV6W5h3Bbz99mSdS6kdZs8z37rfID8FPB5D9p5398x6ZUTG7YvIVC1qrl6nHWXBwqUTqmLz5PbQ__')",
    backgroundSize: "60px 60px",
  };
  const notF = (e) => {
    e.preventDefault();
  };

  const menus = [
    {
      title: "Onlayn bozor",
      image: cart,
      links: ["Subject", "Subject", "Subject"],
    },
    {
      title: "Yangiliklar",
      image: cart,
      links: ["Subject", "Subject"],
    },
    {
      title: "Hujjatlar",
      image: cart,
      links: ["Subject", "Subject", "Subject", "Subject"],
    },
    {
      title: "Onlayn darslar",
      image: cart,
      links: ["Subject", "Subject", "Subject", "Subject"],
    },
    {
      title: "E'lonlar",
      image: cart,
      links: ["Subject", "Subject", "Subject", "Subject"],
    },
  ];

  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };
  
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
                onClick={(e) => notF(e)}
              >
                Loyiha haqida
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/partners"
                className={({ isActive }) => (isActive ? "active-link" : "")}
                onClick={(e) => notF(e)}
              >
                Hamkorlarimiz
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) => (isActive ? "active-link" : "")}
                onClick={(e) => notF(e)}
              >
                Loyihalar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="contacts"
                className={({ isActive }) => (isActive ? "active-link" : "")}
                onClick={(e) => notF(e)}
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
                <Link to="#" onClick={toggleDropDown}>
                  <img src={langImg} alt="" />
                  <span>{selectedLanguage}</span>
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
                </Link>
                {isOpen && (
                  <ul>
                    {languages.map((lang) => (
                      <li key={lang}>
                        <Link to="#" onClick={() => handleLanguageChange(lang)}>
                          <span>{lang}</span>
                        </Link>
                      </li>
                    ))}
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
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <svg
                width="131"
                height="21"
                viewBox="0 0 131 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M130.202 8.14269C129.866 8.51602 129.409 9.02002 128.83 9.65469C128.27 10.2894 127.663 10.9894 127.01 11.7547C126.357 12.52 125.694 13.3227 125.022 14.1627C124.369 15.0027 123.771 15.8147 123.23 16.5987H130.342V20.0707H118.162V17.6067C118.554 16.9347 119.021 16.216 119.562 15.4507C120.122 14.6667 120.701 13.8827 121.298 13.0987C121.914 12.3147 122.521 11.5587 123.118 10.8307C123.715 10.084 124.266 9.41202 124.77 8.81469H118.498V5.34269H130.202V8.14269Z"
                  fill="#41A58D"
                />
                <path
                  d="M115.226 19.5667C114.516 19.772 113.602 19.9587 112.482 20.1267C111.362 20.3134 110.186 20.4067 108.954 20.4067C107.703 20.4067 106.658 20.2387 105.818 19.9027C104.996 19.5667 104.343 19.1 103.858 18.5027C103.372 17.8867 103.027 17.1587 102.822 16.3187C102.616 15.4787 102.514 14.5547 102.514 13.5467V5.34269H106.686V13.0427C106.686 14.3867 106.863 15.3574 107.218 15.9547C107.572 16.552 108.235 16.8507 109.206 16.8507C109.504 16.8507 109.822 16.8414 110.158 16.8227C110.494 16.7854 110.792 16.748 111.054 16.7107V5.34269H115.226V19.5667Z"
                  fill="#41A58D"
                />
                <path
                  d="M99.851 17.8587C99.851 18.6987 99.5803 19.3427 99.039 19.7907C98.5163 20.22 97.919 20.4347 97.247 20.4347C96.575 20.4347 95.9683 20.22 95.427 19.7907C94.9043 19.3427 94.643 18.6987 94.643 17.8587C94.643 17.0187 94.9043 16.384 95.427 15.9547C95.9683 15.5067 96.575 15.2827 97.247 15.2827C97.919 15.2827 98.5163 15.5067 99.039 15.9547C99.5803 16.384 99.851 17.0187 99.851 17.8587Z"
                  fill="#41A58D"
                />
                <path
                  d="M85.9144 17.1587C86.3251 17.1587 86.7171 17.1494 87.0904 17.1307C87.4637 17.112 87.7624 17.084 87.9864 17.0467V13.8827C87.8184 13.8454 87.5664 13.808 87.2304 13.7707C86.8944 13.7334 86.5864 13.7147 86.3064 13.7147C85.9144 13.7147 85.5411 13.7427 85.1864 13.7987C84.8504 13.836 84.5517 13.92 84.2904 14.0507C84.0291 14.1814 83.8237 14.3587 83.6744 14.5827C83.5251 14.8067 83.4504 15.0867 83.4504 15.4227C83.4504 16.076 83.6651 16.5334 84.0944 16.7947C84.5424 17.0374 85.1491 17.1587 85.9144 17.1587ZM85.5784 4.95069C86.8104 4.95069 87.8371 5.09069 88.6584 5.37069C89.4797 5.65069 90.1331 6.05202 90.6184 6.57469C91.1224 7.09736 91.4771 7.73202 91.6824 8.47869C91.8877 9.22536 91.9904 10.056 91.9904 10.9707V19.6507C91.3931 19.7814 90.5624 19.9307 89.4984 20.0987C88.4344 20.2854 87.1464 20.3787 85.6344 20.3787C84.6824 20.3787 83.8144 20.2947 83.0304 20.1267C82.2651 19.9587 81.6024 19.688 81.0424 19.3147C80.4824 18.9227 80.0531 18.4187 79.7544 17.8027C79.4557 17.1867 79.3064 16.4307 79.3064 15.5347C79.3064 14.676 79.4744 13.948 79.8104 13.3507C80.1651 12.7534 80.6317 12.2774 81.2104 11.9227C81.7891 11.568 82.4517 11.316 83.1984 11.1667C83.9451 10.9987 84.7197 10.9147 85.5224 10.9147C86.0637 10.9147 86.5397 10.9427 86.9504 10.9987C87.3797 11.036 87.7251 11.092 87.9864 11.1667V10.7747C87.9864 10.0654 87.7717 9.49602 87.3424 9.06669C86.9131 8.63736 86.1664 8.42269 85.1024 8.42269C84.3931 8.42269 83.6931 8.47869 83.0024 8.59069C82.3117 8.68402 81.7144 8.82402 81.2104 9.01069L80.6784 5.65069C80.9211 5.57602 81.2197 5.50136 81.5744 5.42669C81.9477 5.33336 82.3491 5.25869 82.7784 5.20269C83.2077 5.12802 83.6557 5.07202 84.1224 5.03469C84.6077 4.97869 85.0931 4.95069 85.5784 4.95069Z"
                  fill="#41A58D"
                />
                <path
                  d="M63.7981 5.84668C64.5075 5.64135 65.4221 5.45468 66.5421 5.28668C67.6621 5.10002 68.8381 5.00668 70.0701 5.00668C71.3208 5.00668 72.3568 5.17468 73.1781 5.51068C74.0181 5.82802 74.6808 6.28535 75.1661 6.88268C75.6515 7.48002 75.9968 8.18935 76.2021 9.01068C76.4075 9.83202 76.5101 10.7467 76.5101 11.7547V20.0707H72.3381V12.2587C72.3381 10.9147 72.1608 9.96269 71.8061 9.40269C71.4515 8.84269 70.7888 8.56269 69.8181 8.56269C69.5195 8.56269 69.2021 8.58135 68.8661 8.61869C68.5301 8.63735 68.2315 8.66535 67.9701 8.70268V20.0707H63.7981V5.84668Z"
                  fill="#41A58D"
                />
                <path
                  d="M53.9496 17.1587C54.3602 17.1587 54.7522 17.1494 55.1256 17.1307C55.4989 17.112 55.7976 17.084 56.0216 17.0467V13.8827C55.8536 13.8454 55.6016 13.808 55.2656 13.7707C54.9296 13.7334 54.6216 13.7147 54.3416 13.7147C53.9496 13.7147 53.5762 13.7427 53.2216 13.7987C52.8856 13.836 52.5869 13.92 52.3256 14.0507C52.0642 14.1814 51.8589 14.3587 51.7096 14.5827C51.5602 14.8067 51.4856 15.0867 51.4856 15.4227C51.4856 16.076 51.7002 16.5334 52.1296 16.7947C52.5776 17.0374 53.1842 17.1587 53.9496 17.1587ZM53.6136 4.95069C54.8456 4.95069 55.8722 5.09069 56.6936 5.37069C57.5149 5.65069 58.1682 6.05202 58.6536 6.57469C59.1576 7.09736 59.5122 7.73202 59.7176 8.47869C59.9229 9.22536 60.0256 10.056 60.0256 10.9707V19.6507C59.4282 19.7814 58.5976 19.9307 57.5336 20.0987C56.4696 20.2854 55.1816 20.3787 53.6696 20.3787C52.7176 20.3787 51.8496 20.2947 51.0656 20.1267C50.3002 19.9587 49.6376 19.688 49.0776 19.3147C48.5176 18.9227 48.0882 18.4187 47.7896 17.8027C47.4909 17.1867 47.3416 16.4307 47.3416 15.5347C47.3416 14.676 47.5096 13.948 47.8456 13.3507C48.2002 12.7534 48.6669 12.2774 49.2456 11.9227C49.8242 11.568 50.4869 11.316 51.2336 11.1667C51.9802 10.9987 52.7549 10.9147 53.5576 10.9147C54.0989 10.9147 54.5749 10.9427 54.9856 10.9987C55.4149 11.036 55.7602 11.092 56.0216 11.1667V10.7747C56.0216 10.0654 55.8069 9.49602 55.3776 9.06669C54.9482 8.63736 54.2016 8.42269 53.1376 8.42269C52.4282 8.42269 51.7282 8.47869 51.0376 8.59069C50.3469 8.68402 49.7496 8.82402 49.2456 9.01069L48.7136 5.65069C48.9562 5.57602 49.2549 5.50136 49.6096 5.42669C49.9829 5.33336 50.3842 5.25869 50.8136 5.20269C51.2429 5.12802 51.6909 5.07202 52.1576 5.03469C52.6429 4.97869 53.1282 4.95069 53.6136 4.95069Z"
                  fill="#41A58D"
                />
                <path
                  d="M38.9597 17.0747C39.7251 17.0747 40.2664 17 40.5837 16.8507C40.9011 16.7014 41.0597 16.412 41.0597 15.9827C41.0597 15.6467 40.8544 15.3574 40.4437 15.1147C40.0331 14.8534 39.4077 14.564 38.5677 14.2467C37.9144 14.004 37.3171 13.752 36.7757 13.4907C36.2531 13.2294 35.8051 12.9214 35.4317 12.5667C35.0584 12.1934 34.7691 11.7547 34.5637 11.2507C34.3584 10.7467 34.2557 10.14 34.2557 9.43069C34.2557 8.04936 34.7691 6.95736 35.7957 6.15469C36.8224 5.35202 38.2317 4.95069 40.0237 4.95069C40.9197 4.95069 41.7784 5.03469 42.5997 5.20269C43.4211 5.35202 44.0744 5.52002 44.5597 5.70669L43.8317 8.95469C43.3464 8.78669 42.8144 8.63736 42.2357 8.50669C41.6757 8.37602 41.0411 8.31069 40.3317 8.31069C39.0251 8.31069 38.3717 8.67469 38.3717 9.40269C38.3717 9.57069 38.3997 9.72002 38.4557 9.85069C38.5117 9.98136 38.6237 10.112 38.7917 10.2427C38.9597 10.3547 39.1837 10.4854 39.4637 10.6347C39.7624 10.7654 40.1357 10.9147 40.5837 11.0827C41.4984 11.4187 42.2544 11.7547 42.8517 12.0907C43.4491 12.408 43.9157 12.7627 44.2517 13.1547C44.6064 13.528 44.8491 13.948 44.9797 14.4147C45.1291 14.8814 45.2037 15.4227 45.2037 16.0387C45.2037 17.4947 44.6531 18.596 43.5517 19.3427C42.4691 20.0894 40.9291 20.4627 38.9317 20.4627C37.6251 20.4627 36.5331 20.3507 35.6557 20.1267C34.7971 19.9027 34.1997 19.716 33.8637 19.5667L34.5637 16.1787C35.2731 16.4587 36.0011 16.6827 36.7477 16.8507C37.4944 17 38.2317 17.0747 38.9597 17.0747Z"
                  fill="#41A58D"
                />
                <path
                  d="M24.8832 17.1587C25.2938 17.1587 25.6858 17.1494 26.0592 17.1307C26.4325 17.112 26.7312 17.084 26.9552 17.0467V13.8827C26.7872 13.8454 26.5352 13.808 26.1992 13.7707C25.8632 13.7334 25.5552 13.7147 25.2752 13.7147C24.8832 13.7147 24.5098 13.7427 24.1552 13.7987C23.8192 13.836 23.5205 13.92 23.2592 14.0507C22.9978 14.1814 22.7925 14.3587 22.6432 14.5827C22.4938 14.8067 22.4192 15.0867 22.4192 15.4227C22.4192 16.076 22.6338 16.5334 23.0632 16.7947C23.5112 17.0374 24.1178 17.1587 24.8832 17.1587ZM24.5472 4.95069C25.7792 4.95069 26.8058 5.09069 27.6272 5.37069C28.4485 5.65069 29.1018 6.05202 29.5872 6.57469C30.0912 7.09736 30.4458 7.73202 30.6512 8.47869C30.8565 9.22536 30.9592 10.056 30.9592 10.9707V19.6507C30.3618 19.7814 29.5312 19.9307 28.4672 20.0987C27.4032 20.2854 26.1152 20.3787 24.6032 20.3787C23.6512 20.3787 22.7832 20.2947 21.9992 20.1267C21.2338 19.9587 20.5712 19.688 20.0112 19.3147C19.4512 18.9227 19.0218 18.4187 18.7232 17.8027C18.4245 17.1867 18.2752 16.4307 18.2752 15.5347C18.2752 14.676 18.4432 13.948 18.7792 13.3507C19.1338 12.7534 19.6005 12.2774 20.1792 11.9227C20.7578 11.568 21.4205 11.316 22.1672 11.1667C22.9138 10.9987 23.6885 10.9147 24.4912 10.9147C25.0325 10.9147 25.5085 10.9427 25.9192 10.9987C26.3485 11.036 26.6938 11.092 26.9552 11.1667V10.7747C26.9552 10.0654 26.7405 9.49602 26.3112 9.06669C25.8818 8.63736 25.1352 8.42269 24.0712 8.42269C23.3618 8.42269 22.6618 8.47869 21.9712 8.59069C21.2805 8.68402 20.6832 8.82402 20.1792 9.01069L19.6472 5.65069C19.8898 5.57602 20.1885 5.50136 20.5432 5.42669C20.9165 5.33336 21.3178 5.25869 21.7472 5.20269C22.1765 5.12802 22.6245 5.07202 23.0912 5.03469C23.5765 4.97869 24.0618 4.95069 24.5472 4.95069Z"
                  fill="#41A58D"
                />
                <path
                  d="M12.12 20.0707C11.728 19.436 11.2613 18.7547 10.72 18.0267C10.1973 17.28 9.61864 16.5427 8.98397 15.8147C8.36797 15.068 7.72397 14.3587 7.05197 13.6867C6.37997 12.996 5.70797 12.3894 5.03597 11.8667V20.0707H0.667969V0.666687H5.03597V8.00269C6.17464 6.80802 7.3133 5.56669 8.45197 4.27869C9.6093 2.97202 10.6826 1.76802 11.672 0.666687H16.852C15.5266 2.23469 14.192 3.74669 12.848 5.20269C11.5226 6.65869 10.1226 8.12402 8.64797 9.59869C10.1973 10.8867 11.6906 12.4174 13.128 14.1907C14.584 15.964 15.9746 17.924 17.3 20.0707H12.12Z"
                  fill="#41A58D"
                />
              </svg>
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
                to="/announcements"
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
            <li id="ser">
              <form action="">
                <button type="button" onClick={() => setHelp(!help)}>
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
            <li id="login-top">
              {isAuthenticated ? (
                user.role === "admin" ? (
                  <Link to="/dashboard">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.23828 19.5C4.56369 17.2892 7.46856 15.7762 12.0006 15.7762C16.5326 15.7762 19.4374 17.2892 20.7628 19.5M15.6006 8.1C15.6006 10.0882 13.9888 11.7 12.0006 11.7C10.0123 11.7 8.40056 10.0882 8.40056 8.1C8.40056 6.11177 10.0123 4.5 12.0006 4.5C13.9888 4.5 15.6006 6.11177 15.6006 8.1Z"
                        stroke="#118E71"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link to="/profile/prof">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.23828 19.5C4.56369 17.2892 7.46856 15.7762 12.0006 15.7762C16.5326 15.7762 19.4374 17.2892 20.7628 19.5M15.6006 8.1C15.6006 10.0882 13.9888 11.7 12.0006 11.7C10.0123 11.7 8.40056 10.0882 8.40056 8.1C8.40056 6.11177 10.0123 4.5 12.0006 4.5C13.9888 4.5 15.6006 6.11177 15.6006 8.1Z"
                        stroke="#118E71"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                    Shaxsiy kabinet
                  </Link>
                )
              ) : (
                <Link to="/login">Kirish</Link>
              )}
            </li>
            <li className="mob-ver">
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
            <li className="mob-ver">
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
            <li>
              <div
                className={`openIcon ${menuOpen ? "openMenu" : ""}`}
                id="menu"
                onClick={openClick}
              >
                <span
                  className={`line-1 ${menuOpen ? "active-line-1" : ""}`}
                ></span>
                <span
                  className={`line-2 ${menuOpen ? "active-line-2" : ""}`}
                ></span>
                <span
                  className={`line-3 ${menuOpen ? "active-line-3" : ""}`}
                ></span>
              </div>
            </li>
          </ul>
        </div>
      </header>
      <div className={`for-search ${help ? "df" : scrolled ? "bg" : ""}`}>
        <SearchBar />
      </div>
      <div className={`full-menu ${menuOpen ? "active" : ""}`} style={divStyle}>
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
                onClick={(e) => notF(e)}
              >
                Loyiha haqida
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/partners"
                className={({ isActive }) => (isActive ? "active-link" : "")}
                onClick={(e) => notF(e)}
              >
                Hamkorlarimiz
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) => (isActive ? "active-link" : "")}
                onClick={(e) => notF(e)}
              >
                Loyihalar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="contacts"
                className={({ isActive }) => (isActive ? "active-link" : "")}
                onClick={(e) => notF(e)}
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
              <li className="dropdown" style={{ backgroundColor: "#29997F" }}>
                <Link
                  to="#"
                  onClick={toggleDropDown}
                  style={{ backgroundColor: "#29997F", color: "#fff" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1247_25184)">
                      <path
                        d="M14.6693 7.99998C14.6693 11.6819 11.6845 14.6666 8.0026 14.6666M14.6693 7.99998C14.6693 4.31808 11.6845 1.33331 8.0026 1.33331M14.6693 7.99998H1.33594M8.0026 14.6666C4.32071 14.6666 1.33594 11.6819 1.33594 7.99998M8.0026 14.6666C9.67012 12.8411 10.6178 10.472 10.6693 7.99998C10.6178 5.528 9.67012 3.15888 8.0026 1.33331M8.0026 14.6666C6.33508 12.8411 5.38744 10.472 5.33594 7.99998C5.38744 5.528 6.33508 3.15888 8.0026 1.33331M1.33594 7.99998C1.33594 4.31808 4.32071 1.33331 8.0026 1.33331"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1247_25184">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <span>{selectedLanguage}</span>
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
                </Link>
                {isOpen && (
                  <ul style={{ backgroundColor: "#29997F" }}>
                    {languages.map((lang) => (
                      <li key={lang}>
                        <Link to="#" onClick={() => handleLanguageChange(lang)}>
                          <span>{lang}</span>
                        </Link>
                      </li>
                    ))}
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
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <svg
                width="140"
                height="28"
                viewBox="0 0 140 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M134.198 12.1427C133.862 12.516 133.405 13.02 132.826 13.6547C132.266 14.2894 131.659 14.9894 131.006 15.7547C130.353 16.52 129.69 17.3227 129.018 18.1627C128.365 19.0027 127.767 19.8147 127.226 20.5987H134.338V24.0707H122.158V21.6067C122.55 20.9347 123.017 20.216 123.558 19.4507C124.118 18.6667 124.697 17.8827 125.294 17.0987C125.91 16.3147 126.517 15.5587 127.114 14.8307C127.711 14.084 128.262 13.412 128.766 12.8147H122.494V9.34269H134.198V12.1427Z"
                  fill="white"
                />
                <path
                  d="M119.222 23.5667C118.512 23.772 117.598 23.9587 116.478 24.1267C115.358 24.3134 114.182 24.4067 112.95 24.4067C111.699 24.4067 110.654 24.2387 109.814 23.9027C108.992 23.5667 108.339 23.1 107.854 22.5027C107.368 21.8867 107.023 21.1587 106.818 20.3187C106.612 19.4787 106.51 18.5547 106.51 17.5467V9.34269H110.682V17.0427C110.682 18.3867 110.859 19.3574 111.214 19.9547C111.568 20.552 112.231 20.8507 113.202 20.8507C113.5 20.8507 113.818 20.8414 114.154 20.8227C114.49 20.7854 114.788 20.748 115.05 20.7107V9.34269H119.222V23.5667Z"
                  fill="white"
                />
                <path
                  d="M103.847 21.8587C103.847 22.6987 103.576 23.3427 103.035 23.7907C102.512 24.22 101.915 24.4347 101.243 24.4347C100.571 24.4347 99.9644 24.22 99.4231 23.7907C98.9004 23.3427 98.6391 22.6987 98.6391 21.8587C98.6391 21.0187 98.9004 20.384 99.4231 19.9547C99.9644 19.5067 100.571 19.2827 101.243 19.2827C101.915 19.2827 102.512 19.5067 103.035 19.9547C103.576 20.384 103.847 21.0187 103.847 21.8587Z"
                  fill="white"
                />
                <path
                  d="M89.9105 21.1587C90.3212 21.1587 90.7132 21.1494 91.0865 21.1307C91.4598 21.112 91.7585 21.084 91.9825 21.0467V17.8827C91.8145 17.8454 91.5625 17.808 91.2265 17.7707C90.8905 17.7334 90.5825 17.7147 90.3025 17.7147C89.9105 17.7147 89.5372 17.7427 89.1825 17.7987C88.8465 17.836 88.5478 17.92 88.2865 18.0507C88.0252 18.1814 87.8198 18.3587 87.6705 18.5827C87.5212 18.8067 87.4465 19.0867 87.4465 19.4227C87.4465 20.076 87.6612 20.5334 88.0905 20.7947C88.5385 21.0374 89.1452 21.1587 89.9105 21.1587ZM89.5745 8.95069C90.8065 8.95069 91.8332 9.09069 92.6545 9.37069C93.4758 9.65069 94.1292 10.052 94.6145 10.5747C95.1185 11.0974 95.4732 11.732 95.6785 12.4787C95.8838 13.2254 95.9865 14.056 95.9865 14.9707V23.6507C95.3892 23.7814 94.5585 23.9307 93.4945 24.0987C92.4305 24.2854 91.1425 24.3787 89.6305 24.3787C88.6785 24.3787 87.8105 24.2947 87.0265 24.1267C86.2612 23.9587 85.5985 23.688 85.0385 23.3147C84.4785 22.9227 84.0492 22.4187 83.7505 21.8027C83.4518 21.1867 83.3025 20.4307 83.3025 19.5347C83.3025 18.676 83.4705 17.948 83.8065 17.3507C84.1612 16.7534 84.6278 16.2774 85.2065 15.9227C85.7852 15.568 86.4478 15.316 87.1945 15.1667C87.9412 14.9987 88.7158 14.9147 89.5185 14.9147C90.0598 14.9147 90.5358 14.9427 90.9465 14.9987C91.3758 15.036 91.7212 15.092 91.9825 15.1667V14.7747C91.9825 14.0654 91.7678 13.496 91.3385 13.0667C90.9092 12.6374 90.1625 12.4227 89.0985 12.4227C88.3892 12.4227 87.6892 12.4787 86.9985 12.5907C86.3078 12.684 85.7105 12.824 85.2065 13.0107L84.6745 9.65069C84.9172 9.57602 85.2158 9.50136 85.5705 9.42669C85.9438 9.33336 86.3452 9.25869 86.7745 9.20269C87.2038 9.12802 87.6518 9.07202 88.1185 9.03469C88.6038 8.97869 89.0892 8.95069 89.5745 8.95069Z"
                  fill="white"
                />
                <path
                  d="M67.7942 9.84668C68.5036 9.64135 69.4182 9.45468 70.5382 9.28668C71.6582 9.10002 72.8342 9.00668 74.0662 9.00668C75.3169 9.00668 76.3529 9.17468 77.1742 9.51068C78.0142 9.82802 78.6769 10.2854 79.1622 10.8827C79.6476 11.48 79.9929 12.1894 80.1982 13.0107C80.4035 13.832 80.5062 14.7467 80.5062 15.7547V24.0707H76.3342V16.2587C76.3342 14.9147 76.1569 13.9627 75.8022 13.4027C75.4475 12.8427 74.7849 12.5627 73.8142 12.5627C73.5155 12.5627 73.1982 12.5814 72.8622 12.6187C72.5262 12.6374 72.2276 12.6654 71.9662 12.7027V24.0707H67.7942V9.84668Z"
                  fill="white"
                />
                <path
                  d="M57.9457 21.1587C58.3563 21.1587 58.7483 21.1494 59.1217 21.1307C59.495 21.112 59.7937 21.084 60.0177 21.0467V17.8827C59.8497 17.8454 59.5977 17.808 59.2617 17.7707C58.9257 17.7334 58.6177 17.7147 58.3377 17.7147C57.9457 17.7147 57.5723 17.7427 57.2177 17.7987C56.8817 17.836 56.583 17.92 56.3217 18.0507C56.0603 18.1814 55.855 18.3587 55.7057 18.5827C55.5563 18.8067 55.4817 19.0867 55.4817 19.4227C55.4817 20.076 55.6963 20.5334 56.1257 20.7947C56.5737 21.0374 57.1803 21.1587 57.9457 21.1587ZM57.6097 8.95069C58.8417 8.95069 59.8683 9.09069 60.6897 9.37069C61.511 9.65069 62.1643 10.052 62.6497 10.5747C63.1537 11.0974 63.5083 11.732 63.7137 12.4787C63.919 13.2254 64.0217 14.056 64.0217 14.9707V23.6507C63.4243 23.7814 62.5937 23.9307 61.5297 24.0987C60.4657 24.2854 59.1777 24.3787 57.6657 24.3787C56.7137 24.3787 55.8457 24.2947 55.0617 24.1267C54.2963 23.9587 53.6337 23.688 53.0737 23.3147C52.5137 22.9227 52.0843 22.4187 51.7857 21.8027C51.487 21.1867 51.3377 20.4307 51.3377 19.5347C51.3377 18.676 51.5057 17.948 51.8417 17.3507C52.1963 16.7534 52.663 16.2774 53.2417 15.9227C53.8203 15.568 54.483 15.316 55.2297 15.1667C55.9763 14.9987 56.751 14.9147 57.5536 14.9147C58.095 14.9147 58.571 14.9427 58.9817 14.9987C59.411 15.036 59.7563 15.092 60.0177 15.1667V14.7747C60.0177 14.0654 59.803 13.496 59.3737 13.0667C58.9443 12.6374 58.1977 12.4227 57.1337 12.4227C56.4243 12.4227 55.7243 12.4787 55.0337 12.5907C54.343 12.684 53.7457 12.824 53.2417 13.0107L52.7097 9.65069C52.9523 9.57602 53.251 9.50136 53.6057 9.42669C53.979 9.33336 54.3803 9.25869 54.8097 9.20269C55.239 9.12802 55.687 9.07202 56.1537 9.03469C56.639 8.97869 57.1243 8.95069 57.6097 8.95069Z"
                  fill="white"
                />
                <path
                  d="M42.9558 21.0747C43.7212 21.0747 44.2625 21 44.5798 20.8507C44.8971 20.7014 45.0558 20.412 45.0558 19.9827C45.0558 19.6467 44.8505 19.3574 44.4398 19.1147C44.0292 18.8534 43.4038 18.564 42.5638 18.2467C41.9105 18.004 41.3131 17.752 40.7718 17.4907C40.2491 17.2294 39.8012 16.9214 39.4278 16.5667C39.0545 16.1934 38.7652 15.7547 38.5598 15.2507C38.3545 14.7467 38.2518 14.14 38.2518 13.4307C38.2518 12.0494 38.7652 10.9574 39.7918 10.1547C40.8185 9.35202 42.2278 8.95069 44.0198 8.95069C44.9158 8.95069 45.7745 9.03469 46.5958 9.20269C47.4172 9.35202 48.0705 9.52002 48.5558 9.70669L47.8278 12.9547C47.3425 12.7867 46.8105 12.6374 46.2318 12.5067C45.6718 12.376 45.0372 12.3107 44.3278 12.3107C43.0212 12.3107 42.3678 12.6747 42.3678 13.4027C42.3678 13.5707 42.3958 13.72 42.4518 13.8507C42.5078 13.9814 42.6198 14.112 42.7878 14.2427C42.9558 14.3547 43.1798 14.4854 43.4598 14.6347C43.7585 14.7654 44.1318 14.9147 44.5798 15.0827C45.4945 15.4187 46.2505 15.7547 46.8478 16.0907C47.4451 16.408 47.9118 16.7627 48.2478 17.1547C48.6025 17.528 48.8452 17.948 48.9758 18.4147C49.1252 18.8814 49.1998 19.4227 49.1998 20.0387C49.1998 21.4947 48.6492 22.596 47.5478 23.3427C46.4652 24.0894 44.9251 24.4627 42.9278 24.4627C41.6212 24.4627 40.5292 24.3507 39.6518 24.1267C38.7932 23.9027 38.1958 23.716 37.8598 23.5667L38.5598 20.1787C39.2691 20.4587 39.9972 20.6827 40.7438 20.8507C41.4905 21 42.2278 21.0747 42.9558 21.0747Z"
                  fill="white"
                />
                <path
                  d="M28.8792 21.1587C29.2899 21.1587 29.6819 21.1494 30.0552 21.1307C30.4286 21.112 30.7272 21.084 30.9512 21.0467V17.8827C30.7832 17.8454 30.5312 17.808 30.1952 17.7707C29.8592 17.7334 29.5512 17.7147 29.2712 17.7147C28.8792 17.7147 28.5059 17.7427 28.1512 17.7987C27.8152 17.836 27.5166 17.92 27.2552 18.0507C26.9939 18.1814 26.7886 18.3587 26.6392 18.5827C26.4899 18.8067 26.4152 19.0867 26.4152 19.4227C26.4152 20.076 26.6299 20.5334 27.0592 20.7947C27.5072 21.0374 28.1139 21.1587 28.8792 21.1587ZM28.5432 8.95069C29.7752 8.95069 30.8019 9.09069 31.6232 9.37069C32.4446 9.65069 33.0979 10.052 33.5832 10.5747C34.0872 11.0974 34.4419 11.732 34.6472 12.4787C34.8526 13.2254 34.9552 14.056 34.9552 14.9707V23.6507C34.3579 23.7814 33.5272 23.9307 32.4632 24.0987C31.3992 24.2854 30.1112 24.3787 28.5992 24.3787C27.6472 24.3787 26.7792 24.2947 25.9952 24.1267C25.2299 23.9587 24.5672 23.688 24.0072 23.3147C23.4472 22.9227 23.0179 22.4187 22.7192 21.8027C22.4206 21.1867 22.2712 20.4307 22.2712 19.5347C22.2712 18.676 22.4392 17.948 22.7752 17.3507C23.1299 16.7534 23.5966 16.2774 24.1752 15.9227C24.7539 15.568 25.4166 15.316 26.1632 15.1667C26.9099 14.9987 27.6846 14.9147 28.4872 14.9147C29.0286 14.9147 29.5046 14.9427 29.9152 14.9987C30.3446 15.036 30.6899 15.092 30.9512 15.1667V14.7747C30.9512 14.0654 30.7366 13.496 30.3072 13.0667C29.8779 12.6374 29.1312 12.4227 28.0672 12.4227C27.3579 12.4227 26.6579 12.4787 25.9672 12.5907C25.2766 12.684 24.6792 12.824 24.1752 13.0107L23.6432 9.65069C23.8859 9.57602 24.1846 9.50136 24.5392 9.42669C24.9126 9.33336 25.3139 9.25869 25.7432 9.20269C26.1726 9.12802 26.6206 9.07202 27.0872 9.03469C27.5726 8.97869 28.0579 8.95069 28.5432 8.95069Z"
                  fill="white"
                />
                <path
                  d="M16.1161 24.0707C15.7241 23.436 15.2574 22.7547 14.7161 22.0267C14.1934 21.28 13.6147 20.5427 12.9801 19.8147C12.3641 19.068 11.7201 18.3587 11.0481 17.6867C10.3761 16.996 9.70406 16.3894 9.03206 15.8667V24.0707H4.66406V4.66669H9.03206V12.0027C10.1707 10.808 11.3094 9.56669 12.4481 8.27869C13.6054 6.97202 14.6787 5.76802 15.6681 4.66669H20.8481C19.5227 6.23469 18.1881 7.74669 16.8441 9.20269C15.5187 10.6587 14.1187 12.124 12.6441 13.5987C14.1934 14.8867 15.6867 16.4174 17.1241 18.1907C18.5801 19.964 19.9707 21.924 21.2961 24.0707H16.1161Z"
                  fill="white"
                />
              </svg>
            </NavLink>
          </div>
          <ul id="rightt">
            <li>
              <Link to="#">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.6658 18.771C20.6658 18.771 19.5071 19.909 19.2232 20.2426C18.7606 20.7362 18.2156 20.9693 17.5012 20.9693C17.4325 20.9693 17.3592 20.9693 17.2905 20.9647C15.9304 20.8779 14.6664 20.3477 13.7184 19.8953C11.1263 18.643 8.85015 16.8651 6.95873 14.6119C5.39706 12.7335 4.35288 10.9968 3.66135 9.13211C3.23544 7.99409 3.07973 7.10744 3.14842 6.27107C3.19422 5.73634 3.40031 5.29302 3.78042 4.91368L5.3421 3.35519C5.5665 3.14496 5.80465 3.0307 6.03821 3.0307C6.32673 3.0307 6.5603 3.20437 6.70685 3.35062C6.71143 3.35519 6.71601 3.35977 6.72059 3.36434C6.99995 3.62485 7.26557 3.8945 7.54493 4.18243C7.6869 4.32868 7.83345 4.47493 7.98001 4.62575L9.23026 5.87345C9.71571 6.35791 9.71571 6.8058 9.23026 7.29026C9.09745 7.4228 8.96922 7.55534 8.83641 7.68331C8.45171 8.07636 8.75391 7.77477 8.35548 8.13126C8.34632 8.1404 8.33716 8.14497 8.33258 8.15411C7.93873 8.54716 8.012 8.93107 8.09444 9.19158C8.09902 9.20529 8.1036 9.219 8.10818 9.23271C8.43333 10.0188 8.8913 10.7592 9.58742 11.6413L9.592 11.6459C10.856 13.1998 12.1887 14.4109 13.6588 15.3387C13.8465 15.4575 14.0389 15.5535 14.2221 15.6449C14.3869 15.7272 14.5427 15.8049 14.6755 15.8871C14.6938 15.8963 14.7121 15.91 14.7304 15.9191C14.8861 15.9968 15.0327 16.0334 15.1838 16.0334C15.5639 16.0334 15.8021 15.7957 15.8799 15.718L16.7776 14.8222C16.9333 14.6668 17.1806 14.4794 17.4691 14.4794C17.7531 14.4794 17.9866 14.6576 18.1286 14.813C18.1332 14.8176 18.1332 14.8176 18.1378 14.8222L20.6612 17.3404C21.1329 17.8066 20.6658 18.771 20.6658 18.771Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                123
              </Link>
            </li>
            <li>
              <Link to="#">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.59844 6.10436L11.9984 12.7044L20.9984 6.10436M8.99844 12.6044L3.59844 18.1044M20.3984 17.6044L14.3984 12.1044M4.79844 19.0957C3.47295 19.0957 2.39844 18.0211 2.39844 16.6957V7.30436C2.39844 5.97888 3.47295 4.90436 4.79844 4.90436H19.1984C20.5239 4.90436 21.5984 5.97887 21.5984 7.30436V16.6957C21.5984 18.0211 20.5239 19.0957 19.1984 19.0957H4.79844Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                info@kasana.uz
              </Link>
            </li>
          </ul>
        </div>
        <div className="menus">
          <div className="details">
            <div className="detail">
              <ul>
                <li>Onlayn bozor</li>
                <li>
                  <Link to="#">Kasanachilik</Link>
                </li>
                <li>
                  <Link to="#">Kategoriya</Link>
                </li>
                <li>
                  <Link to="#">Ipakchilik</Link>
                </li>
                <li>
                  <Link to="#">Tandirchilik</Link>
                </li>
                <li>
                  <Link to="#">Kulolchilik</Link>
                </li>
                <li>
                  <Link to="#">Kategoriya</Link>
                </li>
                <li>
                  <Link to="#">Kasanachilik</Link>
                </li>
                <li>
                  <Link to="#">Kategoriya</Link>
                </li>
                <li>
                  <Link to="#">Kategoriya</Link>
                </li>
              </ul>
            </div>
            <div className="detail">
              <ul>
                <li>Yangiliklar</li>
                <li>
                  <Link to="#">Qonunchilik</Link>
                </li>
                <li>
                  <Link to="#">Kasanachilik</Link>
                </li>
                <li>
                  <Link to="#">Ilmiy ommabop</Link>
                </li>
                <li>
                  <Link to="#">Loyihalar</Link>
                </li>
                <li>
                  <Link to="#">Video yangiliklar</Link>
                </li>
                <li>
                  <Link to="#">Fotogallereyalar</Link>
                </li>
                <li>
                  <Link to="#">Ommabop</Link>
                </li>

                <li>
                  <Link to="#">So'nngi yangiliklar</Link>
                </li>
              </ul>
            </div>
            <div className="detail">
              <ul>
                <li>Hujjatlar</li>
                <li>
                  <Link to="#">Qonunchilik</Link>
                </li>
                <li>
                  <Link to="#">Huquqiy hujjatlar</Link>
                </li>
                <li>
                  <Link to="#">Loyihalar</Link>
                </li>
              </ul>
            </div>
            <div className="detail">
              <ul>
                <li>Onlayn darslar</li>
                <li>
                  <Link to="#">Kasanachilik</Link>
                </li>
                <li>
                  <Link to="#">Kategoriya</Link>
                </li>
                <li>
                  <Link to="#">Ipakchilik</Link>
                </li>
                <li>
                  <Link to="#">Tandirchilik</Link>
                </li>
                <li>
                  <Link to="#">Kulolchilik</Link>
                </li>
                <li>
                  <Link to="#">Kategoriya</Link>
                </li>
                <li>
                  <Link to="#">Kasanachilik</Link>
                </li>
                <li>
                  <Link to="#">Kategoriya</Link>
                </li>
                <li>
                  <Link to="#">Kategoriya</Link>
                </li>
              </ul>
            </div>
            <div className="detail">
              <ul>
                <li>E'lonlar</li>
                <li>
                  <Link to="#">Ish e'lonlari</Link>
                </li>
                <li>
                  <Link to="#">Xizmatlar</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mob-menu" style={{ margin: "0 auto" }}>
          <div className="mob-menu-top">
            <div className="logo">
              <Link to="/">
                <svg
                  width="100"
                  height="20"
                  viewBox="0 0 100 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M95.8602 8.67331C95.6202 8.93998 95.2935 9.29998 94.8802 9.75331C94.4802 10.2066 94.0468 10.7066 93.5802 11.2533C93.1135 11.8 92.6402 12.3733 92.1602 12.9733C91.6935 13.5733 91.2668 14.1533 90.8802 14.7133H95.9602V17.1933H87.2602V15.4333C87.5402 14.9533 87.8735 14.44 88.2602 13.8933C88.6602 13.3333 89.0735 12.7733 89.5002 12.2133C89.9402 11.6533 90.3735 11.1133 90.8002 10.5933C91.2268 10.06 91.6202 9.57998 91.9802 9.15331H87.5002V6.67331H95.8602V8.67331Z"
                    fill="white"
                  />
                  <path
                    d="M85.1628 16.8333C84.6561 16.98 84.0028 17.1133 83.2028 17.2333C82.4028 17.3666 81.5628 17.4333 80.6828 17.4333C79.7895 17.4333 79.0428 17.3133 78.4428 17.0733C77.8561 16.8333 77.3895 16.5 77.0428 16.0733C76.6961 15.6333 76.4495 15.1133 76.3028 14.5133C76.1561 13.9133 76.0828 13.2533 76.0828 12.5333V6.67331H79.0628V12.1733C79.0628 13.1333 79.1895 13.8266 79.4428 14.2533C79.6961 14.68 80.1695 14.8933 80.8628 14.8933C81.0761 14.8933 81.3028 14.8866 81.5428 14.8733C81.7828 14.8466 81.9961 14.82 82.1828 14.7933V6.67331H85.1628V16.8333Z"
                    fill="white"
                  />
                  <path
                    d="M74.1809 15.6133C74.1809 16.2133 73.9876 16.6733 73.6009 16.9933C73.2276 17.3 72.8009 17.4533 72.3209 17.4533C71.8409 17.4533 71.4076 17.3 71.0209 16.9933C70.6476 16.6733 70.4609 16.2133 70.4609 15.6133C70.4609 15.0133 70.6476 14.56 71.0209 14.2533C71.4076 13.9333 71.8409 13.7733 72.3209 13.7733C72.8009 13.7733 73.2276 13.9333 73.6009 14.2533C73.9876 14.56 74.1809 15.0133 74.1809 15.6133Z"
                    fill="white"
                  />
                  <path
                    d="M64.2262 15.1133C64.5196 15.1133 64.7996 15.1066 65.0662 15.0933C65.3329 15.08 65.5462 15.06 65.7062 15.0333V12.7733C65.5863 12.7466 65.4063 12.72 65.1663 12.6933C64.9263 12.6666 64.7063 12.6533 64.5063 12.6533C64.2263 12.6533 63.9596 12.6733 63.7062 12.7133C63.4662 12.74 63.2529 12.8 63.0662 12.8933C62.8796 12.9866 62.7329 13.1133 62.6263 13.2733C62.5196 13.4333 62.4662 13.6333 62.4662 13.8733C62.4662 14.34 62.6196 14.6666 62.9263 14.8533C63.2463 15.0266 63.6796 15.1133 64.2262 15.1133ZM63.9863 6.39331C64.8663 6.39331 65.5996 6.49331 66.1863 6.69331C66.7729 6.89331 67.2396 7.17998 67.5863 7.55331C67.9463 7.92665 68.1996 8.37998 68.3462 8.91331C68.4929 9.44665 68.5662 10.04 68.5662 10.6933V16.8933C68.1396 16.9866 67.5463 17.0933 66.7863 17.2133C66.0263 17.3466 65.1063 17.4133 64.0262 17.4133C63.3462 17.4133 62.7262 17.3533 62.1662 17.2333C61.6196 17.1133 61.1463 16.92 60.7463 16.6533C60.3463 16.3733 60.0396 16.0133 59.8262 15.5733C59.6129 15.1333 59.5062 14.5933 59.5062 13.9533C59.5062 13.34 59.6263 12.82 59.8663 12.3933C60.1196 11.9666 60.4529 11.6266 60.8662 11.3733C61.2796 11.12 61.7529 10.94 62.2863 10.8333C62.8196 10.7133 63.3729 10.6533 63.9463 10.6533C64.3329 10.6533 64.6729 10.6733 64.9662 10.7133C65.2729 10.74 65.5196 10.78 65.7062 10.8333V10.5533C65.7062 10.0466 65.5529 9.63998 65.2462 9.33331C64.9396 9.02665 64.4062 8.87331 63.6462 8.87331C63.1396 8.87331 62.6396 8.91331 62.1463 8.99331C61.6529 9.05998 61.2262 9.15998 60.8662 9.29331L60.4862 6.89331C60.6596 6.83998 60.8729 6.78665 61.1262 6.73331C61.3929 6.66665 61.6796 6.61331 61.9863 6.57331C62.2929 6.51998 62.6129 6.47998 62.9463 6.45331C63.2929 6.41331 63.6396 6.39331 63.9863 6.39331Z"
                    fill="white"
                  />
                  <path
                    d="M48.4289 7.03331C48.9356 6.88664 49.5889 6.75331 50.3889 6.63331C51.1889 6.49998 52.0289 6.43331 52.9089 6.43331C53.8022 6.43331 54.5422 6.55331 55.1289 6.79331C55.7289 7.01998 56.2022 7.34664 56.5489 7.77331C56.8956 8.19998 57.1422 8.70664 57.2889 9.29331C57.4356 9.87998 57.5089 10.5333 57.5089 11.2533V17.1933H54.5289V11.6133C54.5289 10.6533 54.4022 9.97331 54.1489 9.57331C53.8956 9.17331 53.4222 8.97331 52.7289 8.97331C52.5156 8.97331 52.2889 8.98664 52.0489 9.01331C51.8089 9.02664 51.5956 9.04664 51.4089 9.07331V17.1933H48.4289V7.03331Z"
                    fill="white"
                  />
                  <path
                    d="M41.3942 15.1133C41.6875 15.1133 41.9675 15.1066 42.2342 15.0933C42.5009 15.08 42.7142 15.06 42.8742 15.0333V12.7733C42.7542 12.7466 42.5742 12.72 42.3342 12.6933C42.0942 12.6666 41.8742 12.6533 41.6742 12.6533C41.3942 12.6533 41.1276 12.6733 40.8742 12.7133C40.6342 12.74 40.4209 12.8 40.2342 12.8933C40.0476 12.9866 39.9009 13.1133 39.7942 13.2733C39.6875 13.4333 39.6342 13.6333 39.6342 13.8733C39.6342 14.34 39.7875 14.6666 40.0942 14.8533C40.4142 15.0266 40.8475 15.1133 41.3942 15.1133ZM41.1542 6.39331C42.0342 6.39331 42.7675 6.49331 43.3542 6.69331C43.9409 6.89331 44.4075 7.17998 44.7542 7.55331C45.1142 7.92665 45.3675 8.37998 45.5142 8.91331C45.6609 9.44665 45.7342 10.04 45.7342 10.6933V16.8933C45.3076 16.9866 44.7142 17.0933 43.9542 17.2133C43.1942 17.3466 42.2742 17.4133 41.1942 17.4133C40.5142 17.4133 39.8942 17.3533 39.3342 17.2333C38.7876 17.1133 38.3142 16.92 37.9142 16.6533C37.5142 16.3733 37.2076 16.0133 36.9942 15.5733C36.7809 15.1333 36.6742 14.5933 36.6742 13.9533C36.6742 13.34 36.7942 12.82 37.0342 12.3933C37.2875 11.9666 37.6209 11.6266 38.0342 11.3733C38.4475 11.12 38.9209 10.94 39.4542 10.8333C39.9875 10.7133 40.5409 10.6533 41.1142 10.6533C41.5009 10.6533 41.8409 10.6733 42.1342 10.7133C42.4409 10.74 42.6875 10.78 42.8742 10.8333V10.5533C42.8742 10.0466 42.7209 9.63998 42.4142 9.33331C42.1076 9.02665 41.5742 8.87331 40.8142 8.87331C40.3075 8.87331 39.8075 8.91331 39.3142 8.99331C38.8209 9.05998 38.3942 9.15998 38.0342 9.29331L37.6542 6.89331C37.8275 6.83998 38.0409 6.78665 38.2942 6.73331C38.5609 6.66665 38.8475 6.61331 39.1542 6.57331C39.4609 6.51998 39.7809 6.47998 40.1142 6.45331C40.4609 6.41331 40.8075 6.39331 41.1542 6.39331Z"
                    fill="white"
                  />
                  <path
                    d="M30.6872 15.0533C31.2339 15.0533 31.6205 15 31.8472 14.8933C32.0739 14.7866 32.1872 14.58 32.1872 14.2733C32.1872 14.0333 32.0405 13.8266 31.7472 13.6533C31.4539 13.4666 31.0072 13.26 30.4072 13.0333C29.9405 12.86 29.5139 12.68 29.1272 12.4933C28.7539 12.3066 28.4339 12.0866 28.1672 11.8333C27.9005 11.5666 27.6939 11.2533 27.5472 10.8933C27.4005 10.5333 27.3272 10.1 27.3272 9.59331C27.3272 8.60665 27.6939 7.82665 28.4272 7.25331C29.1605 6.67998 30.1672 6.39331 31.4472 6.39331C32.0872 6.39331 32.7005 6.45331 33.2872 6.57331C33.8739 6.67998 34.3405 6.79998 34.6872 6.93331L34.1672 9.25331C33.8205 9.13332 33.4405 9.02665 33.0272 8.93331C32.6272 8.83998 32.1739 8.79331 31.6672 8.79331C30.7339 8.79331 30.2672 9.05331 30.2672 9.57331C30.2672 9.69332 30.2872 9.79998 30.3272 9.89331C30.3672 9.98665 30.4472 10.08 30.5672 10.1733C30.6872 10.2533 30.8472 10.3466 31.0472 10.4533C31.2605 10.5466 31.5272 10.6533 31.8472 10.7733C32.5005 11.0133 33.0405 11.2533 33.4672 11.4933C33.8939 11.72 34.2272 11.9733 34.4672 12.2533C34.7205 12.52 34.8939 12.82 34.9872 13.1533C35.0939 13.4866 35.1472 13.8733 35.1472 14.3133C35.1472 15.3533 34.7539 16.14 33.9672 16.6733C33.1939 17.2066 32.0939 17.4733 30.6672 17.4733C29.7339 17.4733 28.9539 17.3933 28.3272 17.2333C27.7139 17.0733 27.2872 16.94 27.0472 16.8333L27.5472 14.4133C28.0539 14.6133 28.5739 14.7733 29.1072 14.8933C29.6405 15 30.1672 15.0533 30.6872 15.0533Z"
                    fill="white"
                  />
                  <path
                    d="M20.6325 15.1133C20.9258 15.1133 21.2058 15.1066 21.4725 15.0933C21.7392 15.08 21.9525 15.06 22.1125 15.0333V12.7733C21.9925 12.7466 21.8125 12.72 21.5725 12.6933C21.3325 12.6666 21.1125 12.6533 20.9125 12.6533C20.6325 12.6533 20.3658 12.6733 20.1125 12.7133C19.8725 12.74 19.6592 12.8 19.4725 12.8933C19.2858 12.9866 19.1392 13.1133 19.0325 13.2733C18.9258 13.4333 18.8725 13.6333 18.8725 13.8733C18.8725 14.34 19.0258 14.6666 19.3325 14.8533C19.6525 15.0266 20.0858 15.1133 20.6325 15.1133ZM20.3925 6.39331C21.2725 6.39331 22.0058 6.49331 22.5925 6.69331C23.1792 6.89331 23.6458 7.17998 23.9925 7.55331C24.3525 7.92665 24.6058 8.37998 24.7525 8.91331C24.8992 9.44665 24.9725 10.04 24.9725 10.6933V16.8933C24.5458 16.9866 23.9525 17.0933 23.1925 17.2133C22.4325 17.3466 21.5125 17.4133 20.4325 17.4133C19.7525 17.4133 19.1325 17.3533 18.5725 17.2333C18.0258 17.1133 17.5525 16.92 17.1525 16.6533C16.7525 16.3733 16.4458 16.0133 16.2325 15.5733C16.0192 15.1333 15.9125 14.5933 15.9125 13.9533C15.9125 13.34 16.0325 12.82 16.2725 12.3933C16.5258 11.9666 16.8592 11.6266 17.2725 11.3733C17.6858 11.12 18.1592 10.94 18.6925 10.8333C19.2258 10.7133 19.7792 10.6533 20.3525 10.6533C20.7392 10.6533 21.0792 10.6733 21.3725 10.7133C21.6792 10.74 21.9258 10.78 22.1125 10.8333V10.5533C22.1125 10.0466 21.9592 9.63998 21.6525 9.33331C21.3458 9.02665 20.8125 8.87331 20.0525 8.87331C19.5458 8.87331 19.0458 8.91331 18.5525 8.99331C18.0592 9.05998 17.6325 9.15998 17.2725 9.29331L16.8925 6.89331C17.0658 6.83998 17.2792 6.78665 17.5325 6.73331C17.7992 6.66665 18.0858 6.61331 18.3925 6.57331C18.6992 6.51998 19.0192 6.47998 19.3525 6.45331C19.6992 6.41331 20.0458 6.39331 20.3925 6.39331Z"
                    fill="white"
                  />
                  <path
                    d="M11.5159 17.1933C11.2359 16.74 10.9026 16.2533 10.5159 15.7333C10.1426 15.2 9.72927 14.6733 9.27594 14.1533C8.83594 13.62 8.37594 13.1133 7.89594 12.6333C7.41594 12.14 6.93594 11.7066 6.45594 11.3333V17.1933H3.33594V3.33331H6.45594V8.57331C7.26927 7.71998 8.0826 6.83331 8.89594 5.91331C9.7226 4.97998 10.4893 4.11998 11.1959 3.33331H14.8959C13.9493 4.45331 12.9959 5.53331 12.0359 6.57331C11.0893 7.61331 10.0893 8.65998 9.03594 9.71331C10.1426 10.6333 11.2093 11.7266 12.2359 12.9933C13.2759 14.26 14.2693 15.66 15.2159 17.1933H11.5159Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </div>
            <div className="phone">
              <a href="tel:+998 99 999 99 99">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.6658 24.771C26.6658 24.771 25.5071 25.909 25.2232 26.2426C24.7606 26.7362 24.2156 26.9693 23.5012 26.9693C23.4325 26.9693 23.3592 26.9693 23.2905 26.9647C21.9304 26.8779 20.6664 26.3477 19.7184 25.8953C17.1263 24.643 14.8501 22.8651 12.9587 20.6119C11.3971 18.7335 10.3529 16.9968 9.66135 15.1321C9.23544 13.9941 9.07973 13.1074 9.14842 12.2711C9.19422 11.7363 9.40031 11.293 9.78042 10.9137L11.3421 9.35519C11.5665 9.14496 11.8046 9.0307 12.0382 9.0307C12.3267 9.0307 12.5603 9.20437 12.7068 9.35062C12.7114 9.35519 12.716 9.35977 12.7206 9.36434C12.9999 9.62485 13.2656 9.8945 13.5449 10.1824C13.6869 10.3287 13.8335 10.4749 13.98 10.6257L15.2303 11.8735C15.7157 12.3579 15.7157 12.8058 15.2303 13.2903C15.0975 13.4228 14.9692 13.5553 14.8364 13.6833C14.4517 14.0764 14.7539 13.7748 14.3555 14.1313C14.3463 14.1404 14.3372 14.145 14.3326 14.1541C13.9387 14.5472 14.012 14.9311 14.0944 15.1916C14.099 15.2053 14.1036 15.219 14.1082 15.2327C14.4333 16.0188 14.8913 16.7592 15.5874 17.6413L15.592 17.6459C16.856 19.1998 18.1887 20.4109 19.6588 21.3387C19.8465 21.4575 20.0389 21.5535 20.2221 21.6449C20.3869 21.7272 20.5427 21.8049 20.6755 21.8871C20.6938 21.8963 20.7121 21.91 20.7304 21.9191C20.8861 21.9968 21.0327 22.0334 21.1838 22.0334C21.5639 22.0334 21.8021 21.7957 21.8799 21.718L22.7776 20.8222C22.9333 20.6668 23.1806 20.4794 23.4691 20.4794C23.7531 20.4794 23.9866 20.6576 24.1286 20.813C24.1332 20.8176 24.1332 20.8176 24.1378 20.8222L26.6612 23.3404C27.1329 23.8066 26.6658 24.771 26.6658 24.771Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="mob-menu-middle">
            <Link to="/">
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 18.3334V10H11.5V18.3334M1.5 7.50002L9 1.66669L16.5 7.50002V16.6667C16.5 17.1087 16.3244 17.5326 16.0118 17.8452C15.6993 18.1578 15.2754 18.3334 14.8333 18.3334H3.16667C2.72464 18.3334 2.30072 18.1578 1.98816 17.8452C1.67559 17.5326 1.5 17.1087 1.5 16.6667V7.50002Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Bosh sahifa
            </Link>
            <Link to="#">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1267_31671)">
                  <path
                    d="M0.664062 8.00002C0.664062 8.00002 3.33073 2.66669 7.9974 2.66669C12.6641 2.66669 15.3307 8.00002 15.3307 8.00002C15.3307 8.00002 12.6641 13.3334 7.9974 13.3334C3.33073 13.3334 0.664062 8.00002 0.664062 8.00002Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.9974 10C9.10196 10 9.9974 9.10459 9.9974 8.00002C9.9974 6.89545 9.10196 6.00002 7.9974 6.00002C6.89283 6.00002 5.9974 6.89545 5.9974 8.00002C5.9974 9.10459 6.89283 10 7.9974 10Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1267_31671">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <Link to="#">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33073 12L0.664062 14.6666V3.99998L5.33073 1.33331M5.33073 12L10.6641 14.6666M5.33073 12V1.33331M10.6641 14.6666L15.3307 12V1.33331L10.6641 3.99998M10.6641 14.6666V3.99998M10.6641 3.99998L5.33073 1.33331"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>
            <li className="dropdown-mob-color">
              <Link to="#" onClick={toggleDropDown}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6693 7.99998C14.6693 11.6819 11.6845 14.6666 8.0026 14.6666M14.6693 7.99998C14.6693 4.31808 11.6845 1.33331 8.0026 1.33331M14.6693 7.99998H1.33594M8.0026 14.6666C4.32071 14.6666 1.33594 11.6819 1.33594 7.99998M8.0026 14.6666C9.67012 12.8411 10.6178 10.472 10.6693 7.99998C10.6178 5.528 9.67012 3.15888 8.0026 1.33331M8.0026 14.6666C6.33508 12.8411 5.38744 10.472 5.33594 7.99998C5.38744 5.528 6.33508 3.15888 8.0026 1.33331M1.33594 7.99998C1.33594 4.31808 4.32071 1.33331 8.0026 1.33331"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>{selectedLanguage}</span>
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
              </Link>
              {isOpen && (
                <ul>
                  {languages.map((lang) => (
                    <li key={lang}>
                      <Link to="#" onClick={() => handleLanguageChange(lang)}>
                        <span>{lang}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <Link to="#">
              <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 3C21 1.9 20.1 1 19 1H3C1.9 1 1 1.9 1 3M21 3V15C21 16.1 20.1 17 19 17H3C1.9 17 1 16.1 1 15V3M21 3L11 10L1 3"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>
            <Link to="#">
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.73 20C11.5542 20.3031 11.3018 20.5547 10.9982 20.7295C10.6946 20.9044 10.3504 20.9965 10 20.9965C9.64962 20.9965 9.30539 20.9044 9.00177 20.7295C8.69816 20.5547 8.44581 20.3031 8.27 20M16 7C16 5.4087 15.3679 3.88258 14.2426 2.75736C13.1174 1.63214 11.5913 1 10 1C8.4087 1 6.88258 1.63214 5.75736 2.75736C4.63214 3.88258 4 5.4087 4 7C4 14 1 16 1 16H19C19 16 16 14 16 7Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>
          </div>
          {menus.map((menu, index) => (
            <div
              key={index}
              style={{ marginBottom: "10px" }}
              className={`department ${
                activeMenu === index ? "active-department" : ""
              }`}
            >
              <button onClick={() => toggleMenu(index)}>
                <img src={menu.image} alt="" />
                {menu.title}
              </button>
              <ul
                className={`dropdown-mob ${
                  activeMenu === index ? "open" : "closed"
                }`}
              >
                {menu.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
