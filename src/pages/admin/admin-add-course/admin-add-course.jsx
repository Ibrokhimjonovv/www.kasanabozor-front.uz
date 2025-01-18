import React, { useEffect, useContext, useState } from "react";
import InputMask from "react-input-mask";
import Dashboard from "../dashboard/dashboard";
import { MyContext } from "../../../context/myContext";
import { Link } from "react-router-dom";
import "./admin-add-course.scss";
import eye from "../addUser/eye.png";
const AddCourse = () => {
  const { isOpen } = useContext(MyContext);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avaName, setAvaName] = useState("");
  const [jobs, setJobs] = useState([]);
  const [selectedTab, setSelectedTab] = useState("about-course");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvaName(file.name);
    } else {
      setAvaName("");
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    if (currentPage < Math.ceil(jobs.length / usersPerPage))
      setCurrentPage(currentPage + 1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const totalPages = Math.ceil(jobs.length / usersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const startUserIndex = indexOfFirstUser + 1;
  const endUserIndex =
    indexOfLastUser < jobs.length ? indexOfLastUser : jobs.length;
  const [offCanvas, setOffCanvas] = useState(false);
  const handleCanvas = (e) => {
    e.preventDefault();
    setOffCanvas(!offCanvas);
  };

  useEffect(() => {
    if (offCanvas) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [offCanvas]);
  return (
    <div id="admin-add-course">
      <Dashboard />
      <div className={`admin-item ${isOpen ? "wd" : ""}`}>
        <div className="title">Kurs qo'shish</div>
        <div className="to-back">
          <Link to="/dashboard">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 18.3327V9.99935H12.5V18.3327M2.5 7.49935L10 1.66602L17.5 7.49935V16.666C17.5 17.108 17.3244 17.532 17.0118 17.8445C16.6993 18.1571 16.2754 18.3327 15.8333 18.3327H4.16667C3.72464 18.3327 3.30072 18.1571 2.98816 17.8445C2.67559 17.532 2.5 17.108 2.5 16.666V7.49935Z"
                stroke="#41A58D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="#41A58D"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <Link to="/dashboard/admin/courses">Kurslar</Link>
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 9L5 5L1 1"
              stroke="#41A58D"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Kurs qo'shish</span>
        </div>
        <div className="form-list">
          <div className="add-course-two-dep">
            <div className="add-course-two-dep-top">
              <input
                type="radio"
                name="add-course-dep"
                id="about-course"
                checked={selectedTab === "about-course"}
                onChange={() => setSelectedTab("about-course")}
              />
              <label htmlFor="about-course">Kurs haqida</label>

              <input
                type="radio"
                name="add-course-dep"
                id="lessons"
                checked={selectedTab === "lessons"}
                onChange={() => setSelectedTab("lessons")}
              />
              <label htmlFor="lessons">Darslar</label>
            </div>

            <div className="add-course-two-dep-bottom">
              {selectedTab === "about-course" ? (
                <div className="about-course-container">
                  <form action="">
                    <div className="input-row w-50">
                      <label htmlFor="">Kurs nomi</label>
                      <input
                        type="text"
                        placeholder="Sarlavha kiriting"
                        required
                      />
                    </div>
                    <div className="input-row w-50">
                      <label htmlFor="teacher">O'qituvchi</label>
                      <select name="teacher" id="teacher">
                        <option value="">Tanlang</option>
                        <option value="teacher-1">Teacher-1</option>
                        <option value="teacher-2">Teacher-2</option>
                        <option value="teacher-3">Teacher-3</option>
                      </select>
                    </div>
                    <div className="input-row w-50 image-input">
                      <label htmlFor="">Muqova rasmi</label>
                      <label htmlFor="course-image-input" id="course-image">
                        {avaName || "Rasm tanlang"}
                      </label>
                      <input
                        type="file"
                        id="course-image-input"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="input-row w-50">
                      <label htmlFor="course-category">Kategoriya</label>
                      <select name="course-category" id="course-category">
                        <option value="">Tanlang</option>
                        <option value="category-1">Category-1</option>
                        <option value="category-2">Category-2</option>
                        <option value="category-3">Category-3</option>
                      </select>
                    </div>
                    <div className="input-row w-100 short-text">
                      <label htmlFor="">Qisqa yozuv</label>
                      <textarea
                        name="short-text"
                        id="short-text-input"
                        placeholder="Matn"
                      ></textarea>
                    </div>
                    <div className="input-row w-100 tall-text">
                      <label htmlFor="">Kurs haqida</label>
                      <textarea
                        name="content"
                        id="short-text-input"
                        placeholder="Kontent"
                      ></textarea>
                    </div>
                    <div className="input-row w-100 d-flex">
                      <div className="input-row-inner-status-select">
                        <label htmlFor="">Holati</label>
                        <select name="course-status" id="">
                          <option value="active">Aktive</option>
                          <option value="none-active">Aktiv emas</option>
                        </select>
                      </div>
                      <button type="submit">Saqlash</button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="course-lessons">
                  <div className="tool">
                    <div className="tool-left">
                      <label htmlFor="count">Sahifadagi natijalar soni</label>
                      <select name="count" id="count">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">5</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                    <div className="tool-right">
                      <form action="">
                        <input
                          type="text"
                          placeholder="ID, Tel nomer, Ism sharifi"
                        />
                        <button type="submit">
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.7472 16.8792L20.7992 20.7992M19.4926 10.3459C19.4926 15.3974 15.3974 19.4926 10.3459 19.4926C5.29432 19.4926 1.19922 15.3974 1.19922 10.3459C1.19922 5.29432 5.29432 1.19922 10.3459 1.19922C15.3974 1.19922 19.4926 5.29432 19.4926 10.3459Z"
                              stroke="#B2B2B2"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </svg>
                        </button>
                      </form>
                      <Link
                        to="/dashboard/admin/add-lesson"
                        onClick={(e) => handleCanvas(e)}
                      >
                        +
                      </Link>
                      <div className={`offcanvas ${offCanvas ? "show" : ""}`}>
                        <h1>Yangi dars qo'shish</h1>
                        <form action="">
                          <div className="input-row">
                            <label htmlFor="lesson-name">Dars nomi</label>
                              <input
                                type="text"
                                placeholder="Nomini kiriting"
                                required
                              />
                          </div>
                          <div className="input-row">
                            <label htmlFor="">Havolani kiriting</label>
                            <input type="text" placeholder="Havolani kiriting" required title="Iltimos bu qismni to'ldiring"/>
                          </div>
                          <div className="input-row">
                            <label htmlFor="">Kurs haqida</label>
                            <textarea name="about-course-lesson" id="" placeholder="Kontent" required></textarea>
                          </div>
                          <div className="input-row">
                            <label htmlFor="">Holati</label>
                            <select name="course-lesson-status" id="" required>
                              <option value="active">Aktiv</option>
                              <option value="none-active">Aktiv emas</option>
                            </select>
                          </div>
                          <div className="button">
                            <button type="submit" id="sub">
                              Qo'shish
                            </button>
                            <button className="close" onClick={handleCanvas}>
                              Bekor qilish
                            </button>
                          </div>
                        </form>
                      </div>
                      <div
                        className={`offcanvas-shape ${
                          offCanvas ? "show-shape" : ""
                        }`}
                      ></div>
                    </div>
                  </div>
                  <table className="user-table">
                    <thead>
                      <tr>
                        <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                          <input type="checkbox" />
                        </th>
                        <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                          T/r
                        </th>
                        <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                          Dars nomi
                        </th>
                        <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                          Aktivligi
                        </th>
                        <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                          Amallar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>1</td>
                        <td>1-dars</td>
                        {/* <td>
                          <input
                            type="checkbox"
                            id={`status-${current.id}`}
                            checked={productStatuses[product.id]}
                            onChange={() => handleStatusChange(product.id)}
                            className="check-inp"
                          />
                          <label htmlFor={`status-${product.id}`} className="checkbox">
                            <span
                              className={productStatuses[product.id] ? "active" : ""}
                            ></span>
                          </label>
                        </td> */}
                        <td>
                          <input
                            type="checkbox"
                            id="check-1"
                            checked={true}
                            // onChange={() => handleStatusChange(product.id)}
                            className="check-inp"
                          />
                          <label htmlFor="check-1" className="checkbox">
                            <span className={true ? "active" : ""}></span>
                          </label>
                        </td>
                        <td>
                          <button className="btn btn-secondary">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0007 3.33333C10.9211 3.33333 11.6673 2.58714 11.6673 1.66667C11.6673 0.746192 10.9211 0 10.0007 0C9.08018 0 8.33398 0.746192 8.33398 1.66667C8.33398 2.58714 9.08018 3.33333 10.0007 3.33333Z"
                                fill="#41A58D"
                              />
                              <path
                                d="M10.0007 11.6673C10.9211 11.6673 11.6673 10.9211 11.6673 10.0007C11.6673 9.08018 10.9211 8.33398 10.0007 8.33398C9.08018 8.33398 8.33398 9.08018 8.33398 10.0007C8.33398 10.9211 9.08018 11.6673 10.0007 11.6673Z"
                                fill="#41A58D"
                              />
                              <path
                                d="M10.0007 19.9993C10.9211 19.9993 11.6673 19.2532 11.6673 18.3327C11.6673 17.4122 10.9211 16.666 10.0007 16.666C9.08018 16.666 8.33398 17.4122 8.33398 18.3327C8.33398 19.2532 9.08018 19.9993 10.0007 19.9993Z"
                                fill="#41A58D"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* {totalPages > 1 && (
                    <div className="pagination">
                      <div className="soni">
                        {products.length} tadan {startUserIndex} -{" "}
                        {endUserIndex} lar ko’rsatilmoqda
                      </div>
                      <div className="users-pages-buttons">
                        <button onClick={prevPage} disabled={currentPage === 1}>
                          <img src={left} alt="" />
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`pagination-btn ${
                              currentPage === index + 1 ? "active" : ""
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          onClick={nextPage}
                          disabled={
                            currentPage ===
                            Math.ceil(products.length / usersPerPage)
                          }
                        >
                          <img src={right} alt="" />
                        </button>
                      </div>
                    </div>
                  )} */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
