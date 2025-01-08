import React, { useState, useContext, useEffect } from "react";
import category1 from "./Cup_perspective_matte.png";
import category2 from "./E-mail_perspective_matte.png";
import category3 from "./Heart_rate_perspective_matte.png";
import category4 from "./Gym_perspective_matte.png";
import category5 from "./Paints_perspective_matte.png";
import category6 from "./Radio_perspective_matte.png";
import category7 from "./Star_perspective_matte.png";
import category8 from "./Tools_perspective_matte.png";
import category9 from "./Grid.png";
import { Link } from "react-router-dom";
import downArrow from "./Chevron down.png";
import { MyContext } from "../../context/myContext";
import Discount from "../discount/Discount";
import "./topCourses.scss";
const TopCourses = () => {
  const { courses } = useContext(MyContext);
  const catgories = [
    {
      id: 1,
      category: "Kasanachilik",
      img: category1,
    },
    {
      id: 2,
      category: "Kulolchilik",
      img: category2,
    },
    {
      id: 3,
      category: "Pillachilik",
      img: category3,
    },
    {
      id: 4,
      category: "Dehqonchilik",
      img: category4,
    },
    {
      id: 5,
      category: "Beshinchi",
      img: category5,
    },
    {
      id: 6,
      category: "Oltinchi",
      img: category6,
    },
    {
      id: 7,
      category: "Yettinchi",
      img: category7,
    },
    {
      id: 8,
      category: "Sakkizinchi",
      img: category8,
    },
  ];
  const [visibleCourses, setVisibleCourses] = useState(4);

  const handleShowMore = () => {
    setVisibleCourses((prevVisible) => prevVisible + 4);
  };

  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".course-card:not(.revealed)");

      reveals.forEach((revealElement) => {
        const windowHeight = window.innerHeight;
        const revealTop = revealElement.getBoundingClientRect().top;
        const revealPoint = windowHeight * 0.9; // 90% ko‘rinish sharti

        if (
          revealTop < revealPoint &&
          !revealElement.classList.contains("revealed")
        ) {
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
    <div id="topCourses">
      <div className="categories">
        <div className="custom-catgories">
          {catgories.map((category, index) => (
            <Link to={`/courses/categories/${category.category}`} key={index}>
              <img src={category.img} alt="" />
              <span>{category.category}</span>
            </Link>
          ))}
        </div>
        <Link to="/courses/all-categories/">
          <div className="default-category">
            <img src={category9} alt="" />
            <span>Barcha kategoriyalar</span>
            <img src={downArrow} alt="" />
          </div>
        </Link>
      </div>

      <div className="courses">
        <div className="title">Top kurslar 🔥</div>
        <div className="littleTitle">Yuqori baholangan kurlar</div>

        <div className="courses-cards">
          {courses.slice(0, visibleCourses).map((course, index) => (
            <Link to={`/courses/course/${course.id}`} key={index}>
              <div
                className="course-card"
                // style={{ transitionDelay: `${delay}ms` }}
              >
                <div className="card-img">
                  <img src={course.img} alt={course.title} />
                </div>

                <p className="card-title">{course.title}</p>
                <p className="card-description">{course.description}</p>
                <div className="rat">
                  <div className="detail">
                    <span>{course.details.rating}</span>
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0003 2.16675L12.5753 7.38341L18.3337 8.22508L14.167 12.2834L15.1503 18.0167L10.0003 15.3084L4.85033 18.0167L5.83366 12.2834L1.66699 8.22508L7.42533 7.38341L10.0003 2.16675Z"
                        fill="#FEC967"
                      />
                    </svg>
                  </div>
                  <Link to="#">{course.category}</Link>
                </div>
                <Discount product={course} />
                <div className="line"></div>
                <div className="about-card">
                  <div className="detail">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.3337 14.5V13.1667C11.3337 12.4594 11.0527 11.7811 10.5526 11.281C10.0525 10.781 9.37424 10.5 8.66699 10.5H3.33366C2.62641 10.5 1.94814 10.781 1.44804 11.281C0.947944 11.7811 0.666992 12.4594 0.666992 13.1667V14.5M15.3337 14.5V13.1667C15.3332 12.5758 15.1366 12.0018 14.7746 11.5349C14.4126 11.0679 13.9057 10.7344 13.3337 10.5867M10.667 2.58667C11.2406 2.73353 11.749 3.06713 12.1121 3.53487C12.4752 4.00261 12.6722 4.57789 12.6722 5.17C12.6722 5.76211 12.4752 6.33739 12.1121 6.80513C11.749 7.27287 11.2406 7.60647 10.667 7.75333M8.66699 5.16667C8.66699 6.63943 7.47308 7.83333 6.00033 7.83333C4.52757 7.83333 3.33366 6.63943 3.33366 5.16667C3.33366 3.69391 4.52757 2.5 6.00033 2.5C7.47308 2.5 8.66699 3.69391 8.66699 5.16667Z"
                        stroke="#757575"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>{course.details.users}</span>
                  </div>
                  <div className="detail">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.66667 4.49992V8.49992L11.3333 9.83325M15.3333 8.49992C15.3333 12.1818 12.3486 15.1666 8.66667 15.1666C4.98477 15.1666 2 12.1818 2 8.49992C2 4.81802 4.98477 1.83325 8.66667 1.83325C12.3486 1.83325 15.3333 4.81802 15.3333 8.49992Z"
                        stroke="#757575"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>{course.details.duration}</span>
                  </div>
                  <div className="detail">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 2.5L14.3333 8.5L5 14.5V2.5Z"
                        stroke="#757575"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>{course.details.lessons}</span>
                  </div>
                </div>
                <div className="author">
                  <div className="author-img">
                    <img src={course.profileImg} alt={course.author} />
                  </div>
                  <p className="author-name">{course.author}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {visibleCourses < courses.length && (
          <div className="showMoreBtn">
            <button onClick={handleShowMore}>Ko'proq ko'rish</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopCourses;
