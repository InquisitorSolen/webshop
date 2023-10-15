import { useSelector } from "react-redux";
import Loader from "../UtilPages/Loader";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import LoginModal from "../Navbar/LoginModal";
import { Outlet, useLocation } from "react-router";
import MainPage from "../CustomerPages/MainPage";

export default function ShopLayout() {
  const userdata = useSelector((state) => state.userReducer);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const currentPath = useLocation();

  if (userdata.userLoading) {
    return <Loader />;
  }

  return (
    <div className="">
      <Navbar setLoginModalOpen={setLoginModalOpen} />
      <LoginModal
        setLoginModalOpen={setLoginModalOpen}
        loginModalOpen={loginModalOpen}
      />
      {currentPath.pathname === "/" ? <MainPage /> : <Outlet />}
    </div>
  );
}
