import React, { useContext, useEffect, useState } from "react";
import "./adminNews.scss";
import { MyContext } from "../../../context/myContext";
import { Link } from "react-router-dom";
import left from "../../../assets/left.png";
import right from "../../../assets/left.png";
import Dashboard from "../dashboard/dashboard";
import axios from "axios";
import { newsServerUrl } from "../../../SuperVars";

const Actions = ({ news }) => {
  return (
    <>
      <div className="actions">
        <button className="btn btn-secondary" onClick={ async (e) => {
          e.preventDefault();

          const response = await axios.post(`${newsServerUrl}dashboard/news/delete/`, {'id': news.id});
          if (response.data.status === "ok") {
            alert("Yangilik ochirib yuborildi");
	    window.location.reload();
          } else {
            alert("Xatolik yuz berdi");
          }
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 48 48"
          >
            <path
              fill="#b39ddb"
              d="M30.6,44H17.4c-2,0-3.7-1.4-4-3.4L9,11h30l-4.5,29.6C34.2,42.6,32.5,44,30.6,44z"
            ></path>
            <path fill="#9575cd" d="M28 6L20 6 14 12 34 12z"></path>
            <path
              fill="#7e57c2"
              d="M10,8h28c1.1,0,2,0.9,2,2v2H8v-2C8,8.9,8.9,8,10,8z"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
};

const AdminNews = () => {
  const {isOpen} = useContext(MyContext);
  const [news, setNews] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.post(`${newsServerUrl}dashboard/news/list/`);
      if (response.data.status === "ok") {
        setNews(response.data.results);
      }
    } catch {}
  }

  useEffect(() => {
    const timeout = setTimeout(loadData, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

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
  const endUserIndex = indexOfLastUser < news.length ? indexOfLastUser : news.length;
  
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
                      strokeWidth="1.5"
                      strokeLinecap="round"
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
                {/* <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Link
                </th> */}
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Yaratilgan
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody>
              {currentNews.map((anew, index) => <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{anew.title}</td>
                  <td>{anew.category.title}</td>
                  {/* <td>{news.link}</td> */}
                  <td>{anew.created_at.split('T')[0]}</td>
                  <td>
                    <Actions news={ anew } />
                  </td>
                </tr>)}
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
