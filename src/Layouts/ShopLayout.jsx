import { getCategories } from "../Slices/productCaregorySlice";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../Utils/firebase";
import Loader from "../UtilPages/Loader";
import Navbar from "../Navbar/Navbar";
import LoginModal from "../Navbar/LoginModal";
import MainPage from "../CustomerPages/MainPage";

export default function ShopLayout() {
  const userdata = useSelector((state) => state.userReducer);
  const productCategory = useSelector((state) => state.productCategoryReducer);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const currentPath = useLocation();

  const dispatch = useDispatch();
  const productCategoriesRefFB = firebase
    .firestore()
    .collection("productCategories");

  useEffect(() => {
    productCategoriesRefFB
      .doc("categoryNames")
      .get()
      .then((doc) => {
        if (doc.exists) {
          const categoriesArray = Object.keys(doc.data());

          dispatch(
            getCategories({
              categoryProducts: doc.data(),
              categories: categoriesArray,
              categoriesLoading: false,
            })
          );
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
