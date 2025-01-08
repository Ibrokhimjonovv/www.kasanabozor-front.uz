import React, { useContext, useEffect, useState } from "react";
import "./newsDetail.scss";
import { useParams, Link } from "react-router-dom";
import { MyContext } from "../../context/myContext";
import heroImg from "./heroImg.jpg";
import authorImg from "./authorImg.png";
import q from "./“.png";
import AddComments from "../../components/addComments/addComments";
import NewsInnerRight from "../../components/newsInnerRight/newsInnerRight";
import posterImg2 from "./posterImg2.png";
import Weather from "../../components/weather/weather";
import Loading from "../../components/loading/loading";
const NewsDetail = () => {
  const { newsList } = useContext(MyContext);
  const { category, id } = useParams();
  const [newsItem, setNewsItem] = useState(null);

  function formatCategory(category) {
    if (!category) return "";
    const formattedCategory = category
      .replace(/-/g, " ") 
      .split(" ");
    formattedCategory[0] =
      formattedCategory[0][0].toUpperCase() + formattedCategory[0].slice(1); // Birinchi harfni katta qilish
    return formattedCategory.join(" ");
  }

  useEffect(() => {
    // ID ga mos yangilikni topish
    const selectedNews = newsList.find((item) => item.id === Number(id));
    setNewsItem(selectedNews); // Tanlangan yangilikni saqlash
  }, [id]); // id o'zgarganda qayta chaqiriladi

  const similliarNews = newsList.filter(
    (news) => formatCategory(news.category) === formatCategory(category)
  );

  if (!newsItem) return <div><Loading /></div>; // Agar ma'lumot hali kelmasa

  return (
    <div id="newsInnerDetail">
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
          <Link to="/news">Yangiliklar</Link>
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
          <Link to={`/news/${category}`}>{formatCategory(category)}</Link>
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
          <span>{newsItem.title}</span>
        </div>
      </div>
      <div className="new-details">
        <div className="left-side">
          <div className="left-top-side">
            <div className="hero-new">
              <div className="hero-img">
                <img src={heroImg} alt="" />
              </div>
              <div className="hero-new-details">
                <ul>
                  <li>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.6667 1.33334V4.00001M5.33333 1.33334V4.00001M2 6.66668H14M3.33333 2.66668H12.6667C13.403 2.66668 14 3.26363 14 4.00001V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V4.00001C2 3.26363 2.59695 2.66668 3.33333 2.66668Z"
                        stroke="#757575"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>{newsItem.postedDate}</span>
                  </li>
                  <li>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.6654 12.6667C14.6654 13.0203 14.5249 13.3594 14.2748 13.6095C14.0248 13.8595 13.6857 14 13.332 14H2.66536C2.31174 14 1.9726 13.8595 1.72256 13.6095C1.47251 13.3594 1.33203 13.0203 1.33203 12.6667V3.33333C1.33203 2.97971 1.47251 2.64057 1.72256 2.39052C1.9726 2.14048 2.31174 2 2.66536 2H5.9987L7.33203 4H13.332C13.6857 4 14.0248 4.14048 14.2748 4.39052C14.5249 4.64057 14.6654 4.97971 14.6654 5.33333V12.6667Z"
                        stroke="#757575"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>{formatCategory(category)}</span>
                  </li>
                  <li>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_235_9507)">
                        <path
                          d="M0.667969 7.99999C0.667969 7.99999 3.33464 2.66666 8.0013 2.66666C12.668 2.66666 15.3346 7.99999 15.3346 7.99999C15.3346 7.99999 12.668 13.3333 8.0013 13.3333C3.33464 13.3333 0.667969 7.99999 0.667969 7.99999Z"
                          stroke="#757575"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.0013 9.99999C9.10587 9.99999 10.0013 9.10456 10.0013 7.99999C10.0013 6.89542 9.10587 5.99999 8.0013 5.99999C6.89673 5.99999 6.0013 6.89542 6.0013 7.99999C6.0013 9.10456 6.89673 9.99999 8.0013 9.99999Z"
                          stroke="#757575"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_235_9507">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    123 456
                  </li>
                  <li>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.72667 9.00668L10.28 11.66M10.2733 4.34001L5.72667 6.99334M14 3.33334C14 4.43791 13.1046 5.33334 12 5.33334C10.8954 5.33334 10 4.43791 10 3.33334C10 2.22877 10.8954 1.33334 12 1.33334C13.1046 1.33334 14 2.22877 14 3.33334ZM6 8.00001C6 9.10458 5.10457 10 4 10C2.89543 10 2 9.10458 2 8.00001C2 6.89544 2.89543 6.00001 4 6.00001C5.10457 6.00001 6 6.89544 6 8.00001ZM14 12.6667C14 13.7712 13.1046 14.6667 12 14.6667C10.8954 14.6667 10 13.7712 10 12.6667C10 11.5621 10.8954 10.6667 12 10.6667C13.1046 10.6667 14 11.5621 14 12.6667Z"
                        stroke="#757575"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    32
                  </li>
                </ul>
                <div className="author">
                  <img src={newsItem.authorImg} alt="" />
                  <span>{newsItem.authorName}</span>
                </div>
              </div>
            </div>
            <div className="about-hero">
              <h1 className="hero-title title">
                Kutmang. Bizning hayotimizning maqsadi baxtli bo'lishdir!
              </h1>
              <p className="simpleText">
                Kelib yetganingizda, xonada tabiiy yog'ochni tozalash uchun
                ishlatiladigan limon balzamining yoqimli hididan zavqlanasiz, bu
                esa muhitni tinchlantiruvchi atmosferaga aylantiradi. Mening
                butun ruhimni ajoyib tinchlik egallab oldi, bahorning shirin
                tonglari kabi, men buni butun qalbim bilan bahramand bo'laman.
                Men yolg'izman va bu joyda mavjudlikning jozibasini his qilaman,
                bu joy mening kabi ruhlar uchun baxt uchun yaratilgan. Men juda
                baxtliman, aziz do'stim, noziklikka to'la.
              </p>
              <div className="other-text">
                <img src={q} alt="" />
                <h2>
                  O‘zini o‘zi band qilgan shaxslar, o‘z maqsadlariga erishish
                  uchun turli xil faoliyatlar
                </h2>
                <p>
                  Hayajoningizni qondirishga tayyor bo'lganda, kurortning suv
                  sportlari markazida mavjud bo'lgan suv sportlari
                  imkoniyatlarini ko'rib chiqing. Stressingizni suvda
                  qoldirmoqchimisiz? Kurortda kayaklar, paddleboardlar yoki
                  tinch pedal qayiqchalari mavjud.
                </p>
              </div>
              <h1 className="title">
                Qancha vaqt emas, balki qanday yashaganingiz asosiy narsadir.
              </h1>
              <p className="simpleText">
                Hayajoningizni qondirishga tayyor bo'lganda, kurortning suv
                sportlari markazida mavjud bo'lgan suv sportlari imkoniyatlarini
                ko'rib chiqing. Stressingizni suvda qoldirmoqchimisiz? Kurortda
                kayaklar, paddleboardlar yoki tinch pedal qayiqchalari mavjud.
                Shuningdek, siz doimiy o'zgarib turadigan dengiz osti muhitini
                tajribadan o'tkazishingiz uchun snorkel uskunalari ham mavjud.
                Yotoqxonalarga tashrif buyuruvchilar, tashrif buyurayotgan
                joylari haqida noyob nuqtai nazar olish bilan birga, boshqa
                mehmonxona sharoitlarida mavjud bo'lmagan maxsus paketlar uchun
                variantlarga ega. Yotoqxonalarning mahalliy bizneslar bilan
                hamkorlik qilishlari oson, bu esa yaxshi tashkil etilgan va
                shaxsiylashtirilgan ta'til tajribasini ta'minlaydi. Fife va Drum
                Inn tarixiy Uchburchak Paketini taklif etadi, bu esa Inn'da uch
                kecha, nonushtalar va tarixiy Williamsburg, Jamestown va
                Yorktown'ga kirish huquqini o'z ichiga oladi. Yotoqxonalarda
                romantikaga ham mos keladi. Yotoqxonaning jozibasining bir qismi
                - bu noyoblik; san'at, bezak va ovqat birlashtirilgan holda
                to'liq tajribani yaratadi. Masalan, Fife va Drum mehmon
                xonalarida hududning kolonial tuyg'usini saqlab qoladi. Maxsus
                xususiyatlar orasida antik mebellar, ba'zi mehmon xonalarida
                zamonaviy to'rt ustunli yotoqlar, shuningdek, mehmonlar uchun
                tarixiy hududning tiklanish davridan qolgan xalq san'ati va
                artefaktlar mavjud.
              </p>
              <div className="other-text">
                <img src={q} alt="" />
                <h2>
                  O‘zini o‘zi band qilgan shaxslar, o‘z maqsadlariga erishish
                  uchun turli xil faoliyatlar
                </h2>
                <p>
                  Hayajoningizni qondirishga tayyor bo'lganda, kurortning suv
                  sportlari markazida mavjud bo'lgan suv sportlari
                  imkoniyatlarini ko'rib chiqing. Stressingizni suvda
                  qoldirmoqchimisiz? Kurortda kayaklar, paddleboardlar yoki
                  tinch pedal qayiqchalari mavjud.
                </p>
              </div>
              <h1 className="title">
                Qancha vaqt emas, balki qanday yashaganingiz asosiy narsadir.
              </h1>
              <p className="simpleText">
                Hayajoningizni qondirishga tayyor bo'lganda, kurortning suv
                sportlari markazida mavjud bo'lgan suv sportlari imkoniyatlarini
                ko'rib chiqing. Stressingizni suvda qoldirmoqchimisiz? Kurortda
                kayaklar, paddleboardlar yoki tinch pedal qayiqchalari mavjud.
                Shuningdek, siz doimiy o'zgarib turadigan dengiz osti muhitini
                tajribadan o'tkazishingiz uchun snorkel uskunalari ham mavjud.
                Yotoqxonalarga tashrif buyuruvchilar, tashrif buyurayotgan
                joylari haqida noyob nuqtai nazar olish bilan birga, boshqa
                mehmonxona sharoitlarida mavjud bo'lmagan maxsus paketlar uchun
                variantlarga ega. Yotoqxonalarning mahalliy bizneslar bilan
                hamkorlik qilishlari oson, bu esa yaxshi tashkil etilgan va
                shaxsiylashtirilgan ta'til tajribasini ta'minlaydi. Fife va Drum
                Inn tarixiy Uchburchak Paketini taklif etadi, bu esa Inn'da uch
                kecha, nonushtalar va tarixiy Williamsburg, Jamestown va
                Yorktown'ga kirish huquqini o'z ichiga oladi. Yotoqxonalarda
                romantikaga ham mos keladi. Yotoqxonaning jozibasining bir qismi
                - bu noyoblik; san'at, bezak va ovqat birlashtirilgan holda
                to'liq tajribani yaratadi. Masalan, Fife va Drum mehmon
                xonalarida hududning kolonial tuyg'usini saqlab qoladi. Maxsus
                xususiyatlar orasida antik mebellar, ba'zi mehmon xonalarida
                zamonaviy to'rt ustunli yotoqlar, shuningdek, mehmonlar uchun
                tarixiy hududning tiklanish davridan qolgan xalq san'ati va
                artefaktlar mavjud.
              </p>
            </div>

            <div className="hashtags">
              <ul>
                <li>#quroqchilik</li>
                <li>#quroqchilik</li>
                <li>#quroqchilik</li>
                <li>#quroqchilik</li>
              </ul>
            </div>
          </div>
          <AddComments news={newsItem} />
        </div>
        <NewsInnerRight />
      </div>
      <div className="simillar">
        <div className="news-cards">
          {similliarNews.length > 0 ? (
            similliarNews.map((news, index) => (
              <Link
                to={`/news/${similliarNews[0]?.category
                  .replace(/\s+/g, "-")
                  .toLowerCase()}/${news.id}`}
              >
                <div className="news-card">
                  <div className="img-cont">
                    <img src={news.img} alt={news.title} />
                  </div>
                  <div className="time">
                    <span id="date-time">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_355_9883)">
                          <path
                            d="M10.0003 5.00008V10.0001L13.3337 11.6667M18.3337 10.0001C18.3337 14.6025 14.6027 18.3334 10.0003 18.3334C5.39795 18.3334 1.66699 14.6025 1.66699 10.0001C1.66699 5.39771 5.39795 1.66675 10.0003 1.66675C14.6027 1.66675 18.3337 5.39771 18.3337 10.0001Z"
                            stroke="#41A58D"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_355_9883">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      {news.date}
                    </span>
                    <span id="views-count">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.833008 9.99992C0.833008 9.99992 4.16634 3.33325 9.99967 3.33325C15.833 3.33325 19.1663 9.99992 19.1663 9.99992C19.1663 9.99992 15.833 16.6666 9.99967 16.6666C4.16634 16.6666 0.833008 9.99992 0.833008 9.99992Z"
                          stroke="#41A58D"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.99967 12.4999C11.3804 12.4999 12.4997 11.3806 12.4997 9.99992C12.4997 8.61921 11.3804 7.49992 9.99967 7.49992C8.61896 7.49992 7.49967 8.61921 7.49967 9.99992C7.49967 11.3806 8.61896 12.4999 9.99967 12.4999Z"
                          stroke="#41A58D"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {news.views}
                    </span>
                  </div>
                  <div className="news-title">{news.title}</div>
                  <div className="news-description">{news.description}</div>
                  <div className="type">{news.type}</div>
                </div>
              </Link>
            ))
          ) : (
            <p>O'xshash yangiliklar mavjud emas</p>
          )}
        </div>
      </div>
      <div className="forBackgroundColor">
        <div className="poster">
          <div className="left-side">
            <div className="bigText">
              <p>Ipakchilikdagi muvaffaqiyatli tajriba</p>
              <div className="name">
                <div className="peopleName">Mubina Ismatjonova</div>
                <div className="work">Kasanachi, ipakchi</div>
              </div>
            </div>
            <div className="smallText">
              Ipakchilikdagi muvaffaqiyatli tajriba, bu sohada amalga oshirilgan
              innovatsion yondashuvlar va zamonaviy texnologiyalar yordamida
              erishilgan natijalar haqida.
            </div>
          </div>
          <div className="right-side">
            <div className="shape"></div>
            <img src={posterImg2} alt="" />
          </div>
        </div>
      </div>
      <Weather />
      <br />
    </div>
  );
};

export default NewsDetail;
