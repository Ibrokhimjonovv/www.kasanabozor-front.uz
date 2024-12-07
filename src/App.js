import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import { MyContextProvider } from './context/myContext';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import OnlineShop from './pages/onlineShop/onlineShop';
import AllCategories from './pages/allCategories/allCategories';
import ProductDetails from './pages/productDetail/productDetails';
import Categories from './pages/productCategories/Categories';
import NewsPage from './pages/newsPage/newsPage';
import NewsCategory from './pages/newsCategory/newsCategory';
import NewsDetail from './pages/newsDetail/newsDetail';
import Documents from './pages/documents/documents';
import PDFViewer from './pages/readPdf/readPdf';
import CoursesPage from './pages/coursesPage/coursesPage';
import AllCourseCategory from './pages/allCourseCategory/allCourseCategory';
import CoursesCategory from './pages/coursesCategory/coursesCategory';
import CourseDetail from './pages/courseDetail/courseDetail';
import AnnouncementsPage from './pages/announcementsPage/announcementsPage';
import AnnounceDetail from './pages/announceDetail/announceDetail';
import Login from './pages/register/login/login';
import Signup from './pages/register/signup/signup';
import Profile from './pages/profile/profile';

function AppContent() {
  const location = useLocation();

  // Headerni ko'rsatmaslik kerak bo'lgan sahifalar
  const noHeaderPaths = ['/login', '/signup'];

  return (
    <div className='app'>
      {/* Agar hozirgi sahifa `noHeaderPaths` ichida bo'lmasa, Headerni ko'rsatamiz */}
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='online-shop' element={<OnlineShop />} />
        <Route path="online-shop/product/:id" element={<ProductDetails />} />
        <Route path="online-shop/categories/:category" element={<Categories />} />
        <Route path="online-shop/all-categories" element={<AllCategories />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/:category" element={<NewsCategory />} />
        <Route path="news/:category/:id" element={<NewsDetail />} />
        <Route path="news/documents/:category" element={<Documents />} />
        <Route path="news/documents/pdf" element={<PDFViewer />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/all-categories/" element={<AllCourseCategory />} />
        <Route path="courses/categories/:category" element={<CoursesCategory />} />
        <Route path="courses/course/:id" element={<CourseDetail />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="announcements/:id" element={<AnnounceDetail />} />
        <Route path="profile" element={<Profile />} />

        {/* Register start */}
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        {/* Register end */}
      </Routes>

      {/* Footerni har doim ko'rsatamiz */}
      {!noHeaderPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  return (
    <MyContextProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </MyContextProvider>
  );
}

export default App;
