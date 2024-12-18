import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "./productDetails.scss";
import axios from 'axios';

import img1 from "./productImg1.png";
import img2 from "./productImg2.png";
import img3 from "./productImg3.png";
import img4 from "./productImg4.png";
import img5 from "./productImg5.png";
import { MyContext } from "../../context/myContext";
import Loading from "../../components/loading/loading";
import { eCommerseServerUrl } from "../../SuperVars";


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedDep, setSelectedDep] = useState("tarriff");
  const [similarProducts, setSimilarProducts] = useState([]);
  const [mainImage, setMainImage] = useState(img1);
  const [images, setImages] = useState([img2, img3, img4, img5]);

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
          <div className="with-author">
            <div className="author">
              <img src={product.user.pfp} alt="" />
              <div className="text">
                <div className="name">{product.user.first_name} {product.user.last_name}</div>
                <div className="work">{product.work}</div>
              </div>
            </div>
            <Link to="#">Buyurtma qilish</Link>
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

          <div className="dep">
            <input
              type="radio"
              name="dep"
              id="tarriff"
              checked={selectedDep === "tarriff"}
              onChange={handleChange}
            />
            <label htmlFor="tarriff" className="tarriff_label">
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
              Batafsil ma’lumot
            </label>
          </div>
          <div className="dep-container">
            <div
              className={`datas-container ${
                selectedDep === "tarriff" ? "active" : ""
              }`}
            >
              <p className="title">Tarif</p>
              <p>{ product.price }</p>
            </div>
            <div
              className={`datas-container ${
                selectedDep === "datas" ? "active" : ""
              }`}
            >
              <p className="title">Pichoqning o’lchamlari va tavsifi:</p>
              <div className="more-data">
                <ul>
                  {product.product_dimension_Ecommerce_product_dimentions.map((value, index) => <li key={ index }>
                    <span>{ value.name }:</span>
                    <span></span>
                    <span>{ value.value }</span>
                  </li>)}
                  
                </ul>
                <div className="xus">
                  <div className="title">Xususiyatlari</div>
                  {/* <div className="xus-inner">
                    <p>Qulay tutish uchun ergonomik tutqich dizayni</p>
                    <p>Mustahkamlikni oshiruvchi to‘liq karkasli tuzilma</p>
                    <p>Korroziyaga chidamli pichoq, uzoq muddat o’tkirlikni saqlab qoladi</p>
                    <p>Ko‘p funksiyali dizayn: kesish, chopish va tilish uchun mos</p>
                  </div> */}
                  <ul>
                    {product.product_property_Ecommerce_product_properties.map((value, index) => <li key={ index }>{ value.text }</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="similar">
        <div className="title">O'xshash mahsulotlar</div>
        <div className="littleTitle">Yangi mahsulotlarni sinab ko'ring!</div>
        <div className="similar-products">
          {similarProducts.map((similarProduct, index) => (
            <Link to={`/online-shop/product/${similarProduct.id}`} key={index}>
              <div className="product">
                <div className="imgContainer">
                {/* <img src={'http://127.0.0.1:8901' + String(product.product_image_Ecommerce_product_images[0] ? product.product_image_Ecommerce_product_images[0].image : '/static/404.jpg')} alt="..." /> */}
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
                    <span>{similarProduct.rating}</span>
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
                  <img src={similarProduct.authorImg} alt="" />
                  <span>{similarProduct.authorName}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div></> : <Loading />
  );
};

export default ProductDetails;
