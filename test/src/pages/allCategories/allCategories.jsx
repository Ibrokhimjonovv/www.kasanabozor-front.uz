import React, { useState, useContext } from "react";
// import { Slider, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./allCategories.scss";
import aaa from "./Без имени-2 1.png";
import Discount from "../../components/discount/Discount";
import { MyContext } from '../../context/myContext';
import axios from 'axios';
import { eCommerseServerUrl } from '../../SuperVars';



const AllCategories = () => {
  const { categories } = useContext(MyContext);
  const [products, setProducts] = useState([]);

  const fetchData = async (id) => {
      try {
        const response = await axios.post(`${eCommerseServerUrl}products/filtered/`, {'filters': {'category': id}}, {
          headers: {'Content-Type': 'application/json'}
        });
        console.log(response);
        if (response.data.status === "ok") {
          setProducts(response.data.results);
        }
      } catch (err) {
        console.log(err);
      }
  }

  const handleCategoryChange = async (event) => {
    const { id } = event.target;
    fetchData(id);
  };  
  
  /* const handlePaidChange = (event) => {
    const { checked, id } = event.target;
    setSelectedPaid((prev) =>
      checked ? [...prev, id] : prev.filter((paid) => paid !== id)
    );
  };
  
  const handleRatingChange = (event, newValue) => {
    setRatingRange(newValue);
    console.log(newValue);
  };

  */
  
  return (
    <div id="allCategories">
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
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
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
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span>Barcha kategoriyalar</span>
        </div>
      </div>
      <div className="allProductsPoster">
        <div className="inner">
          <h2>Barcha mahsulotlar</h2>
          <img src={aaa} alt="" />
        </div>
      </div>
      <div className="main">
        <div className="inner">
          <div className="left-side">
            <div className="first-select">
              <p>Kategoriyalar</p>
              <ul>
                {categories.map((category, index) => (
                  <li key={category.id}>
                    <input
                      type="radio"
                      name="category"
                      onChange={handleCategoryChange}
                      id={category.id}
                    />
                    <span className="custom-checkbox"></span>
                    <label htmlFor={category.id}>{category.title}</label>
                  </li>
                ))}
              </ul>
            </div>
    { /* <div className="second-select">
              <p>Narx bo’yicha</p>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    id="paid"
                    onChange={handlePaidChange}
                  />
                  <span className="custom-checkbox"></span>
                  <label htmlFor="paid">Pulli</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="free"
                    onChange={handlePaidChange}
                  />
                  <span className="custom-checkbox"></span>
                  <label htmlFor="free">Bepul</label>
                </li>
              </ul>
            </div> */ }
    { /* <div className="third-select">
              <Box sx={{ width: 300, padding: "20px" }}>
                <p>Reyting bo'yicha</p>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mt={2}
                  marginTop="20px"
                >
                  <Box id="box1">{ratingRange[0]}</Box>
                  <Box id="box2">{ratingRange[1]}</Box>
                </Box>
                <Slider
                  id="slider"
                  value={ratingRange}
                  onChange={handleRatingChange}
                  valueLabelDisplay="off"
                  min={0}
                  max={5}
                  step={1}
                  sx={{
                    mt: 3,
                    color: "#41A58D",
                    "& .MuiSlider-thumb": {
                      backgroundColor: "#ffffff", // Dumaloqni oq rang qilish
                      border: "2px solid #ccc", // Dumaloq atrofida chiziq
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "#B3B3B3", // Temir chiziq orqa fon rangi
                    },
                  }}
                />
              </Box>
            </div> */ }
          </div>
          <div className="right-side">
        <div className={`productsInner sze`}>
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                to={`/online-shop/product/${product.id}`}
                key={product.id}
                className="link-a revealed"
              >
                <div className="product revealed">
                  <div className="imgContainer">
                    <img src={product.product_image_Ecommerce_product_images.length >= 1 ? `http://127.0.0.1:8901${product.product_image_Ecommerce_product_images[0].image}` : ""} alt="" />
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
                    <img src={`http://127.0.0.1:8900${product.user.pfp}`} alt={`${product.first_name} ${product.last_name}`} />
                    <span>{product.user.first_name} {product.user.last_name}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Hech qanday mahsulot topilmadi</p>
          )}
        </div>
        {/*visibleProducts < filteredProducts.length && (
          <div className="showMoreBtn">
            <button onClick={handleShowMore}>Ko'proq ko'rish</button>
          </div>
        )*/}
      </div>
          
          </div>
        </div>
      </div>
    
  );
};

export default AllCategories;
  
