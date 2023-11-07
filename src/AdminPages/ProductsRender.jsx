import { asciify } from "../Utils/regexChecks";
import { getProduct } from "../Slices/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../Utils/firebase";
import Loader from "../UtilPages/Loader";
import ProductsMobile from "./Products/ProductsMobile";
import ProductsWeb from "./Products/ProductsWeb";

export default function ProductsRender() {
  const productCategory = useSelector((state) => state.productCategoryReducer);
  const dispatch = useDispatch();
  const productRefFB = firebase.firestore().collection("Products");

  const [categoryName, setCategoryName] = useState(
    productCategory.productCategoriesKeys[0]
  );
  const [productName, setProductName] = useState(
    productCategory.productCategoriesNames[0]
  );

  useEffect(() => {
    dispatch(getProduct(categoryName));
  }, [categoryName, dispatch, productRefFB]);

  const handleSelectChange = (event) => {
    event.preventDefault();
    setProductName(event.target.value);
    setCategoryName(asciify(event.target.value));
  };

  if (productCategory.categoriesLoading) {
    return <Loader />;
  }

  return (
    <div className="grow">
      <ProductsWeb
        handleSelectChange={handleSelectChange}
        categoryName={categoryName}
        productName={productName}
      />
      {/* Mobile version */}
      <ProductsMobile
        handleSelectChange={handleSelectChange}
        categoryName={categoryName}
      />
    </div>
  );
}
