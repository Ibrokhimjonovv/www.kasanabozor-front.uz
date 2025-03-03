import React, { useContext, useEffect, useState } from "react";

import "./index.scss";

import { Link } from "react-router-dom";

import Discount from "../DiscountComponent/Discount";
import Loading from "../LoaderComponent/loading";

import {
  onlineShopApi,
  usersApi,
} from "../../server";

import { OnlineShopContext } from "../../context/onlineshop";

const News = () => {
  const { newProducts } = useContext(OnlineShopContext);
  const [moreNewProducts, setMoreNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMoreNewProducts(newProducts);
    setLoading(false);
  }, [newProducts]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setMoreNewProducts([...moreNewProducts, ...newProducts]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div id="topNews">
      <div className="products">
        <div className="title">Kasanachilarimizdan yangilik🚀</div>
        <div className="littleTitle">Yangi mahsulotlarni sinab koring!</div>
        <div className="productsInner">
          {moreNewProducts.map((product, index) => (
            <Link to={`product/${product.meta}/`} key={index}>
              <div className="product">
                <div className="imgContainer">
                  <img
                    src={`${onlineShopApi.split("/api")[0]}${product.image}`}
                    alt=""
                  />
                </div>

                <div className="body">
                  <div className="productTitle">{product.title}</div>
                  <div className="productDescription">
                    {product.short_description}
                  </div>

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
                    <img
                      src={`${usersApi.split("api")[0]}${product.user.pfp}`}
                      alt=""
                    />
                    <span>
                      {product.user.first_name} {product.user.last_name}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {loading && (
          <div style={{ padding: "36px 0" }}>
            <Loading />
          </div>
        )}

        <div className="showMoreBtn">
          <button onClick={loadMore}>Ko'proq ko'rish</button>
        </div>
      </div>
    </div>
  );
};

export default News;
