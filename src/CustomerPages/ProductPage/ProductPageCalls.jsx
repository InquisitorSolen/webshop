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

  const productRefFB = firebase.firestore().collection("Products");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPath = useLocation();
  const pathname = currentPath.pathname.split("/product/")[1];

  const [loading, setLoading] = useState(true);

  const getProductFB = async () => {
    setLoading(true);
    productRefFB
      .doc(pathname)
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
    if (!productCategory.categoriesNames.includes(pathname)) {
      navigate("/*");
    } else {
      getProductFB();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath.pathname, navigate, productCategory.categoriesNames]);

  if (loading) {
    return <Loader />;
  }

  return <ProductPageRender pathname={pathname} />;
}
