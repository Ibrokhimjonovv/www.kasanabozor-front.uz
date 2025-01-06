import "./App.css";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext, MyContextProvider } from "./context/myContext";

// Import komponentlari
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import OnlineShop from "./pages/onlineShop/onlineShop";
import ProductDetails from "./pages/productDetail/productDetails";
import Categories from "./pages/productCategories/Categories";
import AllCategories from "./pages/allCategories/allCategories";
import NewsPage from "./pages/newsPage/newsPage";
import NewsCategory from "./pages/newsCategory/newsCategory";
import NewsDetail from "./pages/newsDetail/newsDetail";
import Documents from "./pages/documents/documents";
import PDFViewer from "./pages/readPdf/readPdf";
import CoursesPage from "./pages/coursesPage/coursesPage";
import AllCourseCategory from "./pages/allCourseCategory/allCourseCategory";
import CoursesCategory from "./pages/coursesCategory/coursesCategory";
import CourseDetail from "./pages/courseDetail/courseDetail";
import AnnouncementsPage from "./pages/announcementsPage/announcementsPage";
import AnnounceDetail from "./pages/announceDetail/announceDetail";
import Login from "./pages/register/login/login";
import Signup from "./pages/register/signup/signup";
import Profile from "./pages/profile/profile";
import Dashboard from "./pages/admin/dashboard/dashboard";
import NotFound from "./pages/404Page/404Page";
import Users from "./pages/admin/users/users";
import Homemakers from "./pages/homemakers/homemakers";
import Admins from "./pages/admin/admins/admins";
import Moderators from "./pages/admin/moderators/moderators";
import AddUser from "./pages/admin/addUser/addUser";
import Jobs from "./pages/admin/admin-jobs/jobs";
import AdminProducts from "./pages/admin/admin-products/admin-products";
import AdminCategories from "./pages/admin/admin-categories/admin-categories";
import AdminSubcategories from "./pages/admin/admin-sub-categories/adminSubcategories";
import AdminHashtags from "./pages/admin/admin-hashtags/admin-hashtags";
import AdminTeachers from "./pages/admin/admin-teachers/adminTeachers";
import AddTeacher from "./pages/admin/addTeacher/addTeacher";
import AdminPupils from "./pages/admin/adminPupils/adminPupils";
import AddPupil from "./pages/admin/addPupil/addPupil";
import AdminNews from "./pages/admin/adminNews/adminNews";
import AddNews from "./pages/admin/addNews/addNews";
import AdminNewsCategories from "./pages/admin/admin-news-categories/admin-news-categories";
import UsersMessaging from "./pages/usersMessaging/usersMessaging";
import Services from "./pages/services/services";
import AddAnnounce from "./pages/addAnnounce/addAnnounce";
import Products from "./pages/profilePages/products/Products";
import EditProfile from "./pages/profilePages/editProfile/EditProfile";

// Global API
export const globalApi = "http://bk.kasanabozor.uz";
  const [user, setUser] = useState({role: 'admin'})


// PrivateRoute komponenti
const PrivateRoute = ({ children, userRole, allowedRole }) => {
  if (userRole !== allowedRole) {
    return <NotFound />;
  }
  return children;
};

// Profilega kirish uchun o'zgarish
const ProfileRoute = ({ children, userRole, allowedRole }) => {
  if (userRole !== allowedRole) {
    return <NotFound />;
  } 
  return children;
};

function AppContent() {
  const location = useLocation();
  const { isAuthenticated, user } = useContext(MyContext);

  // Headerni ko'rsatmaslik kerak bo'lgan sahifalar
  const noHeaderPaths = [
    "/login", "/signup", "/dashboard", '/dashboard/admin/users', '/dashboard/admin/homemakers', 
    '/dashboard/admin/admins', '/dashboard/admin/moderators', '/dashboard/admin/add-user', 
    '/dashboard/admin/jobs', '/dashboard/admin/products', '/dashboard/admin/categories', 
    '/dashboard/admin/subcategories', '/dashboard/admin/hashtags', '/dashboard/admin/teachers',
    '/dashboard/admin/add-teacher', '/dashboard/admin/pupils', '/dashboard/admin/add-pupils', 
    '/dashboard/admin/admin-news', '/dashboard/admin/add-news', '/dashboard/admin/admin-news-categories'
  ];

  return (
    <div className="app">
      {/* Agar hozirgi sahifa `noHeaderPaths` ichida bo'lmasa, Headerni ko'rsatamiz */}
      {!noHeaderPaths.includes(location.pathname) && <Header />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="online-shop" element={<OnlineShop />} />
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
        <Route path="services/:id" element={<Services />} />
        <Route path="add-announce" element={<AddAnnounce />} />
        {/* Profile start */}
        <Route path="profile" element={isAuthenticated && user.role === "user" ? <Profile /> : <NotFound />} />
        <Route path="profile/*" element={
          <ProfileRoute userRole={user.role} allowedRole="user">
            <Routes>
              <Route path="products" element={<Products />}/>
              <Route path="edit-profile" element={<EditProfile />}/>

              <Route path="*" element={<NotFound />} />

            </Routes>
          </ProfileRoute>}
        />
        {/* Profile end */}

        {/* Admin Routes */}
        <Route path="dashboard" element={isAuthenticated && user.role === "admin" ? <Dashboard /> : <NotFound />} />
        <Route path="dashboard/*" element={
          <PrivateRoute userRole={user.role} allowedRole="admin">
            <Routes>
              <Route path="users" element={<Users />} />
              <Route path="homemakers" element={<Homemakers />} />
              <Route path="admins" element={<Admins />} />
              <Route path="moderators" element={<Moderators />} />
              <Route path="add-user" element={<AddUser />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="subcategories" element={<AdminSubcategories />} />
              <Route path="hashtags" element={<AdminHashtags />} />
              <Route path="teachers" element={<AdminTeachers />} />
              <Route path="add-teacher" element={<AddTeacher />} />
              <Route path="pupils" element={<AdminPupils />} />
              <Route path="add-pupils" element={<AddPupil />} />
              <Route path="admin-news" element={<AdminNews />} />
              <Route path="add-news" element={<AddNews />} />
              <Route path="admin-news-categories" element={<AdminNewsCategories />} />
            </Routes>
          </PrivateRoute>
        } />

        {/* Register Routes */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
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
