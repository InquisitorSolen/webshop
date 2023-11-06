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
          dispatch(
            getCategories({
              categories: Object.values(doc.data()).sort(),
              categoriesNames: Object.keys(doc.data()).sort(),
              ProductCategories: doc.data(),
              categoriesLoading: false,
            })
          );
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MainPageRender />;
}
