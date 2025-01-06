import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./addAnnounce.scss";
import EditorBar from "../../components/Editor/Editor";
import ImageUpload from "../../components/imgUpload/imgUpload";

const AddAnnounce = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [announceType, setAnnounceType] = useState("Xizmat e'loni"); // Dropdown tanlov holati

  const handleNegotiableChange = () => {
    setIsNegotiable(!isNegotiable);
    if (!isNegotiable) {
      setMinPrice("");
      setMaxPrice("");
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
      setSelectedDistrict(""); // Tumanni tanlamagan holatga qaytarish
      setFilteredVillages([]); // Qishloqlarni tozalash
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

  return (
    <div id="addAnnounce">
      <div className="announceSelect">
        <Link to="/announcements/1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6693 17.5V15.8333C16.6693 14.9493 16.3181 14.1014 15.693 13.4763C15.0678 12.8512 14.22 12.5 13.3359 12.5H6.66927C5.78522 12.5 4.93737 12.8512 4.31225 13.4763C3.68713 14.1014 3.33594 14.9493 3.33594 15.8333V17.5M13.3359 5.83333C13.3359 7.67428 11.8436 9.16667 10.0026 9.16667C8.16165 9.16667 6.66927 7.67428 6.66927 5.83333C6.66927 3.99238 8.16165 2.5 10.0026 2.5C11.8436 2.5 13.3359 3.99238 13.3359 5.83333Z"
              stroke="#41A58D"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Ish e'lonlari
        </Link>

        <Link to="/services/1">
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.8307 17.5V4.16667C13.8307 3.72464 13.6551 3.30072 13.3426 2.98816C13.03 2.67559 12.6061 2.5 12.1641 2.5H8.83073C8.3887 2.5 7.96478 2.67559 7.65222 2.98816C7.33966 3.30072 7.16406 3.72464 7.16406 4.16667V17.5M3.83073 5.83333H17.1641C18.0845 5.83333 18.8307 6.57953 18.8307 7.5V15.8333C18.8307 16.7538 18.0845 17.5 17.1641 17.5H3.83073C2.91025 17.5 2.16406 16.7538 2.16406 15.8333V7.5C2.16406 6.57953 2.91025 5.83333 3.83073 5.83333Z"
              stroke="#5A5A5A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Xizmatlar
        </Link>

        <Link to="/add-announce" id="addAnn-link">
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4974 6.66669V13.3334M7.16406 10H13.8307M18.8307 10C18.8307 14.6024 15.0998 18.3334 10.4974 18.3334C5.89502 18.3334 2.16406 14.6024 2.16406 10C2.16406 5.39765 5.89502 1.66669 10.4974 1.66669C15.0998 1.66669 18.8307 5.39765 18.8307 10Z"
              stroke="#5A5A5A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          E'lon berish
        </Link>
      </div>

      <div className="announce-from-container">
        <h1 className="big-title">E'lon berish</h1>
        <form action="">
          <div className="input-col">
            <label htmlFor="announce-type">E'lon turi</label>
            <div className="input-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 11C9.757 11 12 8.757 12 6C12 3.243 9.757 1 7 1C4.243 1 2 3.243 2 6C2 8.757 4.243 11 7 11ZM7 3C8.654 3 10 4.346 10 6C10 7.654 8.654 9 7 9C5.346 9 4 7.654 4 6C4 4.346 5.346 3 7 3ZM11.88 17.802C11.96 18.196 12 18.598 12 19V23C12 23.553 11.552 24 11 24C10.448 24 10 23.553 10 23V19C10 18.731 9.973 18.461 9.92 18.198C9.81 17.657 10.16 17.13 10.702 17.019C11.243 16.911 11.771 17.26 11.88 17.802ZM23 3.592V1C23 0.735 22.895 0.48 22.707 0.293C22.519 0.106 22.265 0 22 0C21.449 0 21.028 0.295 20.905 0.724C20.669 1.547 19.992 2 19 2H17C15.346 2 14 3.346 14 5C14 5.695 14.247 6.327 14.645 6.836L16.418 10.948L14.744 12.693C14.556 12.888 14.293 13.001 14.022 13.001H6C2.691 13.001 0 15.692 0 19.001V23.001C0 23.554 0.448 24.001 1 24.001C1.552 24.001 2 23.554 2 23.001V19.001C2 16.795 3.794 15.001 6 15.001H14.022C14.834 15.001 15.623 14.665 16.187 14.078C16.187 14.078 18.272 11.895 18.524 11.643C18.776 11.391 19.005 10.935 18.996 10.703C19.015 10.472 18.976 10.237 18.879 10.017L18.089 8.001H19.001C19.993 8.001 20.67 8.454 20.906 9.277C21.029 9.706 21.424 10.001 22 10.001C22.552 10.001 23 9.553 23 9.001V6.409C23.581 6.202 24.001 5.652 24.001 5.001C24.001 4.35 23.582 3.8 23.001 3.593L23 3.592ZM21 6.464C20.421 6.163 19.743 6 19 6H17C16.449 6 16 5.551 16 5C16 4.449 16.449 4 17 4H19C19.743 4 20.421 3.837 21 3.536V6.464Z"
                  fill="#B3B3B3"
                />
              </svg>
              <select
                name="announce-type"
                id="announce-type"
                value={announceType}
                onChange={(e) => setAnnounceType(e.target.value)}
              >
                <option value="service-announce">Xizmat e'loni</option>
                <option value="work-announce">Ish e'loni</option>
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
              />
            </div>
          </div>
          <div className="input-col w-100">
            <label htmlFor="price" id="price_label">
              Narx oralig'i
            </label>
            <div className="inputs">
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
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder={`${isNegotiable ? "Kelishilgan holda" : "0"}`}
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
                  <span className={`${isNegotiable ? "active" : ""}`}></span>
                </label>
                <label htmlFor="negotiable" style={{ marginRight: "5px" }}>
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
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0003 21.6C12.0003 21.6 19.5134 14.9217 19.5134 9.91304C19.5134 5.7637 16.1497 2.39999 12.0003 2.39999C7.85101 2.39999 4.4873 5.7637 4.4873 9.91304C4.4873 14.9217 12.0003 21.6 12.0003 21.6Z"
                    stroke="#B2B2B2"
                    stroke-width="2"
                  />
                  <path
                    d="M14.4007 9.60015C14.4007 10.9256 13.3261 12.0001 12.0007 12.0001C10.6752 12.0001 9.60066 10.9256 9.60066 9.60015C9.60066 8.27466 10.6752 7.20015 12.0007 7.20015C13.3261 7.20015 14.4007 8.27466 14.4007 9.60015Z"
                    stroke="#B2B2B2"
                    stroke-width="2"
                  />
                </svg>

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
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0003 21.6C12.0003 21.6 19.5134 14.9217 19.5134 9.91304C19.5134 5.7637 16.1497 2.39999 12.0003 2.39999C7.85101 2.39999 4.4873 5.7637 4.4873 9.91304C4.4873 14.9217 12.0003 21.6 12.0003 21.6Z"
                    stroke="#B2B2B2"
                    stroke-width="2"
                  />
                  <path
                    d="M14.4007 9.60015C14.4007 10.9256 13.3261 12.0001 12.0007 12.0001C10.6752 12.0001 9.60066 10.9256 9.60066 9.60015C9.60066 8.27466 10.6752 7.20015 12.0007 7.20015C13.3261 7.20015 14.4007 8.27466 14.4007 9.60015Z"
                    stroke="#B2B2B2"
                    stroke-width="2"
                  />
                </svg>

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
              />
            </div>
          </div>
          <p>Tajriba va ish vaqti</p>
          <div className="timm">
            <div className="input-col">
              <label htmlFor="districts">Tajriba</label>
              <div className="input-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1335_21921)">
                    <path
                      d="M12.0002 16C14.2062 16 16.0002 14.206 16.0002 12C16.0002 9.794 14.2062 8 12.0002 8C9.79421 8 8.00021 9.794 8.00021 12C8.00021 14.206 9.79421 16 12.0002 16ZM12.0002 10C13.1032 10 14.0002 10.897 14.0002 12C14.0002 13.103 13.1032 14 12.0002 14C10.8972 14 10.0002 13.103 10.0002 12C10.0002 10.897 10.8972 10 12.0002 10ZM18.0002 23C18.0002 23.553 17.5522 24 17.0002 24C16.4482 24 16.0002 23.553 16.0002 23C16.0002 20.794 14.2062 19 12.0002 19C9.79421 19 8.00021 20.794 8.00021 23C8.00021 23.553 7.55221 24 7.00021 24C6.44821 24 6.00021 23.553 6.00021 23C6.00021 19.691 8.69121 17 12.0002 17C15.3092 17 18.0002 19.691 18.0002 23ZM5.80121 9.519C6.01721 10.108 5.27821 10.657 4.77621 10.282L3.46721 9.37L2.16221 10.282C1.66421 10.656 0.930214 10.116 1.14021 9.529L1.60521 8.073L0.386214 7.224C-0.150786 6.875 0.132214 5.963 0.774214 5.984H2.36921L2.74021 4.563C2.90821 3.825 4.03421 3.826 4.20221 4.563L4.57321 5.984H6.15821C6.79821 5.963 7.08021 6.869 6.54521 7.218L5.32421 8.071L5.80021 9.518L5.80121 9.519ZM23.7082 7.219L22.4872 8.072L22.9632 9.519C23.1792 10.108 22.4402 10.657 21.9382 10.282L20.6292 9.37L19.3242 10.282C18.8262 10.656 18.0932 10.115 18.3022 9.529L18.7672 8.073L17.5482 7.224C17.0112 6.875 17.2942 5.963 17.9362 5.984H19.5312L19.9022 4.563C20.0702 3.825 21.1962 3.826 21.3642 4.563L21.7352 5.984H23.3202C23.9602 5.963 24.2422 6.869 23.7072 7.218L23.7082 7.219ZM8.64821 2.515C8.71521 2.207 8.98821 1.985 9.30421 1.986H10.8992L11.2702 0.565C11.4382 -0.173 12.5642 -0.172 12.7322 0.565L13.1032 1.986H14.6882C15.3282 1.965 15.6102 2.871 15.0752 3.22L13.8542 4.073L14.3302 5.52C14.5462 6.109 13.8062 6.658 13.3052 6.283L11.9962 5.371L10.6912 6.283C10.1932 6.657 9.45921 6.117 9.66921 5.53L10.1342 4.074L8.91521 3.225C8.68721 3.066 8.58221 2.784 8.64821 2.515Z"
                      fill="#B3B3B3"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1335_21921">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <select id="experience" name="experience">
                  <option value="default">Tajribani tanlang</option>
                  <option value="experience">Tajribani tanlang 1</option>
                  <option value="experience">Tajribani tanlang 2</option>
                  <option value="experience">Tajribani tanlang 3</option>
                </select>
              </div>
            </div>
            <div className="input-col">
              <label htmlFor="regions">Ish vaqti</label>
              <div className="input-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.39469 18.3086H14.6061M17.349 21.6H6.65183C6.04589 21.6 5.55469 21.1088 5.55469 20.5029V17.572C5.55469 17.3378 5.62964 17.1097 5.76857 16.9212L8.91513 12.6508C9.20031 12.2638 9.20031 11.7362 8.91513 11.3492L5.76857 7.07884C5.62964 6.89029 5.55469 6.66223 5.55469 6.42802V3.49714C5.55469 2.89121 6.0459 2.4 6.65183 2.4H17.0747C17.6806 2.4 18.1718 2.89121 18.1718 3.49714V6.44916C18.1718 6.67026 18.105 6.88621 17.9802 7.06869L15.0461 11.3569C14.7826 11.742 14.7915 12.2516 15.0683 12.6273L18.2322 16.9212C18.3712 17.1097 18.4461 17.3378 18.4461 17.572V20.5029C18.4461 21.1088 17.9549 21.6 17.349 21.6Z"
                    stroke="#B2B2B2"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

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
            style={{ marginTop: "15px", display: "block", color: "#767676" }}
          >
            Qisqacha ma'lumot
          </label>
          <EditorBar />
          {announceType === "Xizmat e'loni" && (
            <>
              <p>Xizmat rasmlari</p>
              <div className="input-col w-100">
                <label htmlFor="images">Rasmlar</label>
                <ImageUpload />
              </div>
            </>
          )}
          <div className="input-col" style={{ marginTop: "10px" }}>
            <label
              htmlFor="status"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              Holati
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
                  fill="#B3B3B3"
                />
                <path
                  d="M7.5825 10.552C7.5105 10.552 7.4505 10.532 7.4025 10.492C7.3545 10.444 7.3305 10.38 7.3305 10.3C7.3305 10.22 7.3305 10.14 7.3305 10.06C7.3305 9.98 7.3305 9.9 7.3305 9.82C7.3465 9.476 7.4225 9.172 7.5585 8.908C7.6945 8.644 7.8585 8.404 8.0505 8.188C8.2505 7.972 8.4505 7.768 8.6505 7.576C8.8505 7.376 9.0185 7.176 9.1545 6.976C9.2985 6.776 9.3865 6.564 9.4185 6.34C9.4505 6.052 9.3945 5.812 9.2505 5.62C9.1065 5.42 8.9105 5.268 8.6625 5.164C8.4145 5.06 8.1585 5.008 7.8945 5.008C7.4705 5.008 7.1065 5.12 6.8025 5.344C6.5065 5.56 6.3105 5.928 6.2145 6.448C6.1905 6.544 6.1505 6.612 6.0945 6.652C6.0385 6.692 5.9745 6.712 5.9025 6.712H5.3265C5.2545 6.712 5.1905 6.688 5.1345 6.64C5.0865 6.592 5.0625 6.528 5.0625 6.448C5.0705 6.12 5.1425 5.808 5.2785 5.512C5.4145 5.216 5.6065 4.956 5.8545 4.732C6.1105 4.508 6.4105 4.332 6.7545 4.204C7.1065 4.068 7.4985 4 7.9305 4C8.4185 4 8.8345 4.068 9.1785 4.204C9.5305 4.332 9.8105 4.508 10.0185 4.732C10.2345 4.948 10.3905 5.188 10.4865 5.452C10.5825 5.716 10.6225 5.98 10.6065 6.244C10.5825 6.564 10.5025 6.852 10.3665 7.108C10.2305 7.356 10.0665 7.588 9.8745 7.804C9.6825 8.012 9.4865 8.22 9.2865 8.428C9.0945 8.628 8.9265 8.84 8.7825 9.064C8.6465 9.28 8.5705 9.516 8.5545 9.772C8.5465 9.86 8.5385 9.948 8.5305 10.036C8.5305 10.116 8.5305 10.196 8.5305 10.276C8.5145 10.364 8.4825 10.432 8.4345 10.48C8.3865 10.528 8.3185 10.552 8.2305 10.552H7.5825ZM7.4865 12.52C7.4065 12.52 7.3385 12.496 7.2825 12.448C7.2345 12.392 7.2105 12.324 7.2105 12.244V11.512C7.2105 11.432 7.2345 11.368 7.2825 11.32C7.3385 11.264 7.4065 11.236 7.4865 11.236H8.2665C8.3545 11.236 8.4225 11.264 8.4705 11.32C8.5265 11.368 8.5545 11.432 8.5545 11.512V12.244C8.5545 12.324 8.5265 12.392 8.4705 12.448C8.4225 12.496 8.3545 12.52 8.2665 12.52H7.4865Z"
                  fill="#B3B3B3"
                />
              </svg>
            </label>
            <div className="input-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.40039 11.9999C2.40039 6.69797 6.69846 2.3999 12.0004 2.3999C17.3023 2.3999 21.6004 6.69797 21.6004 11.9999C21.6004 17.3018 17.3023 21.5999 12.0004 21.5999C6.69846 21.5999 2.40039 17.3018 2.40039 11.9999Z"
                  stroke="#B2B2B2"
                  stroke-width="2"
                />
                <path
                  d="M18.0004 12.4999V11.4999C18.0004 8.46234 15.538 5.9999 12.5004 5.9999C12.2242 5.9999 12.0004 6.22376 12.0004 6.4999V17.4999C12.0004 17.776 12.2242 17.9999 12.5004 17.9999C15.538 17.9999 18.0004 15.5375 18.0004 12.4999Z"
                  stroke="#B2B2B2"
                  stroke-width="2"
                />
              </svg>

              <select name="status" id="status">
                <option value="active">Aktiv</option>
                <option value="de-active">Aktiv emas</option>
              </select>
            </div>
          </div>
          <div className="input-col">
            <div className="input-icons">
              <button type="submit">Qo'shish +</button>
              <button type="button">
                Oldindan ko'rish{" "}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1335_26060)">
                    <path
                      d="M0.666992 8.00008C0.666992 8.00008 3.33366 2.66675 8.00033 2.66675C12.667 2.66675 15.3337 8.00008 15.3337 8.00008C15.3337 8.00008 12.667 13.3334 8.00033 13.3334C3.33366 13.3334 0.666992 8.00008 0.666992 8.00008Z"
                      stroke="#41A58D"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.00033 10.0001C9.10489 10.0001 10.0003 9.10465 10.0003 8.00008C10.0003 6.89551 9.10489 6.00008 8.00033 6.00008C6.89576 6.00008 6.00033 6.89551 6.00033 8.00008C6.00033 9.10465 6.89576 10.0001 8.00033 10.0001Z"
                      stroke="#41A58D"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1335_26060">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button type="button" id="canc">
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
    </div>
  );
};

export default AddAnnounce;
