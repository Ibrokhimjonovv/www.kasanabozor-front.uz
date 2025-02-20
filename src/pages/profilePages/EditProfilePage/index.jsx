import React, { useState, useContext, useEffect } from "react";

import "./index.scss";

import { UserContext } from "../../../context/user";
import { useTranslation } from "react-i18next";

// import regionsJson from "https://raw.githubusercontent.com/MIMAXUZ/uzbekistan-regions-data/master/JSON/regions.json";
// import districtsJson from "https://raw.githubusercontent.com/MIMAXUZ/uzbekistan-regions-data/master/JSON/districts.json";

const formatPhone = ({ phone }) => {
  phone = phone.toString();
  return `+998 (${phone[0] + phone[1]}) ${phone[2] + phone[3] + phone[4]}-${
    phone[5] + phone[6]
  }-${phone[7] + phone[8]}`;
};

const EditProfilePage = () => {
  const { t } = useTranslation();
  const {
    firstName,
    lastName,
    middleName,
    phone,
    email,
    gender,
    birthday,
    region,
    district,
    about,
    biography,
    purposes,
    errors,
  } = useContext(UserContext);

  const [formData, setFormData] = useState({
    first_name: String(firstName),
    middle_name: String(middleName),
    last_name: String(lastName),
    birthday: String(birthday),
    gender: String(gender),
    email: String(email),
    region: String(region),
    district: String(district),
    about: String(about || ""),
    biography: String(biography || ""),
    purposes: String(purposes),
  });

  useEffect(() => {
    setFormData({
      first_name: String(firstName),
      middle_name: String(middleName),
      last_name: String(lastName),
      birthday: String(birthday),
      gender: String(gender),
      email: String(email),
      region: String(region),
      district: String(district),
      about: String(about || ""),
      biography: String(biography || ""),
      purposes: String(purposes),
    });
  }, [
    firstName,
    lastName,
    middleName,
    birthday,
    gender,
    email,
    region,
    district,
    about,
    biography,
    purposes,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="right">
        <div className="page-title">
          <h2>Profilni tahrirlash</h2>
        </div>
        <div className="form-list">
          <form action="" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="input-cell">
                <label className="input-label" htmlFor="first_name">
                  {t("First name")}
                </label>
                <input
                  className="input-area"
                  type="text"
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      first_name: e.target.value,
                    }))
                  }
                />
                <p className="error">{errors.first_name}</p>
              </div>
              <div className="input-cell">
                <label className="input-label" htmlFor="last_name">
                  {t("Last name")}
                </label>
                <input
                  className="input-area"
                  type="text"
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      last_name: e.target.value,
                    }))
                  }
                />
                <p className="error">{errors.last_name}</p>
              </div>
              <div className="input-cell">
                <label className="input-label" htmlFor="middle_name">
                  {t("Middle name")}
                </label>
                <input
                  className="input-area"
                  type="text"
                  id="middle_name"
                  value={formData.middle_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      middle_name: e.target.value,
                    }))
                  }
                />
                <p className="error">{errors.middle_name}</p>
              </div>
              <div className="input-cell">
                <label className="input-label" htmlFor="birthday">
                  {t("Birthday")}
                </label>
                <input
                  className="input-area"
                  type="date"
                  id="birthday"
                  value={formData.birthday}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      birthday: e.target.value,
                    }))
                  }
                />
                <p className="error">{errors.birthday}</p>
              </div>
              <div className="input-cell">
                <label className="input-label" htmlFor="phone">
                  {t("Phone number")}
                </label>
                <input
                  className="input-area"
                  type="text"
                  id="phone"
                  value={formatPhone({ phone: phone.toString() })}
                  disabled={true}
                />
                <p className="error">{errors.email}</p>
              </div>
              <div className="input-cell">
                <label className="input-label" htmlFor="email">
                  {t("Email")}
                </label>
                <input
                  className="input-area"
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
                <p className="error">{errors.email}</p>
              </div>
              <div className="input-cell">
                <label className="input-label" htmlFor="gender">
                  {t("Gender")}
                </label>
                <select
                  className="input-area"
                  id="gender"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <option value="0">Erkak</option>
                  <option value="1">Ayol</option>
                </select>
                <p className="error">{errors.gender}</p>
              </div>
              <div className="input-cell">
                <label className="input-label" htmlFor="purposes">
                  {t("Purposes")}
                </label>
                <input
                  className="input-area"
                  type="text"
                  id="purposes"
                  value={formData.purposes}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      purposes: e.target.value,
                    }))
                  }
                />
                <p className="error">{errors.purposes}</p>
              </div>
              <div className="input-cell">
                <label className="input-label" htmlFor="region">
                  {t("Region")}
                </label>
                <input
                  className="input-area"
                  type="text"
                  id="region"
                  value={formData.region}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, region: e.target.value }))
                  }
                />
                <p className="error">{errors.region}</p>
              </div>
              <div className="input-cell">
                <label className="input-label" htmlFor="district">
                  {t("District")}
                </label>
                <input
                  className="input-area"
                  type="text"
                  id="district"
                  value={formData.district}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      district: e.target.value,
                    }))
                  }
                />
                <p className="error">{errors.biography}</p>
              </div>
              <div className="input-cell">
                <label className="input-label" htmlFor="about">
                  {t("About me")}
                </label>
                <textarea
                  rows={5}
                  className="input-area"
                  type="text"
                  id="about"
                  value={formData.about}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      about: e.target.value,
                    }))
                  }
                ></textarea>
                <p className="error">{errors.biography}</p>
              </div>
              <div className="input-cell">
                <label className="input-label" htmlFor="biography">
                  {t("Biography")}
                </label>
                <textarea
                  rows={5}
                  className="input-area"
                  type="text"
                  id="biography"
                  value={formData.biography}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      biography: e.target.value,
                    }))
                  }
                ></textarea>
                <p className="error">{errors.biography}</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;
