import React, { useState } from "react";

import "./index.scss";

import AddUser from "../../../../assets/admin/add-user.svg";

const HomemakersPage = () => {
  const [objectList, setObjectList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageQ, setPageQ] = useState("");

  return (
    <>
      <div className="container">
        <div className="container-top">
          <h3 className="title">Adminlar</h3>
        </div>

        <div className="datatable">
          <div className="table-properties">
            <div className="num-results">
              <span className="number-results-label">
                Sahifadagi <br />
                natijalar soni
              </span>
              <select className="number-results-input" value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="seperate"></div>
            <div className="search">
              <input type="text" className="search-input" placeholder="Qidiruv" value={pageQ} onChange={(e) => setPageQ(e.target.value)}/>
            </div>
            <div className="actions">
              <select className="actions-input">
                <option value="nothing">Amallar</option>
                <option value="delete">O'chirish</option>
                {/* <option value="edit">Taxrirlash</option> */}
              </select>

              <button className="actions-add-button">
                <img src={ AddUser } alt="A" />
              </button>
            </div>
          </div>

          <div className="table">
            <div className="table-header">
              <div className="table-row">
                <div className="table-column fixed">
                  <b>ID</b>
                </div>
                <div className="table-column fixed max">
                  <b>To'liq ism</b>
                </div>
                <div className="table-column fixed">
                  <b>Telefon raqam</b>
                </div>
                
              </div>
            </div>

            <div className="table-body">
              <div className="table-row">

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomemakersPage;
