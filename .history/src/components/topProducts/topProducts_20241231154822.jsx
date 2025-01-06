import React, { useState, useContext, useEffect } from "react";
import "./topProducts.scss";
import category1 from "./Cup_perspective_matte.png";
import category2 from "./E-mail_perspective_matte.png";
import category3 from "./Heart_rate_perspective_matte.png";
import category4 from "./Gym_perspective_matte.png";
import category5 from "./Paints_perspective_matte.png";
import category6 from "./Radio_perspective_matte.png";
import category7 from "./Star_perspective_matte.png";
import category8 from "./Tools_perspective_matte.png";
import category9 from "./Grid.png";
import downArrow from "./Chevron down.png";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/myContext";
import Discount from "../discount/Discount";
const TopProducts = () => {
  const { products } = useContext(MyContext);
  const catgories = [
    {
      id: 1,
      category: "Kasanachilik",
      img: category1,
    },
    {
      id: 2,
      category: "Kulolchilik",
      img: category2,
    },
    {
      id: 3,
      category: "Pillachilik",
      img: category3,
    },
    {
      id: 4,
      category: "Dehqonchilik",
      img: category4,
    },
    {
      id: 5,
      category: "Beshinchi",
      img: category5,
    },
    {
      id: 6,
      category: "Oltinchi",
      img: category6,
    },
    {
      id: 7,
      category: "Yettinchi",
      img: category7,
    },
    {
      id: 8,
      category: "Sakkizinchi",
      img: category8,
    },
  ];
  const [visibleProducts, setVisibleProducts] = useState(8);
  const handleShowMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 8);
  };
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
    <div id="topProductss">
      <div className="categories">
        <div className="custom-catgories">
          {catgories.map((category, index) => (
            <Link to={`categories/${category.category}`} key={index}>
              <img src={category.img} alt="" />
              <span>{category.category}</span>
            </Link>
          ))}
        </div>
        <Link to="/online-shop/all-categories">
          <div className="default-category">
            <img src={category9} alt="" />
            <span>Barcha kategoriyalar</span>
            <img src={downArrow} alt="" />
          </div>
        </Link>
      </div>

      <div className="products">
        <div className="title">Bozori chaqqon mahsulotlar 🔥</div>
        <div className="littleTitle">
          So’nggi haftaning eng mashhur mahsulotlari
        </div>

        <div className="productsInner">
          {products.slice(0, visibleProducts).map((product, index) => (
            <Link to={`product/${product.id}`} key={index}>
              <div className="product">
                <div className="imgContainer">
                  <img src={product.img} alt="" />
                </div>
                <div className="productTitle">{product.title}</div>
                <div className="productDescription">{product.description}</div>
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
        {visibleProducts < products.length && (
          <div className="showMoreBtn">
            <button onClick={handleShowMore}>Ko'proq ko'rish</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopProducts;
