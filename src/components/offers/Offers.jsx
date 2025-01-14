import React, { useState, useEffect } from "react";
import "./Offers.scss";
import { Link, useLocation } from "react-router-dom";
import Discount from "../discount/Discount";
// import axios from 'axios';
// import { eCommerseServerUrl } from '../../SuperVars';


const Offers = ({ selectedCategories, selectedPaid, ratingRange }) => {
  const [filteredProducts, /*setFilteredProducts*/] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);

  /* useEffect(() => {
    if (!Array.isArray(ratingRange) || ratingRange.length !== 2) {
      console.error("ratingRange is not valid:", ratingRange);
      return;
    }
    const filterProducts = () => {
      const [minRating, maxRating] = ratingRange;
      const filtered = products.filter((product) => {
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.category);
        const matchesPaid =
          selectedPaid.length === 0 ||
          selectedPaid.includes(product.paid ? "paid" : "free");
        const matchesRating =
          product.rating >= minRating && product.rating <= maxRating;
        return matchesCategory && matchesPaid && matchesRating;
      });
  
      setFilteredProducts(filtered);
    };
    filterProducts();
  }, [selectedCategories, selectedPaid, ratingRange, products]);
  
  */

  const handleShowMore = () => {
    setVisibleProducts(visibleProducts + 8);
  };
  /* useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".link-a:not(.revealed)");
      reveals.forEach((revealElement) => {
        const windowHeight = window.innerHeight;
        const revealTop = revealElement.getBoundingClientRect().top;
        const revealPoint = windowHeight * 0.6;
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
  }, []); */

  const [className, setClassName] = useState('');
  const location = useLocation();
  const [hideElements, setHideElements] = useState(false);
  
  useEffect(() => {
    if (location.pathname === '/online-shop/all-categories') {
      setClassName('asz');
      setHideElements(true);
    } else {
      setClassName('');
      setHideElements(false);
    }
  }, [location.pathname]);
  
  return (
    <div id="topOffers" className={className}>
      <div className={`products ${hideElements ? 'sze' : ''}`}>
      <div className={`title ${hideElements ? 'hidden' : ''}`}>Takliflar</div>
      <div className={`littleTitle ${hideElements ? 'hidden' : ''}`}>Yangi mahsulotlarni sinab ko'ring!</div>
        <div className={`productsInner ${hideElements ? 'sze' : ''}`}>
          {filteredProducts.length > 0 ? (
            filteredProducts.slice(0, visibleProducts).map((product) => (
              <Link
                to={`/online-shop/product/${product.id}`}
                key={product.id}
                className="link-a revealed"
              >
                <div className="product link-a-product revealed">
                  <div className="imgContainer">
                    <img src={product.product_image_Ecommerce_product_images.length >= 1 ? `http://5.75.178.236:4901${product.product_image_Ecommerce_product_images[0].image}` : ""} alt="" />
                  </div>
                  <div className="productTitle">{product.name}</div>
                  <div className="productDescription">
                    {product.description}
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
                  </div>
                  <div className="author">
                    <img src={`http://5.75.178.236:4900${product.user.pfp}`} alt={`${product.first_name} ${product.last_name}`} />
                    <span>{product.user.first_name} {product.user.last_name}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Hech qanday mahsulot topilmadi</p>
          )}
        </div>
        {visibleProducts < filteredProducts.length && (
          <div className="showMoreBtn">
            <button onClick={handleShowMore}>Ko'proq ko'rish</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Offers;
