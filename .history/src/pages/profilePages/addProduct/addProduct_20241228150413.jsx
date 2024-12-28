import React, { useState } from "react";
import "./addProduct.scss";
import ProfileSideBar from "../../../components/profileSideBar/profileSideBar";
import { Link } from "react-router-dom";
import EditorBar from "../../../components/Editor/Editor";
import ImageUpload from "../../../components/imgUpload/imgUpload";

const AddProducts = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [finalPrice, setFinalPrice] = useState(null);
  const [error, setError] = useState({ price: "", discount: "" });
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Kategoriya 1");
  const [status, setStatus] = useState("active");
  const [description, setDescription] = useState("");

  const handleStatusChange = () => {
    setIsChecked((prev) => !prev);
    setDiscount(""); // Chegirma qiymatini tozalash
    setFinalPrice(null); // So'nggi narxni tozalash
  };

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      if (type === "price") {
        setPrice(value);
        setError((prev) => ({
          ...prev,
          price: value ? "" : "Narxni kiriting",
        }));
      } else if (type === "discount") {
        if (value < 0 || value > 100) {
          setError((prev) => ({
            ...prev,
            discount: "Chegirma foizi 0 va 100 oralig'ida bo'lishi kerak",
          }));
        } else {
          setError((prev) => ({ ...prev, discount: "" }));
          setDiscount(value);
          if (price && value) {
            const priceValue = parseFloat(price);
            const discountValue = parseFloat(value);
            if (!isNaN(priceValue) && !isNaN(discountValue)) {
              const discountedPrice =
                priceValue - (priceValue * discountValue) / 100;
              setFinalPrice(discountedPrice.toFixed(2));
            } else {
              setFinalPrice(null);
            }
          }
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Formdagi ma'lumotlarni yig'ish
    const productData = {
      name: productName,
      price,
      discount: isChecked ? discount : "",
      finalPrice: finalPrice || price,
      category,
      status,
      description,
    };

    try {
      const response = await fetch("API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert("Mahsulot muvaffaqiyatli qo'shildi");
        // Successful response
      } else {
        alert("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
        // Error response handling
      }
    } catch (error) {
      console.error("APIga yuborishda xatolik:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="to-back">
        <div className="backInner">
          <Link to="/">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 18.3334V10H12.5V18.3334M2.5 7.50002L10 1.66669L17.5 7.50002V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1578 16.2754 18.3334 15.8333 18.3334H4.16667C3.72464 18.3334 3.30072 18.1578 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.50002Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <Link to="/profile">Shaxsiy kabinet</Link>
          <span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <Link to="/profile/products">Mahsulotlarim</Link>
          <span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>Mahsulot qo'shish</span>
        </div>
      </div>
      <div className="profile-inner">
        <div className="left">
          <ProfileSideBar />
        </div>
        <div className="right">
          <div className="page-title">
            <h2>Mahsulot qo'shish</h2>
          </div>
          <p style={{ fontWeight: 600, margin: "10px 0" }}>Mahsulot ma'lumotlari</p>
          <form onSubmit={handleSubmit}>
            <div className="input-row">
              <label htmlFor="firstName">Mahsulot nomi</label>
              <div className="inputs">
                <input
                  type="text"
                  placeholder="Nomini kiriting"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div>
              <div className="input-row">
                <label htmlFor="price">Narxi</label>
                <div className="inputs">
                  <div className="cheg">
                    <input
                      type="text"
                      placeholder="Narxni kiriting"
                      value={price}
                      onChange={(e) => handleInputChange(e, "price")}
                      required
                    />
                    <input
                      type="checkbox"
                      id="status-check"
                      checked={isChecked}
                      onChange={handleStatusChange}
                      className="check-inp"
                    />
                    <label htmlFor="status-check" className="checkbox">
                      <span className={isChecked ? "active" : ""}></span>
                    </label>
                    <label htmlFor="status-check">Chegirma</label>
                  </div>
                </div>
                {error.price && <div className="error-message">{error.price}</div>}
              </div>

              {isChecked && (
                <div className="input-row cheg-row" style={{ marginTop: "10px" }}>
                  <div className="inputs cheg-inp">
                    <label htmlFor="discount">Chegirma foizi</label>
                    <input
                      type="text"
                      placeholder="Foizni raqamda kiriting"
                      value={discount}
                      onChange={(e) => handleInputChange(e, "discount")}
                    />
                    {error.discount && <div className="error-message">{error.discount}</div>}
                  </div>
                  <div className="inputs cheg-inp">
                    <label htmlFor="final-price">So'nggi narx</label>
                    <div className="past-price">
                      {finalPrice !== null ? `${finalPrice} so'm` : "Narxni kiriting"}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="input-row">
              <label htmlFor="status">Mahsulot haqida</label>
              <div className="inputs">
                <EditorBar id="my-product-editor" />
              </div>
              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <p style={{ fontWeight: 600, margin: "5px 0" }}>Mahsulot rasmlari</p>
            <div className="input-row">
              <label htmlFor="">Rasmlar</label>
              <ImageUpload />
            </div>
            <p style={{ fontWeight: 600, margin: "5px 0" }}>Kategoriyasi</p>
            <div className="input-row" style={{ flexDirection: "row", gap: "20px" }}>
              <div className="inputs" style={{ width: "50%" }}>
                <label htmlFor="status">Kategoriya</label>
                <select
                  name="status"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  required
                >
                  <option value="Kategoriya 1">Kategoriya 1</option>
                  <option value="Kategoriya 2">Kategoriya 2</option>
                </select>
              </div>
            </div>
            <div className="submit-btn">
              <button type="submit">Yuborish</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
