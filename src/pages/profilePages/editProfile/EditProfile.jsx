import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ProfileSideBar from "../../../components/profileSideBar/profileSideBar";
import InputMask from "react-input-mask";
import eye from "../../admin/addUser/eye.png";
import "./EditProfile.scss";
import EditorBar from "../../../components/Editor/Editor";
import { MyContext } from "../../../context/myContext";
import axios from 'axios';
import { usersServerUrl } from '../../../SuperVars';


function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
    if (
        month < 1 || month > 12 ||
        day < 1 || day > 31 ||
        year < 1000 || year > 2024
    ) {
        return "Invalid date";
    }

    const date = new Date(year, month - 1, day);
    if (
        date.getFullYear() !== year ||
        date.getMonth() + 1 !== month ||
        date.getDate() !== day
    ) {
        alert('Tug\'ilgan kun sanasini to\'g\'ri belgilang.\n\nMM-DD-YYYY formati maqul variant');
        return "Invalid date";
    }
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
}


const EditProfile = () => {
  const { user, loadUserData } = useContext(MyContext);
  const [selectedRegion, setSelectedRegion] = useState(user.region || "");
  const [selectedDistrict, setSelectedDistrict] = useState(user.district || "");

	console.log(user.birthday);

  const [formData, setFormData] = useState({
    first_name       : String(user.first_name),
    last_name        : String(user.last_name),
    birthday         : String(user.birthday),
    gender           : String("male"),
    faoliyati        : String("Hozircha yuq"),
    phone            : String(user.phone),
    email            : String(user.email),
    region           : String(user.region),
    district         : String(user.district),
    about_me         : String(user.about_me || ""),
    biography        : String(user.biography || ""),
  });
  const handleChange = (e) => {
    const { name, value } = e.target || { name: "content", value: e };
    setFormData({ ...formData, [name]: value });
  };
  const regionsURL =
    "https://raw.githubusercontent.com/MIMAXUZ/uzbekistan-regions-data/master/JSON/regions.json";
  const districtsURL =
    "https://raw.githubusercontent.com/MIMAXUZ/uzbekistan-regions-data/master/JSON/districts.json";
 
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredVillages, setFilteredVillages] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [regionsResponse, districtsResponse] =
          await Promise.all([
            fetch(regionsURL),
            fetch(districtsURL),
          ]);

        if (
          !regionsResponse.ok ||
          !districtsResponse.ok
        ) {
          throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi!");
        }

        const regionsData = await regionsResponse.json();
        const districtsData = await districtsResponse.json();

        setRegions(regionsData);
        setDistricts(districtsData);
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
      
      setFilteredDistricts(filtered);
      setSelectedDistrict("");
      setFilteredVillages([]);
    } else {
      setFilteredDistricts([]);
      setFilteredVillages([]);
    }
  }, [selectedRegion, districts]);
  
  const handleRegionChange = (e) => {
    const selected = regions.find((region) => region.id === e.target.value);

    setSelectedRegion(selected);
    setSelectedDistrict(null);
    setFormData({
      ...formData,
      region: selected.name_uz,
      district: "",
    });
  };
  

  const handleDistrictChange = (e) => {
    const selected = districts.find(
      (district) => district.id === e.target.value
    );
    setSelectedDistrict(selected);
    setFormData({ ...formData, district: selected.name_uz });
  };
  
 
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const birthday = formatDate(formData.birthday);
    setFormData({...formData, birthday: birthday});

    const response = await axios.post(`${usersServerUrl}profile/update/`, formData);
	  console.log(response);
    if (response.data.status === "ok") {
      loadUserData();
      alert('Profil malumotlari yangilandi!');
    } else {
      alert('Xatolik yuz berdi yana qayta urinib ko\'ring');
    }
  }

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
          <Link to="/profile/prof" className="desktop-back-link">Shaxsiy kabinet</Link>
          <Link to="/profile/menus" className="mobile-back-link">Shaxsiy kabinet</Link>
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
            <form action="" onSubmit={ handleFormSubmit } style={{marginTop: "unset"}}>
              <div className="input-row">
                <label htmlFor="firstName">Ism</label>
                <div className="inputs">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0439 7.2936C16.0439 9.99625 14.3276 11.9697 12.2104 11.9697C10.0931 11.9697 8.37679 9.99625 8.37679 7.2936C8.37679 4.59095 10.0931 2.40002 12.2104 2.40002C14.3276 2.40002 16.0439 4.59095 16.0439 7.2936Z"
                      stroke="#B2B2B2"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.39864 15.8845C4.67344 15.3834 5.17779 15.0753 5.72318 15.0753H18.2737C18.8191 15.0753 19.3234 15.3834 19.5982 15.8845L21.3872 19.1469C21.9836 20.2344 21.2462 21.6 20.0627 21.6H3.93418C2.75069 21.6 2.01331 20.2344 2.60963 19.1469L4.39864 15.8845Z"
                      stroke="#B2B2B2"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <input
                    type="text"
                    placeholder="Ismi"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="error-message">To'ldirilishi shart</div>
              </div>
              <div className="input-row">
                <label htmlFor="lastName">Familiya</label>
                <div className="inputs">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0439 7.2936C16.0439 9.99625 14.3276 11.9697 12.2104 11.9697C10.0931 11.9697 8.37679 9.99625 8.37679 7.2936C8.37679 4.59095 10.0931 2.40002 12.2104 2.40002C14.3276 2.40002 16.0439 4.59095 16.0439 7.2936Z"
                      stroke="#B2B2B2"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.39864 15.8845C4.67344 15.3834 5.17779 15.0753 5.72318 15.0753H18.2737C18.8191 15.0753 19.3234 15.3834 19.5982 15.8845L21.3872 19.1469C21.9836 20.2344 21.2462 21.6 20.0627 21.6H3.93418C2.75069 21.6 2.01331 20.2344 2.60963 19.1469L4.39864 15.8845Z"
                      stroke="#B2B2B2"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
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
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.25 17.5534V17.4688M12.3125 17.5534V17.4688M12.3125 12.9688V12.8842M16.8125 12.9688V12.8842M3.875 8.46875H19.625M5.91071 2V3.68771M17.375 2V3.6875M17.375 3.6875H6.125C4.26104 3.6875 2.75 5.19854 2.75 7.0625V18.3126C2.75 20.1766 4.26104 21.6876 6.125 21.6876H17.375C19.239 21.6876 20.75 20.1766 20.75 18.3126L20.75 7.0625C20.75 5.19854 19.239 3.6875 17.375 3.6875Z"
                      stroke="#B2B2B2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <InputMask
                    mask="9999-99-99"
                    value={formData.birthday}
                    name="birthday"
                    onChange={handleChange}
                    placeholder="YYYY-MM-DD"
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
                        d="M12.0013 21.6C12.0013 21.6 19.5144 14.9217 19.5144 9.91304C19.5144 5.7637 16.1507 2.39999 12.0013 2.39999C7.85199 2.39999 4.48828 5.7637 4.48828 9.91304C4.48828 14.9217 12.0013 21.6 12.0013 21.6Z"
                        stroke="#B2B2B2"
                        strokeWidth="2"
                      />
                      <path
                        d="M14.4016 9.60015C14.4016 10.9256 13.3271 12.0001 12.0016 12.0001C10.6761 12.0001 9.60163 10.9256 9.60163 9.60015C9.60163 8.27466 10.6761 7.20015 12.0016 7.20015C13.3271 7.20015 14.4016 8.27466 14.4016 9.60015Z"
                        stroke="#B2B2B2"
                        strokeWidth="2"
                      />
                    </svg>

                    <select
                      name="region"
                      value={ selectedRegion.id }
                      onChange={handleRegionChange}
                      required
                    >
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
                        d="M12.0013 21.6C12.0013 21.6 19.5144 14.9217 19.5144 9.91304C19.5144 5.7637 16.1507 2.39999 12.0013 2.39999C7.85199 2.39999 4.48828 5.7637 4.48828 9.91304C4.48828 14.9217 12.0013 21.6 12.0013 21.6Z"
                        stroke="#B2B2B2"
                        strokeWidth="2"
                      />
                      <path
                        d="M14.4016 9.60015C14.4016 10.9256 13.3271 12.0001 12.0016 12.0001C10.6761 12.0001 9.60163 10.9256 9.60163 9.60015C9.60163 8.27466 10.6761 7.20015 12.0016 7.20015C13.3271 7.20015 14.4016 8.27466 14.4016 9.60015Z"
                        stroke="#B2B2B2"
                        strokeWidth="2"
                      />
                    </svg>

                    <select
                      name="district"
                      value={selectedDistrict ? selectedDistrict.id : ""}
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
	  </div>
              <div
                className="editors"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="input-row textarea profile-editor">
                  <label htmlFor="about-me">Men haqimda</label>
                  <div className="inputs">
                    <textarea name="about_me" id="about-me" value={ formData.about_me } onChange={ handleChange } placeholder="O'zingiz haqingizda"></textarea>
                  </div>

                  <div className="error-message">To'ldirilishi shart</div>
                </div>
                <div className="input-row textarea profile-editor">
                  <label htmlFor="bio">Biografiya</label>
                  <div className="inputs">
                    <textarea name="biography" id="bio" value={ formData.biography } onChange={ handleChange } placeholder="O'zingiz haqingizda malumot"></textarea>
                  </div>
                  <div className="error-message">To'ldirilishi shart</div>
                </div>
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
