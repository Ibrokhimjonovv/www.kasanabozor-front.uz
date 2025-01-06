import React, { useContext, useEffect, useState } from "react";
import "./admin-news-categories.scss";
import { MyContext } from "../../../context/myContext";
import { Link } from "react-router-dom";
import left from "../../../assets/left.png";
import right from "../../../assets/left.png";
import Dashboard from "../dashboard/dashboard";
const AdminNewsCategories = () => {
  const isOpen = useContext(MyContext);
  const newsCategories = [
    {
      id: 1,
      category: "Qonunchilik",
      newsCount: 186,
      status: true,
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    if (currentPage < Math.ceil(newsCategories.length / usersPerPage))
      setCurrentPage(currentPage + 1);
  };
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const adminNewsCategories = newsCategories.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(newsCategories.length / usersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const startUserIndex = indexOfFirstUser + 1;
  const endUserIndex =
    indexOfLastUser < newsCategories.length ? indexOfLastUser : newsCategories.length;
  const [offCanvas, setOffCanvas] = useState(false);
  const handleCanvas = (e) => {
    e.preventDefault();
    setOffCanvas(!offCanvas);
  };
  useEffect(() => {
    if (offCanvas) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; //
    };
  }, [offCanvas]);
  // Har bir mahsulotning statusini saqlash uchun state
  const [productStatuses, setProductStatuses] = useState(
    newsCategories.reduce((acc, product) => {
      acc[product.id] = product.status; // Initial holatni mahsulotdan olish
      return acc;
    }, {})
  );

  // Checkbox holatini yangilash funksiyasi
  const handleStatusChange = (id) => {
    setProductStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: !prevStatuses[id], // Statusni teskari qilish
    }));
  };
  return (
    <div id="admin-news-categories">
      <Dashboard />
      <div className={`admin-item ${isOpen ? "wd" : ""}`}>
        <h2 className="title">Kategoriyalar</h2>
        <div className="users-list">
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
                <input type="text" placeholder="ID, Tel nomer, Ism sharifi" />
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
                to="/dashboard/admin/add-user"
                onClick={(e) => handleCanvas(e)}
              >
                +
              </Link>
              <div className={`offcanvas ${offCanvas ? "show" : ""}`}>
                <h1>Yangi kategoriya qo'shish</h1>
                <form action="">
                  <div className="input-row">
                    <label htmlFor="category-name">Kategoriya nomi</label>
                    <div className="inputs">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1135_7806)">
                          <path
                            d="M8 0H5C2.243 0 0 2.243 0 5V8C0 9.103 0.897 10 2 10H8C9.103 10 10 9.103 10 8V2C10 0.897 9.103 0 8 0ZM2 8V5C2 3.346 3.346 2 5 2H8V8H2ZM14 10H20C21.103 10 22 9.103 22 8V5C22 2.243 19.757 0 17 0H14C12.897 0 12 0.897 12 2V8C12 9.103 12.897 10 14 10ZM14 2H17C18.654 2 20 3.346 20 5V8H14V2ZM8 12H2C0.897 12 0 12.897 0 14V17C0 19.757 2.243 22 5 22H8C9.103 22 10 21.103 10 20V14C10 12.897 9.103 12 8 12ZM5 20C3.346 20 2 18.654 2 17V14H8V20H5ZM23.707 22.293L21.167 19.753C21.691 18.962 22 18.017 22 17C22 14.243 19.757 12 17 12C14.243 12 12 14.243 12 17C12 19.757 14.243 22 17 22C18.017 22 18.962 21.691 19.753 21.167L22.293 23.707C22.488 23.902 22.744 24 23 24C23.256 24 23.512 23.902 23.707 23.707C24.098 23.316 24.098 22.684 23.707 22.293ZM14 17C14 15.346 15.346 14 17 14C18.654 14 20 15.346 20 17C20 18.654 18.654 20 17 20C15.346 20 14 18.654 14 17Z"
                            fill="#B2B2B2"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1135_7806">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <input type="text" placeholder="Nomini kiriting" />
                    </div>
                    <div className="error-message">To'ldirilishi shart</div>
                  </div>
                  <div className="input-row">
                    <label htmlFor="firstName">Meta nomi</label>
                    <div className="inputs">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.77098 13.38C3.57298 13.619 3.28798 13.743 2.99998 13.743C2.77598 13.743 2.54998 13.668 2.36398 13.514C0.861977 12.274 0.00097682 10.446 0.00097682 8.499C-2.31804e-05 4.916 2.91598 2 6.49998 2H11.5C15.084 2 18 4.916 18 8.5C18 12.084 15.084 15 11.5 15C10.948 15 10.5 14.553 10.5 14C10.5 13.447 10.948 13 11.5 13C13.981 13 16 10.981 16 8.5C16 6.019 13.981 4 11.5 4H6.49998C4.01898 4 1.99998 6.019 1.99998 8.5C1.99998 9.848 2.59698 11.113 3.63698 11.972C4.06298 12.324 4.12298 12.954 3.77098 13.38ZM21.637 10.485C21.211 10.135 20.581 10.195 20.229 10.62C19.877 11.046 19.937 11.677 20.363 12.028C21.403 12.886 22 14.152 22 15.5C22 17.981 19.981 20 17.5 20H12.5C10.019 20 7.99998 17.981 7.99998 15.5C7.99998 13.019 10.019 11 12.5 11C13.052 11 13.5 10.553 13.5 10C13.5 9.447 13.052 9 12.5 9C8.91598 9 5.99998 11.916 5.99998 15.5C5.99998 19.084 8.91598 22 12.5 22H17.5C21.084 22 24 19.084 24 15.5C24 13.554 23.139 11.726 21.637 10.485Z"
                          fill="#B2B2B2"
                        />
                      </svg>
                      <input type="text" placeholder="Nomini kiriting" />
                    </div>
                    <div className="error-message">To'ldirilishi shart</div>
                  </div>
                  <div className="input-row">
                    <label htmlFor="status">Holati</label>
                    <div className="inputs">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.40039 12.0004C2.40039 6.69846 6.69846 2.40039 12.0004 2.40039C17.3023 2.40039 21.6004 6.69846 21.6004 12.0004C21.6004 17.3023 17.3023 21.6004 12.0004 21.6004C6.69846 21.6004 2.40039 17.3023 2.40039 12.0004Z"
                          stroke="#B2B2B2"
                          stroke-width="2"
                        />
                        <path
                          d="M18.0004 12.5004V11.5004C18.0004 8.46282 15.538 6.00039 12.5004 6.00039C12.2242 6.00039 12.0004 6.22425 12.0004 6.50039V17.5004C12.0004 17.7765 12.2242 18.0004 12.5004 18.0004C15.538 18.0004 18.0004 15.538 18.0004 12.5004Z"
                          stroke="#B2B2B2"
                          stroke-width="2"
                        />
                      </svg>

                      <select name="status" id="status">
                        <option value="active">Aktiv</option>
                        <option value="non-active">Aktiv emas</option>
                      </select>
                    </div>

                    <div className="error-message">To'ldirilishi shart</div>
                  </div>
                  <div className="button">
                    <button type="submit" id="sub">
                      Qo'shish
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1104_843)">
                          <path
                            d="M11.167 14V12.6667C11.167 11.9594 10.886 11.2811 10.3859 10.781C9.88585 10.281 9.20757 10 8.50033 10H3.83366C3.12641 10 2.44814 10.281 1.94804 10.781C1.44794 11.2811 1.16699 11.9594 1.16699 12.6667V14M13.8337 5.33333V9.33333M15.8337 7.33333H11.8337M8.83366 4.66667C8.83366 6.13943 7.63975 7.33333 6.16699 7.33333C4.69423 7.33333 3.50033 6.13943 3.50033 4.66667C3.50033 3.19391 4.69423 2 6.16699 2C7.63975 2 8.83366 3.19391 8.83366 4.66667Z"
                            stroke="#E7F4F1"
                            stroke-width="1.6"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1104_843">
                            <rect
                              width="16"
                              height="16"
                              fill="white"
                              transform="translate(0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                    <button className="close" onClick={handleCanvas}>
                      Bekor qilish
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 1L1 9M1 1L9 9"
                          stroke="#41A58D"
                          stroke-width="1.6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
              <div
                className={`offcanvas-shape ${offCanvas ? "show-shape" : ""}`}
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
                  Kategoriya
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Yangiliklar
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
              {adminNewsCategories.map((newsCategory, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{newsCategory.category}</td>
                  <td>{newsCategory.newsCount}</td>
                  <td>
                    <input
                      type="checkbox"
                      id={`status-${newsCategory.id}`}
                      checked={productStatuses[newsCategory.id]}
                      onChange={() => handleStatusChange(newsCategory.id)}
                      className="check-inp"
                    />
                    <label
                      htmlFor={`status-${newsCategory.id}`}
                      className="checkbox"
                    >
                      <span
                        className={productStatuses[newsCategory.id] ? "active" : ""}
                      ></span>
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
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <div className="soni">
                {newsCategories.length} tadan {startUserIndex} - {endUserIndex} lar
                ko’rsatilmoqda
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
                    currentPage === Math.ceil(newsCategories.length / usersPerPage)
                  }
                >
                  <img src={right} alt="" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNewsCategories;
