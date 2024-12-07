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
        const revealPoint = windowHeight * 0.9; // 90% ko‘rinish sharti

        if (
          revealTop < revealPoint &&
          !revealElement.classList.contains("revealed")
        ) {
          revealElement.classList.add("revealed");
        }
      });
    };

    window.addEventListener("scroll", reveal);

    // Birinchi ochilish uchun chaqiriladi
    reveal();

    // Scroll listenerni tozalash
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
        <Link to="/all-categories">
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
