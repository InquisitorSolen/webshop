import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { getProductCategories } from "../Slices/productCaregorySlice";
import { useDispatch, useSelector } from "react-redux";
import ProductsRender from "./ProductsRender";

export default function ProductsCalls() {
  const userdata = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]);

  if (!userdata.admin) {
    return <Navigate to="*" />;
  }
  return <ProductsRender />;
}
