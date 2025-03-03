import React, { useEffect, useState } from "react";
import "./index.scss";
import DatatableComponent from "../../../../components/DatatableComponent/index.jsx";
import axios from "axios";
import { usersApi } from "../../../../server.js";
import AddUser from "../../../../assets/admin/add-user.svg";
import { formatPhone, normalizeDateTime } from "../../../../utils.ts";
import { Link } from "react-router-dom";

const columnsMeta = [
  { name: "Tartib", props: "count" },
  { name: "To'liq Ismi", props: "full_name", max: true },
  { name: "Telefon raqam", props: "phone", normal: 0.2 },
  { name: "Ro'yhatdan o'tgan", props: "created_at", normal: 0.15, right: true },
];

const ModeratorsPage = () => {
  const [objectList, setObjectList] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [pageNumber, setPageNumber] = useState(1);
  const [siblingCount] = useState(2);
  const [paginationItems, setPaginationItems] = useState([]);
  const [pageQ, setPageQ] = useState("");

  const fetchUsers = () => {
    axios
      .post(`${usersApi.replace("api", "dashboard")}users/list/`, {
        page_size: pageSize,
        page_number: pageNumber,
        q: pageQ,
        role: "moderator",
      })
      .then((response) => {
        if (response.status === 200) {
          setObjectList(
            response.data.data.map((value, index) => ({
              guid: value.guid,
              count: ((pageNumber - 1) * pageSize + index + 1)
                .toString()
                .padStart(4, "0"),
              full_name:
                `${value.first_name} ${value.last_name} ${value.middle_name}`.trim(),
              phone: formatPhone(value.phone),
              created_at: normalizeDateTime(value.created_at),
            }))
          );

          updatePagination(response.data.total_pages);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const updatePagination = (totalPages) => {
    let tempPagination = [];
    const start = Math.max(1, pageNumber - siblingCount);
    const end = Math.min(totalPages, pageNumber + siblingCount);

    for (let i = start; i <= end; i++) {
      tempPagination.push(i);
    }

    if (start > 1) tempPagination.unshift(1, "...");
    if (end < totalPages) tempPagination.push("...", totalPages);

    setPaginationItems(tempPagination);
  };

  useEffect(() => {
    fetchUsers();
  }, [pageNumber, pageSize, pageQ]);

  return (
    <>
      <div className="container">
        <div className="container-top">
          <h3 className="title">Kasanachilar</h3>
        </div>

        <div className="admin-content bg-white w-full p-3 rounded-lg">
          <div className="table-properties flex items-center justify-center gap-x-2">
            {/* Page Size Selector */}
            <div className="num-results min-w-fit flex gap-x-2">
              <span className="number-results-label block text-sm leading-0.3">
                Sahifadagi <br />
                natijalar soni
              </span>
              <select
                className="number-results-input flex h-7 w-auto text-slate-950 placeholder-placeholder px-2 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300"
                value={pageSize}
                onChange={(e) => setPageSize(parseInt(e.target.value))}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            <div className="w-full"></div>

            {/* Search Input */}
            <div className="search">
              <input
                type="text"
                className="search-input flex h-7 w-auto text-slate-950 placeholder-placeholder px-2 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300"
                placeholder="Qidiruv"
                value={pageQ}
                onChange={(e) => setPageQ(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="actions flex items-center justify-center gap-x-2">
              <select className="actions-input flex h-7 w-auto text-slate-950 placeholder-placeholder px-2 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300">
                <option value="nothing">Amallar</option>
                <option value="delete">O'chirish</option>
              </select>

              <Link
                to="/admin/users/create/"
                className="bg-brand flex items-center justify-center gap-2 w-7 h-7 text-white rounded-md cursor-pointer"
              >
                <img src={AddUser} alt="" className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Table Component */}
          <DatatableComponent columns={columnsMeta} data={objectList} />

          {/* Pagination */}
          <div className="table-pagination flex items-center justify-center mt-3 gap-x-2">
            {paginationItems.length > 1 &&
              paginationItems.map((value, index) =>
                value === "..." ? (
                  <span key={index} className="px-2">
                    ...
                  </span>
                ) : (
                  <button
                    type="button"
                    className={`pagination-item flex items-center justify-center w-7 h-7 rounded-md cursor-pointer ${
                      value === pageNumber
                        ? "bg-brand text-white"
                        : "bg-placeholder/20 text-zinc-600"
                    }`}
                    onClick={() => setPageNumber(value)}
                    key={index}
                  >
                    {value}
                  </button>
                )
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModeratorsPage;
