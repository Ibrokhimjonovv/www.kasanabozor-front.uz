
function AppContent() {
    const navigate = useNavigate();
  
    useEffect(() => {
      window.scrollTo({'top': 0});    
    }, [navigate])
  
    const location = useLocation();
    const [isAuthenticated, user, isLoading] = [false, null, true];
  
    // const noHeaderPaths = [
    //   "/login",
    //   "/signup",
    //   "/dashboard",
    //   "/dashboard/admin/users",
    //   "/dashboard/admin/homemakers",
    //   "/dashboard/admin/admins",
    //   "/dashboard/admin/moderators",
    //   "/dashboard/admin/add-user",
    //   "/dashboard/admin/jobs",
    //   "/dashboard/admin/products",
    //   "/dashboard/admin/categories",
    //   "/dashboard/admin/subcategories",
    //   "/dashboard/admin/hashtags",
    //   "/dashboard/admin/teachers",
    //   "/dashboard/admin/add-teacher",
    //   "/dashboard/admin/pupils",
    //   "/dashboard/admin/add-pupils",
    //   "/dashboard/admin/admin-news",
    //   "/dashboard/admin/add-news",
    //   "/dashboard/admin/admin-news-categories",
    //   "/profile/prof",
    //   "/profile/menus",
    //   "/profile/edit-profile",
    //   "/profile/products",
    //   "/profile/add-product",
    //   "/profile/liked-products",
    //   "/profile/my-announces",
    //   "/profile/liked-announces",
    //   "/profile/messages",
    //   "/profile/notifications",
    //   "/profile/liked-courses",
    //   "/add-announce",
    //   "/profile/my-courses",
    //   "/dashboard/admin/courses",
    //   "/dashboard/admin/add-courses",
    //   "/dashboard/admin/work-announces"
    // ];
  
    // const noHeaderPaths_2 = [
    //   "/login",
    //   "/signup",
    //   "/dashboard",
    //   "/dashboard/admin/users",
    //   "/dashboard/admin/homemakers",
    //   "/dashboard/admin/admins",
    //   "/dashboard/admin/moderators",
    //   "/dashboard/admin/add-user",
    //   "/dashboard/admin/jobs",
    //   "/dashboard/admin/products",
    //   "/dashboard/admin/categories",
    //   "/dashboard/admin/subcategories",
    //   "/dashboard/admin/hashtags",
    //   "/dashboard/admin/teachers",
    //   "/dashboard/admin/add-teacher",
    //   "/dashboard/admin/pupils",
    //   "/dashboard/admin/add-pupils",
    //   "/dashboard/admin/admin-news",
    //   "/dashboard/admin/add-news",
    //   "/dashboard/admin/admin-news-categories",
    //   "/dashboard/admin/courses",
    //   "/dashboard/admin/add-courses",
    //   "/dashboard/admin/work-announces"
    // ];
  
    return (
        <>
  
        { !isLoading ? <div className="app">
        <Header />
  
        <Routes>
          {/* Static pages start */}
          <Route path="/partners" element={<Partners />}/>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/about-project" element={<AboutProject />} />
          {/* Static pages end */}
  
          <Route path="/" element={<Home />} />
          <Route path="online-shop" element={<OnlineShop />} />
          <Route path="online-shop/product/:id" element={<ProductDetails />} />
          <Route
            path="online-shop/categories/:category"
            element={<Categories />}
          />
          <Route path="online-shop/all-categories" element={<AllCategories />} />
          <Route path="messaging" element={<UsersMessaging />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:category" element={<NewsCategory />} />
          <Route path="news/:category/:id" element={<NewsDetail />} />
          <Route path="news/documents/:category" element={<Documents />} />
          <Route path="news/documents/:category/:pdf" element={<PDFViewer />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/all-categories/" element={<AllCourseCategory />} />
          <Route
            path="courses/categories/:categoryId"
            element={<CoursesCategory />}
          />
          <Route path="courses/course/:id" element={<CourseDetail />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="announcements/:id" element={<AnnounceDetail />} />
          <Route path="services/:id" element={<Services />} />
          <Route path="add-announce" element={<AddAnnounce />} />
          
          {/* Profile start */}
          <Route
            path="profile/menus"
            element={
              isAuthenticated && user.role === "user" ? <ProfileSideBar /> : <NotFound />
            }
          />
          <Route
            path="profile/prof"
            element={
              isAuthenticated && user.role === "user" ? <Profile /> : <NotFound />
            }
          />
          <Route
            path="profile/*"
            element={
              <ProfileRoute userRole={user.role} allowedRole="user">
                <Routes>
                  <Route path="products" element={<Products />} />
                  <Route path="edit-profile" element={<EditProfile />} />
                  <Route path="add-product" element={<AddProducts />} />
                  <Route path="liked-products" element={<LikedProducts />} />
                  <Route path="my-announces" element={<MyAnnounces />} />
                  <Route path="liked-announces" element={<LikedAnnounces />} />
                  <Route path="messages" element={<MessagesContainer />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="liked-courses" element={<LikedCourses />} />
                  <Route path="my-courses" element={<MyCourses />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ProfileRoute>
            }
          />
          {/* Profile end */}
          {/* Admin Routes */}
          <Route
            path="dashboard"
            element={
              isAuthenticated && user.role === "admin" ? (
                <Dashboard />
              ) : (
                <NotFound />
              )
            }
          />
          <Route
            path="dashboard/*"
            element={
              <PrivateRoute
                userRole={user.role}
                allowedRole="admin"
                isAuthenticated={isAuthenticated}
              >
                <Routes>
                  <Route path="admin/users" element={<Users />} />
                  <Route path="admin/homemakers" element={<Homemakers />} />
                  <Route path="admin/admins" element={<Admins />} />
                  <Route path="admin/moderators" element={<Moderators />} />
                  <Route path="admin/add-user" element={<AddUser />} />
                  <Route path="admin/jobs" element={<Jobs />} />
                  <Route path="admin/products" element={<AdminProducts />} />
                  <Route path="admin/categories" element={<AdminCategories />} />
                  <Route
                    path="admin/subcategories"
                    element={<AdminSubcategories />}
                  />
                  <Route path="admin/hashtags" element={<AdminHashtags />} />
                  <Route path="admin/teachers" element={<AdminTeachers />} />
                  <Route path="admin/add-teacher" element={<AddTeacher />} />
                  <Route path="admin/pupils" element={<AdminPupils />} />
                  <Route path="admin/add-pupils" element={<AddPupil />} />
                  <Route path="admin/courses" element={<AdminCourses />} />
                  <Route path="admin/add-courses" element={<AddCourse />} />
                  <Route path="admin/admin-news" element={<AdminNews />} />
                  <Route path="admin/add-news" element={<AddNews />} />
                  <Route path="admin/work-announces" element={<AdminAnnounces />} />
                  <Route
                    path="admin/admin-news-categories"
                    element={<AdminNewsCategories />}
                  />
                </Routes>
              </PrivateRoute>
            }
          />
  
          {/* Register Routes */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
  
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
  
        {/* Footerni har doim ko'rsatamiz */}
        {!noHeaderPaths_2.includes(location.pathname) && <MenuTool />}
        {!noHeaderPaths.includes(location.pathname) && <Footer />}
      </div> : <Loading /> }
      
        </>
    );
  }
  