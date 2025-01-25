import React, { useEffect, useState } from "react";
import "./coursesCategory.scss";
import { useParams, Link } from "react-router-dom";
import aaa from "./Без имени-2 1.png";
import Discount from "../../components/discount/Discount";
import axios from "axios";
import { coursesServerUrl } from "../../SuperVars";
import Loading from "../../components/loading/loading";


const CoursesCategory = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState();
  const [filteredCourses, setFilteredCourses] = useState([]);

  const loadData = async () => {
    const response = await axios.post(`${coursesServerUrl}categories/exact/`, {'id': categoryId});
    console.log(response);

    if (response.data.status === "ok") {
      setCategory(response.data.results);      
    }
  }

  useEffect(() => {
    const timeout = setTimeout(loadData, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".course-card:not(.revealed)");
      reveals.forEach((revealElement) => {
        const windowHeight = window.innerHeight;
        const revealTop = revealElement.getBoundingClientRect().top;
        const revealPoint = windowHeight * 0.9;

        if (
          revealTop < revealPoint &&
          !revealElement.classList.contains("revealed")
        ) {
          revealElement.classList.add("revealed");
        }
      });
    };
    window.addEventListener("scroll", reveal);
    reveal();
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  if (!category) {
    return <Loading/>;
  }
  
  return (
    <div id="courseCategory">
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
          <Link to="/courses">Kurslar</Link>
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
          <span>{category.title}</span>
        </div>
      </div>
      <div className="allProductsPoster">
        <div className="posterInner">
          <h2>{category.title} kurslar</h2>
          <img src={aaa} alt="" />
        </div>
      </div>
      <div className="courseInner">
        <div className="courses-cards">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <Link to={`/courses/course/${course.id}`} key={index}>
                <div className="course-card">
                  <div className="card-img">
                    <img src={course.img} alt={course.title} />
                  </div>
                  <p className="card-title">{course.title}</p>
                  <p className="card-description">{course.description}</p>
                  <div className="rat">
                    <div className="detail">
                      <span>{course.details.rating}</span>
                    </div>
                    <Link to="#">{course.category}</Link>
                  </div>
                  <Discount product={course} />
                  <div className="line"></div>
                  <div className="about-card">
                    <div className="detail">
                      <span>{course.details.users}</span>
                    </div>
                    <div className="detail">
                      <span>{course.details.duration}</span>
                    </div>
                    <div className="detail">
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
            ))
          ) : (
            <p>Kurslar mavjud emas</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesCategory;
