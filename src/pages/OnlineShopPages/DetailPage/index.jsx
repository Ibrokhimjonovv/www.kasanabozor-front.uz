import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import "./index.scss";

import whenImageIsNotUploaded from "../../../assets/when_image_is_not_uploaded.jpg";

import Loading from "../../../components/LoaderComponent/loading";
import AddProductsComments from "../../../components/AddProductCommentsComponent";
import NotFoundPage from "../../NotFoundPage/index";

import axios from "axios";
import {
  onlineShopApi,
  usersApi,
} from "../../../server";
import { UserContext } from "../../../context/user";
import { ChatContext } from "../../../context/messenger";

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};


const DetailPage = () => {
  const { meta } = useParams();
  const { isAuthenticated } = useContext(UserContext);
  const { fetchChatsData, changeChat } = useContext(ChatContext);
  const [product, setProduct] = useState(null);
  const [selectedDep, setSelectedDep] = useState("tarriff");
  const [similarProducts, setSimilarProducts] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await axios.get(`${onlineShopApi}product/${meta}`);
      console.log(response);

      if (response.status === 200) {
        setProduct(response.data);
        setMainImage(response.data.product_images_onlineshop[0]);
        setImages(response.data.product_images_onlineshop);
      }
    } catch (err) {}
  };

  useEffect(() => {
    setLoading(true);
    if (meta.length) {
      fetchData();
      setLoading(false);
    }
  }, [meta]);

  const handleImageClick = (selectedImage) => {
    setMainImage(selectedImage);
  };

  const handleChange = (event) => {
    setSelectedDep(event.target.id);
  };

  const handleConnect = () => {
    axios
      .post(
        `${onlineShopApi.replace("api", "messenger")}chats/${
          product.user.guid
        }/create/`,
        {
          data: {
            product: product.guid,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((request) => {
        fetchChatsData(() => {
          if (request.data.guid) {
            changeChat(request.data.guid);
            navigate('/messaging/');
          }
        });
      });
  };

  return (
    <>
      {loading ? (
        <div style={{ height: "calc(100vh - 178px)" }}>
          <Loading />
        </div>
      ) : product ? (
        <div className="product-details">
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
              <Link to={`/online-shop/categories/${product.category.meta}`}>
                {product.category.title}
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
              <span>{product.title}</span>
            </div>
          </div>

          <div className="about-product">
            <div className="images-container">
              {images.length >= 1 && mainImage.image ? (
                <div className="images">
                  <div className="vertical-images">
                    {images?.map((image, index) => (
                      <img
                        key={index}
                        src={`${onlineShopApi.split("/api")[0]}${image.image}`}
                        alt={`Image ${index + 2}`}
                        onClick={() => handleImageClick(image, index)}
                        style={{ cursor: "pointer" }}
                      />
                    ))}
                  </div>
                  <div className="hero-image">
                    <img
                      src={`${onlineShopApi.split("/api")[0]}${
                        mainImage?.image
                      }`}
                      alt=""
                    />
                  </div>
                </div>
              ) : (
                <div className="images">
                  <div className="vertical-images">
                    <img src={whenImageIsNotUploaded} alt="..." />
                  </div>
                  <div className="hero-image">
                    <img src={whenImageIsNotUploaded} alt="..." />
                  </div>
                </div>
              )}
            </div>
            <div className="texts">
              <div className="title">{product.name}</div>

              <div className="price">
                <span
                  className={
                    product.price_discount === null
                      ? "oldPrice active"
                      : "oldPrice "
                  }
                >
                  {formatPrice(product.price)} so'm
                </span>
                <span
                  className={
                    product.price_discount ? "newPrice active" : "newPrice"
                  }
                >
                  {product.price_discount
                    ? `${formatPrice(product.price_discount)} so'm`
                    : ""}
                </span>
                {product.price_discount && (
                  <div className="chegirma">
                    {Math.round(
                      ((product.price - product.price_discount) /
                        product.price) *
                        100
                    )}
                    % CHEGIRMA
                  </div>
                )}
              </div>

              <div className="title">Qisqacha tafsilot</div>
              <p>{product.short_description}</p>
              <div className="with-author">
                <div className="author">
                  <img
                    src={`${usersApi.split("api")[0]}${product.user.pfp}`}
                    alt=""
                  />
                  <div className="text">
                    <div className="name">
                      {product.user.first_name} {product.user.last_name}
                    </div>
                    <div className="work">{product.user.purposes}</div>
                  </div>
                </div>
                {isAuthenticated ? (
                  <Link to="#" onClick={handleConnect}>
                    Bog'lanish
                  </Link>
                ) : (
                  <Link to="/auth/sign-in/">Kirish</Link>
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                <p className="title">{product.title}</p>
                <p
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></p>
                {/*<div className="hashtags">
              <div className="hashtag">#quroqchilik</div>
              <div className="hashtag">#quroqchilik</div>
              <div className="hashtag">#quroqchilik</div>
              <div className="hashtag">#quroqchilik</div>
              <div className="hashtag">#quroqchilik</div>
            </div> */}
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
            <div className="littleTitle">
              Yangi mahsulotlarni sinab ko'ring!
            </div>
            <div className="similar-products">
              {similarProducts.map((similarProduct, index) => (
                <a
                  href={`/online-shop/details/${similarProduct.id}/`}
                  key={index}
                >
                  <div className="product">
                    <div className="imgContainer">
                      <img
                        src={
                          similarProduct
                            .product_image_Ecommerce_product_images[0]
                            ? `${mediaServerUrl}ecommerse${formatLink(
                                similarProduct
                                  .product_image_Ecommerce_product_images[0]
                                  .image
                              )}`
                            : whenImageIsNotUploaded
                        }
                        alt="..."
                      />
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
                      <img
                        src={`${mediaServerUrl}users${formatLink(
                          similarProduct.user.pfp
                        )}`}
                        alt=""
                      />
                      <span>
                        {similarProduct.user.first_name}{" "}
                        {similarProduct.user.last_name}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <NotFoundPage></NotFoundPage>
      )}
    </>
  );
};

export default DetailPage;
