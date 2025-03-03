import React, { useState, useEffect, useContext } from "react";

import "./index.scss";

import { Link } from "react-router-dom";

import StarRating from "../../../components/StarRatingComponent/starRating";
import left from "../../../assets/left.png";
import right from "../../../assets/right.png";

import { MyContext } from "../../../context/myContext";
import {
  eCommerseServerUrl,
  formatLink,
  mediaServerUrl,
} from "../../../server";
import axios from "axios";

const UploadProductsPage = () => {
  const { user } = useContext(MyContext);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const loadData = async () => {
    const response = await axios.post(
      `${eCommerseServerUrl}products/filtered/`,
      { filters: { user: user.id } },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.data.status === "ok") {
      setProducts(response.data.results);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(loadData, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / usersPerPage))
      setCurrentPage(currentPage + 1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentProducts = products.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(products.length / usersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const startUserIndex = indexOfFirstUser + 1;
  const endUserIndex =
    indexOfLastUser < products.length ? indexOfLastUser : products.length;

  const [productStatuses, setProductStatuses] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = product.status;
      return acc;
    }, {})
  );

  const handleStatusChange = (id) => {
    setProductStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: !prevStatuses[id],
    }));
  };

  return (
    <>
      <div className="page-title">
        <h2>Mahsulotlar</h2>
      </div>
    </>
  );
};

export default UploadProductsPage;
