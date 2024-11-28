import React from "react";
import "./Documents.scss";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const Documents = () => {
  const { ref: ref1, inView: inView1 } = useInView({
      threshold: 0.1,
      triggerOnce: true,
  });
  const { ref: ref2, inView: inView2 } = useInView({
      threshold: 0.1,
      triggerOnce: true,
  });
  const { ref: ref3, inView: inView3 } = useInView({
      threshold: 0.1,
      triggerOnce: true,
  });
  const { ref: ref4, inView: inView4 } = useInView({
      threshold: 0.1,
      triggerOnce: true,
  });
  return (
    <div id="documents">
      <div className="left-side">
        <div className="title-link">
          <div>
            <h2>Qonunchilik hujjatlari</h2>
            <p>Kasanachilik sohasidagi qonunchilik hujjatlari</p>
          </div>
          <Link to="#">Ko'proq ko'rish</Link>
        </div>

        <div id="top" ref={ref1} className={`container ${inView1 ? "visible" : ""}`}>
          <p>
            Kasanachilikni yanada rivojlantirishga oid qo‘shimcha
            chora-tadbirlar to‘g‘risida
          </p>
          <p>Kasanachilikni rivojlantirish, bu sohada yangi </p>
          <div className="links">
            <Link to="#">
            <svg 
              class="hover-effect" 
              width="16" 
              height="17" 
              viewBox="0 0 16 17" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg">
            <path 
                d="M14 10.5V13.1667C14 13.5203 13.8595 13.8594 13.6095 14.1095C13.3594 14.3595 13.0203 14.5 12.6667 14.5H3.33333C2.97971 14.5 2.64057 14.3595 2.39052 14.1095C2.14048 13.8594 2 13.5203 2 13.1667V10.5M4.66667 7.16667L8 10.5M8 10.5L11.3333 7.16667M8 10.5V2.5" 
                stroke="#41A58D" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
          </svg>
              Yukab olish
            </Link>
            <Link to="#">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.666992 8.49996C0.666992 8.49996 3.33366 3.16663 8.00033 3.16663C12.667 3.16663 15.3337 8.49996 15.3337 8.49996C15.3337 8.49996 12.667 13.8333 8.00033 13.8333C3.33366 13.8333 0.666992 8.49996 0.666992 8.49996Z"
                  stroke="#0678FA"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.00033 10.5C9.10489 10.5 10.0003 9.60453 10.0003 8.49996C10.0003 7.39539 9.10489 6.49996 8.00033 6.49996C6.89576 6.49996 6.00033 7.39539 6.00033 8.49996C6.00033 9.60453 6.89576 10.5 8.00033 10.5Z"
                  stroke="#0678FA"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Lex.uz
            </Link>
          </div>
        </div>

        <div ref={ref2} className={`container ${inView2 ? "visible" : ""}`}>
          <p>
            Kasanachilikni rivojlantirishning hududiy va tarmoq dasturlarini shakllantirish, ularning bajarilishi monitoringini olib borish hamda kasanachilik ish o‘rinlarini hisobga olish tartibi to‘g‘risida NIZOM
          </p>
          <p>Kasanachilikni rivojlantirish, bu sohada yangi </p>
          <div className="links">
            <Link to="#">
              <svg 
                class="hover-effect" 
                width="16" 
                height="17" 
                viewBox="0 0 16 17" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path 
                    d="M14 10.5V13.1667C14 13.5203 13.8595 13.8594 13.6095 14.1095C13.3594 14.3595 13.0203 14.5 12.6667 14.5H3.33333C2.97971 14.5 2.64057 14.3595 2.39052 14.1095C2.14048 13.8594 2 13.5203 2 13.1667V10.5M4.66667 7.16667L8 10.5M8 10.5L11.3333 7.16667M8 10.5V2.5" 
                    stroke="#41A58D" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"/>
              </svg>
              Yukab olish
            </Link>
            <Link to="#">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.666992 8.49996C0.666992 8.49996 3.33366 3.16663 8.00033 3.16663C12.667 3.16663 15.3337 8.49996 15.3337 8.49996C15.3337 8.49996 12.667 13.8333 8.00033 13.8333C3.33366 13.8333 0.666992 8.49996 0.666992 8.49996Z"
                  stroke="#0678FA"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.00033 10.5C9.10489 10.5 10.0003 9.60453 10.0003 8.49996C10.0003 7.39539 9.10489 6.49996 8.00033 6.49996C6.89576 6.49996 6.00033 7.39539 6.00033 8.49996C6.00033 9.60453 6.89576 10.5 8.00033 10.5Z"
                  stroke="#0678FA"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Lex.uz
            </Link>
          </div>
        </div>
      </div>

      <div className="right-side" >
        <div className="title-link">
          <div>
            <h2>Kichik biznes loyihalar</h2>
            <p>Turli darajadagi kichik biznes loyihalar</p>
          </div>
          <Link to="#">Ko'proq ko'rish</Link>
        </div>

        <div id="top" ref={ref3} className={`container ${inView3 ? "visible" : ""}`}>
          <p>
          Pillachilikni togri yolga qoyish va daromadni ikki barobarga oshirish boyicha biznes loyiha
          </p>
          <p>Kasanachilikni rivojlantirish, bu sohada yangi </p>
          <div className="links">
            <Link to="#">
            <svg 
              class="hover-effect" 
              width="16" 
              height="17" 
              viewBox="0 0 16 17" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg">
            <path 
                d="M14 10.5V13.1667C14 13.5203 13.8595 13.8594 13.6095 14.1095C13.3594 14.3595 13.0203 14.5 12.6667 14.5H3.33333C2.97971 14.5 2.64057 14.3595 2.39052 14.1095C2.14048 13.8594 2 13.5203 2 13.1667V10.5M4.66667 7.16667L8 10.5M8 10.5L11.3333 7.16667M8 10.5V2.5" 
                stroke="#41A58D" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
          </svg>
              Yukab olish
            </Link>
            <Link to="#">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.666992 8.49996C0.666992 8.49996 3.33366 3.16663 8.00033 3.16663C12.667 3.16663 15.3337 8.49996 15.3337 8.49996C15.3337 8.49996 12.667 13.8333 8.00033 13.8333C3.33366 13.8333 0.666992 8.49996 0.666992 8.49996Z"
                  stroke="#0678FA"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.00033 10.5C9.10489 10.5 10.0003 9.60453 10.0003 8.49996C10.0003 7.39539 9.10489 6.49996 8.00033 6.49996C6.89576 6.49996 6.00033 7.39539 6.00033 8.49996C6.00033 9.60453 6.89576 10.5 8.00033 10.5Z"
                  stroke="#0678FA"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Lex.uz
            </Link>
          </div>
        </div>

        <div ref={ref4} className={`container ${inView4 ? "visible" : ""}`}>
          <p>
            Baliqchilikni togri yolga qoyish va daromadni ikki barobarga oshirish boyicha biznes loyiha
          </p>
          <p>Kasanachilikni rivojlantirish, bu sohada yangi </p>
          <div className="links">
            <Link to="#">
              <svg 
                class="hover-effect" 
                width="16" 
                height="17" 
                viewBox="0 0 16 17" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path 
                    d="M14 10.5V13.1667C14 13.5203 13.8595 13.8594 13.6095 14.1095C13.3594 14.3595 13.0203 14.5 12.6667 14.5H3.33333C2.97971 14.5 2.64057 14.3595 2.39052 14.1095C2.14048 13.8594 2 13.5203 2 13.1667V10.5M4.66667 7.16667L8 10.5M8 10.5L11.3333 7.16667M8 10.5V2.5" 
                    stroke="#41A58D" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"/>
              </svg>
              Yukab olish
            </Link>
            <Link to="#">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.666992 8.49996C0.666992 8.49996 3.33366 3.16663 8.00033 3.16663C12.667 3.16663 15.3337 8.49996 15.3337 8.49996C15.3337 8.49996 12.667 13.8333 8.00033 13.8333C3.33366 13.8333 0.666992 8.49996 0.666992 8.49996Z"
                  stroke="#0678FA"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.00033 10.5C9.10489 10.5 10.0003 9.60453 10.0003 8.49996C10.0003 7.39539 9.10489 6.49996 8.00033 6.49996C6.89576 6.49996 6.00033 7.39539 6.00033 8.49996C6.00033 9.60453 6.89576 10.5 8.00033 10.5Z"
                  stroke="#0678FA"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Lex.uz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
