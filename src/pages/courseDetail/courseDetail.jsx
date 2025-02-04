import React, { useContext, useState, useEffect } from "react";
import "./courseDetail.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../context/myContext";
import play from "./playBtnImg.png";
// import AddComments from "../../components/addComments/addComments";
import Loading from "../../components/loading/loading";
import axios from 'axios';
import { coursesServerUrl, formatLink, mediaServerUrl } from '../../SuperVars';


const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, followedCourses } = useContext(MyContext);
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [lessons, setLessons] = useState([]);
  const [selectedDep, setSelectedDep] = useState("about-select");

  const loadData = async () => {
    const response = await axios.post(`${coursesServerUrl}courses/exact/`, {'id': id});
    if (response.data.status === "ok") {
      setCourse(response.data.results);
      setLessons(response.data.results.course_lesson_Learning_course_lessons);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(loadData, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

	useEffect(() => {
		if (!isAuthenticated) {
      navigate('/login');
    }
	}, [isAuthenticated]);
 
  const handleNextLesson = (index) => {
      setCurrentLesson(index);
  };
  
  if (!course) {
    return <p><Loading /></p>;
  }

  const handleChange = (event) => {
    setSelectedDep(event.target.id);
  };
  
  const handleFollow = async (courseId) => {
    const response = await axios.post(`${coursesServerUrl}courses/register/`, {'id': courseId});
    if (response.data.status === "ok") {}
  };
  
  return (
    <div id="courseDetail">
      <div className="to-back">
        <div className="inner">
          <Link to="/online-shop">
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
          <Link to={`/courses/categories/${course.category.id}`}>
            {course.category.title}
          </Link>
          <span >
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
          <span className="three-dot">{course.title}</span>
        </div>
      </div>
      <div className="video-container">
        <div className="video-left">
          <div>
            <iframe width="100%" height={526} src={lessons[currentLesson].yt_url} title="Soap&amp;Skin - Me And The Devil (SLOWED + ECO Remix)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div className="video-details">
            <ul>
              <li>
                <span>{course.average_rating}</span>
              </li>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6667 1.33334V4.00001M5.33333 1.33334V4.00001M2 6.66668H14M3.33333 2.66668H12.6667C13.403 2.66668 14 3.26363 14 4.00001V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V4.00001C2 3.26363 2.59695 2.66668 3.33333 2.66668Z"
                    stroke="#757575"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{course.created_at.split('T')[0]}</span>
              </li>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6654 12.6667C14.6654 13.0203 14.5249 13.3594 14.2748 13.6095C14.0248 13.8595 13.6857 14 13.332 14H2.66536C2.31174 14 1.9726 13.8595 1.72256 13.6095C1.47251 13.3594 1.33203 13.0203 1.33203 12.6667V3.33333C1.33203 2.97971 1.47251 2.64057 1.72256 2.39052C1.9726 2.14048 2.31174 2 2.66536 2H5.9987L7.33203 4H13.332C13.6857 4 14.0248 4.14048 14.2748 4.39052C14.5249 4.64057 14.6654 4.97971 14.6654 5.33333V12.6667Z"
                    stroke="#757575"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{course.category.title}</span>
              </li>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_235_9507)">
                    <path
                      d="M0.667969 7.99999C0.667969 7.99999 3.33464 2.66666 8.0013 2.66666C12.668 2.66666 15.3346 7.99999 15.3346 7.99999C15.3346 7.99999 12.668 13.3333 8.0013 13.3333C3.33464 13.3333 0.667969 7.99999 0.667969 7.99999Z"
                      stroke="#757575"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.0013 9.99999C9.10587 9.99999 10.0013 9.10456 10.0013 7.99999C10.0013 6.89542 9.10587 5.99999 8.0013 5.99999C6.89673 5.99999 6.0013 6.89542 6.0013 7.99999C6.0013 9.10456 6.89673 9.99999 8.0013 9.99999Z"
                      stroke="#757575"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_235_9507">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                { /* formatNumber(course.viewsCount) */ }
              </li>
              { /* <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.72667 9.00668L10.28 11.66M10.2733 4.34001L5.72667 6.99334M14 3.33334C14 4.43791 13.1046 5.33334 12 5.33334C10.8954 5.33334 10 4.43791 10 3.33334C10 2.22877 10.8954 1.33334 12 1.33334C13.1046 1.33334 14 2.22877 14 3.33334ZM6 8.00001C6 9.10458 5.10457 10 4 10C2.89543 10 2 9.10458 2 8.00001C2 6.89544 2.89543 6.00001 4 6.00001C5.10457 6.00001 6 6.89544 6 8.00001ZM14 12.6667C14 13.7712 13.1046 14.6667 12 14.6667C10.8954 14.6667 10 13.7712 10 12.6667C10 11.5621 10.8954 10.6667 12 10.6667C13.1046 10.6667 14 11.5621 14 12.6667Z"
                    stroke="#757575"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {course.share}
              </li> */ }
            </ul>
            <div className="author">
              <img src={`${mediaServerUrl}users${formatLink(course.user.pfp)}`} alt="" />
              <span>{course.user.first_name} {course.user.last_name}</span>
            </div>
          </div>
          <div className="course-name name-desktop-version">{course.title}</div>
        </div>
        <div className="video-right">
          <h3>Darslar</h3>
          <ul>
            {lessons.map((lesson, index) => <li
                  key={lesson.id}
                  className="watching"
                  style={{
                    cursor: "pointer", opacity: index === currentLesson ? 1 : 0.6,
                  }}
                  onClick={() => handleNextLesson(index)}
                >
                  <img src={play} alt="🔒" />
                  {index+1}-dars
                </li>)}
          </ul>
        </div>
      </div>
      <div className="course-name name-mobile-version">{course.title}</div>
      <div className="about-courses">
        <div className="leftt">
          <div className="dep">
            <input
              type="radio"
              name="dep"
              id="about-select"
              checked={selectedDep === "about-select"}
              onChange={handleChange}
            />
            <label htmlFor="about-select" className="about_label">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_724_11340)">
                  <path
                    d="M10.0013 13.3333V10M10.0013 6.66667H10.0096M18.3346 10C18.3346 14.6024 14.6037 18.3333 10.0013 18.3333C5.39893 18.3333 1.66797 14.6024 1.66797 10C1.66797 5.39763 5.39893 1.66667 10.0013 1.66667C14.6037 1.66667 18.3346 5.39763 18.3346 10Z"
                    stroke="#41A58D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_724_11340">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Kurs haqida
            </label>
            <input
              type="radio"
              name="dep"
              id="resource-select"
              checked={selectedDep === "resource-select"}
              onChange={handleChange}
            />
            {isAuthenticated && followedCourses.includes(course.id) ? (
              <label htmlFor="resource-select" className="resource_label">
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.3666 9.20833L9.70825 16.8667C8.77005 17.8049 7.49757 18.3319 6.17075 18.3319C4.84393 18.3319 3.57145 17.8049 2.63325 16.8667C1.69505 15.9285 1.16797 14.656 1.16797 13.3292C1.16797 12.0023 1.69505 10.7299 2.63325 9.79167L10.2916 2.13333C10.9171 1.50786 11.7654 1.15648 12.6499 1.15648C13.5345 1.15648 14.3828 1.50786 15.0082 2.13333C15.6337 2.7588 15.9851 3.60712 15.9851 4.49167C15.9851 5.37621 15.6337 6.22453 15.0082 6.85L7.34158 14.5083C7.02885 14.8211 6.60469 14.9968 6.16242 14.9968C5.72014 14.9968 5.29598 14.8211 4.98325 14.5083C4.67051 14.1956 4.49482 13.7714 4.49482 13.3292C4.49482 12.8869 4.67051 12.4627 4.98325 12.15L12.0582 5.08333"
                    stroke="#41A58D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Resurslar
              </label>
            ) : (
              <></>
            )}
          { /* <input
              type="radio"
              name="dep"
              id="comments-select"
              checked={selectedDep === "comments-select"}
              onChange={handleChange}
            />
            <label htmlFor="comments-select" className="comments_label">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 8.58333C16.5029 9.68322 16.2459 10.7682 15.75 11.75C15.162 12.9264 14.2581 13.916 13.1395 14.6077C12.021 15.2995 10.7319 15.6662 9.41667 15.6667C8.31678 15.6695 7.23176 15.4126 6.25 14.9167L1.5 16.5L3.08333 11.75C2.58744 10.7682 2.33047 9.68322 2.33333 8.58333C2.33384 7.26812 2.70051 5.97904 3.39227 4.86045C4.08402 3.74187 5.07355 2.83797 6.25 2.24999C7.23176 1.7541 8.31678 1.49713 9.41667 1.49999H9.83333C11.5703 1.59582 13.2109 2.32896 14.4409 3.55904C15.671 4.78912 16.4042 6.4297 16.5 8.16666V8.58333Z"
                  stroke="#5A5A5A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Fikrlar
            </label> */ }
          </div>
          <div className="dep-container">
            <div
              className={`datas-container ${
                selectedDep === "about-select" ? "active" : ""
              }`}
            >
              <p className="title">Kurs haqida</p>
              <p className="simpleText" dangerouslySetInnerHTML={{__html: course.description.replaceAll('\n', '<br/>') }}></p>
            </div>

            <div
              className={`resource-container ${
                selectedDep === "resource-select" ? "active" : ""
              }`}
            >
              { /* <ul>
                <li>
                  <a href="Yuklanishi kerak bo'lgan file">
                    Tegishli-fayllar-I.zip
                  </a>
                </li>
                <li>
                  <a href="Yuklanishi kerak bo'lgan file">
                    Tegishli-fayllar-I.zip
                  </a>
                </li>
              </ul> */ }
              <p>Resurslar qo'shilmagan</p>
            </div>

            { /* <div
              className={`datas-container ${
                selectedDep === "comments-select" ? "active" : ""
              }`}
            >
              <AddComments news={course} />
            </div> */ }
          </div>
        </div>
        <div className="follow">
          <div className="title">A’zo bo’lish</div>
          <ul>
            <li>
              <span>Darslar soni:</span>
              <span>{lessons.length} ta</span>
            </li>
            <li>
              <span>Ta'lim tili:</span>
              <span>O'zbek</span>
            </li>
            { /* <li>
              <span>Reytingi:</span>
              <span>{course.avarege_rating}</span>
            </li> */ }
            <li>
              <span>Ustoz:</span>
              <span>{course.user.first_name} {course.user.last_name}</span>
            </li>
            <li>
              <span>Sertifikat:</span>
              <span>Bor</span>
            </li>
            { /* <li>
              <span>Davomiyligi:</span>
              <span>18 soat</span>
            </li>
            <li>
              <span>Narxi:</span>
              <span className="price-type">Bepul</span>
            </li> */ }
            <li>
              <button className="follow-btn" onClick={() => handleFollow(course.id)}>

              {followedCourses.includes(course.id) ? "A'zo bo'lgansiz" : "A'zo bo'lish"}

              </button>
            </li>
            <li className="other-func">
              { /* <button>
                <svg
                  width="24"
                  height="21"
                  viewBox="0 0 24 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.8382 2.60999C20.3274 2.099 19.721 1.69364 19.0535 1.41708C18.3861 1.14052 17.6707 0.998169 16.9482 0.998169C16.2257 0.998169 15.5103 1.14052 14.8428 1.41708C14.1754 1.69364 13.5689 2.099 13.0582 2.60999L11.9982 3.66999L10.9382 2.60999C9.90647 1.5783 8.5072 0.998704 7.04817 0.998704C5.58913 0.998704 4.18986 1.5783 3.15817 2.60999C2.12647 3.64169 1.54688 5.04096 1.54688 6.49999C1.54687 7.95903 2.12647 9.3583 3.15817 10.39L11.9982 19.23L20.8382 10.39C21.3492 9.87924 21.7545 9.27281 22.0311 8.60535C22.3076 7.93789 22.45 7.22248 22.45 6.49999C22.45 5.77751 22.3076 5.0621 22.0311 4.39464C21.7545 3.72718 21.3492 3.12075 20.8382 2.60999Z"
                    stroke="#41A58D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button>
                <svg
                  width="20"
                  height="22"
                  viewBox="0 0 20 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.59 12.51L13.42 16.49M13.41 5.51L6.59 9.49M19 4C19 5.65685 17.6569 7 16 7C14.3431 7 13 5.65685 13 4C13 2.34315 14.3431 1 16 1C17.6569 1 19 2.34315 19 4ZM7 11C7 12.6569 5.65685 14 4 14C2.34315 14 1 12.6569 1 11C1 9.34315 2.34315 8 4 8C5.65685 8 7 9.34315 7 11ZM19 18C19 19.6569 17.6569 21 16 21C14.3431 21 13 19.6569 13 18C13 16.3431 14.3431 15 16 15C17.6569 15 19 16.3431 19 18Z"
                    stroke="#41A58D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button> */ }
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
