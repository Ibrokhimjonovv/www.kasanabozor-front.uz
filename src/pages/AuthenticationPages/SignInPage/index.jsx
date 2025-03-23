import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";
import Loading from "../../../components/LoaderComponent/loading.jsx";
import { useUserContext } from "../../../context/user.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./index.scss";

const SignInPages = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ phone: "", password: "", general: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useUserContext();

  const phoneInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError({ phone: "", password: "", general: "" });

    let newError = {};
    let hasError = false;

    const cleanedPhone = phone.replace(/\D/g, "");

    if (!cleanedPhone) {
      newError.phone = "Telefon raqami kiritish shart!";
      hasError = true;
    } else if (!/^\d{9}$/.test(cleanedPhone)) {
      newError.phone = "Telefon raqam noto'g'ri yoki to'liq emas.";
      hasError = true;
    }

    if (!password.trim()) {
      newError.password = "Parolni kiritish shart!";
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    try {
      await login({ phone: cleanedPhone, password });
    } catch (err) {
      setError((prev) => ({
        ...prev,
        general: "Login muvaffaqiyatsiz. Qayta urinib ko'ring!",
      }));
    }
  };

  return loading ? (
    <div style={{ width: "100%", height: "100vh" }}>
      <Loading />
    </div>
  ) : (
    <div id="login">
      <div className="login-header">
        <div className="logo">
          <Link to="/">Logo</Link>
        </div>
      </div>

      <div className="login-content">
        <h2>Kirish</h2>
        <p className="after-title">
          Kirish uchun login va parolni <br />
          kiriting
        </p>

        {error.general && <p className="error">{error.general}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Telefon Raqam</label>
            <InputMask
              mask="(99) 999-99-99"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(__) ___-__-__"
              inputRef={phoneInputRef}
            />
            {error.phone && <p className="error">{error.phone}</p>}
          </div>

          <div className="form-group">
            <label>Parol</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolingizni kiriting"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FaEye width={22} height={22} />
                ) : (
                  <FaEyeSlash width={22} height={22} />
                )}
              </button>
            </div>
            {error.password && <p className="error">{error.password}</p>}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            Kirish
          </button>

          <p className="bottom-register">
            Hisobingiz yo’qmi?{" "}
            <Link to={"/auth/sign-up/"}>Ro’yxatdan o’tish</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPages;
