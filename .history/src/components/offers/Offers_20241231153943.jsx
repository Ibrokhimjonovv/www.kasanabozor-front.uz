import React, { useState, useEffect, useContext } from "react";
import "./Offers.scss";
import { Link, useLocation } from "react-router-dom";
import { MyContext } from "../../context/myContext";
import Discount from "../discount/Discount";
const Offers = ({ selectedCategories, selectedPaid, ratingRange }) => {
  const { products } = useContext(MyContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [visibleProducts, setVisibleProducts] = useState(8);
  useEffect(() => {
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
  

  const handleShowMore = () => {
    setVisibleProducts(visibleProducts + 8);
  };

  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".link-a:not(.revealed)");

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

  const [className, setClassName] = useState('');
  const location = useLocation();
  const [hideElements, setHideElements] = useState(false);

  useEffect(() => {
    if (location.pathname === '/online-shop/all-categories') {
      setClassName('asz'); // ikkinchi sahifaga o'tganda class qo'shish
      setHideElements(true);
    } else {
      setClassName(''); // boshqa sahifalarda class ni olib tashlash
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
                className="link-a"
              >
                <div className="product">
                  <div className="imgContainer">
                    <img src={product.img} alt={product.title} />
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
                  </div>
                  <div className="author">
                    <img src={product.authorImg} alt={product.authorName} />
                    <span>{product.authorName}</span>
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
