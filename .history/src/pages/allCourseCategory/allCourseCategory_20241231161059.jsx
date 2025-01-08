import React, { useContext, useState, useEffect } from "react";
import { Slider, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./allCourseCategory.scss";
import { MyContext } from "../../context/myContext";
import Discount from "../../components/discount/Discount";
import aaa from "./Без имени-2 1.png";
const AllCourseCategory = () => {
  const categories = [
    { id: 1, title: "Kasanachilik" },
    { id: 2, title: "Kategoriya" },
    { id: 3, title: "Ipakchilik" },
    { id: 4, title: "Tandirchilik" },
    { id: 5, title: "Kulolchilik" },
    { id: 6, title: "Kategoriya" },
  ];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPaid, setSelectedPaid] = useState([]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const { courses } = useContext(MyContext);
  const handleCategoryChange = (event) => {
    const { checked, name } = event.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, name] : prev.filter((category) => category !== name)
    );
  };
  const handlePaidChange = (event) => {
    const { checked, id } = event.target;
    setSelectedPaid((prev) =>
      checked ? [...prev, id] : prev.filter((paid) => paid !== id)
    );
  };
  const handleRatingChange = (newValue) => {
    setRatingRange(newValue);
  };
  const filteredCourses = courses.filter((course) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(course.category);
    const paidMatch =
      selectedPaid.length === 0 ||
      (selectedPaid.includes("paid") && course.isPaid) ||
      (selectedPaid.includes("free") && !course.isPaid);
    const ratingMatch =
      course.details.rating >= ratingRange[0] &&
      course.details.rating <= ratingRange[1];

    return categoryMatch && paidMatch && ratingMatch;
  });
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

  return (
    <div id="allCategories">
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
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
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
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span>Barcha kategoriyalar</span>
        </div>
      </div>
      <div className="allProductsPoster">
        <div className="inner">
          <h2>Barcha mahsulotlar</h2>
          <img src={aaa} alt="" />
        </div>
      </div>
      <div className="main">
        <div className="inner">
          <div className="left-side">
            <div className="first-select">
              <p>Kategoriyalar</p>
              <ul>
                {categories.map((category) => (
                  <li key={category.id}>
                    <input
                      type="checkbox"
                      name={category.title}
                      onChange={handleCategoryChange}
                      id={category.id}
                    />
                    <span className="custom-checkbox"></span>
                    <label htmlFor={category.id}>{category.title}</label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="second-select">
              <p>Narx bo’yicha</p>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    id="paid"
                    onChange={handlePaidChange}
                  />
                  <span className="custom-checkbox"></span>
                  <label htmlFor="paid">Pulli</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="free"
                    onChange={handlePaidChange}
                  />
                  <span className="custom-checkbox"></span>
                  <label htmlFor="free">Bepul</label>
                </li>
              </ul>
            </div>
            <div className="third-select">
              <Box sx={{ width: 300, padding: "20px" }}>
                <p>Reyting bo'yicha</p>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mt={2}
                  marginTop="20px"
                >
                  <Box id="box1">{ratingRange[0]}</Box>
                  <Box id="box2">{ratingRange[1]}</Box>
                </Box>
                <Slider
                  id="slider"
                  value={ratingRange}
                  onChange={handleRatingChange}
                  valueLabelDisplay="off"
                  min={0}
                  max={5}
                  step={1}
                  sx={{
                    mt: 3,
                    color: "#41A58D",
                    "& .MuiSlider-thumb": {
                      backgroundColor: "#ffffff",
                      border: "2px solid #ccc",
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "#B3B3B3",
                    },
                  }}
                />
              </Box>
            </div>
          </div>
          <div className="right-side">
            <div className="all-courses">
              <div className="courses-cards">
                {filteredCourses.map((course, index) => (
                  <Link to={`/courses/${course.id}`} key={index}>
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourseCategory;
