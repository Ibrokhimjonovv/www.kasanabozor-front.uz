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

  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription); // Update state when editor content changes
  };

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
      images
    };

    console.log(productData);

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
          <Link to="/profile">Shaxsiy kabinet</Link>
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
          <Link to="/profile/products">Mahsulotlarim</Link>
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
          <p style={{ fontWeight: 600, margin: "10px 0" }}>
            Mahsulot ma'lumotlari
          </p>
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
                {error.price && (
                  <div className="error-message">{error.price}</div>
                )}
              </div>

              {isChecked && (
                <div
                  className="input-row cheg-row"
                  style={{ marginTop: "10px" }}
                >
                  <div className="inputs cheg-inp">
                    <label htmlFor="discount">Chegirma foizi</label>
                    <input
                      type="text"
                      placeholder="Foizni raqamda kiriting"
                      value={discount}
                      onChange={(e) => handleInputChange(e, "discount")}
                      required
                    />
                    {error.discount && (
                      <div className="error-message">{error.discount}</div>
                    )}
                  </div>
                  <div className="inputs cheg-inp">
                    <label htmlFor="final-price">So'nggi narx</label>
                    <div className="past-price">
                      {finalPrice !== null
                        ? `${finalPrice} so'm`
                        : "Narxni kiriting"}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="input-row">
              <label htmlFor="status">Mahsulot haqida</label>
              <div className="inputs">
                <EditorBar
                  id="product-editor"
                  name="description"
                  initialValue={description} // Pass initial value for the editor
                  onChange={handleDescriptionChange} // Handle the content change
                />
              </div>
              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <p style={{ fontWeight: 600, margin: "5px 0" }}>
              Mahsulot rasmlari
            </p>
            <div className="input-row">
              <label htmlFor="">Rasmlar</label>
              <ImageUpload changeLocal={ setNewProductImages } />
            </div>
            <p style={{ fontWeight: 600, margin: "5px 0" }}>Kategoriyasi</p>
            <div
              className="input-row"
              style={{ flexDirection: "row", gap: "20px" }}
            >
              <div className="inputs" style={{ width: "50%" }}>
                <label htmlFor="category">Kategoriya</label>
                <select
                  name="category"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  required
                  style={{ marginTop: "5px" }}
                >
                  <option value="active">Kategoriya 1</option>
                  <option value="non-active">Kategoriya 2</option>
                </select>
              </div>
              <div className="inputs" style={{ width: "50%" }}>
                <label htmlFor="status">Holati</label>
                <select
                  name="status"
                  id="status"
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                  required
                  style={{ marginTop: "5px" }}
                >
                  <option value="active">Aktiv</option>
                  <option value="non-active">Aktiv emas</option>
                </select>
              </div>
            </div>
            <div className="button">
              <button type="submit" id="sub">
                Qo'shish
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1104_843)">
                    <path
                      d="M11.167 14V12.6667C11.167 11.9594 10.886 11.2811 10.3859 10.781C9.88585 10.281 9.20757 10 8.50033 10H3.83366C3.12641 10 2.44814 10.281 1.94804 10.781C1.44794 11.2811 1.16699 11.9594 1.16699 12.6667V14M13.8337 5.33333V9.33333M15.8337 7.33333H11.8337M8.83366 4.66667C8.83366 6.13943 7.63975 7.33333 6.16699 7.33333C4.69423 7.33333 3.50033 6.13943 3.50033 4.66667C3.50033 3.19391 4.69423 2 6.16699 2C7.63975 2 8.83366 3.19391 8.83366 4.66667Z"
                      stroke="#E7F4F1"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1104_843">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button className="close">
                Bekor qilish
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 1L1 9M1 1L9 9"
                    stroke="#41A58D"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
