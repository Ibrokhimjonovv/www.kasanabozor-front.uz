import React, { useContext, useState } from "react";
import "./News.scss";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/myContext";
import Discount from "../discount/Discount";
import { formatLink, mediaServerUrl } from "../../SuperVars";


const News = () => {
  const { products } = useContext(MyContext);
  const [visibleProducts, setVisibleProducts] = useState(8);
  
  const handleShowMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 8);
  };


  return (
    <div id="topNews">
      <div className="products">
        <div className="title">Kasanachilarimizdan yangilik🚀</div>
        <div className="littleTitle">Yangi mahsulotlarni sinab koring!</div>
        <div className="productsInner">
          {products.slice(0, visibleProducts).map((product, index) => (
            <Link to={`product/${product.id}`} key={index}>
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

export default News;
