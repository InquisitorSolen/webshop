import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { getProductAsync } from "../../Slices/productSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductPageRender from "./ProductPageRender";
import Loader from "../../UtilPages/Loader";

export default function ProductPageCalls() {
  const productCategory = useSelector((state) => state.productCategoryReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPath = useLocation();
  const pathname = currentPath.pathname.split("/product/")[1];

  useEffect(() => {
    if (!productCategory.productCategoriesKeys.includes(pathname)) {
      navigate("/*");
    } else {
      dispatch(getProductAsync(pathname));
    }
  }, [
    currentPath.pathname,
    dispatch,
    navigate,
    pathname,
    productCategory.productCategoriesKeys,
  ]);

  if (productCategory.productLoading) {
    return <Loader />;
  }

  return <ProductPageRender pathname={pathname} />;
}
