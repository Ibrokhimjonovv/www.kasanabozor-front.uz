import React, { useState, useEffect, useContext } from "react";
import "./profile.scss";
import { Link, useParams } from "react-router-dom";
import ProfileSideBar from "../../components/profileSideBar/profileSideBar";
import { globalApi } from "../../App";
import { MyContext } from "../../context/myContext";
import profileImage from "../../assets/profileImage.png";

const Profile = () => {
  const { user, setUser } = useContext(MyContext); // Dastlabki qiymat "role: user"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { param } = useParams()
  console.log(param);
  

  // const fetchUserData = async () => {
  //   const token = localStorage.getItem("access_token");
  //   if (!token) {
  //     setError("Token topilmadi. Iltimos, qayta login qiling.");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${globalApi}/users/`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 401) {
  //       localStorage.removeItem("token");
  //       setError("Token yaroqsiz yoki muddati tugagan. Qayta login qiling.");
  //       setLoading(false);
  //       return;
  //     }
  //     console.log(response);

  //     if (!response.ok) {
  //       setError("Ma'lumotlarni olishda xatolik yuz berdi.");
  //       setLoading(false);
  //       return;
  //     }

  //     const data = await response.json();

  //     // Role qo'shish agar API javobida kelmasa
  //     const userDataWithRole = {
  //       ...data, // API'dan kelgan foydalanuvchi ma'lumotlari
  //       role: data.role || "user", // Agar "role" bo'lmasa, 'user' qilib qo'yamiz
  //     };

  //     setUser(userDataWithRole);
  //   } catch (err) {
  //     console.error("Server bilan bog‘lanishda xatolik:", err);
  //     setError("Server bilan bog‘lanishda xatolik yuz berdi.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  // if (loading) return <p>Yuklanmoqda...</p>;

  // if (error) return <p>{error}</p>;

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
          <span>Shaxsiy ma'lumotlarim</span>
        </div>
      </div>
      <div className="profile-inner">
        <div className="left">
          <ProfileSideBar />
        </div>
        <div className="right">
          <div className="page-title">
            <h2>Shaxsiy ma'lumotlarim</h2>
            <Link to="/profile/edit-profile">
              Tahrirlash
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1423_19081)">
                  <path
                    d="M7.33398 2.66665H2.66732C2.3137 2.66665 1.97456 2.80713 1.72451 3.05718C1.47446 3.30723 1.33398 3.64637 1.33398 3.99999V13.3333C1.33398 13.6869 1.47446 14.0261 1.72451 14.2761C1.97456 14.5262 2.3137 14.6667 2.66732 14.6667H12.0007C12.3543 14.6667 12.6934 14.5262 12.9435 14.2761C13.1935 14.0261 13.334 13.6869 13.334 13.3333V8.66665M12.334 1.66665C12.5992 1.40144 12.9589 1.25244 13.334 1.25244C13.7091 1.25244 14.0688 1.40144 14.334 1.66665C14.5992 1.93187 14.7482 2.29158 14.7482 2.66665C14.7482 3.04173 14.5992 3.40144 14.334 3.66665L8.00065 9.99999L5.33398 10.6667L6.00065 7.99999L12.334 1.66665Z"
                    stroke="#757575"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1423_19081">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </div>
          <div className="profile-img">
            <img src={profileImage} alt="" />
            <input type="file" id="photo" />
            <label htmlFor="photo">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 1.99999H2C1.73478 1.99999 1.48043 2.10535 1.29289 2.29288C1.10536 2.48042 1 2.73477 1 2.99999V9.99999C1 10.2652 1.10536 10.5196 1.29289 10.7071C1.48043 10.8946 1.73478 11 2 11H9C9.26522 11 9.51957 10.8946 9.70711 10.7071C9.89464 10.5196 10 10.2652 10 9.99999V6.49999M9.25 1.24999C9.44891 1.05108 9.7187 0.939331 10 0.939331C10.2813 0.939331 10.5511 1.05108 10.75 1.24999C10.9489 1.4489 11.0607 1.71869 11.0607 1.99999C11.0607 2.2813 10.9489 2.55108 10.75 2.74999L6 7.49999L4 7.99999L4.5 5.99999L9.25 1.24999Z"
                  stroke="#757575"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </label>
          </div>
          <div className="infos">
            <ul>
              <li>
                <span>Ismi</span>
                <p>Abdulrahmon</p>
              </li>
              <li>
                <span>Telefon raqami</span>
                <p>+99891 234 56 78</p>
              </li>
              <li>
                <span>Familiya</span>
                <p>Abdurahimov</p>
              </li>
              <li>
                <span>El-pochta</span>
                <p>Yo'q</p>
              </li>
              <li>
                <span>Tug'ilgan kuni</span>
                <p>01.01.1991</p>
              </li>
              <li>
                <span>Faoliyati</span>
                <p>Tandirchilik</p>
              </li>
              <li>
                <span>Viloyat</span>
                <p>Toshkent</p>
              </li>
              <li>
                <span>Manzil</span>
                <p>Yakkasaroy tumani, Jahonbaxsh mahallasi</p>
              </li>
            </ul>
          </div>
          <div className="about-me">
            <span>Men haqimda</span>
            <p>
              Men Azamat Axrorov – kasanachilik bilan shug‘ullanaman. Toshkent
              shahrida faoliyat yurityapman.{" "}
            </p>
          </div>
          <div className="bio">
            <span>Biografiya</span>
            <p>
              Men Azamat Axrorov – kasanachilik bilan shug‘ullanaman. Toshkent
              shahrida faoliyat yurityapman. Ishimni sidqidildan bajarishga va
              har doim o‘zimni rivojlantirishga harakat qilaman. Men uchun halol
              mehnat va oila qadriyatlari eng muhim o‘rin tutadi. Bo‘sh
              vaqtlarimda kitob o‘qish va tabiat qo‘ynida dam olishni
              yoqtiraman. Mening hayotiy shiorim: "Har bir kichik qadam – katta
              muvaffaqiyat sari yo‘l."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
