import React, { useEffect, useContext, useState } from "react";
import InputMask from "react-input-mask";
import Dashboard from "../dashboard/dashboard";
import { MyContext } from "../../../context/myContext";
import { Link } from "react-router-dom";
import "./addUser.scss";
import eye from "./eye.png";
const AddUser = () => {
  const isOpen = useContext(MyContext);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avaName, setAvaName] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvaName(file.name);
    } else {
      setAvaName("");
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

  // Viloyat o'zgarganda tumanlarni filtrlash
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

  // Tuman o'zgarganda qishloqlarni filtrlash
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
    <div id="admin-add-user">
      <Dashboard />
      <div className={`admin-item ${isOpen ? "wd" : ""}`}>
        <div className="title">Foydalanuvchi qo'shish</div>
        <div className="to-back">
          <Link to="/dashboard">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 18.3327V9.99935H12.5V18.3327M2.5 7.49935L10 1.66602L17.5 7.49935V16.666C17.5 17.108 17.3244 17.532 17.0118 17.8445C16.6993 18.1571 16.2754 18.3327 15.8333 18.3327H4.16667C3.72464 18.3327 3.30072 18.1571 2.98816 17.8445C2.67559 17.532 2.5 17.108 2.5 16.666V7.49935Z"
                stroke="#41A58D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="#41A58D"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <Link to="/dashboard/admin/users">Foydalanuvchilar</Link>
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 9L5 5L1 1"
              stroke="#41A58D"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Foydalanuvchi qo’shish</span>
        </div>
        <div className="form-list">
          <form action="">
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

                <input type="text" placeholder="Ismi" />
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

                <input type="text" placeholder="Sharifi" id="lastName" />
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row">
              <label htmlFor="date-birth">Tug’ilgan kuni</label>
              <div className="inputs">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.91602 17.5534V17.4688M12.9785 17.5534V17.4688M12.9785 12.9688V12.8842M17.4785 12.9688V12.8842M4.54102 8.46875H20.291M6.57673 2V3.68771M18.041 2V3.6875M18.041 3.6875H6.79102C4.92705 3.6875 3.41602 5.19854 3.41602 7.0625V18.3126C3.41602 20.1766 4.92705 21.6876 6.79102 21.6876H18.041C19.905 21.6876 21.416 20.1766 21.416 18.3126L21.416 7.0625C21.416 5.19854 19.905 3.6875 18.041 3.6875Z"
                    stroke="#B2B2B2"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <InputMask
                  mask="99.99.9999"
                  // value={birthDate}
                  // onChange={handleChange}
                  placeholder="KK.OO.YYYY"
                />
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row">
              <label htmlFor="phoneNumber">Telefon raqami</label>
              <div className="inputs">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.40078 3.60041L10.0008 6.00041H14.0008L15.6008 3.60041M4.80078 4.80039V19.2004C4.80078 20.5259 5.8753 21.6004 7.20078 21.6004H16.8008C18.1263 21.6004 19.2008 20.5259 19.2008 19.2004V4.8004C19.2008 3.47492 18.1263 2.40041 16.8008 2.4004L7.20079 2.40039C5.8753 2.40039 4.80078 3.47491 4.80078 4.80039Z"
                    stroke="#B2B2B2"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <InputMask
                  mask="+\9\98 (99) 999-99-99"
                  // value={phone}
                  // onChange={handleChange}
                  placeholder="+998 (__) ___-__-__"
                  id="phoneNumber"
                />
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row">
              <label htmlFor="e-mail">E-pochta</label>
              <div className="inputs">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.93437 6.1043L12.3344 11.5043L21.3344 6.1043M5.13437 19.0956C3.80889 19.0956 2.73438 18.0211 2.73438 16.6956V7.3043C2.73438 5.97882 3.80889 4.9043 5.13437 4.9043H19.5344C20.8599 4.9043 21.9344 5.97881 21.9344 7.3043V16.6956C21.9344 18.0211 20.8599 19.0956 19.5344 19.0956H5.13437Z"
                    stroke="#B2B2B2"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <input type="email" id="e-mail" placeholder="misol@mail.com" />
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row">
              <label htmlFor="password">Parol</label>
              <div className="inputs">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.2668 8.80039V7.8861C7.2668 4.84719 9.67537 2.40039 12.6668 2.40039C15.6582 2.40039 18.0668 4.84719 18.0668 7.8861V8.80039M7.2668 8.80039C6.2768 8.80039 5.4668 9.62325 5.4668 10.629V19.7718C5.4668 20.7775 6.2768 21.6004 7.2668 21.6004H18.0668C19.0568 21.6004 19.8668 20.7775 19.8668 19.7718V10.629C19.8668 9.62325 19.0568 8.80039 18.0668 8.80039M7.2668 8.80039H18.0668"
                    stroke="#B2B2B2"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                {showPassword ? (
                  <svg
                    className="eye s"
                    onClick={() => setShowPassword(!showPassword)}
                    stroke="#b1b1b1"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5zm-63.57-320.64L836 122.88a8 8 0 0 0-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 0 0 0 11.31L155.17 889a8 8 0 0 0 11.31 0l712.15-712.12a8 8 0 0 0 0-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 0 0-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 0 1 146.2-106.69L401.31 546.2A112 112 0 0 1 396 512z"></path>
                    <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 0 0 227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 0 1-112 112z"></path>
                  </svg>
                ) : (
                  <img
                    onClick={() => setShowPassword(!showPassword)}
                    className="eye"
                    src={eye}
                    alt=""
                  />
                )}
              </div>
              <p className="error-message">To'ldirilishi shart</p>
            </div>
            <div className="input-row">
              <label htmlFor="gender">Jinsi</label>
              <div className="inputs">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5009 2.25V3.75H19.1732L16.6419 6.3045C15.7372 5.62123 14.6347 5.25108 13.5009 5.25C12.0984 5.25 10.7889 5.805 9.79744 6.79725C9.30734 7.28144 8.91824 7.8581 8.6527 8.4938C8.38716 9.1295 8.25046 9.8116 8.25053 10.5005C8.2506 11.1895 8.38744 11.8715 8.65311 12.5072C8.91878 13.1428 9.30799 13.7194 9.79819 14.2035C10.4507 14.856 11.2277 15.3247 12.0947 15.5625C12.1802 15.4972 12.2762 15.429 12.3527 15.3525C12.6671 15.0328 12.8929 14.6368 13.0082 14.2035C12.1916 14.103 11.4323 13.7315 10.8519 13.1483C10.1439 12.441 9.75094 11.502 9.75094 10.5C9.75094 9.498 10.1447 8.5605 10.8534 7.8525C11.5599 7.14225 12.4989 6.75 13.5009 6.75C14.5029 6.75 15.4412 7.14375 16.1484 7.8525C16.4982 8.19889 16.7758 8.61127 16.9651 9.06573C17.1543 9.5202 17.2515 10.0077 17.2509 10.5C17.2509 11.1488 17.0672 11.7525 16.7589 12.3045C16.8309 12.6915 16.8759 13.098 16.8759 13.5C16.8759 13.8745 16.8447 14.242 16.7822 14.6025C16.9322 14.4802 17.0657 14.3415 17.2044 14.2035C18.1959 13.2105 18.7509 11.9025 18.7509 10.5C18.7509 9.3525 18.3729 8.262 17.6964 7.359L20.2509 4.8285V7.5H21.7509V2.25H16.5009ZM11.9072 8.4375C11.8217 8.50275 11.7257 8.571 11.6492 8.6475C11.3252 8.973 11.1137 9.3675 10.9937 9.79725C11.8112 9.90225 12.5574 10.2592 13.1499 10.8517C13.8587 11.559 14.2524 12.498 14.2524 13.4993C14.2524 14.5005 13.8587 15.4387 13.1499 16.1467C12.4419 16.8577 11.5029 17.25 10.5009 17.25C9.49894 17.25 8.56069 16.8563 7.85344 16.1475C7.50329 15.8014 7.2255 15.389 7.03622 14.9345C6.84694 14.48 6.74997 13.9924 6.75094 13.5C6.75094 12.8512 6.93469 12.2475 7.24294 11.6955C7.16849 11.3013 7.12933 10.9012 7.12594 10.5C7.12594 10.126 7.15719 9.7585 7.21969 9.3975C7.06969 9.51975 6.93694 9.6585 6.79744 9.79725C5.80744 10.788 5.25094 12.0975 5.25094 13.5C5.25094 14.6475 5.62894 15.738 6.30544 16.641L5.04094 17.9062L3.54094 16.4062L2.46094 17.4608L3.96094 18.9608L2.46094 20.4608L3.54094 21.5408L5.04094 20.0408L6.54094 21.5408L7.59469 20.4608L6.09469 18.9608L7.36069 17.6962C8.26451 18.3806 9.36728 18.7506 10.5009 18.75C11.9034 18.75 13.2129 18.195 14.2044 17.2028C15.1959 16.212 15.7509 14.9025 15.7509 13.5C15.7509 12.0975 15.1959 10.7895 14.2037 9.7965C13.5512 9.144 12.7742 8.67525 11.9072 8.4375Z"
                    fill="#B3B3B3"
                  />
                </svg>

                <select name="gender" id="gender">
                  <option value="#" disabled>
                    Tanlang
                  </option>
                  <option value="male">Erkak</option>
                  <option value="female">Ayol</option>
                </select>
              </div>
              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row mro-width">
              <label htmlFor="file">Avatar</label>
              <div className="inputs">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.68802 19.6773C8.39754 19.6773 7.10802 19.186 6.12618 18.2042C4.16106 16.2391 4.16106 13.0416 6.12618 11.0764L11.8211 5.26172L12.8498 6.26924L7.14978 12.0892C5.74098 13.4983 5.74098 15.7821 7.14474 17.1859C8.5485 18.5894 10.8323 18.5896 12.2359 17.1859L17.9306 11.3712C18.7778 10.5237 18.7778 9.15332 17.9356 8.31116C17.0935 7.46924 15.7231 7.46876 14.8809 8.31116L9.18594 14.1259C9.04482 14.2672 8.96994 14.4482 8.96994 14.6404C8.96994 14.8327 9.04482 15.0136 9.18066 15.1497C9.46146 15.4303 9.91818 15.4303 10.199 15.1497L15.8939 9.335L16.9226 10.3425L11.2226 16.1625C10.8093 16.5758 10.2669 16.8004 9.68994 16.8004C9.11298 16.8004 8.57058 16.5758 8.16258 16.1678C7.75458 15.7598 7.52994 15.2174 7.52994 14.6404C7.52994 14.0635 7.75458 13.5211 8.16258 13.1131L13.8573 7.29836C15.2661 5.88956 17.5502 5.88932 18.9537 7.29308C20.3572 8.69684 20.3572 10.9807 18.9537 12.3842L13.259 18.1989C12.2733 19.1848 10.9799 19.6773 9.68802 19.6773Z"
                    fill="#AFB3B5"
                  />
                </svg>

                <label htmlFor="file" id="file-label">
                  {avaName || "Rasm tanlang"}
                </label>
                <input
                  type="file"
                  placeholder="Rasm tanlang"
                  id="file"
                  onChange={handleFileChange}
                />
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row">
              <label htmlFor="gender">Roli</label>
              <div className="inputs">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.40039 21.6004L2.4008 18C2.40102 16.0119 4.01273 14.4004 6.00079 14.4004H13.2002M16.2004 17.4004L17.4004 18.6004L21.6004 14.4004M14.4004 6.00039C14.4004 7.98862 12.7886 9.60039 10.8004 9.60039C8.81216 9.60039 7.20039 7.98862 7.20039 6.00039C7.20039 4.01217 8.81216 2.40039 10.8004 2.40039C12.7886 2.40039 14.4004 4.01217 14.4004 6.00039Z"
                    stroke="#B2B2B2"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <select name="gender" id="gender">
                  <option value="#" disabled>
                    Tanlang
                  </option>
                  <option value="">Roli 1</option>
                  <option value="">Roli 2</option>
                </select>
              </div>
              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row mro-width">
              <label htmlFor="file">Faoliyati</label>
              <div className="inputs">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1164_4770)">
                    <path
                      d="M19.3301 4H18.2291C17.7641 1.721 15.7441 0 13.3301 0H11.3301C8.91608 0 6.89508 1.721 6.43108 4H5.33008C2.57308 4 0.330078 6.243 0.330078 9V19C0.330078 21.757 2.57308 24 5.33008 24H19.3301C22.0871 24 24.3301 21.757 24.3301 19V9C24.3301 6.243 22.0871 4 19.3301 4ZM11.3301 2H13.3301C14.6341 2 15.7451 2.836 16.1581 4H8.50208C8.91508 2.836 10.0261 2 11.3301 2ZM22.3301 19C22.3301 20.654 20.9841 22 19.3301 22H18.3301V9C18.3301 8.447 17.8831 8 17.3301 8C16.7771 8 16.3301 8.447 16.3301 9V22H8.33008V9C8.33008 8.447 7.88208 8 7.33008 8C6.77808 8 6.33008 8.447 6.33008 9V22H5.33008C3.67608 22 2.33008 20.654 2.33008 19V9C2.33008 7.346 3.67608 6 5.33008 6H19.3301C20.9841 6 22.3301 7.346 22.3301 9V19Z"
                      fill="#B3B3B3"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1164_4770">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0.330078)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <select name="" id="">
                  <option value="" disabled>
                    Tanlang
                  </option>
                  <option value="">Faoliyati 1</option>
                  <option value="">Faoliyati 2</option>
                </select>
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            {/* Viloyat */}
            <div className="input-row">
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
                  id="regions"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="">Viloyat tanlanmagan</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name_uz.replace("�", "'")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            {/* Tuman */}
            <div className="input-row">
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
                  id="districts"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!selectedRegion}
                >
                  <option value="">Tuman tanlanmagan</option>
                  {filteredDistricts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name_uz.replace("�", "'")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            {/* Mahalla */}
            <div className="input-row">
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

                <select id="villages" disabled={!selectedDistrict}>
                  <option value="">Qishloq tanlanmagan</option>
                  {filteredVillages.map((village) => (
                    <option key={village.id} value={village.id}>
                      {village.name_uz.replace("�", "'")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row textarea">
              <label htmlFor="about-me">Men haqimda</label>
              <div className="inputs">
                <textarea
                  name="about-me"
                  id="about-me"
                  placeholder="Text"
                ></textarea>
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row textarea">
              <label htmlFor="bio">Biografiya</label>
              <div className="inputs">
                <textarea name="bio" id="bio" placeholder="Text"></textarea>
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row">
              <label htmlFor="status">
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
              <div className="inputs">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.40039 12.0004C2.40039 6.69846 6.69846 2.40039 12.0004 2.40039C17.3023 2.40039 21.6004 6.69846 21.6004 12.0004C21.6004 17.3023 17.3023 21.6004 12.0004 21.6004C6.69846 21.6004 2.40039 17.3023 2.40039 12.0004Z"
                    stroke="#B2B2B2"
                    stroke-width="2"
                  />
                  <path
                    d="M18.0004 12.5004V11.5004C18.0004 8.46282 15.538 6.00039 12.5004 6.00039C12.2242 6.00039 12.0004 6.22425 12.0004 6.50039V17.5004C12.0004 17.7765 12.2242 18.0004 12.5004 18.0004C15.538 18.0004 18.0004 15.538 18.0004 12.5004Z"
                    stroke="#B2B2B2"
                    stroke-width="2"
                  />
                </svg>

                <select name="status" id="status">
                  <option value="active">Aktiv</option>
                  <option value="non-active">Aktiv emas</option>
                </select>
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row">
              <label htmlFor="user-id">
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
              <div className="inputs">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1104_6672)">
                    <mask id="path-1-inside-1_1104_6672" fill="white">
                      <path d="M19.3301 4H15.3301V3C15.3301 2.20435 15.014 1.44129 14.4514 0.87868C13.8888 0.31607 13.1257 0 12.3301 0C11.5344 0 10.7714 0.31607 10.2088 0.87868C9.64615 1.44129 9.33008 2.20435 9.33008 3V4H5.33008C4.00448 4.00159 2.73364 4.52888 1.7963 5.46622C0.85896 6.40356 0.331666 7.67441 0.330078 9L0.330078 19C0.331666 20.3256 0.85896 21.5964 1.7963 22.5338C2.73364 23.4711 4.00448 23.9984 5.33008 24H19.3301C20.6557 23.9984 21.9265 23.4711 22.8639 22.5338C23.8012 21.5964 24.3285 20.3256 24.3301 19V9C24.3285 7.67441 23.8012 6.40356 22.8639 5.46622C21.9265 4.52888 20.6557 4.00159 19.3301 4ZM11.3301 3C11.3301 2.73478 11.4354 2.48043 11.623 2.29289C11.8105 2.10536 12.0649 2 12.3301 2C12.5953 2 12.8496 2.10536 13.0372 2.29289C13.2247 2.48043 13.3301 2.73478 13.3301 3V5C13.3301 5.26522 13.2247 5.51957 13.0372 5.70711C12.8496 5.89464 12.5953 6 12.3301 6C12.0649 6 11.8105 5.89464 11.623 5.70711C11.4354 5.51957 11.3301 5.26522 11.3301 5V3ZM22.3301 19C22.3301 19.7956 22.014 20.5587 21.4514 21.1213C20.8888 21.6839 20.1257 22 19.3301 22H5.33008C4.53443 22 3.77137 21.6839 3.20876 21.1213C2.64615 20.5587 2.33008 19.7956 2.33008 19V9C2.33008 8.20435 2.64615 7.44129 3.20876 6.87868C3.77137 6.31607 4.53443 6 5.33008 6H9.51408C9.71772 6.58454 10.0982 7.09123 10.6028 7.44977C11.1074 7.80831 11.7111 8.00095 12.3301 8.00095C12.9491 8.00095 13.5527 7.80831 14.0573 7.44977C14.5619 7.09123 14.9424 6.58454 15.1461 6H19.3301C20.1257 6 20.8888 6.31607 21.4514 6.87868C22.014 7.44129 22.3301 8.20435 22.3301 9V19ZM10.3301 10H5.33008C5.06486 10 4.81051 10.1054 4.62297 10.2929C4.43544 10.4804 4.33008 10.7348 4.33008 11V19C4.33008 19.2652 4.43544 19.5196 4.62297 19.7071C4.81051 19.8946 5.06486 20 5.33008 20H10.3301C10.5953 20 10.8496 19.8946 11.0372 19.7071C11.2247 19.5196 11.3301 19.2652 11.3301 19V11C11.3301 10.7348 11.2247 10.4804 11.0372 10.2929C10.8496 10.1054 10.5953 10 10.3301 10ZM9.33008 18H6.33008V12H9.33008V18ZM20.3301 15C20.3301 15.2652 20.2247 15.5196 20.0372 15.7071C19.8496 15.8946 19.5953 16 19.3301 16H14.3301C14.0649 16 13.8105 15.8946 13.623 15.7071C13.4354 15.5196 13.3301 15.2652 13.3301 15C13.3301 14.7348 13.4354 14.4804 13.623 14.2929C13.8105 14.1054 14.0649 14 14.3301 14H19.3301C19.5953 14 19.8496 14.1054 20.0372 14.2929C20.2247 14.4804 20.3301 14.7348 20.3301 15ZM20.3301 11C20.3301 11.2652 20.2247 11.5196 20.0372 11.7071C19.8496 11.8946 19.5953 12 19.3301 12H14.3301C14.0649 12 13.8105 11.8946 13.623 11.7071C13.4354 11.5196 13.3301 11.2652 13.3301 11C13.3301 10.7348 13.4354 10.4804 13.623 10.2929C13.8105 10.1054 14.0649 10 14.3301 10H19.3301C19.5953 10 19.8496 10.1054 20.0372 10.2929C20.2247 10.4804 20.3301 10.7348 20.3301 11ZM18.3301 19C18.3301 19.2652 18.2247 19.5196 18.0372 19.7071C17.8496 19.8946 17.5953 20 17.3301 20H14.3301C14.0649 20 13.8105 19.8946 13.623 19.7071C13.4354 19.5196 13.3301 19.2652 13.3301 19C13.3301 18.7348 13.4354 18.4804 13.623 18.2929C13.8105 18.1054 14.0649 18 14.3301 18H17.3301C17.5953 18 17.8496 18.1054 18.0372 18.2929C18.2247 18.4804 18.3301 18.7348 18.3301 19Z" />
                    </mask>
                    <path
                      d="M19.3301 4H15.3301V3C15.3301 2.20435 15.014 1.44129 14.4514 0.87868C13.8888 0.31607 13.1257 0 12.3301 0C11.5344 0 10.7714 0.31607 10.2088 0.87868C9.64615 1.44129 9.33008 2.20435 9.33008 3V4H5.33008C4.00448 4.00159 2.73364 4.52888 1.7963 5.46622C0.85896 6.40356 0.331666 7.67441 0.330078 9L0.330078 19C0.331666 20.3256 0.85896 21.5964 1.7963 22.5338C2.73364 23.4711 4.00448 23.9984 5.33008 24H19.3301C20.6557 23.9984 21.9265 23.4711 22.8639 22.5338C23.8012 21.5964 24.3285 20.3256 24.3301 19V9C24.3285 7.67441 23.8012 6.40356 22.8639 5.46622C21.9265 4.52888 20.6557 4.00159 19.3301 4ZM11.3301 3C11.3301 2.73478 11.4354 2.48043 11.623 2.29289C11.8105 2.10536 12.0649 2 12.3301 2C12.5953 2 12.8496 2.10536 13.0372 2.29289C13.2247 2.48043 13.3301 2.73478 13.3301 3V5C13.3301 5.26522 13.2247 5.51957 13.0372 5.70711C12.8496 5.89464 12.5953 6 12.3301 6C12.0649 6 11.8105 5.89464 11.623 5.70711C11.4354 5.51957 11.3301 5.26522 11.3301 5V3ZM22.3301 19C22.3301 19.7956 22.014 20.5587 21.4514 21.1213C20.8888 21.6839 20.1257 22 19.3301 22H5.33008C4.53443 22 3.77137 21.6839 3.20876 21.1213C2.64615 20.5587 2.33008 19.7956 2.33008 19V9C2.33008 8.20435 2.64615 7.44129 3.20876 6.87868C3.77137 6.31607 4.53443 6 5.33008 6H9.51408C9.71772 6.58454 10.0982 7.09123 10.6028 7.44977C11.1074 7.80831 11.7111 8.00095 12.3301 8.00095C12.9491 8.00095 13.5527 7.80831 14.0573 7.44977C14.5619 7.09123 14.9424 6.58454 15.1461 6H19.3301C20.1257 6 20.8888 6.31607 21.4514 6.87868C22.014 7.44129 22.3301 8.20435 22.3301 9V19ZM10.3301 10H5.33008C5.06486 10 4.81051 10.1054 4.62297 10.2929C4.43544 10.4804 4.33008 10.7348 4.33008 11V19C4.33008 19.2652 4.43544 19.5196 4.62297 19.7071C4.81051 19.8946 5.06486 20 5.33008 20H10.3301C10.5953 20 10.8496 19.8946 11.0372 19.7071C11.2247 19.5196 11.3301 19.2652 11.3301 19V11C11.3301 10.7348 11.2247 10.4804 11.0372 10.2929C10.8496 10.1054 10.5953 10 10.3301 10ZM9.33008 18H6.33008V12H9.33008V18ZM20.3301 15C20.3301 15.2652 20.2247 15.5196 20.0372 15.7071C19.8496 15.8946 19.5953 16 19.3301 16H14.3301C14.0649 16 13.8105 15.8946 13.623 15.7071C13.4354 15.5196 13.3301 15.2652 13.3301 15C13.3301 14.7348 13.4354 14.4804 13.623 14.2929C13.8105 14.1054 14.0649 14 14.3301 14H19.3301C19.5953 14 19.8496 14.1054 20.0372 14.2929C20.2247 14.4804 20.3301 14.7348 20.3301 15ZM20.3301 11C20.3301 11.2652 20.2247 11.5196 20.0372 11.7071C19.8496 11.8946 19.5953 12 19.3301 12H14.3301C14.0649 12 13.8105 11.8946 13.623 11.7071C13.4354 11.5196 13.3301 11.2652 13.3301 11C13.3301 10.7348 13.4354 10.4804 13.623 10.2929C13.8105 10.1054 14.0649 10 14.3301 10H19.3301C19.5953 10 19.8496 10.1054 20.0372 10.2929C20.2247 10.4804 20.3301 10.7348 20.3301 11ZM18.3301 19C18.3301 19.2652 18.2247 19.5196 18.0372 19.7071C17.8496 19.8946 17.5953 20 17.3301 20H14.3301C14.0649 20 13.8105 19.8946 13.623 19.7071C13.4354 19.5196 13.3301 19.2652 13.3301 19C13.3301 18.7348 13.4354 18.4804 13.623 18.2929C13.8105 18.1054 14.0649 18 14.3301 18H17.3301C17.5953 18 17.8496 18.1054 18.0372 18.2929C18.2247 18.4804 18.3301 18.7348 18.3301 19Z"
                      fill="black"
                    />
                    <path
                      d="M19.3301 4L19.3556 -17.3333L19.3429 -17.3333H19.3301V4ZM15.3301 4H-6.00326V25.3333H15.3301V4ZM12.3301 0V-21.3333V0ZM9.33008 4V25.3333H30.6634V4H9.33008ZM5.33008 4V-17.3333H5.3173L5.30452 -17.3333L5.33008 4ZM0.330078 9L-21.0032 8.97445L-21.0033 8.98722V9H0.330078ZM0.330078 19H-21.0033V19.0128L-21.0032 19.0256L0.330078 19ZM5.33008 24L5.30452 45.3333L5.3173 45.3333H5.33008V24ZM19.3301 24V45.3333H19.3429L19.3556 45.3333L19.3301 24ZM24.3301 19L45.6634 19.0256L45.6634 19.0128V19H24.3301ZM24.3301 9H45.6634V8.98722L45.6634 8.97445L24.3301 9ZM12.3301 2V-19.3333V2ZM22.3301 19H43.6634H22.3301ZM19.3301 22V43.3333V22ZM5.33008 22V43.3333V22ZM2.33008 19H-19.0033H2.33008ZM2.33008 9H-19.0033H2.33008ZM5.33008 6V-15.3333V6ZM9.51408 6L29.6598 -1.0185L24.6728 -15.3333H9.51408V6ZM15.1461 6V-15.3333H-0.0126002L-4.99969 -1.0185L15.1461 6ZM22.3301 9H43.6634H22.3301ZM9.33008 18V39.3333H30.6634V18H9.33008ZM6.33008 18H-15.0033V39.3333H6.33008V18ZM6.33008 12V-9.33333H-15.0033V12H6.33008ZM9.33008 12H30.6634V-9.33333H9.33008V12ZM19.3301 -17.3333H15.3301V25.3333H19.3301V-17.3333ZM36.6634 4V3H-6.00326V4H36.6634ZM36.6634 3C36.6634 -3.45359 34.0997 -9.64287 29.5363 -14.2063L-0.633546 15.9636C-4.07172 12.5255 -6.00326 7.8623 -6.00326 3H36.6634ZM29.5363 -14.2063C24.973 -18.7697 18.7837 -21.3333 12.3301 -21.3333V21.3333C7.46778 21.3333 2.80462 19.4018 -0.633546 15.9636L29.5363 -14.2063ZM12.3301 -21.3333C5.87648 -21.3333 -0.3128 -18.7697 -4.87619 -14.2063L25.2937 15.9636C21.8555 19.4018 17.1924 21.3333 12.3301 21.3333V-21.3333ZM-4.87619 -14.2063C-9.43958 -9.64287 -12.0033 -3.45359 -12.0033 3H30.6634C30.6634 7.8623 28.7319 12.5255 25.2937 15.9636L-4.87619 -14.2063ZM-12.0033 3V4H30.6634V3H-12.0033ZM9.33008 -17.3333H5.33008V25.3333H9.33008V-17.3333ZM5.30452 -17.3333C-1.67016 -17.325 -8.35679 -14.5506 -13.2886 -9.61872L16.8812 20.5512C13.8241 23.6083 9.67913 25.3281 5.35563 25.3333L5.30452 -17.3333ZM-13.2886 -9.61872C-18.2205 -4.68687 -20.9949 1.99976 -21.0032 8.97445L21.6634 9.02555C21.6582 13.3491 19.9384 17.494 16.8812 20.5512L-13.2886 -9.61872ZM-21.0033 9V19H21.6634V9H-21.0033ZM-21.0032 19.0256C-20.9949 26.0002 -18.2205 32.6869 -13.2886 37.6187L16.8812 7.44884C19.9384 10.506 21.6582 14.651 21.6634 18.9744L-21.0032 19.0256ZM-13.2886 37.6187C-8.35679 42.5506 -1.67015 45.325 5.30452 45.3333L5.35563 2.66668C9.67912 2.67186 13.8241 4.39165 16.8812 7.44884L-13.2886 37.6187ZM5.33008 45.3333H19.3301V2.66667H5.33008V45.3333ZM19.3556 45.3333C26.3303 45.325 33.0169 42.5506 37.9488 37.6187L7.77891 7.44884C10.8361 4.39165 14.981 2.67186 19.3045 2.66668L19.3556 45.3333ZM37.9488 37.6187C42.8807 32.6869 45.655 26.0002 45.6634 19.0256L2.99676 18.9744C3.00194 14.651 4.72173 10.506 7.77891 7.44884L37.9488 37.6187ZM45.6634 19V9H2.99674V19H45.6634ZM45.6634 8.97445C45.655 1.99977 42.8807 -4.68687 37.9488 -9.61872L7.77891 20.5512C4.72173 17.494 3.00194 13.349 2.99676 9.02555L45.6634 8.97445ZM37.9488 -9.61872C33.0169 -14.5506 26.3303 -17.325 19.3556 -17.3333L19.3045 25.3333C14.981 25.3281 10.8361 23.6083 7.77891 20.5512L37.9488 -9.61872ZM32.6634 3C32.6634 8.39275 30.5212 13.5646 26.7079 17.3778L-3.46197 -12.7921C-7.65028 -8.60375 -10.0033 -2.92318 -10.0033 3H32.6634ZM26.7079 17.3778C22.8947 21.1911 17.7228 23.3333 12.3301 23.3333V-19.3333C6.40691 -19.3333 0.726338 -16.9804 -3.46197 -12.7921L26.7079 17.3778ZM12.3301 23.3333C6.93734 23.3333 1.76548 21.1911 -2.04776 17.3778L28.1221 -12.7921C23.9338 -16.9804 18.2532 -19.3333 12.3301 -19.3333V23.3333ZM-2.04776 17.3778C-5.86099 13.5646 -8.00326 8.39275 -8.00326 3H34.6634C34.6634 -2.92318 32.3104 -8.60375 28.1221 -12.7921L-2.04776 17.3778ZM-8.00326 3V5H34.6634V3H-8.00326ZM-8.00326 5C-8.00326 -0.39275 -5.86099 -5.56461 -2.04776 -9.37784L28.1221 20.7921C32.3104 16.6038 34.6634 10.9232 34.6634 5H-8.00326ZM-2.04776 -9.37784C1.76547 -13.1911 6.93733 -15.3333 12.3301 -15.3333V27.3333C18.2533 27.3333 23.9338 24.9804 28.1221 20.7921L-2.04776 -9.37784ZM12.3301 -15.3333C17.7228 -15.3333 22.8947 -13.1911 26.7079 -9.37784L-3.46197 20.7921C0.726328 24.9804 6.40689 27.3333 12.3301 27.3333V-15.3333ZM26.7079 -9.37784C30.5211 -5.56461 32.6634 -0.39275 32.6634 5H-10.0033C-10.0033 10.9232 -7.65028 16.6038 -3.46197 20.7921L26.7079 -9.37784ZM32.6634 5V3H-10.0033V5H32.6634ZM0.996744 19C0.996744 14.1377 2.92828 9.47455 6.36645 6.03638L36.5363 36.2063C41.0997 31.6429 43.6634 25.4536 43.6634 19H0.996744ZM6.36645 6.03638C9.80463 2.5982 14.4678 0.666666 19.3301 0.666666V43.3333C25.7837 43.3333 31.973 40.7697 36.5363 36.2063L6.36645 6.03638ZM19.3301 0.666666H5.33008V43.3333H19.3301V0.666666ZM5.33008 0.666666C10.1924 0.666666 14.8555 2.5982 18.2937 6.03638L-11.8762 36.2063C-7.3128 40.7697 -1.12352 43.3333 5.33008 43.3333V0.666666ZM18.2937 6.03638C21.7319 9.47454 23.6634 14.1377 23.6634 19H-19.0033C-19.0033 25.4536 -16.4396 31.6429 -11.8762 36.2063L18.2937 6.03638ZM23.6634 19V9H-19.0033V19H23.6634ZM23.6634 9C23.6634 13.8623 21.7319 18.5255 18.2937 21.9636L-11.8762 -8.20627C-16.4396 -3.64288 -19.0033 2.5464 -19.0033 9H23.6634ZM18.2937 21.9636C14.8555 25.4018 10.1924 27.3333 5.33008 27.3333V-15.3333C-1.12353 -15.3333 -7.3128 -12.7696 -11.8762 -8.20627L18.2937 21.9636ZM5.33008 27.3333H9.51408V-15.3333H5.33008V27.3333ZM-10.6317 13.0185C-8.97114 17.7849 -5.86847 21.9164 -1.75402 24.84L22.9597 -9.94044C26.0649 -7.73396 28.4066 -4.61581 29.6598 -1.0185L-10.6317 13.0185ZM-1.75402 24.84C2.36044 27.7636 7.28272 29.3343 12.3301 29.3343V-13.3324C16.1394 -13.3324 19.8544 -12.1469 22.9597 -9.94044L-1.75402 24.84ZM12.3301 29.3343C17.3774 29.3343 22.2997 27.7636 26.4142 24.84L1.70049 -9.94044C4.80577 -12.1469 8.52072 -13.3324 12.3301 -13.3324V29.3343ZM26.4142 24.84C30.5286 21.9164 33.6313 17.7849 35.2918 13.0185L-4.99969 -1.0185C-3.74643 -4.61581 -1.40478 -7.73396 1.70049 -9.94044L26.4142 24.84ZM15.1461 27.3333H19.3301V-15.3333H15.1461V27.3333ZM19.3301 27.3333C14.4678 27.3333 9.80462 25.4018 6.36645 21.9636L36.5363 -8.20627C31.973 -12.7697 25.7837 -15.3333 19.3301 -15.3333V27.3333ZM6.36645 21.9636C2.92828 18.5255 0.996744 13.8623 0.996744 9H43.6634C43.6634 2.5464 41.0997 -3.64288 36.5363 -8.20627L6.36645 21.9636ZM0.996744 9V19H43.6634V9H0.996744ZM10.3301 -11.3333H5.33008V31.3333H10.3301V-11.3333ZM5.33008 -11.3333C-0.593105 -11.3333 -6.27367 -8.98035 -10.462 -4.79205L19.7079 25.3778C15.8947 29.1911 10.7228 31.3333 5.33008 31.3333V-11.3333ZM-10.462 -4.79205C-14.6503 -0.60375 -17.0033 5.07682 -17.0033 11H25.6634C25.6634 16.3927 23.5211 21.5646 19.7079 25.3778L-10.462 -4.79205ZM-17.0033 11V19H25.6634V11H-17.0033ZM-17.0033 19C-17.0033 24.9232 -14.6503 30.6037 -10.462 34.7921L19.7079 4.62216C23.5212 8.43541 25.6634 13.6073 25.6634 19H-17.0033ZM-10.462 34.7921C-6.27363 38.9804 -0.593053 41.3333 5.33008 41.3333V-1.33333C10.7228 -1.33333 15.8947 0.808896 19.7079 4.62216L-10.462 34.7921ZM5.33008 41.3333H10.3301V-1.33333H5.33008V41.3333ZM10.3301 41.3333C16.2532 41.3333 21.9338 38.9804 26.1221 34.7921L-4.04776 4.62216C-0.234494 0.808896 4.93738 -1.33333 10.3301 -1.33333V41.3333ZM26.1221 34.7921C30.3104 30.6037 32.6634 24.9232 32.6634 19H-10.0033C-10.0033 13.6073 -7.861 8.43541 -4.04776 4.62216L26.1221 34.7921ZM32.6634 19V11H-10.0033V19H32.6634ZM32.6634 11C32.6634 5.07682 30.3104 -0.60375 26.1221 -4.79205L-4.04776 25.3778C-7.86099 21.5646 -10.0033 16.3927 -10.0033 11H32.6634ZM26.1221 -4.79205C21.9338 -8.98035 16.2533 -11.3333 10.3301 -11.3333V31.3333C4.93733 31.3333 -0.234531 29.1911 -4.04776 25.3778L26.1221 -4.79205ZM9.33008 -3.33333H6.33008V39.3333H9.33008V-3.33333ZM27.6634 18V12H-15.0033V18H27.6634ZM6.33008 33.3333H9.33008V-9.33333H6.33008V33.3333ZM-12.0033 12V18H30.6634V12H-12.0033ZM-1.00326 15C-1.00326 9.6073 1.13897 4.43543 4.95224 0.622161L35.1221 30.7921C39.3105 26.6037 41.6634 20.9231 41.6634 15H-1.00326ZM4.95224 0.622161C8.76548 -3.19108 13.9373 -5.33333 19.3301 -5.33333V37.3333C25.2532 37.3333 30.9338 34.9804 35.1221 30.7921L4.95224 0.622161ZM19.3301 -5.33333H14.3301V37.3333H19.3301V-5.33333ZM14.3301 -5.33333C19.7228 -5.33333 24.8947 -3.19107 28.7079 0.622161L-1.46197 30.7921C2.72633 34.9804 8.40689 37.3333 14.3301 37.3333V-5.33333ZM28.7079 0.622161C32.5211 4.43539 34.6634 9.60725 34.6634 15H-8.00326C-8.00326 20.9232 -5.65028 26.6038 -1.46197 30.7921L28.7079 0.622161ZM34.6634 15C34.6634 20.3927 32.5211 25.5646 28.7079 29.3778L-1.46197 -0.792052C-5.65028 3.39625 -8.00326 9.07682 -8.00326 15H34.6634ZM28.7079 29.3778C24.8947 33.1911 19.7228 35.3333 14.3301 35.3333V-7.33333C8.40689 -7.33333 2.72633 -4.98035 -1.46197 -0.792052L28.7079 29.3778ZM14.3301 35.3333H19.3301V-7.33333H14.3301V35.3333ZM19.3301 35.3333C13.9373 35.3333 8.76548 33.1911 4.95224 29.3778L35.1221 -0.792052C30.9338 -4.98037 25.2532 -7.33333 19.3301 -7.33333V35.3333ZM4.95224 29.3778C1.13897 25.5646 -1.00326 20.3927 -1.00326 15H41.6634C41.6634 9.07687 39.3105 3.39629 35.1221 -0.792052L4.95224 29.3778ZM-1.00326 11C-1.00326 5.6073 1.13897 0.435428 4.95224 -3.37784L35.1221 26.7921C39.3105 22.6037 41.6634 16.9231 41.6634 11H-1.00326ZM4.95224 -3.37784C8.76548 -7.19108 13.9373 -9.33333 19.3301 -9.33333V33.3333C25.2532 33.3333 30.9338 30.9804 35.1221 26.7921L4.95224 -3.37784ZM19.3301 -9.33333H14.3301V33.3333H19.3301V-9.33333ZM14.3301 -9.33333C19.7228 -9.33333 24.8947 -7.19107 28.7079 -3.37784L-1.46197 26.7921C2.72633 30.9804 8.40689 33.3333 14.3301 33.3333V-9.33333ZM28.7079 -3.37784C32.5211 0.435391 34.6634 5.60725 34.6634 11H-8.00326C-8.00326 16.9232 -5.65028 22.6038 -1.46197 26.7921L28.7079 -3.37784ZM34.6634 11C34.6634 16.3927 32.5211 21.5646 28.7079 25.3778L-1.46197 -4.79205C-5.65028 -0.60375 -8.00326 5.07682 -8.00326 11H34.6634ZM28.7079 25.3778C24.8947 29.1911 19.7228 31.3333 14.3301 31.3333V-11.3333C8.40689 -11.3333 2.72633 -8.98035 -1.46197 -4.79205L28.7079 25.3778ZM14.3301 31.3333H19.3301V-11.3333H14.3301V31.3333ZM19.3301 31.3333C13.9373 31.3333 8.76548 29.1911 4.95224 25.3778L35.1221 -4.79205C30.9338 -8.98037 25.2532 -11.3333 19.3301 -11.3333V31.3333ZM4.95224 25.3778C1.13897 21.5646 -1.00326 16.3927 -1.00326 11H41.6634C41.6634 5.07687 39.3105 -0.603713 35.1221 -4.79205L4.95224 25.3778ZM-3.00326 19C-3.00326 13.6073 -0.861041 8.43544 2.95224 4.62216L33.1221 34.7921C37.3105 30.6037 39.6634 24.9231 39.6634 19H-3.00326ZM2.95224 4.62216C6.76552 0.808881 11.9374 -1.33333 17.3301 -1.33333V41.3333C23.2532 41.3333 28.9338 38.9804 33.1221 34.7921L2.95224 4.62216ZM17.3301 -1.33333H14.3301V41.3333H17.3301V-1.33333ZM14.3301 -1.33333C19.7228 -1.33333 24.8947 0.808896 28.7079 4.62216L-1.46197 34.7921C2.72637 38.9804 8.40695 41.3333 14.3301 41.3333V-1.33333ZM28.7079 4.62216C32.5212 8.43541 34.6634 13.6073 34.6634 19H-8.00326C-8.00326 24.9232 -5.65029 30.6037 -1.46197 34.7921L28.7079 4.62216ZM34.6634 19C34.6634 24.3927 32.5212 29.5646 28.7079 33.3778L-1.46197 3.20795C-5.65029 7.39626 -8.00326 13.0768 -8.00326 19H34.6634ZM28.7079 33.3778C24.8947 37.1911 19.7228 39.3333 14.3301 39.3333V-3.33333C8.40695 -3.33333 2.72637 -0.980392 -1.46197 3.20795L28.7079 33.3778ZM14.3301 39.3333H17.3301V-3.33333H14.3301V39.3333ZM17.3301 39.3333C11.9374 39.3333 6.76552 37.1911 2.95224 33.3778L33.1221 3.20795C28.9338 -0.980407 23.2532 -3.33333 17.3301 -3.33333V39.3333ZM2.95224 33.3778C-0.861041 29.5646 -3.00326 24.3927 -3.00326 19H39.6634C39.6634 13.0769 37.3105 7.3963 33.1221 3.20795L2.95224 33.3778Z"
                      fill="#B2B2B2"
                      mask="url(#path-1-inside-1_1104_6672)"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1104_6672">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0.330078)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <input type="text" id="user-id" value="123456" />
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row btn-cont">
              <button type="submit">
                Qo'shish{" "}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1104_2152)">
                    <path
                      d="M10.666 14V12.6667C10.666 11.9594 10.3851 11.2811 9.88497 10.781C9.38487 10.281 8.70659 10 7.99935 10H3.33268C2.62544 10 1.94716 10.281 1.44706 10.781C0.946967 11.2811 0.666016 11.9594 0.666016 12.6667V14M13.3327 5.33333V9.33333M15.3327 7.33333H11.3327M8.33268 4.66667C8.33268 6.13943 7.13878 7.33333 5.66602 7.33333C4.19326 7.33333 2.99935 6.13943 2.99935 4.66667C2.99935 3.19391 4.19326 2 5.66602 2C7.13878 2 8.33268 3.19391 8.33268 4.66667Z"
                      stroke="#E7F4F1"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1104_2152">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
