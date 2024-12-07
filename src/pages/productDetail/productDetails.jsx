import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "./productDetails.scss";

import img1 from "./productImg1.png";
import img2 from "./productImg2.png";
import img3 from "./productImg3.png";
import img4 from "./productImg4.png";
import img5 from "./productImg5.png";
import { MyContext } from "../../context/myContext";
import Loading from "../../components/loading/loading";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedDep, setSelectedDep] = useState("tarriff");
  const [similarProducts, setSimilarProducts] = useState([]);
  const { products } = useContext(MyContext);
  const [mainImage, setMainImage] = useState(img1);
  const [images, setImages] = useState([img2, img3, img4, img5]);
  const handleImageClick = (selectedImage, index) => {
    setImages([mainImage, ...images.filter((_, i) => i !== index)]);
    setMainImage(selectedImage);
  };

  useEffect(() => {
    const foundProduct = products.find((item) => item.id === parseInt(id));
    setProduct(foundProduct);

    if (foundProduct) {
      const filteredProducts = products.filter(
        (item) =>
          item.category === foundProduct.category && item.id !== foundProduct.id
      );
      setSimilarProducts(filteredProducts);
    }
  }, [id]);

  if (!product) {
    return <p><Loading /></p>;
  }

  const handleChange = (event) => {
    setSelectedDep(event.target.id);
    console.log(selectedDep);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
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
          <span>{product.title}</span>
        </div>
      </div>

      <div className="about-product">
        <div className="images-container">
          <div className="images">
            <div className="vertical-images">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 2}`}
                  onClick={() => handleImageClick(image, index)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
            <div className="hero-image">
              <img src={mainImage} alt="" />
            </div>
          </div>
          <div className="with-author">
            <div className="author">
              <img src={product.authorImg} alt="" />
              <div className="text">
                <div className="name">{product.authorName}</div>
                <div className="work">{product.work}</div>
              </div>
            </div>
            <Link to="#">Buyurtma qilish</Link>
          </div>
        </div>
        <div className="texts">
          <div className="title">{product.title}</div>

          <div className="price">
            <span
              className={
                product.newPrice === null ? "oldPrice active" : "oldPrice "
              }
            >
              {formatPrice(product.oldPrice)} so'm
            </span>
            <span className={product.newPrice ? "newPrice active" : "newPrice"}>
              {product.newPrice ? `${formatPrice(product.newPrice)} so'm` : ""}
            </span>
            {product.newPrice && (
              <div className="chegirma">
                {Math.round(
                  ((product.oldPrice - product.newPrice) / product.oldPrice) *
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
              <p>
                Ko'p funktsiyali oshxona pichog'i pishloq, non, sariyog ' va
                sabzavotlarni maydalash, sabzavot va mevalarni, shu jumladan
                kartoshkani (kartoshkani) tozalash va kesish uchun javob beradi.
                Oshxona uchun oshpaz pichog'i-bu baliq kesish uchun non va
                fileto pichog'i, go'sht va biftek uchun bolta, shuningdek
                o'tlar, pishloq va kolbasa uchun, tarvuz uchun, kabob uchun,
                piyoz uchun, pomidor uchun, meva yadrosi uchun, xamirni kesish
                uchun javob beradi. Ushbu yordamchi pichoq sizning sevimli
                ayolingiz, qizingiz, xotiningiz, onangiz yoki buvingiz uchun
                ajoyib sovg'a bo'ladi. Oshxona pichog'i har qanday oshxonada
                ajralmas yordamchidir. O'tkir pichoq pichog'i yuqori sifatli
                zanglamaydigan po'latdan yasalgan bo'lib, uning chidamliligi va
                mukammal kesish qobiliyatini ta'minlaydi. U optimal uzunlikka
                ega, bu sizga oziq-ovqat mahsulotlarini oson va toza kesish,
                kesish va kesish imkonini beradi. Ushbu yordamchi pichoq
                pishirish paytida turli xil vazifalarni bajarish uchun
                mo'ljallangan.
              </p>
            </div>
            <div
              className={`datas-container ${
                selectedDep === "datas" ? "active" : ""
              }`}
            >
              <p className="title">Pichoqning o’lchamlari va tavsifi:</p>
              <div className="more-data">
                <ul>
                  <li>
                    <span>Pichoqning o’lchamlari va tavsifi:</span>
                    <span></span>
                    <span>21.6 sm (8.5 dyuym)</span>
                  </li>
                  <li>
                    <span>Pichoq uzunligi:</span>
                    <span></span>
                    <span>10.2 sm (4 dyuym)</span>
                  </li>
                  <li>
                    <span>Tutqich uzunligi:</span>
                    <span></span>
                    <span>11.4 sm (4.5 dyuym)</span>
                  </li>
                  <li>
                    <span>Pichoq qalinligi:</span>
                    <span></span>
                    <span>3 mm (0.12 dyuym)</span>
                  </li>
                  <li>
                    <span>Og’irligi:</span>
                    <span></span>
                    <span>175 gramm (6.2 untsiya)</span>
                  </li>
                  <li>
                    <span>Pichoq materiali:</span>
                    <span></span>
                    <span>Yuqori sifatli karbonli zanglamaydigan po’lat</span>
                  </li>
                  <li>
                    <span>Tutqich materiali:</span>
                    <span></span>
                    <span>G10 kompozit, sirpanmaydigan yuzaga ega</span>
                  </li>
                  <li>
                    <span>Pichoq qirrasining turi:</span>
                    <span></span>
                    <span>Tekis, o’tkir</span>
                  </li>
                  <li>
                    <span>Qattiqlik darajasi:</span>
                    <span></span>
                    <span>HRC 58-60</span>
                  </li>
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
                    <li>Qulay tutish uchun ergonomik tutqich dizayni</li>
                    <li>Mustahkamlikni oshiruvchi to‘liq karkasli tuzilma</li>
                    <li>
                      Korroziyaga chidamli pichoq, uzoq muddat o’tkirlikni
                      saqlab qoladi
                    </li>
                    <li>
                      Ko‘p funksiyali dizayn: kesish, chopish va tilish uchun
                      mos
                    </li>
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
            <Link to={`product/${similarProduct.id}`} key={index}>
              <div className="product">
                <div className="imgContainer">
                  <img src={similarProduct.img} alt="" />
                </div>
                <div className="productTitle">{similarProduct.title}</div>
                <div className="productDescription">
                  {similarProduct.description}
                </div>
                <div className="price">
                  <span className="oldPrice">
                    {similarProduct.oldPrice} so'm
                  </span>
                  <span className="newPrice">
                    {similarProduct.newPrice} so'm
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
    </div>
  );
};

export default ProductDetails;
