import "./index.scss";

import { AddUserIcon, NameIcon } from "../../../../components/icons/admin";
import { useState } from "react";

const CreateUserPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="container">
        <div className="container-top">
          <h3 className="title">Foydalanuvchi yaratish</h3>
        </div>

        <div className="model-form bg-white w-full rounded-xl">
          <div className="model-form-body p-8">
            <form onSubmit={handleSubmit} autoComplete="off" autoSave="off">
              <div className="model-form-grid grid grid-cols-6 gap-4 gap-y-2">
                <div className="input-group col-span-2">
                  <label
                    htmlFor="first_name"
                    className="form-label flex text-slate-950 mb-1 font-medium"
                  >
                    Ism
                  </label>
                  <div className="icon-input relative">
                    <span className="input-icon absolute flex items-center justify-center left-0 top-0 h-7 w-7">
                      <NameIcon color="#B2B2B2" />
                    </span>
                    <input
                      type="text"
                      className="form-input flex w-full text-slate-950 placeholder-placeholder h-7 px-3 pl-7 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300"
                      id="first_name"
                      placeholder="Ism"
                    />
                  </div>
                </div>
                <div className="input-group col-span-2">
                  <label
                    htmlFor="last_name"
                    className="form-label flex text-slate-950 mb-1 font-medium"
                  >
                    Familiya
                  </label>
                  <div className="icon-input relative">
                    <span className="input-icon absolute flex items-center justify-center left-0 top-0 h-7 w-7">
                      <NameIcon color="#B2B2B2" />
                    </span>
                    <input
                      type="text"
                      className="form-input flex w-full text-slate-950 placeholder-placeholder h-7 px-3 pl-7 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300"
                      id="last_name"
                      placeholder="Familiya"
                    />
                  </div>
                </div>
                <div className="input-group col-span-2">
                  <label
                    htmlFor="birthday"
                    className="form-label flex text-slate-950 mb-1 font-medium"
                  >
                    Tug&apos;ilgan kun
                  </label>
                  <div className="icon-input relative">
                    <span className="input-icon absolute flex items-center justify-center left-0 top-0 h-7 w-7">
                      <NameIcon color="#B2B2B2" />
                    </span>
                    <input
                      type="text"
                      className="form-input flex w-full text-slate-950 placeholder-placeholder h-7 px-3 pl-7 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300"
                      id="birthday"
                      placeholder="Tug'ilgan kun"
                    />
                  </div>
                </div>
                <div className="input-group col-span-3">
                  <label
                    htmlFor="middle_name"
                    className="form-label flex text-slate-950 mb-1 font-medium"
                  >
                    Sharif
                  </label>
                  <div className="icon-input relative">
                    <span className="input-icon absolute flex items-center justify-center left-0 top-0 h-7 w-7">
                      <NameIcon color="#B2B2B2" />
                    </span>
                    <input
                      type="text"
                      className="form-input flex w-full text-slate-950 placeholder-placeholder h-7 px-3 pl-7 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300"
                      id="middle_name"
                      placeholder="Sharif"
                    />
                  </div>
                </div>
                <div className="input-group col-span-3">
                  <label
                    htmlFor="profile"
                    className="form-label flex text-slate-950 mb-1 font-medium"
                  >
                    Avatar (Rasm)
                  </label>
                  <div className="icon-input relative">
                    <span className="input-icon absolute flex items-center justify-center left-0 top-0 h-7 w-7">
                      <NameIcon color="#B2B2B2" />
                    </span>
                    <input
                      type="file"
                      className="form-input flex h-7 w-full rounded-md border border-border bg-background px-3 py-2 pl-7 text-sm transition-colors file:hidden placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      id="profile"
                      accept="image/jpg,image/png,image/webp"
                      placeholder="user.name@doma.in"
                    />
                  </div>
                </div>
                <div className="input-group col-span-2">
                  <label
                    htmlFor="phone"
                    className="form-label flex text-slate-950 mb-1 font-medium"
                  >
                    Telefon raqam
                  </label>
                  <div className="icon-input relative">
                    <span className="input-icon absolute flex items-center justify-center left-0 top-0 h-7 w-7">
                      <NameIcon color="#B2B2B2" />
                    </span>
                    <input
                      type="text"
                      className="form-input flex w-full text-slate-950 placeholder-placeholder h-7 px-3 pl-7 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300"
                      id="phone"
                      placeholder="+998 (##) ###-##-##"
                    />
                  </div>
                </div>
                <div className="input-group col-span-2">
                  <label
                    htmlFor="email"
                    className="form-label flex text-slate-950 mb-1 font-medium"
                  >
                    Elektron pochta
                  </label>
                  <div className="icon-input relative">
                    <span className="input-icon absolute flex items-center justify-center left-0 top-0 h-7 w-7">
                      <NameIcon color="#B2B2B2" />
                    </span>
                    <input
                      type="email"
                      className="form-input flex w-full text-slate-950 placeholder-placeholder h-7 px-3 pl-7 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300"
                      id="email"
                      placeholder="user.name@doma.in"
                    />
                  </div>
                </div>
                <div className="input-group col-span-2">
                  <label
                    htmlFor="password"
                    className="form-label flex text-slate-950 mb-1 font-medium"
                  >
                    Parol
                  </label>
                  <div className="icon-input relative">
                    <span className="input-icon absolute flex items-center justify-center left-0 top-0 h-7 w-7">
                      <NameIcon color="#B2B2B2" />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-input flex w-full text-slate-950 placeholder-placeholder h-7 px-3 pl-7 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300"
                      id="password"
                      placeholder="Kuchliroq parol"
                    />
                    <span
                      className="input-type-change absolute flex right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? "Berkitish" : "Ko'rsatish"}
                    </span>
                  </div>
                </div>
                <div className="input-group col-span-2">
                  <label
                    htmlFor="gender"
                    className="form-label flex text-slate-950 mb-1 font-medium"
                  >
                    Jinsi
                  </label>
                  <div className="icon-input relative">
                    <span className="input-icon absolute flex items-center justify-center left-0 top-0 h-7 w-7">
                      <NameIcon color="#B2B2B2" />
                    </span>
                    <select
                      id="gender"
                      className="form-input flex w-full text-slate-950 placeholder-placeholder h-7 px-3 pl-7 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300"
                    >
                      <option value="0">Erkak</option>
                      <option value="1">Ayol</option>
                    </select>
                  </div>
                </div>
                <div className="input-group col-span-2">
                  <label
                    htmlFor="role"
                    className="form-label flex text-slate-950 mb-1 font-medium"
                  >
                    Ro&apos;li
                  </label>
                  <div className="icon-input relative">
                    <span className="input-icon absolute flex items-center justify-center left-0 top-0 h-7 w-7">
                      <NameIcon color="#B2B2B2" />
                    </span>
                    <select
                      id="role"
                      className="form-input flex w-full text-slate-950 placeholder-placeholder h-7 px-3 pl-7 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300"
                    >
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                      <option value="user" selected>
                        Kasanachi
                      </option>
                    </select>
                  </div>
                </div>
                <div className="input-group col-span-2">
                  <label
                    htmlFor="active"
                    className="form-label flex text-slate-950 mb-1 font-medium"
                  >
                    Holati
                  </label>
                  <div className="icon-input relative">
                    <span className="input-icon absolute flex items-center justify-center left-0 top-0 h-7 w-7">
                      <NameIcon color="#B2B2B2" />
                    </span>
                    <select
                      id="active"
                      className="form-input flex w-full text-slate-950 placeholder-placeholder h-7 px-3 pl-7 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300"
                    >
                      <option value="active">Aktiv</option>
                      <option value="inactive">Aktiv emas</option>
                      <option value="unverified">Tasdiqlanmagan</option>
                      <option value="banned">Taqiqlangan</option>
                    </select>
                  </div>
                </div>
                <div className="input-group col-span-2">
                  <label
                    htmlFor="region"
                    className="form-label flex text-slate-950 mb-1 font-medium"
                  >
                    Viloyati
                  </label>
                  <div className="icon-input relative">
                    <span className="input-icon absolute flex items-center justify-center left-0 top-0 h-7 w-7">
                      <NameIcon color="#B2B2B2" />
                    </span>
                    <select
                      id="region"
                      className="form-input flex w-full text-slate-950 placeholder-placeholder h-7 px-3 pl-7 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300"
                    >
                      <option value="loading" selected disabled>
                        Yuklanmoqda...
                      </option>
                    </select>
                  </div>
                </div>
                <div className="input-group col-span-2">
                  <label
                    htmlFor="district"
                    className="form-label flex text-slate-950 mb-1 font-medium"
                  >
                    Tuman
                  </label>
                  <div className="icon-input relative">
                    <span className="input-icon absolute flex items-center justify-center left-0 top-0 h-7 w-7">
                      <NameIcon color="#B2B2B2" />
                    </span>
                    <select
                      id="district"
                      className="form-input flex w-full text-slate-950 placeholder-placeholder h-7 px-3 pl-7 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300"
                    >
                      <option value="loading" selected disabled>
                        Yuklanmoqda...
                      </option>
                    </select>
                  </div>
                </div>
                <div className="input-group col-span-2">
                  <label
                    htmlFor="activity"
                    className="form-label flex text-slate-950 mb-1 font-medium"
                  >
                    Faoliyati
                  </label>
                  <div className="icon-input relative">
                    <span className="input-icon absolute flex items-center justify-center left-0 top-0 h-7 w-7">
                      <NameIcon color="#B2B2B2" />
                    </span>
                    <select
                      id="activity"
                      className="form-input flex w-full text-slate-950 placeholder-placeholder h-7 px-3 pl-7 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300"
                    >
                      <option value="developer" disabled>
                        Developer
                      </option>
                      <option value="moderator">Sotuvchilik</option>
                      <option value="user" selected>
                        Xizmat ko'rsatish
                      </option>
                    </select>
                  </div>
                </div>

                <div className="about col-span-3">
                  <label
                    htmlFor="about"
                    className="form-label flex text-slate-950 mb-1 font-medium"
                  >
                    Men haqimda
                  </label>
                  <textarea
                    id="about"
                    rows={4}
                    className="form-input flex w-full text-slate-950 placeholder-placeholder py-2 px-3 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300"
                    placeholder="Text"
                  ></textarea>
                </div>
                <div className="about col-span-3">
                  <label
                    htmlFor="biography"
                    className="form-label flex text-slate-950 mb-1 font-medium"
                  >
                    Biografiya
                  </label>
                  <textarea
                    id="biography"
                    rows={4}
                    className="form-input flex w-full text-slate-950 placeholder-placeholder py-2 px-3 border-1 border-border bg-background outline-none rounded-md focus:border-brand transition-all duration-300"
                    placeholder="Text"
                  ></textarea>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end w-full">
                <button className="bg-brand flex items-center justify-center gap-2 px-5 h-7 text-white rounded-md cursor-pointer">
                  <span>Qo'shish</span>
                  <span>
                    <AddUserIcon color="white" />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUserPage;
