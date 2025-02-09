import React, { useContext, useState, useEffect } from "react";
import Dashboard from "../dashboard/dashboard";
import { MyContext } from "../../../context/myContext";
import { Link, useNavigate } from "react-router-dom";
import "./addNews.scss";
import { newsServerUrl } from "../../../SuperVars";
import axios from "axios";


const AddNews = () => {
  const {isOpen} = useContext(MyContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.post(`${newsServerUrl}dashboard/categories/list/`);
      if (response.data.status === "ok") {
        setCategories(response.data.results);
      }
    } catch {}
  }

  useEffect(() => {
    const timeout = setTimeout(loadData, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('thumbnail', thumbnail);
    formData.append('category', category);
    formData.append('description', description);

    try {
      const response = await axios.post(`${newsServerUrl}dashboard/news/create/`, formData);
      console.log(response);
      if (response.data.status === "ok") {
        alert("Yangilik muaffaqiyatli yuklandi.");
        navigate('/dashboard/admin/admin-news');
      } else {
        alert("Yuklashda xatolik bor.");
      }
    } catch {
      alert("Xatolik yuz berdi.");
    }
  }

  return (
    <div id="admin-add-news">
      <Dashboard />
      <div className={`admin-item ${isOpen ? "wd" : ""}`}>
        <div className="title">Yangilik qo'shish</div>
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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
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
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Link to="/dashboard/admin/admin-news">Yangiliklar</Link>
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
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Yangilik qo’shish</span>
        </div>
        <div className="form-list">
          <form action="" onSubmit={ handleSubmit }>
            <div className="input-row">
              <label htmlFor="page-title">Sahifa sarlavhasi</label>
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
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.40059 15.8849C4.6754 15.3838 5.17974 15.0756 5.72513 15.0756H18.2756C18.821 15.0756 19.3254 15.3838 19.6002 15.8849L21.3892 19.1473C21.9855 20.2347 21.2481 21.6004 20.0647 21.6004H3.93613C2.75264 21.6004 2.01526 20.2347 2.61159 19.1473L4.40059 15.8849Z"
                    stroke="#B2B2B2"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>

                <input type="text" placeholder="Sarlavhani kiriting" value={ title } onChange={ (e) => { setTitle(e.target.value); } } />
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row">
              <label htmlFor="file">Avatar</label>
              <div className="inputs">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.35795 19.6773C8.06747 19.6773 6.77795 19.186 5.79611 18.2042C3.83099 16.2391 3.83099 13.0416 5.79611 11.0764L11.4911 5.26172L12.5197 6.26924L6.81971 12.0892C5.41091 13.4983 5.41091 15.7821 6.81467 17.1859C8.21843 18.5894 10.5023 18.5896 11.9058 17.1859L17.6005 11.3712C18.4477 10.5237 18.4477 9.15332 17.6055 8.31116C16.7634 7.46924 15.393 7.46876 14.5508 8.31116L8.85587 14.1259C8.71475 14.2672 8.63987 14.4482 8.63987 14.6404C8.63987 14.8327 8.71475 15.0136 8.85059 15.1497C9.13139 15.4303 9.58811 15.4303 9.86891 15.1497L15.5639 9.335L16.5925 10.3425L10.8925 16.1625C10.4792 16.5758 9.93683 16.8004 9.35987 16.8004C8.78291 16.8004 8.24051 16.5758 7.83251 16.1678C7.42451 15.7598 7.19987 15.2174 7.19987 14.6404C7.19987 14.0635 7.42451 13.5211 7.83251 13.1131L13.5272 7.29836C14.936 5.88956 17.2201 5.88932 18.6236 7.29308C20.0271 8.69684 20.0271 10.9807 18.6236 12.3842L12.9289 18.1989C11.9432 19.1848 10.6499 19.6773 9.35795 19.6773Z"
                    fill="#AFB3B5"
                  />
                </svg>
                <label htmlFor="file" id="file-label">
                  {thumbnail?.name || "Rasm tanlang"}
                </label>
                <input
                  type="file"
                  placeholder="Rasm tanlang"
                  id="file"
                  onChange={ (e) => { setThumbnail(e.target.files[0]); } }
                />
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row">
              <label htmlFor="meta-name">Kategoriya</label>
              <div className="inputs">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.90039 21.5984L2.9008 17.998C2.90102 16.01 4.51273 14.3984 6.50079 14.3984H13.7002M16.7004 17.3984L17.9004 18.5984L22.1004 14.3984M14.9004 5.99844C14.9004 7.98666 13.2886 9.59844 11.3004 9.59844C9.31216 9.59844 7.70039 7.98666 7.70039 5.99844C7.70039 4.01021 9.31216 2.39844 11.3004 2.39844C13.2886 2.39844 14.9004 4.01021 14.9004 5.99844Z"
                    stroke="#63676C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <select name="category" id="" value={ category } onChange={ (e) => { setCategory(e.target.value); } }>
                  <option value="">Tanlang</option>
                  {
                    categories.map((value, index) => <option value={value.id} key={index}>{value.title}</option>)
                  }
                </select>
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row textarea h400">
              <label htmlFor="meta-name">Kontent</label>
              <div className="inputs">
                <textarea name="" value={ description } onChange={ (e) => { setDescription(e.target.value); } } id="" placeholder="Kontent"></textarea>
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <button type="submit">
              Qo'shish{" "}
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.667 13V11.6667C10.667 10.9594 10.386 10.2811 9.88594 9.78105C9.38585 9.28095 8.70757 9 8.00033 9H3.33366C2.62641 9 1.94814 9.28095 1.44804 9.78105C0.947944 10.2811 0.666992 10.9594 0.666992 11.6667V13M13.3337 4.33333V8.33333M15.3337 6.33333H11.3337M8.33366 3.66667C8.33366 5.13943 7.13975 6.33333 5.66699 6.33333C4.19423 6.33333 3.00033 5.13943 3.00033 3.66667C3.00033 2.19391 4.19423 1 5.66699 1C7.13975 1 8.33366 2.19391 8.33366 3.66667Z"
                  stroke="#E7F4F1"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNews;
