import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../../context/myContext";
import "./signup.scss";
import InputMask from "react-input-mask";
import { usersServerUrl } from "../../../SuperVars";
import axios from "axios";

const Signup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    selectedLanguage,
    setSelectedLanguage,
    languages,
    setLanguages,
    setSignUpSuccess,
  } = useContext(MyContext);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState("");
  const [phoneErr, setPhoneErr] = useState(null);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    phone: "",
    password1: "",
    password2: "",
  });
  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };
  const closeDropdown = (e) => {
    if (!e.target.closest(".dropdown")) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);
  const handleLanguageChange = (newLanguage) => {
    const updatedLanguages = languages.filter((lang) => lang !== newLanguage);
    updatedLanguages.push(selectedLanguage);
    setSelectedLanguage(newLanguage);
    setLanguages(updatedLanguages);
    setIsOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validate = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "Ismni kiritish majburiy.";
    }

    if (!/^\d{9,12}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Telefon raqam noto'g'ri yoki to'liq emas";
    }

    // Parollarni tekshirish
    if (!formData.password1 || !formData.password2) {
      newErrors.password1 = "Parollarni kiritish shart.";
    } else if (formData.password1 !== formData.password2) {
      newErrors.password1 = "Parollar bir xil emas.";
    }

    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSignUpSuccess("");

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    } else {
      setLoading(true);
    }

    try {
      const response = await axios.post(`${usersServerUrl}accounts/sign-up/`, {
        first_name: formData.first_name,
        phone: formData.phone,
        password: formData.password1,
      });

      console.log(response);

      if (response.data.status === "ok") {
        setSignUpSuccess("Ro'yxatdan muvaffaqiyatli o'tdingiz!");

        const { access, refresh } = response.data;

        axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);

        setFormData({
          first_name: "",
          phone: "",
          password1: "",
          password2: "",
        });

        setTimeout(() => {
          setSignUpSuccess("");
        }, 5000);

        navigate("/login");
      } else {
        const data = await response.data;
        if (data.details.phone) {
          setError("Ushbu raqam band.");
          setPhoneErr(
            "Ushbu raqam avval ro'yxatdan o'tgan! Iltimos boshqa raqam bilan ro'yxatdan o'ting"
          );
        } else {
          setError("Ro'yxatdan o'tishda xatolik yuz berdi.");
        }
      }
    } catch (err) {
      console.log(err);
      setError({ general: "Tarmoq xatosi. Iltimos, qayta urinib ko'ring." });
    } finally {
      setLoading(false);
    }
  };

  const [smsCode, setSmsCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(122);
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [smsErr, setSmsErr] = useState(false);

  const generateSmsCode = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const handleRegister = () => {
    if (
      formData.first_name &&
      formData.phone &&
      formData.password1 &&
      formData.password2 &&
      formData.password1 === formData.password2 &&
      phoneErr === null
    ) {
      console.log(phoneErr);

      const code = generateSmsCode();
      setGeneratedCode(code);
      console.log(`SMS kodi yuborildi: ${code}`); // Kodni consolga chiqaramiz
      setStep(2); // SMS tasdiqlash bosqichiga o'tamiz
    } else {
      validate();
    }
  };

  // SMS qayta yuborish funksiyasi
  const handleResendCode = () => {
    const code = generateSmsCode();
    setGeneratedCode(code);
    console.log(`Yangi SMS kodi yuborildi: ${code}`); // Kodni consolga chiqaramiz
    setTimer(120); // Timerni qayta o'rnatish
    setResendEnabled(false); // Tugmani yashirish
  };

  // Timerni boshqarish
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown); // Timer to'xtatish
          setResendEnabled(true); // SMS qayta yuborish tugmasini ko'rsatish

          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  // Timer formatlash
  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // SMS kodni tekshirish
  const handleVerify = (e) => {
    const enteredCode = code.join("");
    if (enteredCode === generatedCode) {
      handleSubmit(e);
    } else {
      setSmsErr(true);
    }
  };

  // SMS kodni inputdan olish
  const handleChangeSmsCode = (index, value) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1); // Faqat oxirgi kiritilgan raqamni olish
    setCode(newCode);

    if (value && index < code.length - 1) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };
  return (
    <div id="signup-cont">
      <div className="signup-header">
        <div className="logo">
          <Link to="/">
            <svg
              width="100"
              height="20"
              viewBox="0 0 100 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M95.8572 8.67301C95.6172 8.93967 95.2906 9.29967 94.8772 9.75301C94.4772 10.2063 94.0439 10.7063 93.5772 11.253C93.1106 11.7997 92.6372 12.373 92.1572 12.973C91.6906 13.573 91.2639 14.153 90.8772 14.713H95.9572V17.193H87.2572V15.433C87.5372 14.953 87.8706 14.4397 88.2572 13.893C88.6572 13.333 89.0706 12.773 89.4972 12.213C89.9372 11.653 90.3706 11.113 90.7972 10.593C91.2239 10.0597 91.6172 9.57967 91.9772 9.15301H87.4972V6.67301H95.8572V8.67301Z"
                fill="#41A58D"
              />
              <path
                d="M85.1599 16.833C84.6532 16.9797 83.9999 17.113 83.1999 17.233C82.3999 17.3663 81.5599 17.433 80.6799 17.433C79.7866 17.433 79.0399 17.313 78.4399 17.073C77.8532 16.833 77.3866 16.4997 77.0399 16.073C76.6932 15.633 76.4465 15.113 76.2999 14.513C76.1532 13.913 76.0799 13.253 76.0799 12.533V6.67301H79.0599V12.173C79.0599 13.133 79.1866 13.8263 79.4399 14.253C79.6932 14.6797 80.1665 14.893 80.8599 14.893C81.0732 14.893 81.2999 14.8863 81.5399 14.873C81.7799 14.8463 81.9932 14.8197 82.1799 14.793V6.67301H85.1599V16.833Z"
                fill="#41A58D"
              />
              <path
                d="M74.178 15.613C74.178 16.213 73.9847 16.673 73.598 16.993C73.2247 17.2997 72.798 17.453 72.318 17.453C71.838 17.453 71.4047 17.2997 71.018 16.993C70.6447 16.673 70.458 16.213 70.458 15.613C70.458 15.013 70.6447 14.5597 71.018 14.253C71.4047 13.933 71.838 13.773 72.318 13.773C72.798 13.773 73.2247 13.933 73.598 14.253C73.9847 14.5597 74.178 15.013 74.178 15.613Z"
                fill="#41A58D"
              />
              <path
                d="M64.2233 15.113C64.5167 15.113 64.7967 15.1063 65.0633 15.093C65.33 15.0797 65.5433 15.0597 65.7033 15.033V12.773C65.5833 12.7463 65.4033 12.7197 65.1633 12.693C64.9233 12.6663 64.7033 12.653 64.5033 12.653C64.2233 12.653 63.9566 12.673 63.7033 12.713C63.4633 12.7397 63.25 12.7997 63.0633 12.893C62.8767 12.9863 62.73 13.113 62.6233 13.273C62.5167 13.433 62.4633 13.633 62.4633 13.873C62.4633 14.3397 62.6167 14.6663 62.9233 14.853C63.2433 15.0263 63.6767 15.113 64.2233 15.113ZM63.9833 6.39301C64.8633 6.39301 65.5967 6.49301 66.1833 6.69301C66.77 6.89301 67.2367 7.17968 67.5833 7.55301C67.9433 7.92634 68.1967 8.37968 68.3433 8.91301C68.49 9.44634 68.5633 10.0397 68.5633 10.693V16.893C68.1367 16.9863 67.5433 17.093 66.7833 17.213C66.0233 17.3463 65.1033 17.413 64.0233 17.413C63.3433 17.413 62.7233 17.353 62.1633 17.233C61.6167 17.113 61.1433 16.9197 60.7433 16.653C60.3433 16.373 60.0367 16.013 59.8233 15.573C59.61 15.133 59.5033 14.593 59.5033 13.953C59.5033 13.3397 59.6233 12.8197 59.8633 12.393C60.1167 11.9663 60.45 11.6263 60.8633 11.373C61.2767 11.1197 61.75 10.9397 62.2833 10.833C62.8167 10.713 63.37 10.653 63.9433 10.653C64.33 10.653 64.67 10.673 64.9633 10.713C65.27 10.7397 65.5167 10.7797 65.7033 10.833V10.553C65.7033 10.0463 65.55 9.63968 65.2433 9.33301C64.9366 9.02634 64.4033 8.87301 63.6433 8.87301C63.1367 8.87301 62.6367 8.91301 62.1433 8.99301C61.65 9.05968 61.2233 9.15968 60.8633 9.29301L60.4833 6.89301C60.6567 6.83968 60.87 6.78634 61.1233 6.73301C61.39 6.66634 61.6767 6.61301 61.9833 6.57301C62.29 6.51968 62.61 6.47968 62.9433 6.45301C63.29 6.41301 63.6367 6.39301 63.9833 6.39301Z"
                fill="#41A58D"
              />
              <path
                d="M48.426 7.03301C48.9326 6.88634 49.586 6.75301 50.386 6.63301C51.186 6.49967 52.026 6.43301 52.906 6.43301C53.7993 6.43301 54.5393 6.553 55.126 6.79301C55.726 7.01967 56.1993 7.34634 56.546 7.77301C56.8926 8.19967 57.1393 8.70634 57.286 9.29301C57.4326 9.87967 57.506 10.533 57.506 11.253V17.193H54.526V11.613C54.526 10.653 54.3993 9.97301 54.146 9.57301C53.8926 9.17301 53.4193 8.97301 52.726 8.97301C52.5126 8.97301 52.286 8.98634 52.046 9.01301C51.806 9.02634 51.5926 9.04634 51.406 9.07301V17.193H48.426V7.03301Z"
                fill="#41A58D"
              />
              <path
                d="M41.3913 15.113C41.6846 15.113 41.9646 15.1063 42.2313 15.093C42.498 15.0797 42.7113 15.0597 42.8713 15.033V12.773C42.7513 12.7463 42.5713 12.7197 42.3313 12.693C42.0913 12.6663 41.8713 12.653 41.6713 12.653C41.3913 12.653 41.1246 12.673 40.8713 12.713C40.6313 12.7397 40.418 12.7997 40.2313 12.893C40.0446 12.9863 39.898 13.113 39.7913 13.273C39.6846 13.433 39.6313 13.633 39.6313 13.873C39.6313 14.3397 39.7846 14.6663 40.0913 14.853C40.4113 15.0263 40.8446 15.113 41.3913 15.113ZM41.1513 6.39301C42.0313 6.39301 42.7646 6.49301 43.3513 6.69301C43.938 6.89301 44.4046 7.17968 44.7513 7.55301C45.1113 7.92634 45.3646 8.37968 45.5113 8.91301C45.658 9.44634 45.7313 10.0397 45.7313 10.693V16.893C45.3046 16.9863 44.7113 17.093 43.9513 17.213C43.1913 17.3463 42.2713 17.413 41.1913 17.413C40.5113 17.413 39.8913 17.353 39.3313 17.233C38.7846 17.113 38.3113 16.9197 37.9113 16.653C37.5113 16.373 37.2046 16.013 36.9913 15.573C36.778 15.133 36.6713 14.593 36.6713 13.953C36.6713 13.3397 36.7913 12.8197 37.0313 12.393C37.2846 11.9663 37.618 11.6263 38.0313 11.373C38.4446 11.1197 38.918 10.9397 39.4513 10.833C39.9846 10.713 40.538 10.653 41.1113 10.653C41.498 10.653 41.838 10.673 42.1313 10.713C42.438 10.7397 42.6846 10.7797 42.8713 10.833V10.553C42.8713 10.0463 42.718 9.63968 42.4113 9.33301C42.1046 9.02634 41.5713 8.87301 40.8113 8.87301C40.3046 8.87301 39.8046 8.91301 39.3113 8.99301C38.818 9.05968 38.3913 9.15968 38.0313 9.29301L37.6513 6.89301C37.8246 6.83968 38.038 6.78634 38.2913 6.73301C38.558 6.66634 38.8446 6.61301 39.1513 6.57301C39.458 6.51968 39.778 6.47968 40.1113 6.45301C40.458 6.41301 40.8046 6.39301 41.1513 6.39301Z"
                fill="#41A58D"
              />
              <path
                d="M30.6843 15.053C31.2309 15.053 31.6176 14.9997 31.8443 14.893C32.0709 14.7863 32.1843 14.5797 32.1843 14.273C32.1843 14.033 32.0376 13.8263 31.7443 13.653C31.4509 13.4663 31.0043 13.2597 30.4043 13.033C29.9376 12.8597 29.5109 12.6797 29.1243 12.493C28.7509 12.3063 28.4309 12.0863 28.1643 11.833C27.8976 11.5663 27.6909 11.253 27.5443 10.893C27.3976 10.533 27.3243 10.0997 27.3243 9.59301C27.3243 8.60634 27.6909 7.82634 28.4243 7.25301C29.1576 6.67968 30.1643 6.39301 31.4443 6.39301C32.0843 6.39301 32.6976 6.45301 33.2843 6.57301C33.8709 6.67968 34.3376 6.79968 34.6843 6.93301L34.1643 9.25301C33.8176 9.13301 33.4376 9.02634 33.0243 8.93301C32.6243 8.83968 32.1709 8.79301 31.6643 8.79301C30.7309 8.79301 30.2643 9.05301 30.2643 9.57301C30.2643 9.69301 30.2843 9.79968 30.3243 9.89301C30.3643 9.98634 30.4443 10.0797 30.5643 10.173C30.6843 10.253 30.8443 10.3463 31.0443 10.453C31.2576 10.5463 31.5243 10.653 31.8443 10.773C32.4976 11.013 33.0376 11.253 33.4643 11.493C33.8909 11.7197 34.2243 11.973 34.4643 12.253C34.7176 12.5197 34.8909 12.8197 34.9843 13.153C35.0909 13.4863 35.1443 13.873 35.1443 14.313C35.1443 15.353 34.7509 16.1397 33.9643 16.673C33.1909 17.2063 32.0909 17.473 30.6643 17.473C29.7309 17.473 28.9509 17.393 28.3243 17.233C27.7109 17.073 27.2843 16.9397 27.0443 16.833L27.5443 14.413C28.0509 14.613 28.5709 14.773 29.1043 14.893C29.6376 14.9997 30.1643 15.053 30.6843 15.053Z"
                fill="#41A58D"
              />
              <path
                d="M20.6296 15.113C20.9229 15.113 21.2029 15.1063 21.4696 15.093C21.7362 15.0797 21.9496 15.0597 22.1096 15.033V12.773C21.9896 12.7463 21.8096 12.7197 21.5696 12.693C21.3296 12.6663 21.1096 12.653 20.9096 12.653C20.6296 12.653 20.3629 12.673 20.1096 12.713C19.8696 12.7397 19.6562 12.7997 19.4696 12.893C19.2829 12.9863 19.1362 13.113 19.0296 13.273C18.9229 13.433 18.8696 13.633 18.8696 13.873C18.8696 14.3397 19.0229 14.6663 19.3296 14.853C19.6496 15.0263 20.0829 15.113 20.6296 15.113ZM20.3896 6.39301C21.2696 6.39301 22.0029 6.49301 22.5896 6.69301C23.1762 6.89301 23.6429 7.17968 23.9896 7.55301C24.3496 7.92634 24.6029 8.37968 24.7496 8.91301C24.8962 9.44634 24.9696 10.0397 24.9696 10.693V16.893C24.5429 16.9863 23.9496 17.093 23.1896 17.213C22.4296 17.3463 21.5096 17.413 20.4296 17.413C19.7496 17.413 19.1296 17.353 18.5696 17.233C18.0229 17.113 17.5496 16.9197 17.1496 16.653C16.7496 16.373 16.4429 16.013 16.2296 15.573C16.0162 15.133 15.9096 14.593 15.9096 13.953C15.9096 13.3397 16.0296 12.8197 16.2696 12.393C16.5229 11.9663 16.8562 11.6263 17.2696 11.373C17.6829 11.1197 18.1562 10.9397 18.6896 10.833C19.2229 10.713 19.7762 10.653 20.3496 10.653C20.7362 10.653 21.0762 10.673 21.3696 10.713C21.6762 10.7397 21.9229 10.7797 22.1096 10.833V10.553C22.1096 10.0463 21.9562 9.63968 21.6496 9.33301C21.3429 9.02634 20.8096 8.87301 20.0496 8.87301C19.5429 8.87301 19.0429 8.91301 18.5496 8.99301C18.0562 9.05968 17.6296 9.15968 17.2696 9.29301L16.8896 6.89301C17.0629 6.83968 17.2762 6.78634 17.5296 6.73301C17.7962 6.66634 18.0829 6.61301 18.3896 6.57301C18.6962 6.51968 19.0162 6.47968 19.3496 6.45301C19.6962 6.41301 20.0429 6.39301 20.3896 6.39301Z"
                fill="#41A58D"
              />
              <path
                d="M11.513 17.193C11.233 16.7397 10.8997 16.253 10.513 15.733C10.1397 15.1997 9.72634 14.673 9.27301 14.153C8.83301 13.6197 8.37301 13.113 7.89301 12.633C7.41301 12.1397 6.93301 11.7063 6.45301 11.333V17.193H3.33301V3.33301H6.45301V8.57301C7.26634 7.71967 8.07967 6.83301 8.89301 5.91301C9.71967 4.97967 10.4863 4.11967 11.193 3.33301H14.893C13.9463 4.45301 12.993 5.53301 12.033 6.57301C11.0863 7.61301 10.0863 8.65968 9.03301 9.71301C10.1397 10.633 11.2063 11.7263 12.233 12.993C13.273 14.2597 14.2663 15.6597 15.213 17.193H11.513Z"
                fill="#41A58D"
              />
            </svg>
          </Link>
        </div>
        <div className="signup-header-right">
          <div className="dropdown">
            <Link to="#" onClick={toggleDropDown}>
              <span>{selectedLanguage}</span>
              <svg
                className="down-arrow"
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
              </svg>
            </Link>
            {isOpen && (
              <ul>
                {languages.map((lang) => (
                  <li key={lang}>
                    <Link to="#" onClick={() => handleLanguageChange(lang)}>
                      <span>{lang}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link to="/login" id="signup">
            Kirish
          </Link>
        </div>
      </div>
      <div className="signup-container">
        {step === 1 && (
          <div className="signup-top-text">
            <h3>Ro’yxatdan o’tish</h3>
            <p>Yangi hisobingizni yarating</p>
            {error.general && (
              <div style={{ color: "red" }}>{error.general}</div>
            )}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="input-container">
                <label htmlFor="first_name">Ism</label>
                <div className="a">
                  <svg
                    width="22"
                    height="24"
                    viewBox="0 0 22 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.3337 22.5V20.1667C20.3337 18.929 19.842 17.742 18.9668 16.8668C18.0917 15.9917 16.9047 15.5 15.667 15.5H6.33366C5.09598 15.5 3.909 15.9917 3.03383 16.8668C2.15866 17.742 1.66699 18.929 1.66699 20.1667V22.5M15.667 6.16667C15.667 8.744 13.5777 10.8333 11.0003 10.8333C8.423 10.8333 6.33366 8.744 6.33366 6.16667C6.33366 3.58934 8.423 1.5 11.0003 1.5C13.5777 1.5 15.667 3.58934 15.667 6.16667Z"
                      stroke="#41A58D"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <input
                    type="text"
                    id="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Ismingizni kiriting"
                    name="first_name"
                  />
                </div>
                {error.first_name && (
                  <p className="error-message">{error.first_name}</p>
                )}
              </div>
              <div className="input-container">
                <label htmlFor="phone">Telefon raqami</label>
                <div className="a">
                  <svg
                    width="18"
                    height="24"
                    viewBox="0 0 18 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.7913 1.20898H5.20801C3.27501 1.20898 1.70801 2.77599 1.70801 4.70898V19.2923C1.70801 21.2253 3.27501 22.7923 5.20801 22.7923H12.7913C14.7243 22.7923 16.2913 21.2253 16.2913 19.2923V4.70898C16.2913 2.77599 14.7243 1.20898 12.7913 1.20898Z"
                      stroke="#41A58D"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.83301 18.709H10.1663"
                      stroke="#41A58D"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span id="code">+998</span>
                  <InputMask
                    mask="(99) 999-99-99"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(__) ___-__-__"
                    name="phone"
                    id="phone"
                  />
                </div>
                {error.phone && <p className="error-message">{error.phone}</p>}
                {phoneErr && <p className="error-message">{phoneErr}</p>}
              </div>
              <div className="input-container">
                <label htmlFor="password1">Yangi parol</label>
                <div className="a">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.16667 12.833V8.16634C8.16667 6.61924 8.78125 5.13551 9.87521 4.04155C10.9692 2.94759 12.4529 2.33301 14 2.33301C15.5471 2.33301 17.0308 2.94759 18.1248 4.04155C19.2188 5.13551 19.8333 6.61924 19.8333 8.16634V12.833M5.83333 12.833H22.1667C23.4553 12.833 24.5 13.8777 24.5 15.1663V23.333C24.5 24.6217 23.4553 25.6663 22.1667 25.6663H5.83333C4.54467 25.6663 3.5 24.6217 3.5 23.333V15.1663C3.5 13.8777 4.54467 12.833 5.83333 12.833Z"
                      stroke="#41A58D"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <input
                    type={showPassword1 ? "text" : "password"}
                    id="password1"
                    value={formData.password1}
                    onChange={handleChange}
                    placeholder="••••••••"
                    name="password1"
                  />
                  {showPassword1 ? (
                    <svg
                      className="eye s"
                      onClick={() => setShowPassword1(!showPassword1)}
                      stroke="#41A58D"
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
                    <svg
                      onClick={() => setShowPassword1(!showPassword1)}
                      className="eye"
                      width="24"
                      height="18"
                      viewBox="0 0 24 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 9C1 9 5 1 12 1C19 1 23 9 23 9C23 9 19 17 12 17C5 17 1 9 1 9Z"
                        stroke="#41A58D"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
                        stroke="#41A58D"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
                {error.password1 && (
                  <p className="error-message">{error.password1}</p>
                )}
              </div>
              <div className="input-container">
                <label htmlFor="password2">Parolni takrorlang</label>
                <div className="a">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.16667 12.833V8.16634C8.16667 6.61924 8.78125 5.13551 9.87521 4.04155C10.9692 2.94759 12.4529 2.33301 14 2.33301C15.5471 2.33301 17.0308 2.94759 18.1248 4.04155C19.2188 5.13551 19.8333 6.61924 19.8333 8.16634V12.833M5.83333 12.833H22.1667C23.4553 12.833 24.5 13.8777 24.5 15.1663V23.333C24.5 24.6217 23.4553 25.6663 22.1667 25.6663H5.83333C4.54467 25.6663 3.5 24.6217 3.5 23.333V15.1663C3.5 13.8777 4.54467 12.833 5.83333 12.833Z"
                      stroke="#41A58D"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <input
                    type={showPassword2 ? "text" : "password"}
                    id="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    placeholder="••••••••"
                    name="password2"
                  />
                  {showPassword2 ? (
                    <svg
                      className="eye s"
                      onClick={() => setShowPassword2(!showPassword2)}
                      stroke="#41A58D"
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
                    <svg
                      onClick={() => setShowPassword2(!showPassword2)}
                      className="eye"
                      width="24"
                      height="18"
                      viewBox="0 0 24 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 9C1 9 5 1 12 1C19 1 23 9 23 9C23 9 19 17 12 17C5 17 1 9 1 9Z"
                        stroke="#41A58D"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
                        stroke="#41A58D"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
                {error.password1 && (
                  <p className="error-message">{error.password1}</p>
                )}
              </div>
              {/* <button type="submit" disabled={loading}>
            {loading ? "Ro'yxatdan o'tilmoqda..." : "Ro'yxatdan o'tish"}
          </button> */}
              <button onClick={handleRegister}>Tasdiqlash</button>
            </>
          )}
          {step === 2 && (
            <div className="second-step">
              <h2>Raqamni tasdiqlash</h2>
              <p>
                {formData.phone
                  .slice(-8)
                  .replace(/[^0-9]/g, " ")
                  .replace(/^(\+?\d{2})/, "**")}{" "}
                raqamiga yuborilgan kodni kiriting:
              </p>
              {/* <input
                type="text"
                value={smsCode}
                onChange={(e) => setSmsCode(e.target.value)}
                placeholder="SMS kodni kiriting"
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              /> */}
              <div className="code-inputs">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChangeSmsCode(index, e.target.value)}
                    disabled={phoneErr !== null}
                    required
                  />
                ))}
              </div>
              {!phoneErr && timer > 0 && <p>{formatTimer()}</p>}
              {!phoneErr && smsErr && <p style={{ color: "red" }}>Kiritilgan kod xato</p>}
              {!phoneErr && resendEnabled && (
                <button id="resend-btn" onClick={handleResendCode}>
                  SMS kodni qayta yuborish
                </button>
              )}
              <button onClick={(e) => handleVerify(e)} disabled={loading}>
                {loading ? "Ro'yxatdan o'tilmoqda..." : "Ro'yxatdan o'tish"}
              </button>
              {phoneErr && <p style={{ color: "red" }}>{phoneErr}</p>}
            </div>
          )}
          {step === 1 && (
            <div className="signup-link">
              Hisobingiz bormi? <Link to="/login">Kirish</Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
