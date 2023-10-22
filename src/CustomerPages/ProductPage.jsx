import { useEffect } from "react";
import { getProduct } from "../Slices/productSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import firebase from "../Utils/firebase";

export default function ProductPage() {
  const dispatch = useDispatch();
  const productRefFB = firebase.firestore().collection("Products");
  const currentPath = useLocation();

  const categoryName = "";

  const getProductFB = () => {
    productRefFB
      .doc(categoryName)
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch(
            getProduct({
              product: doc.data(),
              productLoading: false,
            })
          );
        }
      });
  };

  useEffect(() => {}, []);

  return (
    <>
      <h1>ProductPage</h1>
    </>
  );
}
