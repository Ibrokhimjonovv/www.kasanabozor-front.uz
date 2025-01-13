import React, { useState, useEffect } from "react";
import ProfileSideBar from "../../../components/profileSideBar/profileSideBar";
import { Link } from "react-router-dom";
import "./myCourses.scss";
import axios from 'axios';
import { coursesServerUrl } from '../../../SuperVars';


const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  const loadData = async () => {
    const response = await axios.get(`${coursesServerUrl}profile/courses/list/`);
    if (response.data.status === "ok") {
      setCourses(response.data.results);
    }
  }
  
  useEffect(() => {
    const timeout = setTimeout(loadData, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="profile-container ">
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
          <Link to="/profile/prof">Shaxsiy kabinet</Link>
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
          <span>Kurslar</span>
        </div>
      </div>
      <div className="profile-inner my-courses">
        <div className="left">
          <ProfileSideBar />
        </div>
        <div className="right">
          {courses.map((course, index) => (
            <div className="my-course-card" key={index}>
              <img src={course.image} alt={course.title} className="my-course-card__image" />
              <div className="my-course-card__content">
                <h3 className="my-course-card__content__title">{course.title}</h3>
                <Link to="#" className="my-course-card__content__category">#{course.category.title}</Link>
                <div className="d-flex">
                    <div className="progress_count">% {course.progress}</div>
                    <div className="my-course-card__content__progress-bar">
                        <div
                            className="my-course-card__content__progress-bar__progress"
                            style={{ width: `${course.progress}%` }}
                        ></div>
                    </div>
                </div>
                <div className="my-course-card__content__author">
                  <img
                    src={course.authorImage}
                    alt={course.authorName}
                    className="my-course-card__content__author-image"
                  />
                  <span>{course.authorName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
