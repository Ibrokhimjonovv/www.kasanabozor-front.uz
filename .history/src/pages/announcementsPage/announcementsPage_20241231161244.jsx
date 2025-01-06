import React, { useContext, useEffect } from "react";
import img from "./posterImg.png";
import backgroundImg from "./backgroundImg.png";
import "./announcementsPage.scss";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/myContext";
import defaultImg from "./default.png";
const AnnouncementsPage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
  };
  const { announcements } = useContext(MyContext);
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

  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".service-card:not(.revealed)");
      reveals.forEach((revealElement) => {
        const windowHeight = window.innerHeight;
        const revealTop = revealElement.getBoundingClientRect().top;
        const revealPoint = windowHeight * 0.9;

        if (revealTop < revealPoint && !revealElement.classList.contains("revealed")) {
          revealElement.classList.add("revealed");
        }
      });
    };

    window.addEventListener("scroll", reveal);

    // Birinchi ochilish uchun chaqiriladi
    reveal();

    // Scroll listenerni tozalash
    return () => window.removeEventListener("scroll", reveal);
  }, []);
  return (
    <div id="announcementsPage">
      <div className="miniPoster" style={backgroundStyle}>
        <div className="text">E'lonlar</div>
        <img src={img} alt="" />
      </div>
      <div className="to-announce">
        <p>O’z xizmatingiz haqida hoziroq barcha e’lon qiling!</p>
        <Link to="/add-announce">E'lon berish</Link>
      </div>
      <div className="titlee">
        <div className="text">
          <h2>E'lonlar</h2>
          <p>Barchasini bizda toping</p>
        </div>
        <Link to="#">Ko'proq ko'rish</Link>
      </div>
      <div className="announcements-cards">
        {announcements.map((announcement, index) => (
          <Link to={`${announcement.id}`} key={announcement.id} className="scroll-fade-effect">
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

      <div className="services">
        <div className="titlee">
          <div className="text">
            <h2>Xizmatlar</h2>
            <p>Barchasini bizda toping</p>
          </div>
          <Link to="#">Ko'proq ko'rish</Link>
        </div>
        <div className="services-cards">
          <Link to="#">
            <div className="service-card">
              <div className="img-card">{/* <img src="" alt="" /> */}</div>
              <div className="service-title">Tandir yasash</div>
              <div className="service-desc">
                An'anaviy usulda tayyorlangan bilaguzuk, juda chiroyli va
                naqshli.
              </div>
              <div className="author-location">
                <div className="author">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/c870/b001/e095367b2478bb59d0ad913ccd2fd1f5?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=W2p6XYgFJUwnnYcLvM~QmWkx6SzBNHO4lmGITJvaXJZsAAwR9OaQ7SV-KagLrHcRDIsikzqu5Dk3OSpIYgVILoOJKyWHgdBo-XtIJj6s3pBjgL1Iil5nZzWzi-GO3ZXP-fgjlKuqO5Xchy8K3ogS1K1Ow9Xs4d-bbMCXf2UesphmmRBcyFA6x3XupJkPqAWz79eCNJO3pW1z1AnoIeRJ5GIINjw8T-3jrSeUOAqYHbVgF~Kz~9bZeREBswL26P7SAxgnVUeEMn7I2qufO6oT688ggtJBn5quJxWc~e1EhetyL3EsQ~mtD8QfDM60v1gptUfU~juF6rs6wDkT4fEOrg__"
                    alt=""
                  />
                  <span>Otabek Rajabov</span>
                </div>
                <div className="location">Toshkent shaxri</div>
              </div>
              <div className="service-date">
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.9974 5.00002V10L13.3307 11.6667M18.3307 10C18.3307 14.6024 14.5998 18.3334 9.9974 18.3334C5.39502 18.3334 1.66406 14.6024 1.66406 10C1.66406 5.39765 5.39502 1.66669 9.9974 1.66669C14.5998 1.66669 18.3307 5.39765 18.3307 10Z"
                      stroke="#767676"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span>Bugun</span>
                </span>
                <span>
                  <svg
                    width="21"
                    height="16"
                    viewBox="0 0 21 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.17188 7.99998C1.17188 7.99998 4.50521 1.33331 10.3385 1.33331C16.1719 1.33331 19.5052 7.99998 19.5052 7.99998C19.5052 7.99998 16.1719 14.6666 10.3385 14.6666C4.50521 14.6666 1.17188 7.99998 1.17188 7.99998Z"
                      stroke="#767676"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.3385 10.5C11.7193 10.5 12.8385 9.38069 12.8385 7.99998C12.8385 6.61927 11.7193 5.49998 10.3385 5.49998C8.95783 5.49998 7.83854 6.61927 7.83854 7.99998C7.83854 9.38069 8.95783 10.5 10.3385 10.5Z"
                      stroke="#767676"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span>456</span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
