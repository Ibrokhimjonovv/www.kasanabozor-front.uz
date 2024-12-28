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
