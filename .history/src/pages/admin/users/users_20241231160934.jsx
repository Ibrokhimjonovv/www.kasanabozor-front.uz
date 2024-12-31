import React, { useContext, useState } from "react";
import Dashboard from "../dashboard/dashboard";
import "./users.scss";
import { MyContext } from "../../../context/myContext";
import { Link } from "react-router-dom";
import left from "../../../assets/left.png";
import right from "../../../assets/left.png";
const Users = () => {
  const { isOpen } = useContext(MyContext);
  const users = [
    {
      id: "123456",
      name: "Abrorbek Fitratjon Ch°Iponovich",
      phone: "+99891 234 56 78",
      registrationDate: "14.02.2024",
    },
    {
      id: "123457",
      name: "Qodirova Mohlaroyim Abdullayevna",
      phone: "+99891 234 56 78",
      registrationDate: "18.02.2024",
    },
    {
      id: "123458",
      name: "Alisherbek Ahmadov",
      phone: "+99891 234 56 79",
      registrationDate: "10.02.2024",
    },
    {
      id: "123459",
      name: "Mukhammadbek Sodikov",
      phone: "+99891 234 56 80",
      registrationDate: "22.02.2024",
    },
    {
      id: "123460",
      name: "Olimbek Sharipov",
      phone: "+99891 234 56 81",
      registrationDate: "11.02.2024",
    },
    {
      id: "123461",
      name: "Dilshodbek Kasymov",
      phone: "+99891 234 56 82",
      registrationDate: "23.02.2024",
    },
    {
      id: "123462",
      name: "Sardorbek Umarov",
      phone: "+99891 234 56 83",
      registrationDate: "05.02.2024",
    },
    {
      id: "123463",
      name: "Shohrukhbek Shamsutdinov",
      phone: "+99891 234 56 84",
      registrationDate: "03.02.2024",
    },
    {
      id: "123464",
      name: "Zafarbek Zohidov",
      phone: "+99891 234 56 85",
      registrationDate: "25.02.2024",
    },
    {
      id: "123465",
      name: "Umidbek Jumayev",
      phone: "+99891 234 56 86",
      registrationDate: "27.02.2024",
    },
    {
      id: "123466",
      name: "Shahzodbek Tashkentov",
      phone: "+99891 234 56 87",
      registrationDate: "28.02.2024",
    },
    {
      id: "123467",
      name: "Azizbek Normatov",
      phone: "+99891 234 56 88",
      registrationDate: "30.02.2024",
    },
    // Add more users if necessary
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage))
      setCurrentPage(currentPage + 1);
  };
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const startUserIndex = indexOfFirstUser + 1;
  const endUserIndex = indexOfLastUser < users.length ? indexOfLastUser : users.length;
  return (
    <div id="admin-users">
      <Dashboard />
      <div className={`admin-item ${isOpen ? "wd" : ""}`}>
        <h2 className="title">Foydalanuvchilar</h2>

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
              <Link to="/dashboard/admin/add-user">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_991_7737)">
                    <path
                      d="M10.666 14V12.6667C10.666 11.9594 10.3851 11.2811 9.88497 10.781C9.38487 10.281 8.70659 10 7.99935 10H3.33268C2.62544 10 1.94716 10.281 1.44706 10.781C0.946967 11.2811 0.666016 11.9594 0.666016 12.6667V14M13.3327 5.33333V9.33333M15.3327 7.33333H11.3327M8.33268 4.66667C8.33268 6.13943 7.13878 7.33333 5.66602 7.33333C4.19326 7.33333 2.99935 6.13943 2.99935 4.66667C2.99935 3.19391 4.19326 2 5.66602 2C7.13878 2 8.33268 3.19391 8.33268 4.66667Z"
                      stroke="#E7F4F1"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_991_7737">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
          </div>
          <table className="user-table">
            <thead>
              <tr>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  <input type="checkbox" />
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  ID
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Ism sharifi
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Telefon raqami
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Ro'yxatdan o'tgan
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.registrationDate}</td>
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
                {users.length} tadan {startUserIndex} - {endUserIndex} lar
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
                    currentPage === Math.ceil(users.length / usersPerPage)
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

export default Users;
