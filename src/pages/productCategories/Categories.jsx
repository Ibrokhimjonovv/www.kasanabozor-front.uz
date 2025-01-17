import React, { useState, useEffect } from "react";
import "./Categories.scss";
import { Link, useParams } from "react-router-dom";
import Discount from "../../components/discount/Discount";
import axios from 'axios';
import { eCommerseServerUrl, formatLink, mediaServerUrl } from '../../SuperVars';


const Categories = () => {
  const { category } = useParams();
  const [categoryDetails, setCategoryDetails] = useState({'category': {'title': 'Loading...'}, 'products': []});

  const loadData = async () => {
    try {
      const response = await axios.post(`${eCommerseServerUrl}categories/exact/`, {'id': category});
      if (response.data.status === "ok") {
        console.log(response);
        setCategoryDetails(response.data.results);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(loadData, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
 
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
    <div className="products-category">
      <div className="to-back">
        <div className="inner">
          <Link to="/online-shop">
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
          <span>{categoryDetails.category.title}</span>
        </div>
      </div>

      <h2 className="title">{!categoryDetails.category.title === "Loading..." ? categoryDetails.category.title : "Kategoriya"} bo'yicha mahsulotlar</h2>
      <div className="productsInner">
        {categoryDetails.products.length > 0 ? (
          categoryDetails.products.map((product) => (
            <Link to={`/online-shop/product/${product.id}`} key={product.id}>
              <div className="product">
                <div className="imgContainer">
                  <img src={product.product_image_Ecommerce_product_images.length >= 1 ? `${mediaServerUrl}ecommerse${formatLink(product.product_image_Ecommerce_product_images[0].image)}` : ""} alt="" />
                </div>
                <div className="productTitle">{product.name}</div>
                <div className="productDescription">{product.description}</div>
                <Discount product={product} />
                <div className="details">
                  <div className="rating">
                    <span>{product.average_rating}</span>
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
                  <img src={`${mediaServerUrl}users${formatLink(product.user.pfp)}`} alt="" />
                  <span>{product.user.first_name} {product.user.last_name}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>Bu kategoriyada mahsulotlar topilmadi.</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
