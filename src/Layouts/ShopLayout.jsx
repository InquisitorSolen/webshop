import { getCart } from "../Slices/cartSlice";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { getProductCategories } from "../Slices/productCaregorySlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../UtilPages/Loader";
import Navbar from "../Navbar/Navbar";
import LoginModal from "../Navbar/LoginModal";
import MainPage from "../CustomerPages/MainPage";
import Cookies from "js-cookie";

export default function ShopLayout() {
  const userdata = useSelector((state) => state.userReducer);
  const productCategory = useSelector((state) => state.productCategoryReducer);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const currentPath = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductCategories());
    if (Cookies.get("cart") !== undefined) {
      dispatch(getCart(JSON.parse(Cookies.get("cart"))));
    }
  }, [dispatch]);

  if (userdata.userLoading || productCategory.categoriesLoading) {
    return <Loader />;
  }

  return (
    <div className="h-full flex flex-col">
      <Navbar setLoginModalOpen={setLoginModalOpen} />
      <LoginModal
        setLoginModalOpen={setLoginModalOpen}
        loginModalOpen={loginModalOpen}
      />
      {currentPath.pathname === "/" ? <MainPage /> : <Outlet />}
    </div>
  );
}
