import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "../Slices/productCaregorySlice";
import firebase from "../Utils/firebase";
import MainPageRender from "./MainPageRender";

export default function MainPage() {
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

  return <MainPageRender />;
}
