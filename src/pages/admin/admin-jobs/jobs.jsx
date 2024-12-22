import React, { useContext, useState, useEffect } from "react";
import "./jobs.scss";
import { MyContext } from "../../../context/myContext";
import { Link } from "react-router-dom";
import left from "../../../assets/left.png";
import right from "../../../assets/left.png";
import Dashboard from "../dashboard/dashboard";
import axios from 'axios';
import { usersServerUrl } from "../../SuperVars";


const Jobs = () => {
  const { isOpen } = useContext(MyContext);
  const [jobs, setJobs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    if (currentPage < Math.ceil(jobs.length / usersPerPage))
      setCurrentPage(currentPage + 1);
  };

  const fetchData = async () => {
    try {
      const jobsListResponse = await axios.post(`${usersServerUrl}dashboard/jobs/list/`);
      if (jobsListResponse.data.status === "ok") {
        setJobs(jobsListResponse.data.results);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <div id="admin-users-jobs">
      <Dashboard />
      <div className={`admin-item ${isOpen ? "wd" : ""}`}>
        <h2 className="title">Kasblar</h2>

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
                  <h1>Yangi kasb qo'shish</h1>
                  <form action="">
                    <div className="input-row">
                      <label htmlFor="firstName">Kasb nomi</label>
                      <div className="inputs">
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_1104_3394)">
                            <path
                              d="M19 4H17.899C17.434 1.721 15.414 0 13 0H11C8.586 0 6.565 1.721 6.101 4H5C2.243 4 0 6.243 0 9V19C0 21.757 2.243 24 5 24H19C21.757 24 24 21.757 24 19V9C24 6.243 21.757 4 19 4ZM11 2H13C14.304 2 15.415 2.836 15.828 4H8.172C8.585 2.836 9.696 2 11 2ZM22 19C22 20.654 20.654 22 19 22H18V9C18 8.447 17.553 8 17 8C16.447 8 16 8.447 16 9V22H8V9C8 8.447 7.552 8 7 8C6.448 8 6 8.447 6 9V22H5C3.346 22 2 20.654 2 19V9C2 7.346 3.346 6 5 6H19C20.654 6 22 7.346 22 9V19Z"
                              fill="#B2B2B2"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1104_3394">
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
                      <label htmlFor="status">Belgi</label>
                      <div className="inputs">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.0003 21.6004C12.0003 21.6004 19.5134 14.9221 19.5134 9.91343C19.5134 5.76409 16.1497 2.40039 12.0003 2.40039C7.85101 2.40039 4.4873 5.76409 4.4873 9.91343C4.4873 14.9221 12.0003 21.6004 12.0003 21.6004Z"
                            stroke="#B2B2B2"
                            stroke-width="2"
                          />
                          <path
                            d="M14.4007 9.60054C14.4007 10.926 13.3261 12.0005 12.0007 12.0005C10.6752 12.0005 9.60066 10.926 9.60066 9.60054C9.60066 8.27506 10.6752 7.20054 12.0007 7.20054C13.3261 7.20054 14.4007 8.27506 14.4007 9.60054Z"
                            stroke="#B2B2B2"
                            stroke-width="2"
                          />
                        </svg>

                        <select name="status" id="status">
                          <option value="ikonka">Ikonka</option>
                          <option value="ikonka2">Ikonka 2</option>
                        </select>
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
                <div className={`offcanvas-shape ${offCanvas ? "show-shape" : ""}`}></div>
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
                  Kasb nomi
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Belgisi
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Holati
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{job.id}</td>
                  <td>{job.title}</td>
                  <td>
                    <img src={job.icon} alt="" />
                  </td>
                  <td>{job.status}</td>
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
                {jobs.length} tadan {startUserIndex} - {endUserIndex} lar
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
                    currentPage === Math.ceil(jobs.length / usersPerPage)
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

export default Jobs;
