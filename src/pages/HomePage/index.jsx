import HeroSwiper from "../../components/HeroSwiperComponent/hero-swiper";
import AboutKasana from "../../components/AboutKasanaComponent/AboutKasana";
import KasanaTypes from "../../components/KasanaTypesComponent/KasanaTypes";
import Documents from "../../components/DocumentsComponent";
import Courses from "../../components/CoursesComponent/index";
import History from "../../components/HistoryComponent/History";
import News from "../../components/NewsComponent/index";
import Announcements from "../../components/AnnouncementsComponents";
import LittlePoster from "../../components/LittlePosterComponent/LittlePoster";
import Success from "../../components/SuccessComponent/Success";
import Questions from "../../components/QuestionsComponent/questions";


const HomePage = () => {
  document.title = "Bosh sahifa - Kasana.uz";

  return (
    <div>
      <HeroSwiper />
      <AboutKasana />
      <KasanaTypes />
      <Documents />
      <Courses />
      <History />
      <News />
      <Announcements />
      <LittlePoster />
      <Success />
      <Questions />
    </div>
  );
};

export default HomePage;
