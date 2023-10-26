import { getProduct } from "../../Slices/productSlice";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../Utils/firebase";
import ProductPageRender from "./ProductPageRender";
import Loader from "../../UtilPages/Loader";

export default function ProductPageCalls() {
  const productCategory = useSelector((state) => state.productCategoryReducer);
  const productItems = useSelector((state) => state.productReducer);

  const productRefFB = firebase.firestore().collection("Products");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPath = useLocation();

  const [loading, setLoading] = useState(true);

  console.log(productItems);
  console.log(loading);

  const getProductFB = async () => {
    setLoading(true);
    productRefFB
      .doc(currentPath.pathname.split("/product/")[1])
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch(
            getProduct({
              product: doc.data(),
              productLoading: false,
            })
          );
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    setLoading(true);
    if (
      !productCategory.categoriesNames.includes(
        currentPath.pathname.split("/product/")[1]
      )
    ) {
      navigate("/*");
    } else {
      getProductFB();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath.pathname, navigate, productCategory.categoriesNames]);

  if (loading) {
    return <Loader />;
  }

  return <ProductPageRender />;
}
