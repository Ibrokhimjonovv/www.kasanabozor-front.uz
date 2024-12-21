import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "./productDetails.scss";
import axios from 'axios';

import { MyContext } from "../../context/myContext";
import Loading from "../../components/loading/loading";
import { eCommerseServerUrl } from "../../SuperVars";

import AddComments from "../../components/addComments/addComments";
import AddProductsComments from "../../components/addProductComments/addProductsComment";

const ProductDetails = () => {
  const { isAuthenticated } = useContext(MyContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedDep, setSelectedDep] = useState("tarriff");
  const [similarProducts, setSimilarProducts] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]);

  const handleImageClick = (selectedImage, index) => {
    setImages([mainImage, ...images.filter((_, i) => i !== index)]);
    setMainImage(selectedImage);
  };

  const loadProductData = async () => {
    try {
      const productsResponse = await axios.post(`${eCommerseServerUrl}products/exact/`, {'id': parseInt(id)}, {'headers': {'Content-Type': 'application/json'}});

      setProduct(productsResponse.data.product);
      setSimilarProducts(productsResponse.data.related);
      setImages(productsResponse.data.product.product_image_Ecommerce_product_images);
      setMainImage(productsResponse.data.product.product_image_Ecommerce_product_images[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let isMounted = true; // To prevent setting state on unmounted component

    const loadData = async () => {
      if (isMounted) {
        await loadProductData();
      }
    };

    loadData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []); // Ensure usersServerUrl is a dependency if it's dynamic

  const handleChange = (event) => {
    setSelectedDep(event.target.id);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (product ? <><div className="product-details">
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
          <Link to={`/online-shop/categories/${product.category}`}>
            {product.category}
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
          <span>{product.name}</span>
        </div>
      </div>

      <div className="about-product">
        <div className="images-container">
          <div className="images">
            <div className="vertical-images">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={ `http://127.0.0.1:8901${image.image}` }
                  alt={`Image ${index + 2}`}
                  onClick={() => handleImageClick(image, index)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
            <div className="hero-image">
              <img src={ `http://127.0.0.1:8901${mainImage.image}` } alt="" />
            </div>
          </div>
        </div>
        <div className="texts">
          <div className="title">{product.name}</div>

          <div className="price">
            <span
              className={
                product.price_off === null ? "oldPrice active" : "oldPrice "
              }
            >
              {formatPrice(product.price)} so'm
            </span>
            <span className={product.price_off ? "newPrice active" : "newPrice"}>
              {product.price_off ? `${formatPrice(product.price_off)} so'm` : ""}
            </span>
            {product.price_off && (
              <div className="chegirma">
                {Math.round(
                  ((product.price - product.price_off) / product.price) *
                    100
                )}
                % CHEGIRMA
              </div>
            )}
          </div>

          <div className="title">Qisqacha tafsilot</div>
          <p>{product.description}</p>
          <div className="with-author">
            <div className="author">
              <img src={product.user.pfp} alt="" />
              <div className="text">
                <div className="name">{product.user.first_name} {product.user.last_name}</div>
	  	{/* <div className="work">{product.work}</div> */}
              </div>
            </div>
            {isAuthenticated ? (
              <Link to="#">Bog'lanish</Link>
            ) : (
              <Link to="/login">Kirish</Link>
            )}
          </div>
        </div>
      </div>
      <div className="about-product-bottom">
        <div className="dep">
          <input
            type="radio"
            name="dep"
            id="tarriff"
            checked={selectedDep === "tarriff"}
            onChange={handleChange}
          />
          <label htmlFor="tarriff" className="tarriff_label">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.0013 13.3333V10M10.0013 6.66667H10.0096M18.3346 10C18.3346 14.6024 14.6037 18.3333 10.0013 18.3333C5.39893 18.3333 1.66797 14.6024 1.66797 10C1.66797 5.39763 5.39893 1.66667 10.0013 1.66667C14.6037 1.66667 18.3346 5.39763 18.3346 10Z"
                stroke="#41A58D"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Mahsulot tarifi
          </label>
          <input
            type="radio"
            name="dep"
            id="datas"
            checked={selectedDep === "datas"}
            onChange={handleChange}
          />
          <label htmlFor="datas" className="datas_label">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 9.58333C17.5029 10.6832 17.2459 11.7682 16.75 12.75C16.162 13.9265 15.2581 14.916 14.1395 15.6077C13.021 16.2995 11.7319 16.6662 10.4167 16.6667C9.31678 16.6695 8.23176 16.4126 7.25 15.9167L2.5 17.5L4.08333 12.75C3.58744 11.7682 3.33047 10.6832 3.33333 9.58333C3.33384 8.26813 3.70051 6.97904 4.39227 5.86046C5.08402 4.74187 6.07355 3.83797 7.25 3.25C8.23176 2.75411 9.31678 2.49713 10.4167 2.5H10.8333C12.5703 2.59583 14.2109 3.32897 15.4409 4.55905C16.671 5.78913 17.4042 7.42971 17.5 9.16667V9.58333Z"
                stroke="#5A5A5A"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Fikrlar
          </label>
        </div>
        <div className="dep-container">
          <div
            className={`datas-container ${
              selectedDep === "tarriff" ? "active" : ""
            }`}
          >
            <p className="title">{product.name}</p>
            <p>{product.description}</p>
            <div className="hashtags">
              <div className="hashtag">#quroqchilik</div>
              <div className="hashtag">#quroqchilik</div>
              <div className="hashtag">#quroqchilik</div>
              <div className="hashtag">#quroqchilik</div>
              <div className="hashtag">#quroqchilik</div>
            </div>
          </div>
          <div
            className={`datas-container ${
              selectedDep === "datas" ? "active" : ""
            }`}
          >
            <AddProductsComments com={product} />
          </div>
        </div>
      </div>
      <div className="similar">
        <div className="title">O'xshash mahsulotlar</div>
        <div className="littleTitle">Yangi mahsulotlarni sinab ko'ring!</div>
        <div className="similar-products">
          {similarProducts.map((similarProduct, index) => (
            <a href={`/online-shop/product/${similarProduct.id}`} key={index}>
              <div className="product">
                <div className="imgContainer">
                <img src={'http://127.0.0.1:8901' + String(similarProduct.product_image_Ecommerce_product_images[0] ? similarProduct.product_image_Ecommerce_product_images[0].image : '/static/404.jpg')} alt="..." />
                </div>
                <div className="productTitle">{similarProduct.name}</div>
                <div className="productDescription">
                  {similarProduct.description}
                </div>
                <div className="price">
                  <span className="oldPrice">
                    {similarProduct.price} so'm
                  </span>
                  <span className="newPrice">
                    {similarProduct.price_off} so'm
                  </span>
                </div>
                <div className="details">
                  <div className="rating">
                    <span>{similarProduct.average_rating}</span>
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
                    <span>{similarProduct.cart}</span>
                  </div>
                </div>
                <div className="author">
                  <img src={similarProduct.user.pfp} alt="" />
                  <span>{similarProduct.user.first_name} {similarProduct.user.last_name}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div></> : <Loading />
  );
};

export default ProductDetails;
