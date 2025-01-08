import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileSideBar from "../../../components/profileSideBar/profileSideBar";
import InputMask from "react-input-mask";
import eye from "../../admin/addUser/eye.png";
import "./EditProfile.scss";
import EditorBar from "../../../components/Editor/Editor";

const EditProfile = () => {
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateBirth: "",
    gender: "",
    faoliyati: "",
    phone: "",
    email: "",
    region: selectedRegion,
    district: "",
    village: "",
    content: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target || { name: "content", value: e };
    setFormData({ ...formData, [name]: value });
  };

  //   const handleProfileUpdate = async (e) => {
  //     e.preventDefault();
  //     console.log(formData);

  //     console.log("Submitting the profile update..."); // Konsolda yangilash jarayoni haqida xabar

  //     try {
  //       const response = await fetch(
  //         "https://your-api-url.com/api/update-profile",
  //         {
  //           method: "PUT", // Profilni yangilash uchun PUT metodi
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${localStorage.getItem("token")}`, // Agar autentifikatsiya kerak bo'lsa
  //           },
  //           body: JSON.stringify({
  //             ...formData, // formData obyekti to'liq yuboriladi
  //           }),
  //         }
  //       );

  //       console.log("Response received:", response); // Konsolda API javobini ko'rsatish

  //       const data = await response.json();

  //       if (response.ok) {
  //         console.log("Profile updated successfully:", data); // Profil yangilandi
  //         setError(""); // Hato bo'lsa, xatolikni tozalash
  //       } else {
  //         console.log("Profile update failed:", data);
  //         setError(data.message || "Profile update failed!"); // Xatolik haqida xabar
  //       }
  //     } catch (err) {
  //       console.error("Error occurred while updating profile:", err); // Konsolda xatolikni ko'rsatish
  //       setError("An error occurred while updating profile.");
  //     }
  //   };

  // Loaction start
  // Loaction start
  const regionsURL =
    "https://raw.githubusercontent.com/MIMAXUZ/uzbekistan-regions-data/master/JSON/regions.json";
  const districtsURL =
    "https://raw.githubusercontent.com/MIMAXUZ/uzbekistan-regions-data/master/JSON/districts.json";
  const villagesURL =
    "https://raw.githubusercontent.com/MIMAXUZ/uzbekistan-regions-data/master/JSON/villages.json";
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

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
          parseInt(district.region_id, 10) === parseInt(selectedRegion.id, 10)
      );
      console.log(filtered);

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
          parseInt(village.district_id, 10) ===
          parseInt(selectedDistrict.id, 10)
      );
      setFilteredVillages(filtered);
    } else {
      setFilteredVillages([]);
    }
  }, [selectedDistrict, villages]);
  // Loaction end

  const handleRegionChange = (e) => {
    const selected = regions.find((region) => region.id === e.target.value);
    console.log(selected);

    setSelectedRegion(selected);
    setFormData({
      ...formData,
      region: selected.name_uz,
      district: "",
      village: "",
    });
  };

  const handleDistrictChange = (e) => {
    console.log(e);

    const selected = districts.find(
      (district) => district.id === e.target.value
    );
    setSelectedDistrict(selected);
    setFormData({ ...formData, district: selected.name_uz, village: "" });
  };

  const handleVillageChange = (e) => {
    const selected = villages.find((village) => village.id === e.target.value);
    setSelectedVillage(selected);
    setFormData({ ...formData, village: selected.name_uz });
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
          <span>Profilni tahrirlash</span>
        </div>
      </div>
      <div className="profile-inner edit-profile">
        <div className="left">
          <ProfileSideBar />
        </div>
        <div className="right">
          <div className="page-title">
            <h2>Profilni tahrirlash</h2>
          </div>
          <div className="form-list">
            <form action="">
              {" "}
              {/* onSubmit={handleProfileUpdate} */}
              <div className="input-row">
                <label htmlFor="firstName">Ism</label>
                <div className="inputs">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.0439 7.2936C16.0439 9.99625 14.3276 11.9697 12.2104 11.9697C10.0931 11.9697 8.37679 9.99625 8.37679 7.2936C8.37679 4.59095 10.0931 2.40002 12.2104 2.40002C14.3276 2.40002 16.0439 4.59095 16.0439 7.2936Z" stroke="#B2B2B2" stroke-width="2" stroke-linejoin="round"/>
<path d="M4.39864 15.8845C4.67344 15.3834 5.17779 15.0753 5.72318 15.0753H18.2737C18.8191 15.0753 19.3234 15.3834 19.5982 15.8845L21.3872 19.1469C21.9836 20.2344 21.2462 21.6 20.0627 21.6H3.93418C2.75069 21.6 2.01331 20.2344 2.60963 19.1469L4.39864 15.8845Z" stroke="#B2B2B2" stroke-width="2" stroke-linejoin="round"/>
</svg>

                  <input
                    type="text"
                    placeholder="Ismi"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="error-message">To'ldirilishi shart</div>
              </div>
              <div className="input-row">
                <label htmlFor="lastName">Familiya</label>
                <div className="inputs">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.0439 7.2936C16.0439 9.99625 14.3276 11.9697 12.2104 11.9697C10.0931 11.9697 8.37679 9.99625 8.37679 7.2936C8.37679 4.59095 10.0931 2.40002 12.2104 2.40002C14.3276 2.40002 16.0439 4.59095 16.0439 7.2936Z" stroke="#B2B2B2" stroke-width="2" stroke-linejoin="round"/>
<path d="M4.39864 15.8845C4.67344 15.3834 5.17779 15.0753 5.72318 15.0753H18.2737C18.8191 15.0753 19.3234 15.3834 19.5982 15.8845L21.3872 19.1469C21.9836 20.2344 21.2462 21.6 20.0627 21.6H3.93418C2.75069 21.6 2.01331 20.2344 2.60963 19.1469L4.39864 15.8845Z" stroke="#B2B2B2" stroke-width="2" stroke-linejoin="round"/>
</svg>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    required
                    placeholder="Sharifi"
                    onChange={handleChange}
                    id="lastName"
                  />
                </div>

                <div className="error-message">To'ldirilishi shart</div>
              </div>
              <div className="input-row">
                <label htmlFor="date-birth">Tug’ilgan kuni</label>
                <div className="inputs">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.25 17.5534V17.4688M12.3125 17.5534V17.4688M12.3125 12.9688V12.8842M16.8125 12.9688V12.8842M3.875 8.46875H19.625M5.91071 2V3.68771M17.375 2V3.6875M17.375 3.6875H6.125C4.26104 3.6875 2.75 5.19854 2.75 7.0625V18.3126C2.75 20.1766 4.26104 21.6876 6.125 21.6876H17.375C19.239 21.6876 20.75 20.1766 20.75 18.3126L20.75 7.0625C20.75 5.19854 19.239 3.6875 17.375 3.6875Z" stroke="#B2B2B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  <InputMask
                    mask="99.99.9999"
                    value={formData.dateBirth}
                    name="dateBirth"
                    onChange={handleChange}
                    placeholder="KK.OO.YYYY"
                  />
                </div>

                <div className="error-message">To'ldirilishi shart</div>
              </div>
              <div className="input-row">
                <label htmlFor="gender">Jinsi</label>
                <div className="inputs">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.0009 2.25V3.75H19.6732L17.1419 6.3045C16.2372 5.62123 15.1347 5.25108 14.0009 5.25C12.5984 5.25 11.2889 5.805 10.2974 6.79725C9.80734 7.28144 9.41824 7.8581 9.1527 8.4938C8.88716 9.1295 8.75046 9.8116 8.75053 10.5005C8.7506 11.1895 8.88744 11.8715 9.15311 12.5072C9.41878 13.1428 9.80799 13.7194 10.2982 14.2035C10.9507 14.856 11.7277 15.3247 12.5947 15.5625C12.6802 15.4972 12.7762 15.429 12.8527 15.3525C13.1671 15.0328 13.3929 14.6368 13.5082 14.2035C12.6916 14.103 11.9323 13.7315 11.3519 13.1483C10.6439 12.441 10.2509 11.502 10.2509 10.5C10.2509 9.498 10.6447 8.5605 11.3534 7.8525C12.0599 7.14225 12.9989 6.75 14.0009 6.75C15.0029 6.75 15.9412 7.14375 16.6484 7.8525C16.9982 8.19889 17.2758 8.61127 17.4651 9.06573C17.6543 9.5202 17.7515 10.0077 17.7509 10.5C17.7509 11.1488 17.5672 11.7525 17.2589 12.3045C17.3309 12.6915 17.3759 13.098 17.3759 13.5C17.3759 13.8745 17.3447 14.242 17.2822 14.6025C17.4322 14.4802 17.5657 14.3415 17.7044 14.2035C18.6959 13.2105 19.2509 11.9025 19.2509 10.5C19.2509 9.3525 18.8729 8.262 18.1964 7.359L20.7509 4.8285V7.5H22.2509V2.25H17.0009ZM12.4072 8.4375C12.3217 8.50275 12.2257 8.571 12.1492 8.6475C11.8252 8.973 11.6137 9.3675 11.4937 9.79725C12.3112 9.90225 13.0574 10.2592 13.6499 10.8517C14.3587 11.559 14.7524 12.498 14.7524 13.4993C14.7524 14.5005 14.3587 15.4387 13.6499 16.1467C12.9419 16.8577 12.0029 17.25 11.0009 17.25C9.99894 17.25 9.06069 16.8563 8.35344 16.1475C8.00329 15.8014 7.7255 15.389 7.53622 14.9345C7.34694 14.48 7.24997 13.9924 7.25094 13.5C7.25094 12.8512 7.43469 12.2475 7.74294 11.6955C7.66849 11.3013 7.62933 10.9012 7.62594 10.5C7.62594 10.126 7.65719 9.7585 7.71969 9.3975C7.56969 9.51975 7.43694 9.6585 7.29744 9.79725C6.30744 10.788 5.75094 12.0975 5.75094 13.5C5.75094 14.6475 6.12894 15.738 6.80544 16.641L5.54094 17.9062L4.04094 16.4062L2.96094 17.4608L4.46094 18.9608L2.96094 20.4608L4.04094 21.5408L5.54094 20.0408L7.04094 21.5408L8.09469 20.4608L6.59469 18.9608L7.86069 17.6962C8.76451 18.3806 9.86728 18.7506 11.0009 18.75C12.4034 18.75 13.7129 18.195 14.7044 17.2028C15.6959 16.212 16.2509 14.9025 16.2509 13.5C16.2509 12.0975 15.6959 10.7895 14.7037 9.7965C14.0512 9.144 13.2742 8.67525 12.4072 8.4375Z" fill="#B3B3B3"/>
</svg>

                  <select
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Tanlang
                    </option>
                    <option value="male">Erkak</option>
                    <option value="female">Ayol</option>
                  </select>
                </div>
                <div className="error-message">To'ldirilishi shart</div>
              </div>
              <div className="input-row mro-width">
                <label htmlFor="file">Faoliyati</label>
                <div className="inputs">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1467_16941)">
<path d="M19 4H17.899C17.434 1.721 15.414 0 13 0H11C8.586 0 6.565 1.721 6.101 4H5C2.243 4 0 6.243 0 9V19C0 21.757 2.243 24 5 24H19C21.757 24 24 21.757 24 19V9C24 6.243 21.757 4 19 4ZM11 2H13C14.304 2 15.415 2.836 15.828 4H8.172C8.585 2.836 9.696 2 11 2ZM22 19C22 20.654 20.654 22 19 22H18V9C18 8.447 17.553 8 17 8C16.447 8 16 8.447 16 9V22H8V9C8 8.447 7.552 8 7 8C6.448 8 6 8.447 6 9V22H5C3.346 22 2 20.654 2 19V9C2 7.346 3.346 6 5 6H19C20.654 6 22 7.346 22 9V19Z" fill="#B3B3B3"/>
</g>
<defs>
<clipPath id="clip0_1467_16941">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>

                  <select
                    name="faoliyati" // Unique name value
                    id="activity" // ID value for accessibility
                    onChange={handleChange} // Handle change function
                    required // Ensure this field is filled
                    value={formData.faoliyati}
                  >
                    <option value="" disabled>
                      Tanlang
                    </option>
                    <option value="activity1">Faoliyati 1</option>
                    <option value="activity2">Faoliyati 2</option>
                  </select>
                </div>

                <div className="error-message">To'ldirilishi shart</div>
              </div>
              <div className="input-row">
                <label htmlFor="phoneNumber">Telefon raqami</label>
                <div className="inputs">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.40078 3.60001L10.0008 6.00001H14.0008L15.6008 3.60001M4.80078 4.79999V19.2C4.80078 20.5255 5.8753 21.6 7.20078 21.6H16.8008C18.1263 21.6 19.2008 20.5255 19.2008 19.2V4.80001C19.2008 3.47453 18.1263 2.40001 16.8008 2.40001L7.20079 2.39999C5.8753 2.39999 4.80078 3.47451 4.80078 4.79999Z" stroke="#B2B2B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  <InputMask
                    mask="+\9\98 (99) 999-99-99"
                    value={formData.phone}
                    name="phone"
                    onChange={handleChange}
                    placeholder="+998 (__) ___-__-__"
                    id="phoneNumber"
                  />
                </div>
                <div className="error-message">To'ldirilishi shart</div>
              </div>
              <div className="input-row">
                <label htmlFor="e-mail">E-pochta</label>
                <div className="inputs">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.09844 6.10436L12.4984 11.5044L21.4984 6.10436M5.29844 19.0957C3.97295 19.0957 2.89844 18.0211 2.89844 16.6957V7.30436C2.89844 5.97888 3.97295 4.90436 5.29844 4.90436H19.6984C21.0239 4.90436 22.0984 5.97887 22.0984 7.30436V16.6957C22.0984 18.0211 21.0239 19.0957 19.6984 19.0957H5.29844Z" stroke="#B2B2B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  <input
                    type="email"
                    id="e-mail"
                    name="email" // Name attribute for handleChange function
                    placeholder="misol@mail.com"
                    value={formData.email}
                    onChange={handleChange} // Function to update form data
                    required // Makes the field mandatory
                  />
                </div>

                <div className="error-message">To'ldirilishi shart</div>
              </div>
              <div className="location">
                {/* Viloyat */}
                <div className="input-row w-smaller">
                  <label htmlFor="regions">Viloyatni</label>
                  <div className="inputs">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0013 21.6C12.0013 21.6 19.5144 14.9217 19.5144 9.91304C19.5144 5.7637 16.1507 2.39999 12.0013 2.39999C7.85199 2.39999 4.48828 5.7637 4.48828 9.91304C4.48828 14.9217 12.0013 21.6 12.0013 21.6Z" stroke="#B2B2B2" stroke-width="2"/>
<path d="M14.4016 9.60015C14.4016 10.9256 13.3271 12.0001 12.0016 12.0001C10.6761 12.0001 9.60163 10.9256 9.60163 9.60015C9.60163 8.27466 10.6761 7.20015 12.0016 7.20015C13.3271 7.20015 14.4016 8.27466 14.4016 9.60015Z" stroke="#B2B2B2" stroke-width="2"/>
</svg>

                    <select
                      name="region"
                      value={selectedRegion}
                      onChange={handleRegionChange}
                      required
                    >
                      <option value="" disabled>
                        Viloyatni tanlang
                      </option>
                      {regions.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.name_uz.replace(/�/g, "'")}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="error-message">To'ldirilishi shart</div>
                </div>
                {/* Tuman */}
                <div className="input-row w-smaller">
                  <label htmlFor="districts">Tuman</label>
                  <div className="inputs">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.0459 7.29397C16.0459 9.99661 14.3295 11.97 12.2123 11.97C10.0951 11.97 8.37874 9.99661 8.37874 7.29397C8.37874 4.59132 10.0951 2.40039 12.2123 2.40039C14.3295 2.40039 16.0459 4.59132 16.0459 7.29397Z"
                        stroke="#B2B2B2"
                        stroke-width="2"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.40059 15.8849C4.6754 15.3838 5.17974 15.0756 5.72513 15.0756H18.2756C18.821 15.0756 19.3254 15.3838 19.6002 15.8849L21.3892 19.1473C21.9855 20.2347 21.2481 21.6004 20.0647 21.6004H3.93613C2.75264 21.6004 2.01526 20.2347 2.61159 19.1473L4.40059 15.8849Z"
                        stroke="#B2B2B2"
                        stroke-width="2"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <select
                      name="district"
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                      required
                      disabled={!filteredDistricts.length} // Tuman faqat viloyat tanlanganida faollashadi
                    >
                      <option value="" disabled>
                        Tumanni tanlang
                      </option>
                      {filteredDistricts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name_uz.replace(/�/g, "'")}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="error-message">To'ldirilishi shart</div>
                </div>
                {/* Mahalla */}
                <div className="input-row w-smaller">
                  <label htmlFor="villages">Qishloq</label>
                  <div className="inputs">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.0459 7.29397C16.0459 9.99661 14.3295 11.97 12.2123 11.97C10.0951 11.97 8.37874 9.99661 8.37874 7.29397C8.37874 4.59132 10.0951 2.40039 12.2123 2.40039C14.3295 2.40039 16.0459 4.59132 16.0459 7.29397Z"
                        stroke="#B2B2B2"
                        stroke-width="2"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.40059 15.8849C4.6754 15.3838 5.17974 15.0756 5.72513 15.0756H18.2756C18.821 15.0756 19.3254 15.3838 19.6002 15.8849L21.3892 19.1473C21.9855 20.2347 21.2481 21.6004 20.0647 21.6004H3.93613C2.75264 21.6004 2.01526 20.2347 2.61159 19.1473L4.40059 15.8849Z"
                        stroke="#B2B2B2"
                        stroke-width="2"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <select
                      id="villages"
                      disabled={!selectedDistrict}
                      value={selectedVillage}
                      onChange={handleVillageChange}
                    >
                      <option value="">Qishloq tanlanmagan</option>
                      {filteredVillages.map((village) => (
                        <option key={village.id} value={village.id}>
                          {village.name_uz.replace(/�/g, "'")}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="error-message">To'ldirilishi shart</div>
                </div>
              </div>
              <div className="input-row textarea profile-editor">
                <label htmlFor="about-me">Men haqimda</label>
                <div className="inputs">
                  {/* <textarea
                    name="about-me"
                    id="about-me"
                    placeholder="Text"
                  ></textarea> */}
                  <EditorBar
                    id="my-editor"
                    name="content"
                    initialValue={formData.content}
                    onChange={handleChange}
                  />
                </div>

                <div className="error-message">To'ldirilishi shart</div>
              </div>
              <div className="input-row textarea profile-editor">
                <label htmlFor="bio">Biografiya</label>
                <div className="inputs">
                  {/* <textarea name="bio" id="bio" placeholder="Text"></textarea> */}
                  <EditorBar
                    id="edit-profile-editor-2"
                    name="bio"
                    onChange={handleChange} // Function to handle user input
                    value={formData.bio}
                  />
                </div>
                <div className="error-message">To'ldirilishi shart</div>
              </div>
              <div className="input-row btn-cont m-top-75">
                <button type="button">Bekor qilish</button>
                <button type="submit">Qo'shish</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
