import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileSideBar from "../../../components/profileSideBar/profileSideBar";
import "./likedProducts.scss";
import { MyContext } from "../../../context/myContext";
import Discount from "../../../components/discount/Discount";
import left from "../../../assets/left.png"
import right from "../../../assets/right.png"
const LikedProducts = () => {
  const { products } = useContext(MyContext);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
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
  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".product:not(.revealed)");
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
    <div className="profile-container">
      <div className="to-back">
        <div className="backInner">
          <Link to="/">
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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <Link to="/profile">Shaxsiy kabinet</Link>
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
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>Yoqqan mahsulotlar</span>
        </div>
      </div>
      <div className="profile-inner">
        <div className="left">
          <ProfileSideBar />
        </div>
        <div className="right p-relative">
          <div className="page-title">
            <h2>Yoqqan mahsulotlar</h2>
          </div>
          <div className="productsInner">
            {currentProducts.map((product, index) => (
              <Link to={`/online-shop/product/${product.id}`} key={index}>
                <div className="product">
                  <div className="imgContainer">
                    <img src={product.img} alt="" />
                  </div>
                  <div className="productTitle">{product.title}</div>
                  <div className="productDescription">
                    {product.description}
                  </div>
                  <Discount product={product} />
                  <div className="details">
                    <div className="rating">
                      <span>{product.rating}</span>
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.99935 2.16666L12.5743 7.38333L18.3327 8.225L14.166 12.2833L15.1494 18.0167L9.99935 15.3083L4.84935 18.0167L5.83268 12.2833L1.66602 8.225L7.42435 7.38333L9.99935 2.16666Z"
                          fill="#FEC967"
                        />
                      </svg>
                    </div>
                    <div className="cart">
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1467_23513)">
                          <path
                            d="M0.667969 1.16667H3.33464L5.1213 10.0933C5.18226 10.4003 5.34924 10.676 5.593 10.8722C5.83676 11.0684 6.14177 11.1727 6.45464 11.1667H12.9346C13.2475 11.1727 13.5525 11.0684 13.7963 10.8722C14.04 10.676 14.207 10.4003 14.268 10.0933L15.3346 4.50001H4.0013M6.66797 14.5C6.66797 14.8682 6.36949 15.1667 6.0013 15.1667C5.63311 15.1667 5.33464 14.8682 5.33464 14.5C5.33464 14.1318 5.63311 13.8333 6.0013 13.8333C6.36949 13.8333 6.66797 14.1318 6.66797 14.5ZM14.0013 14.5C14.0013 14.8682 13.7028 15.1667 13.3346 15.1667C12.9664 15.1667 12.668 14.8682 12.668 14.5C12.668 14.1318 12.9664 13.8333 13.3346 13.8333C13.7028 13.8333 14.0013 14.1318 14.0013 14.5Z"
                            stroke="#757575"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1467_23513">
                            <rect
                              width="16"
                              height="16"
                              fill="white"
                              transform="translate(0 0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>

                      <span>{product.cart}</span>
                    </div>
                  </div>
                  <div className="author">
                    <img src={product.authorImg} alt="" />
                    <span>{product.authorName}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-prof">
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
                    currentPage === Math.ceil(products.length / usersPerPage)
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

export default LikedProducts;
