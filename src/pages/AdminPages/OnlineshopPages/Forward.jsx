import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Forward = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/admin/products/") {
      navigate("/admin/products/products/", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Forward;
