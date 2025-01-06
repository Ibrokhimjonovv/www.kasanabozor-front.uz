import React, { useContext, useState } from "react";
import "./adminNews.scss";
import { MyContext } from "../../../context/myContext";
import { Link } from "react-router-dom";
import left from "../../../assets/left.png";
import right from "../../../assets/left.png";
import Dashboard from "../dashboard/dashboard";

const AdminNews = () => {
  const isOpen = useContext(MyContext);
  const news = [
    {
      id: 1,
      newsTitle: "O'z o'zini band qilgan shaxslar",
      category: "Qonunchilik",
      link: "./page-title-link.html",
      createdDate: "14.02.2024",
    },
    {
      id: 1,
      newsTitle: "O'z o'zini band qilgan shaxslar",
      category: "Qonunchilik",
      link: "./page-title-link.html",
      createdDate: "14.02.2024",
    },
    {
      id: 1,
      newsTitle: "O'z o'zini band qilgan shaxslar",
      category: "Qonunchilik",
      link: "./page-title-link.html",
      createdDate: "14.02.2024",
    },
    {
      id: 1,
      newsTitle: "O'z o'zini band qilgan shaxslar",
      category: "Qonunchilik",
      link: "./page-title-link.html",
      createdDate: "14.02.2024",
    },
    {
      id: 1,
      newsTitle: "O'z o'zini band qilgan shaxslar",
      category: "Qonunchilik",
      link: "./page-title-link.html",
      createdDate: "14.02.2024",
    },
    {
      id: 1,
      newsTitle: "O'z o'zini band qilgan shaxslar",
      category: "Qonunchilik",
      link: "./page-title-link.html",
      createdDate: "14.02.2024",
    },
    {
      id: 1,
      newsTitle: "O'z o'zini band qilgan shaxslar",
      category: "Qonunchilik",
      link: "./page-title-link.html",
      createdDate: "14.02.2024",
    },
    {
      id: 1,
      newsTitle: "O'z o'zini band qilgan shaxslar",
      category: "Qonunchilik",
      link: "./page-title-link.html",
      createdDate: "14.02.2024",
    },
    {
      id: 1,
      newsTitle: "O'z o'zini band qilgan shaxslar",
      category: "Qonunchilik",
      link: "./page-title-link.html",
      createdDate: "14.02.2024",
    },
    {
      id: 1,
      newsTitle: "O'z o'zini band qilgan shaxslar",
      category: "Qonunchilik",
      link: "./page-title-link.html",
      createdDate: "14.02.2024",
    },
    {
      id: 1,
      newsTitle: "O'z o'zini band qilgan shaxslar",
      category: "Qonunchilik",
      link: "./page-title-link.html",
      createdDate: "14.02.2024",
    },
    {
      id: 1,
      newsTitle: "O'z o'zini band qilgan shaxslar",
      category: "Qonunchilik",
      link: "./page-title-link.html",
      createdDate: "14.02.2024",
    },
    {
      id: 1,
      newsTitle: "O'z o'zini band qilgan shaxslar",
      category: "Qonunchilik",
      link: "./page-title-link.html",
      createdDate: "14.02.2024",
    },
    {
      id: 1,
      newsTitle: "O'z o'zini band qilgan shaxslar",
      category: "Qonunchilik",
      link: "./page-title-link.html",
      createdDate: "14.02.2024",
    },
    {
      id: 1,
      newsTitle: "O'z o'zini band qilgan shaxslar",
      category: "Qonunchilik",
      link: "./page-title-link.html",
      createdDate: "14.02.2024",
    },
    {
      id: 1,
      newsTitle: "O'z o'zini band qilgan shaxslar",
      category: "Qonunchilik",
      link: "./page-title-link.html",
      createdDate: "14.02.2024",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    if (currentPage < Math.ceil(news.length / usersPerPage))
      setCurrentPage(currentPage + 1);
  };
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentNews = news.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(news.length / usersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const startUserIndex = indexOfFirstUser + 1;
  const endUserIndex =
    indexOfLastUser < news.length ? indexOfLastUser : news.length;
  return (
    <div id="admin-news">
      <Dashboard />
      <div className={`admin-item ${isOpen ? "wd" : ""}`}>
        <h2 className="title">Mahsulotlar</h2>
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
              <Link to="/dashboard/admin/add-news">+</Link>
            </div>
          </div>
          <table className="user-table">
            <thead>
              <tr>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  <input type="checkbox" />
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Yangilik nomi
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Kategoriyasi
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Link
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Yaratilgan
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody>
              {currentNews.map((news, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{news.newsTitle}</td>
                  <td>{news.category}</td>
                  <td>{news.link}</td>
                  <td>{news.createdDate}</td>
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
                {news.length} tadan {startUserIndex} - {endUserIndex} lar
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
                    currentPage === Math.ceil(news.length / usersPerPage)
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

export default AdminNews;
