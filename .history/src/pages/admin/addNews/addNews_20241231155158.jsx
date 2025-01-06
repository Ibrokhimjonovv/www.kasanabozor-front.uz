import React, { useEffect, useContext, useState } from "react";
import Dashboard from "../dashboard/dashboard";
import { MyContext } from "../../../context/myContext";
import { Link } from "react-router-dom";
import "./addNews.scss";
const AddNews = () => {
  const isOpen = useContext(MyContext);
  const [avaName, setAvaName] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvaName(file.name);
    } else {
      setAvaName("");
    }
  };

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
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Yangilik qo’shish</span>
        </div>
        <div className="form-list">
          <form action="">
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

                <input type="text" placeholder="Sarlavhani kiriting" />
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row">
              <label htmlFor="meta-name">Meta nomi</label>
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

                <input type="text" placeholder="Meta nomi" />
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
              <label htmlFor="meta-name">Meta nomi</label>
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <select name="category" id="">
                  <option value="">Category 1</option>
                  <option value="">Category 2</option>
                  <option value="">Category 3</option>
                </select>
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row textarea">
              <label htmlFor="meta-name">Qisqa yozuv</label>
              <div className="inputs">
                <textarea name="" id="" placeholder="Matn"></textarea>
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row textarea h400">
              <label htmlFor="meta-name">Kontent</label>
              <div className="inputs">
                <textarea name="" id="" placeholder="Kontent"></textarea>
              </div>

              <div className="error-message">To'ldirilishi shart</div>
            </div>
            <div className="input-row w30">
              <label htmlFor="meta-name">
                Holati{" "}
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
                    d="M2.40039 11.9984C2.40039 6.6965 6.69846 2.39844 12.0004 2.39844C17.3023 2.39844 21.6004 6.6965 21.6004 11.9984C21.6004 17.3004 17.3023 21.5984 12.0004 21.5984C6.69846 21.5984 2.40039 17.3004 2.40039 11.9984Z"
                    stroke="#B2B2B2"
                    stroke-width="2"
                  />
                  <path
                    d="M18.0004 12.4984V11.4984C18.0004 8.46087 15.538 5.99844 12.5004 5.99844C12.2242 5.99844 12.0004 6.22229 12.0004 6.49844V17.4984C12.0004 17.7746 12.2242 17.9984 12.5004 17.9984C15.538 17.9984 18.0004 15.536 18.0004 12.4984Z"
                    stroke="#B2B2B2"
                    stroke-width="2"
                  />
                </svg>

                <select name="status" id="">
                  <option value="">Aktiv</option>
                  <option value="">Aktiv emas</option>
                </select>
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
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
