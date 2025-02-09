import React, { useContext, useState, useEffect } from "react";
import "./adminAnnounces.scss";
import { MyContext } from "../../../context/myContext";
import { Link, useNavigate } from "react-router-dom";
import left from "../../../assets/left.png";
import right from "../../../assets/left.png";
import Dashboard from "../dashboard/dashboard";
import StarRating from "../../../components/starRating/starRating";
import ImageUpload from "../../../components/imgUpload/imgUpload";
import axios from "axios";
import {
  eCommerseServerUrl,
  formatLink,
  mediaServerUrl,
} from "../../../SuperVars.js";
import { announcementsServerUrl } from "../../../SuperVars.js";

const AdminAnnounces = () => {
  const { isOpen } = useContext(MyContext);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / usersPerPage))
      setCurrentPage(currentPage + 1);
  };
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentProducts = products.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(products.length / usersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const startUserIndex = indexOfFirstUser + 1;
  const endUserIndex =
    indexOfLastUser < products.length ? indexOfLastUser : products.length;
  const [offCanvas, setOffCanvas] = useState(false);
  const handleCanvas = (e) => {
    e.preventDefault();
    setOffCanvas(!offCanvas);
  };

  useEffect(() => {
    if (offCanvas) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [offCanvas]);

  /* const [productStatuses, setProductStatuses] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = product.status;
      return acc;
    }, {})
  );
  const handleStatusChange = (id) => {
    setProductStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: !prevStatuses[id],
    }));
  }; */

  const navigation = useNavigate();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [announceType, setAnnounceType] = useState("Xizmat e'loni");

  const handleNegotiableChange = () => {
    setIsNegotiable(!isNegotiable);
    if (!isNegotiable) {
      setMinPrice("0");
      setMaxPrice("0");
    }
  };

  const regionsURL =
    "https://raw.githubusercontent.com/MIMAXUZ/uzbekistan-regions-data/master/JSON/regions.json";
  const districtsURL =
    "https://raw.githubusercontent.com/MIMAXUZ/uzbekistan-regions-data/master/JSON/districts.json";
  const villagesURL =
    "https://raw.githubusercontent.com/MIMAXUZ/uzbekistan-regions-data/master/JSON/villages.json";

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredVillages, setFilteredVillages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [regionsResponse, districtsResponse, villagesResponse] =
          await Promise.all([
            fetch(regionsURL),
            fetch(districtsURL),
            fetch(villagesURL),
          ]);

        if (
          !regionsResponse.ok ||
          !districtsResponse.ok ||
          !villagesResponse.ok
        ) {
          throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi!");
        }

        const regionsData = await regionsResponse.json();
        const districtsData = await districtsResponse.json();
        const villagesData = await villagesResponse.json();

        setRegions(regionsData);
        setDistricts(districtsData);
        setVillages(villagesData);
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik yuz berdi:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const filtered = districts.filter(
        (district) =>
          parseInt(district.region_id, 10) === parseInt(selectedRegion, 10)
      );
      setFilteredDistricts(filtered);
      setSelectedDistrict("");
      setFilteredVillages([]);
    } else {
      setFilteredDistricts([]);
      setFilteredVillages([]);
    }
  }, [selectedRegion, districts]);

  useEffect(() => {
    if (selectedDistrict) {
      const filtered = villages.filter(
        (village) =>
          parseInt(village.district_id, 10) === parseInt(selectedDistrict, 10)
      );
      setFilteredVillages(filtered);
    } else {
      setFilteredVillages([]);
    }
  }, [selectedDistrict, villages]);

  const [announceTitle, setAnnounceTitle] = useState("");
  const [fAddress, setFAddress] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("p_type", announceType);
    formData.append("title", announceTitle);
    formData.append("price_min", minPrice);
    formData.append("price_max", maxPrice);
    console.log(selectedRegion);
    console.log(selectedDistrict);
    formData.append("region", selectedRegion.name_uz);
    formData.append("district", selectedDistrict.name_uz);
    formData.append("argued", isNegotiable);
    formData.append("address", fAddress);
    formData.append("experience", "No experience");
    formData.append("type_type", "Kechgi payt");
    formData.append("description", description);

    const response = await axios.post(
      `${announcementsServerUrl}announcements/create/`,
      formData
    );
    if (response.data.status === "ok") {
      navigation("/announcements/");
    } else {
      alert("Xatolik yuz berdi.");
    }
  };

  return (
    <div id="admin-products" className="admin-add-announce">
      <Dashboard />
      <div className={`admin-item ${isOpen ? "wd" : ""}`}>
        <h2 className="title">E'lonlar</h2>
        <div className="users-list">
          <div className="tool">
            <div className="tool-left">
              <label htmlFor="count">Sahifadagi natijalar soni</label>
              <select name="count" id="count">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">5</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div className="tool-right">
              <form action="">
                <input type="text" placeholder="ID, Tel nomer, Ism sharifi" />
                <button type="submit">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.7472 16.8792L20.7992 20.7992M19.4926 10.3459C19.4926 15.3974 15.3974 19.4926 10.3459 19.4926C5.29432 19.4926 1.19922 15.3974 1.19922 10.3459C1.19922 5.29432 5.29432 1.19922 10.3459 1.19922C15.3974 1.19922 19.4926 5.29432 19.4926 10.3459Z"
                      stroke="#B2B2B2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </form>
              <Link
                to="/dashboard/admin/add-user"
                onClick={(e) => handleCanvas(e)}
              >
                +
              </Link>
              <div className={`offcanvas ${offCanvas ? "show" : ""}`}>
                <h1>Mahsulot qo'shish</h1>
                <form action="" onSubmit={handleSubmit}>
                  <div className="input-col">
                    <label htmlFor="announce-type">E'lon turi</label>
                    <div className="input-icon">
                      <select
                        name="announce-type"
                        id="announce-type"
                        value={announceType}
                        onChange={(e) => setAnnounceType(e.target.value)}
                      >
                        <option value="service_announcement">
                          Xizmat e'loni
                        </option>
                        <option value="job_announcement">Ish e'loni</option>
                      </select>
                    </div>
                  </div>
                  <p>Xizmat haqida ma'lumotlar</p>
                  <div className="input-col w-100">
                    <label htmlFor="announce-name">Xizmat nomi</label>
                    <div className="input-icon">
                      <input
                        type="text"
                        placeholder="Nomini kiriting"
                        className="input-p-0"
                        id="announce-name"
                        value={announceTitle}
                        onChange={(e) => {
                          setAnnounceTitle(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="input-col w-100">
                    <label htmlFor="price" id="price_label">
                      Narx oralig'i
                    </label>
                    <div className="inputs">
                      <div className="input-icon">
                        <input
                          id="price"
                          type="number"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          placeholder={`${
                            isNegotiable ? "Kelishilgan holda" : "0"
                          }`}
                          disabled={isNegotiable}
                        />
                      </div>
                      <div className="input-icon">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_1335_19575)">
                            <path
                              d="M6 9C2.579 9 0 10.505 0 12.5V20.5C0 22.495 2.579 24 6 24C9.421 24 12 22.495 12 20.5V12.5C12 10.505 9.421 9 6 9ZM10 16.5C10 17.029 8.481 18 6 18C3.519 18 2 17.029 2 16.5V15.152C3.046 15.685 4.435 16 6 16C7.565 16 8.954 15.685 10 15.152V16.5ZM6 11C8.481 11 10 11.971 10 12.5C10 13.029 8.481 14 6 14C3.519 14 2 13.029 2 12.5C2 11.971 3.519 11 6 11ZM6 22C3.519 22 2 21.029 2 20.5V19.152C3.046 19.685 4.435 20 6 20C7.565 20 8.954 19.685 10 19.152V20.5C10 21.029 8.481 22 6 22ZM24 5V19C24 21.757 21.757 24 19 24H14C13.447 24 13 23.552 13 23C13 22.448 13.447 22 14 22H19C20.654 22 22 20.654 22 19V5C22 3.346 20.654 2 19 2H9C7.346 2 6 3.346 6 5V6C6 6.552 5.553 7 5 7C4.447 7 4 6.552 4 6V5C4 2.243 6.243 0 9 0H19C21.757 0 24 2.243 24 5ZM13 10C12.447 10 12 9.552 12 9C12 8.448 12.447 8 13 8H18V6H10V6.5C10 7.052 9.553 7.5 9 7.5C8.447 7.5 8 7.052 8 6.5V6C8 4.897 8.897 4 10 4H18C19.103 4 20 4.897 20 6V8C20 9.103 19.103 10 18 10H13ZM14 18C14 17.448 14.447 17 15 17H19C19.553 17 20 17.448 20 18C20 18.552 19.553 19 19 19H15C14.447 19 14 18.552 14 18ZM14 14V13C14 12.448 14.447 12 15 12C15.553 12 16 12.448 16 13V14C16 14.552 15.553 15 15 15C14.447 15 14 14.552 14 14ZM20 14C20 14.552 19.553 15 19 15C18.447 15 18 14.552 18 14V13C18 12.448 18.447 12 19 12C19.553 12 20 12.448 20 13V14Z"
                              fill="#B3B3B3"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1335_19575">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <input
                          id="price"
                          type="number"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          placeholder={`${
                            isNegotiable ? "Kelishilgan holda" : "1 000 000"
                          }`}
                          disabled={isNegotiable}
                        />
                      </div>
                      <div className="checker">
                        <input
                          id="negotiable"
                          type="checkbox"
                          checked={isNegotiable}
                          onChange={handleNegotiableChange}
                        />
                        <label htmlFor="negotiable" className="checkbox">
                          <span
                            className={`${isNegotiable ? "active" : ""}`}
                          ></span>
                        </label>
                        <label
                          htmlFor="negotiable"
                          style={{ marginRight: "5px" }}
                        >
                          Kelishiladi
                        </label>
                      </div>
                    </div>
                  </div>
                  <p>Xizmat sharoiti</p>
                  <div className="address">
                    {/* Viloyat */}
                    <div className="input-col">
                      <label htmlFor="regions">Hududi</label>
                      <div className="input-icon">
                        <select
                          id="regions"
                          value={selectedRegion}
                          onChange={(e) => setSelectedRegion(e.target.value)}
                        >
                          <option value="">Viloyat tanlanmagan</option>
                          {regions.map((region) => (
                            <option key={region.id} value={region.id}>
                              {region.name_uz.replace(/�/g, "'")}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* Tuman */}
                    <div className="input-col">
                      <label htmlFor="districts">Tuman (Shaxar)</label>
                      <div className="input-icon">
                        <select
                          id="districts"
                          value={selectedDistrict}
                          onChange={(e) => setSelectedDistrict(e.target.value)}
                          disabled={!selectedRegion}
                        >
                          <option value="">Tuman tanlanmagan</option>
                          {filteredDistricts.map((district) => (
                            <option key={district.id} value={district.id}>
                              {district.name_uz.replace(/�/g, "'")}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="input-col w-100">
                    <label htmlFor="announce-type">Manzil</label>
                    <div className="input-icon">
                      <input
                        type="text"
                        className="input-p-0"
                        placeholder="Manzil to'liq holda"
                        value={fAddress}
                        onChange={(e) => {
                          setFAddress(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <p>Tajriba va ish vaqti</p>
                  <div className="timm">
                    <div className="input-col">
                      <label htmlFor="districts">Tajriba</label>
                      <div className="input-icon">
                        <select id="experience" name="experience">
                          <option value="default">Tajribani tanlang</option>
                          <option value="experience">
                            Tajribani tanlang 1
                          </option>
                          <option value="experience">
                            Tajribani tanlang 2
                          </option>
                          <option value="experience">
                            Tajribani tanlang 3
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="input-col">
                      <label htmlFor="regions">Ish vaqti</label>
                      <div className="input-icon">
                        <select id="work-time" name="work-time">
                          <option value="default">Vaqtni tanlang</option>
                          <option value="default">Vaqtni tanlang 1</option>
                          <option value="default">Vaqtni tanlang 1</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p>To'liq ma'lumot</p>
                  <label
                    htmlFor="shortData"
                    style={{
                      marginTop: "15px",
                      display: "block",
                      color: "#767676",
                    }}
                  >
                    Qisqacha ma'lumot
                  </label>
                  <textarea
                    name=""
                    id=""
                    placeholder="Qisqacha ma'lumot"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  {announceType === "Xizmat e'loni" && (
                    <>
                      <p>Xizmat rasmlari</p>
                      <div className="input-col w-100">
                        <label htmlFor="images">Rasmlar</label>
                        <ImageUpload />
                      </div>
                    </>
                  )}
                  <div className="input-col">
                    <div className="input-icons">
                      <button type="submit">Qo'shish +</button>
                      <button
                        type="button"
                        id="canc"
                        onClick={(e) => handleCanvas(e)}
                      >
                        Bekor qilish{" "}
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
                  </div>
                </form>
              </div>
              <div
                className={`offcanvas-shape ${offCanvas ? "show-shape" : ""}`}
              ></div>
            </div>
          </div>
          <table className="user-table">
            <thead>
              <tr>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  <input type="checkbox" />
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Rasmi
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Nomi
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Muallif
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Narx
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Arizalar soni
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  E'lon sanasi
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Aktivligi
                </th>
                <th scope="col" style={{ backgroundColor: "#E7F4F1" }}>
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <img
                      className="productImg"
                      src={
                        product.product_image_Ecommerce_product_images[0]
                          ? `${mediaServerUrl}ecommerse${formatLink(
                              product.product_image_Ecommerce_product_images[0]
                                .image
                            )}`
                          : ""
                      }
                      alt=""
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>
                    <img
                      className="authorImg"
                      src={`${mediaServerUrl}users${formatLink(
                        product.user.pfp
                      )}`}
                      alt=""
                    />
                  </td>
                  <td>{product.price}</td>
                  <td>213</td>
                  <td>14.02.2024</td>
                  {/*<td>
                    <input
                      type="checkbox"
                      id={`status-${product.id}`}
                      checked={productStatuses[product.id]}
                      onChange={() => handleStatusChange(product.id)}
                      className="check-inp"
                    />
                    <label
                      htmlFor={`status-${product.id}`}
                      className="checkbox"
                    >
                      <span
                        className={productStatuses[product.id] ? "active" : ""}
                      ></span>
                    </label>
                  </td>*/}
                  <td>
                    <input
                      type="checkbox"
                      id={`status-${1}`}
                      checked={true}
                      //   onChange={() => handleStatusChange(product.id)}
                      className="check-inp"
                    />
                    <label htmlFor={`status-${1}`} className="checkbox">
                      <span className={true ? "active" : ""}></span>
                    </label>
                  </td>
                  <td>
                    <button className="btn btn-secondary">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.0007 3.33333C10.9211 3.33333 11.6673 2.58714 11.6673 1.66667C11.6673 0.746192 10.9211 0 10.0007 0C9.08018 0 8.33398 0.746192 8.33398 1.66667C8.33398 2.58714 9.08018 3.33333 10.0007 3.33333Z"
                          fill="#41A58D"
                        />
                        <path
                          d="M10.0007 11.6673C10.9211 11.6673 11.6673 10.9211 11.6673 10.0007C11.6673 9.08018 10.9211 8.33398 10.0007 8.33398C9.08018 8.33398 8.33398 9.08018 8.33398 10.0007C8.33398 10.9211 9.08018 11.6673 10.0007 11.6673Z"
                          fill="#41A58D"
                        />
                        <path
                          d="M10.0007 19.9993C10.9211 19.9993 11.6673 19.2532 11.6673 18.3327C11.6673 17.4122 10.9211 16.666 10.0007 16.666C9.08018 16.666 8.33398 17.4122 8.33398 18.3327C8.33398 19.2532 9.08018 19.9993 10.0007 19.9993Z"
                          fill="#41A58D"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="pagination">
              <div className="soni">
                {products.length} tadan {startUserIndex} - {endUserIndex} lar
                ko’rsatilmoqda
              </div>
              <div className="users-pages-buttons">
                <button onClick={prevPage} disabled={currentPage === 1}>
                  <img src={left} alt="" />
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`pagination-btn ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage === Math.ceil(products.length / usersPerPage)
                  }
                >
                  <img src={right} alt="" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminAnnounces;
