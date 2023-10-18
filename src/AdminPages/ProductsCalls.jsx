import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { getCategories } from "../Slices/productCaregorySlice";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../Utils/firebase";
import ProductsRender from "./ProductsRender";

export default function ProductsCalls() {
  const userdata = useSelector((state) => state.userReducer);
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
              categories: categoriesArray,
              categoriesLoading: false,
            })
          );
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userdata.admin) {
    return <Navigate to="*" />;
  }
  return <ProductsRender />;
}
