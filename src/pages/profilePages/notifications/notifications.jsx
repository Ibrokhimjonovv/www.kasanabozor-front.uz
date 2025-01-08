import React, { useState } from "react";
import ProfileSideBar from "../../../components/profileSideBar/profileSideBar";
import { Link } from "react-router-dom";
import "./notifications.scss";

const AccordionItem = ({ title, description, date }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const shortDescription = description.split(" ").slice(0, 5).join(" ") + "...";

  return (
    <div className={`accordion-item ${isOpen ? "active" : ""}`}>
      <div className="accordion-header ">
        <h3>{title}</h3>
      </div>
      <div className={`accordion-content`}>
        {!isOpen && <p>{shortDescription}</p>}
        {isOpen && <p>{description}</p>}
      </div>
      <div className="accordion-bottom">
        <p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6667 1.33331V3.99998M5.33333 1.33331V3.99998M2 6.66665H14M3.33333 2.66665H12.6667C13.403 2.66665 14 3.2636 14 3.99998V13.3333C14 14.0697 13.403 14.6666 12.6667 14.6666H3.33333C2.59695 14.6666 2 14.0697 2 13.3333V3.99998C2 3.2636 2.59695 2.66665 3.33333 2.66665Z"
              stroke="#767676"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {date}
        </p>
        <button className="toggle-btn" onClick={toggleAccordion}>
          {isOpen ? "Kamroq ↑" : "Ko'proq ↓"}
        </button>
      </div>
    </div>
  );
};

const Notifications = () => {
  const accordionData = [
    {
      title: "Butun o'zbekiston bo'ylab",
      description:
        "Kasanachilikni rivojlantirish, bu sohada yangi imkoniyatlar va innovatsiyalarni kiritish, shuningdek, mahalliy va xalqaro bozorlarda raqobatbardosh mahsulotlar ishlab chiqarishni ta'minlash uchun muhimdir. Bu jarayon, kasanachilarni o'z bilim va ko'nikmalarini oshirishga, zamonaviy texnologiyalarni qo'llashga va yangi strategiyalarni ishlab chiqishga undaydi.",
      date: "03.05.2025",
    },
    {
      title: "Butun o'zbekiston bo'ylab",
      description: "Kasanachilikni rivojlantirish, bu sohada yangi",
      date: "03.05.2025",
    },
    {
      title: "Butun o'zbekiston bo'ylab",
      description: "Kasanachilikni rivojlantirish, bu sohada yangi",
      date: "03.05.2025",
    },
    {
        title: "Butun o'zbekiston bo'ylab",
        description: "Kasanachilikni rivojlantirish, bu sohada yangi",
        date: "03.05.2025",
    },
  ];
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
          <Link to="/profile/prof">Shaxsiy kabinet</Link>
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
          <span>Xabarnomalar</span>
        </div>
      </div>
      <div className="profile-inner notification">
        <div className="left">
          <ProfileSideBar />
        </div>
        <div className="right accordion-cont">
          <div className="accordion-container">
            {accordionData.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                description={item.description}
                date={item.date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
