import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./profileSideBar.scss";
import { MyContext } from "../../context/myContext";

const ProfileSideBar = () => {
  const { setSelectedLanguage, setLanguages, setToken, setIsAuthenticated } =
    useContext(MyContext);
  const [activeLink, setActiveLink] = useState("profile");
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // Tokenlarni localStorage'dan o'chirish
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // Foydalanuvchi holatini yangilash (agar kontekstdan foydalanayotgan bo'lsangiz)
    setSelectedLanguage(""); // Yoki boshqa kerakli holatlarni yangilash
    // setLanguages([]); // Kerakli bo'lsa
    setToken(""); // Agar tokenni state'da saqlayotgan bo'lsangiz
    setIsAuthenticated(false);

    // Tizimdan chiqqandan so'ng foydalanuvchini login sahifasiga yo'naltirish
    navigate("/");
  };

  const handleClickLink = (link) => {
    setActiveLink(link); // holatni yangilash
  };
  console.log(activeLink);
  

  return (
    <div id="profileSideBar">
      <ul>
        <li>
          <Link
            to="/profile"
            onClick={() => handleClickLink("profile")}
            className={activeLink === "profile" ? "active" : ""}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.23828 19.5C4.56369 17.2892 7.46856 15.7762 12.0006 15.7762C16.5326 15.7762 19.4374 17.2892 20.7628 19.5M15.6006 8.1C15.6006 10.0882 13.9888 11.7 12.0006 11.7C10.0123 11.7 8.40056 10.0882 8.40056 8.1C8.40056 6.11177 10.0123 4.5 12.0006 4.5C13.9888 4.5 15.6006 6.11177 15.6006 8.1Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            Shaxsiy ma'lumotlarim
          </Link>
        </li>
        <li>
          <Link
            to="/profile/statistic"
            onClick={() => handleClickLink("statistic")}
            className={activeLink === "statistic" ? "active" : ""}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1423_9447)">
                <path
                  d="M23.707 23.707C23.512 23.902 23.256 24 23 24C22.744 24 22.488 23.902 22.293 23.707L16.324 17.738C14.599 19.15 12.397 20 10 20C4.486 20 0 15.514 0 10C0 4.48602 4.486 1.75824e-05 10 1.75824e-05C11.758 1.75824e-05 13.487 0.463018 15.001 1.33802C15.479 1.61502 15.643 2.22702 15.365 2.70502C15.18 3.02502 14.844 3.20402 14.499 3.20402C14.329 3.20402 14.157 3.16102 13.999 3.07002C12.79 2.37002 11.407 2.00002 10 2.00002C5.589 2.00002 2 5.58902 2 10C2 11.167 2.257 12.274 2.709 13.274L6.508 8.71502C6.87 8.27902 7.404 8.01502 7.97 7.98902C8.532 7.96402 9.092 8.17702 9.494 8.58002L11.422 10.508L20.237 0.340018C20.599 -0.0789824 21.231 -0.121982 21.647 0.237018C22.065 0.598018 22.112 1.23002 21.751 1.64802L12.971 11.814C12.605 12.238 12.074 12.493 11.513 12.514C10.956 12.528 10.405 12.319 10.008 11.922L8.08 9.99402L3.817 15.069C5.285 16.857 7.512 17.999 10 17.999C14.411 17.999 18 14.41 18 9.99902C18 9.84902 17.995 9.70002 17.987 9.55202C17.958 9.00002 18.382 8.53002 18.933 8.50002C19.48 8.46002 19.955 8.89402 19.985 9.44502C19.995 9.62802 20 9.81302 20 9.99802C20 12.396 19.15 14.598 17.738 16.322L23.707 22.291C24.098 22.682 24.098 23.314 23.707 23.705V23.707Z"
                  fill="#757575"
                />
              </g>
              <defs>
                <clipPath id="clip0_1423_9447">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Statistika
          </Link>
        </li>
        <li>
          <Link
            to="/profile/products"
            onClick={() => handleClickLink("products")}
            className={activeLink === "products" ? "active" : ""}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.5326 7.20002H2.46822M15 10.5C12.6569 10.5 9 10.5 9 10.5M21.6004 7.76659V19.2C21.6004 20.5255 20.5259 21.6 19.2004 21.6H4.80039C3.47491 21.6 2.40039 20.5255 2.40039 19.2V7.76659C2.40039 7.394 2.48714 7.02653 2.65377 6.69327L4.30288 3.39504C4.60779 2.78523 5.23106 2.40002 5.91285 2.40002H18.0879C18.7697 2.40002 19.393 2.78523 19.6979 3.39504L21.347 6.69328C21.5136 7.02653 21.6004 7.394 21.6004 7.76659Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Mahsulotlarim
          </Link>
        </li>
        <li>
          <Link
            to="/profile/liked-products"
            onClick={() => handleClickLink("likedProducts")}
            className={activeLink === "likedProducts" ? "active" : ""}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1423_19648)">
                <path
                  d="M17.5009 1.91699C16.3749 1.93451 15.2734 2.24885 14.3077 2.82826C13.342 3.40768 12.5463 4.23166 12.0009 5.21699C11.4556 4.23166 10.6599 3.40768 9.69417 2.82826C8.72848 2.24885 7.62698 1.93451 6.50094 1.91699C4.70588 1.99498 3.01464 2.78025 1.79672 4.10122C0.578794 5.4222 -0.0668157 7.17152 0.000934853 8.96699C0.000934853 13.514 4.78693 18.48 8.80093 21.847C9.69715 22.6001 10.8303 23.013 12.0009 23.013C13.1716 23.013 14.3047 22.6001 15.2009 21.847C19.2149 18.48 24.0009 13.514 24.0009 8.96699C24.0687 7.17152 23.4231 5.4222 22.2052 4.10122C20.9872 2.78025 19.296 1.99498 17.5009 1.91699ZM13.9159 20.317C13.3799 20.7684 12.7017 21.0159 12.0009 21.0159C11.3002 21.0159 10.622 20.7684 10.0859 20.317C4.94793 16.006 2.00093 11.87 2.00093 8.96699C1.93258 7.70171 2.3673 6.46072 3.2103 5.51469C4.0533 4.56866 5.23617 3.99434 6.50094 3.91699C7.7657 3.99434 8.94857 4.56866 9.79157 5.51469C10.6346 6.46072 11.0693 7.70171 11.0009 8.96699C11.0009 9.23221 11.1063 9.48656 11.2938 9.6741C11.4814 9.86164 11.7357 9.96699 12.0009 9.96699C12.2662 9.96699 12.5205 9.86164 12.708 9.6741C12.8956 9.48656 13.0009 9.23221 13.0009 8.96699C12.9326 7.70171 13.3673 6.46072 14.2103 5.51469C15.0533 4.56866 16.2362 3.99434 17.5009 3.91699C18.7657 3.99434 19.9486 4.56866 20.7916 5.51469C21.6346 6.46072 22.0693 7.70171 22.0009 8.96699C22.0009 11.87 19.0539 16.006 13.9159 20.313V20.317Z"
                  fill="#757575"
                />
              </g>
              <defs>
                <clipPath id="clip0_1423_19648">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Yoqqan mahsulotlar
          </Link>
        </li>
        <li>
          <Link
            to="/profile/my-announces"
            onClick={() => handleClickLink("my-announce")}
            className={activeLink === "my-announce" ? "active" : ""}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1423_18476)">
                <path
                  d="M7 11C9.757 11 12 8.757 12 6C12 3.243 9.757 1 7 1C4.243 1 2 3.243 2 6C2 8.757 4.243 11 7 11ZM7 3C8.654 3 10 4.346 10 6C10 7.654 8.654 9 7 9C5.346 9 4 7.654 4 6C4 4.346 5.346 3 7 3ZM11.88 17.802C11.96 18.196 12 18.598 12 19V23C12 23.553 11.552 24 11 24C10.448 24 10 23.553 10 23V19C10 18.731 9.973 18.461 9.92 18.198C9.81 17.657 10.16 17.13 10.702 17.019C11.243 16.911 11.771 17.26 11.88 17.802ZM23 3.592V1C23 0.735 22.895 0.48 22.707 0.293C22.519 0.106 22.265 0 22 0C21.449 0 21.028 0.295 20.905 0.724C20.669 1.547 19.992 2 19 2H17C15.346 2 14 3.346 14 5C14 5.695 14.247 6.327 14.645 6.836L16.418 10.948L14.744 12.693C14.556 12.888 14.293 13.001 14.022 13.001H6C2.691 13.001 0 15.692 0 19.001V23.001C0 23.554 0.448 24.001 1 24.001C1.552 24.001 2 23.554 2 23.001V19.001C2 16.795 3.794 15.001 6 15.001H14.022C14.834 15.001 15.623 14.665 16.187 14.078C16.187 14.078 18.272 11.895 18.524 11.643C18.776 11.391 19.005 10.935 18.996 10.703C19.015 10.472 18.976 10.237 18.879 10.017L18.089 8.001H19.001C19.993 8.001 20.67 8.454 20.906 9.277C21.029 9.706 21.424 10.001 22 10.001C22.552 10.001 23 9.553 23 9.001V6.409C23.581 6.202 24.001 5.652 24.001 5.001C24.001 4.35 23.582 3.8 23.001 3.593L23 3.592ZM21 6.464C20.421 6.163 19.743 6 19 6H17C16.449 6 16 5.551 16 5C16 4.449 16.449 4 17 4H19C19.743 4 20.421 3.837 21 3.536V6.464Z"
                  fill="#757575"
                />
              </g>
              <defs>
                <clipPath id="clip0_1423_18476">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            E'lonlarim
          </Link>
        </li>
        <li>
          <Link
            to="/profile/liked-announces"
            onClick={() => handleClickLink("liked-announce")}
            className={activeLink === "liked-announce" ? "active" : ""}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1520_3016)">
                <path
                  d="M20.1371 24C19.7672 23.999 19.4011 23.9247 19.0601 23.7813C18.719 23.638 18.4097 23.4285 18.1501 23.165L12.0001 17.051L5.85012 23.169C5.45515 23.5697 4.94861 23.8422 4.39654 23.9508C3.84447 24.0594 3.27247 23.9992 2.75512 23.778C2.23264 23.5678 1.78567 23.205 1.47258 22.7369C1.15949 22.2688 0.994841 21.7171 1.00012 21.154V5C1.00012 3.67392 1.52691 2.40215 2.46459 1.46447C3.40227 0.526784 4.67404 0 6.00012 0L18.0001 0C18.6567 0 19.3069 0.129329 19.9135 0.380602C20.5202 0.631876 21.0714 1.00017 21.5357 1.46447C22 1.92876 22.3683 2.47996 22.6195 3.08658C22.8708 3.69321 23.0001 4.34339 23.0001 5V21.154C23.0057 21.7167 22.8417 22.268 22.5293 22.7361C22.217 23.2041 21.7709 23.5672 21.2491 23.778C20.8969 23.9253 20.5189 24.0008 20.1371 24ZM6.00012 2C5.20447 2 4.44141 2.31607 3.8788 2.87868C3.31619 3.44129 3.00012 4.20435 3.00012 5V21.154C2.99976 21.3206 3.04879 21.4836 3.14102 21.6224C3.23325 21.7612 3.36455 21.8695 3.51831 21.9337C3.67208 21.9979 3.84143 22.0151 4.00496 21.9831C4.1685 21.9512 4.31888 21.8714 4.43712 21.754L11.3001 14.933C11.4875 14.7468 11.7409 14.6422 12.0051 14.6422C12.2693 14.6422 12.5228 14.7468 12.7101 14.933L19.5651 21.752C19.6834 21.8694 19.8338 21.9492 19.9973 21.9811C20.1608 22.0131 20.3302 21.9959 20.4839 21.9317C20.6377 21.8675 20.769 21.7592 20.8612 21.6204C20.9535 21.4816 21.0025 21.3186 21.0021 21.152V5C21.0021 4.20435 20.6861 3.44129 20.1234 2.87868C19.5608 2.31607 18.7978 2 18.0021 2H6.00012Z"
                  fill="#757575"
                />
              </g>
              <defs>
                <clipPath id="clip0_1520_3016">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Saqlangan e'lonlar
          </Link>
        </li>
        <li>
          <Link
            to="/profile/courses"
            className={activeLink === "courses" ? "active" : ""}
            onClick={() => handleClickLink("courses")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5997 12.8095L15.0541 11.9714L15.0402 11.9805L15.0266 11.99L15.5997 12.8095ZM15.5997 11.4333L15.0068 12.2385L15.0514 12.2714L15.0993 12.2991L15.5997 11.4333ZM10.0843 7.37199L10.6772 6.56675L10.649 6.54597L10.6194 6.52722L10.0843 7.37199ZM8.92802 7.9786L9.92802 7.9757L9.928 7.96694L9.92782 7.95819L8.92802 7.9786ZM8.95115 15.9563L7.95115 15.9592L7.95124 15.9875L7.95292 16.0157L8.95115 15.9563ZM10.1498 16.6211L10.634 17.4961L10.6799 17.4707L10.7229 17.4406L10.1498 16.6211ZM12.0004 20.6C7.25074 20.6 3.40039 16.7497 3.40039 12H1.40039C1.40039 17.8542 6.14617 22.6 12.0004 22.6V20.6ZM20.6004 12C20.6004 16.7497 16.75 20.6 12.0004 20.6V22.6C17.8546 22.6 22.6004 17.8542 22.6004 12H20.6004ZM12.0004 3.40002C16.75 3.40002 20.6004 7.25038 20.6004 12H22.6004C22.6004 6.14581 17.8546 1.40002 12.0004 1.40002V3.40002ZM12.0004 1.40002C6.14617 1.40002 1.40039 6.14581 1.40039 12H3.40039C3.40039 7.25038 7.25074 3.40002 12.0004 3.40002V1.40002ZM16.1453 13.6475C16.5797 13.3647 17.1288 12.8604 17.1277 12.1001C17.1267 11.3174 16.5494 10.8272 16.1001 10.5675L15.0993 12.2991C15.204 12.3596 15.2233 12.391 15.2087 12.3725C15.1871 12.3449 15.1279 12.2502 15.1277 12.1028C15.1275 11.9592 15.1836 11.8746 15.1924 11.8628C15.1966 11.8571 15.1659 11.8986 15.0541 11.9714L16.1453 13.6475ZM16.1926 10.628L10.6772 6.56675L9.49135 8.17723L15.0068 12.2385L16.1926 10.628ZM10.6194 6.52722C10.1488 6.22911 9.48793 6.0583 8.86292 6.35013C8.18267 6.66775 7.91503 7.35198 7.92823 7.999L9.92782 7.95819C9.92662 7.89963 9.93881 7.91856 9.90805 7.97741C9.8734 8.04372 9.80571 8.1172 9.70906 8.16233C9.5231 8.24915 9.44807 8.15272 9.54917 8.21676L10.6194 6.52722ZM7.92803 7.98149L7.95115 15.9592L9.95115 15.9534L9.92802 7.9757L7.92803 7.98149ZM7.95292 16.0157C7.98473 16.55 8.17048 17.2623 8.8409 17.6204C9.501 17.973 10.1883 17.7428 10.634 17.4961L9.6656 15.7462C9.56648 15.801 9.52752 15.8041 9.54317 15.8019C9.56683 15.7986 9.66449 15.7929 9.7831 15.8562C9.90338 15.9205 9.95544 16.0078 9.96806 16.0347C9.97637 16.0524 9.9566 16.0181 9.94938 15.8969L7.95292 16.0157ZM10.7229 17.4406L16.1728 13.6289L15.0266 11.99L9.57668 15.8017L10.7229 17.4406Z"
                fill="#757575"
              />
            </svg>
            Kurslar
          </Link>
        </li>
        <li>
          <Link
            to="/profile/liked-courses"
            className={activeLink === "likedCourses" ? "active" : ""}
            onClick={() => handleClickLink("likedCourses")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1423_7475)">
                <path
                  d="M12 0C5.383 0 0 5.383 0 12C0 18.617 5.383 24 12 24C18.617 24 24 18.617 24 12C24 5.383 18.617 0 12 0ZM12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22ZM14 6H10C8.346 6 7 7.346 7 9V16.271C7 16.972 7.418 17.598 8.066 17.866C8.713 18.137 9.452 17.987 9.948 17.492L12 15.44L14.052 17.492C14.383 17.823 14.823 17.999 15.272 17.999C15.495 17.999 15.719 17.956 15.934 17.866C16.582 17.598 17 16.972 17 16.271V9C17 7.346 15.654 6 14 6ZM15 15.612L12 12.612L9 15.612V9C9 8.449 9.448 8 10 8H14C14.552 8 15 8.449 15 9V15.612Z"
                  fill="#757575"
                />
              </g>
              <defs>
                <clipPath id="clip0_1423_7475">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Yoqqan kurslar
          </Link>
        </li>
        <li>
          <Link
            to="/profile/messages"
            className={activeLink === "messages" ? "active" : ""}
            onClick={() => handleClickLink("messages")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1423_20720)">
                <path
                  d="M19 1H5C3.67441 1.00159 2.40356 1.52888 1.46622 2.46622C0.528882 3.40356 0.00158786 4.67441 0 6L0 18C0.00158786 19.3256 0.528882 20.5964 1.46622 21.5338C2.40356 22.4711 3.67441 22.9984 5 23H19C20.3256 22.9984 21.5964 22.4711 22.5338 21.5338C23.4711 20.5964 23.9984 19.3256 24 18V6C23.9984 4.67441 23.4711 3.40356 22.5338 2.46622C21.5964 1.52888 20.3256 1.00159 19 1ZM5 3H19C19.5988 3.00118 20.1835 3.18151 20.679 3.5178C21.1744 3.85409 21.5579 4.33095 21.78 4.887L14.122 12.546C13.5584 13.1073 12.7954 13.4225 12 13.4225C11.2046 13.4225 10.4416 13.1073 9.878 12.546L2.22 4.887C2.44215 4.33095 2.82561 3.85409 3.32105 3.5178C3.81648 3.18151 4.40121 3.00118 5 3ZM19 21H5C4.20435 21 3.44129 20.6839 2.87868 20.1213C2.31607 19.5587 2 18.7956 2 18V7.5L8.464 13.96C9.40263 14.8963 10.6743 15.422 12 15.422C13.3257 15.422 14.5974 14.8963 15.536 13.96L22 7.5V18C22 18.7956 21.6839 19.5587 21.1213 20.1213C20.5587 20.6839 19.7956 21 19 21Z"
                  fill="#767676"
                />
              </g>
              <defs>
                <clipPath id="clip0_1423_20720">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Xabarlar
          </Link>
        </li>
        <li>
          <Link
            to="/profile/messages"
            className={activeLink === "notifications" ? "active" : ""}
            onClick={() => handleClickLink("notifications")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1423_24743)">
                <path
                  d="M22.5555 13.662L20.6555 6.826C20.0986 4.82333 18.8882 3.06428 17.2168 1.82847C15.5454 0.592648 13.5089 -0.049018 11.4309 0.00546213C9.35299 0.0599422 7.35288 0.807442 5.74853 2.12914C4.14419 3.45085 3.02767 5.2709 2.57647 7.3L1.10547 13.915C0.942986 14.6459 0.946742 15.404 1.11646 16.1333C1.28618 16.8626 1.61753 17.5445 2.08605 18.1285C2.55457 18.7126 3.14829 19.184 3.82338 19.508C4.49847 19.8319 5.23769 20 5.98647 20H7.10047C7.32999 21.1303 7.9432 22.1465 8.83621 22.8764C9.72922 23.6063 10.8471 24.005 12.0005 24.005C13.1538 24.005 14.2717 23.6063 15.1647 22.8764C16.0577 22.1465 16.671 21.1303 16.9005 20H17.7385C18.5093 20.0001 19.2697 19.8219 19.9602 19.4794C20.6508 19.137 21.2528 18.6395 21.7193 18.0259C22.1858 17.4122 22.504 16.699 22.6493 15.942C22.7945 15.185 22.7617 14.4047 22.5555 13.662ZM12.0005 22C11.3822 21.9974 10.7798 21.8039 10.2758 21.4459C9.7717 21.0879 9.39055 20.5829 9.18447 20H14.8165C14.6104 20.5829 14.2292 21.0879 13.7252 21.4459C13.2211 21.8039 12.6187 21.9974 12.0005 22ZM20.1265 16.815C19.8478 17.1847 19.4868 17.4843 19.0721 17.69C18.6574 17.8957 18.2004 18.0018 17.7375 18H5.98647C5.53725 17.9999 5.09379 17.899 4.68881 17.7046C4.28383 17.5102 3.92768 17.2273 3.64663 16.8769C3.36559 16.5265 3.16683 16.1174 3.06503 15.6798C2.96323 15.2423 2.96099 14.7875 3.05847 14.349L4.52847 7.733C4.88282 6.1392 5.75978 4.7096 7.01993 3.67144C8.28008 2.63329 9.85109 2.04617 11.4832 2.00341C13.1154 1.96065 14.715 2.46471 16.0278 3.43546C17.3406 4.40622 18.2912 5.78794 18.7285 7.361L20.6285 14.197C20.754 14.6424 20.774 15.1109 20.6869 15.5653C20.5997 16.0198 20.4079 16.4477 20.1265 16.815Z"
                  fill="#767676"
                />
              </g>
              <defs>
                <clipPath id="clip0_1423_24743">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Xabarnomalar
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className={activeLink === "settings" ? "active" : ""}
            onClick={() => handleClickLink("settings")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.75602 4.25546L10.0271 2.42882C10.214 2.16017 10.5206 2 10.8479 2H12.653C12.9791 2 13.2847 2.15898 13.4719 2.426L14.7297 4.22032M8.75602 4.25546C8.40917 4.75031 7.83262 4.99279 7.22068 4.94956M8.75602 4.25546C8.40748 4.74912 7.83262 4.9948 7.22068 4.94956M7.22068 4.94956L4.97158 4.80836C4.65073 4.78821 4.33977 4.92355 4.13585 5.17208L2.99534 6.56208C2.77914 6.82557 2.71204 7.18104 2.8173 7.50522L3.47315 9.52504M3.47315 9.52504C3.56207 9.81338 3.57345 10.1223 3.50981 10.414M3.47315 9.52504C3.56334 9.81286 3.5743 10.1211 3.50939 10.417M3.50981 10.414C3.44533 10.7023 3.3071 10.9745 3.10185 11.1949M3.50981 10.414L3.50939 10.417M3.10185 11.1949L1.61575 12.7933C1.38735 13.0389 1.29732 13.3827 1.376 13.7088L1.77856 15.377C1.85699 15.702 2.09263 15.9663 2.40653 16.0813L4.44838 16.8297C4.73328 16.9399 4.97941 17.1191 5.16569 17.3449M3.10185 11.1949C3.30836 10.9763 3.44533 10.705 3.50939 10.417M5.16569 17.3449C5.35071 17.5713 5.47672 17.8445 5.52561 18.1404M5.16569 17.3449C5.35239 17.5713 5.47883 17.8438 5.52561 18.1404M5.16569 17.3449L5.16274 17.3416C5.15052 17.3268 5.13745 17.3114 5.12481 17.297M5.52561 18.1404L5.87327 20.2759C5.92654 20.6031 6.13849 20.8827 6.43917 21.0223L8.0671 21.7781C8.35817 21.9132 8.6964 21.9005 8.97646 21.7438L10.8902 20.6731M10.8902 20.6731C11.1553 20.5242 11.4512 20.4495 11.747 20.4491M10.8902 20.6731C10.9952 20.6134 11.1052 20.5657 11.2181 20.5299C11.3897 20.4756 11.5684 20.4488 11.747 20.4491M11.747 20.4491C11.9009 20.4495 12.0547 20.4698 12.2047 20.51C12.3442 20.5474 12.48 20.6018 12.6085 20.6731M11.747 20.4491C12.0442 20.4487 12.3417 20.5234 12.6085 20.6731M12.6085 20.6731L14.612 21.7576C14.8932 21.9099 15.2304 21.9185 15.519 21.7806L17.1391 21.0068C17.4387 20.8637 17.6478 20.5812 17.6971 20.2529L18.0085 18.178M18.0085 18.178C18.0553 17.8805 18.1796 17.6052 18.3642 17.3768M18.0085 18.178C18.0536 17.8798 18.1788 17.6049 18.3642 17.3768M18.3642 17.3768C18.5476 17.1508 18.7907 16.9707 19.074 16.8593M18.3642 17.3768C18.5471 17.1499 18.7895 16.9693 19.074 16.8593M19.074 16.8593L21.1369 16.0508C21.4449 15.9301 21.6733 15.6649 21.7469 15.3425L22.1326 13.6539C22.2061 13.3323 22.1162 12.9952 21.8924 12.7528L20.3973 11.134M20.3973 11.134C20.1883 10.9128 20.0424 10.6485 19.9716 10.3677M20.3973 11.134C20.2991 11.0307 20.2148 10.9177 20.1461 10.798C20.0677 10.662 20.0092 10.5173 19.9716 10.3677M19.9716 10.3677C19.9021 10.0889 19.9063 9.79349 19.9944 9.50752L20.641 7.43487C20.7414 7.11307 20.6729 6.76235 20.4588 6.50196L19.3464 5.14894C19.1401 4.89805 18.8249 4.76298 18.5009 4.7867L16.2776 4.94956M16.2776 4.94956C15.9733 4.97104 15.6741 4.91308 15.4078 4.78839M16.2776 4.94956C15.9729 4.97228 15.6741 4.91385 15.4078 4.78839M15.4078 4.78839C15.1397 4.6621 14.9046 4.4679 14.7297 4.22032M15.4078 4.78839C15.1393 4.66256 14.9037 4.46888 14.7297 4.22032M3.50939 10.417L3.51024 10.4126M15.1359 12.0106C15.1359 13.8756 13.59 15.3874 11.6834 15.3874C9.77677 15.3874 8.23089 13.8756 8.23089 12.0106C8.23089 10.1457 9.77677 8.63386 11.6834 8.63386C13.59 8.63386 15.1359 10.1457 15.1359 12.0106Z"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            Sozlamalar
          </Link>
        </li>
        <li>
          <Link
            to="logout"
            id="logout-profile"
            onClick={(e) => handleLogout(e)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.2194 20.4L18.9253 20.4C19.487 20.4 20.0256 20.1787 20.4227 19.7849C20.8199 19.3911 21.043 18.8569 21.043 18.3L21.043 5.69999C21.043 5.14304 20.8199 4.6089 20.4227 4.21507C20.0256 3.82124 19.487 3.59999 18.9253 3.59999L15.2194 3.59999M14.9563 12L2.95625 12M2.95625 12L7.5414 16.8M2.95625 12L7.5414 7.19999"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Chiqish
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSideBar;
