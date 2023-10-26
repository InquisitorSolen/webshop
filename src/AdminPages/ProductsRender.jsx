import { useEffect, useState } from "react";
import { getProduct } from "../Slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../Utils/firebase";
import Loader from "../UtilPages/Loader";
import ProductsMobile from "./Products/ProductsMobile";
import ProductsWeb from "./Products/ProductsWeb";

export default function ProductsRender() {
  const productCategory = useSelector((state) => state.productCategoryReducer);
  const productItems = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const productRefFB = firebase.firestore().collection("Products");

  const sortedCategoryNames = productCategory.categories.map((e) => e).sort();
  const sortedNames = productCategory.categoriesNames.map((e) => e).sort();

  const [categoryName, setCategoryName] = useState(sortedCategoryNames[0]);
  const [productName, setProductName] = useState(sortedNames[0]);

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

  useEffect(() => {
    if (categoryName === undefined) {
      setCategoryName(productCategory.categoriesNames[0]);
    } else {
      getProductFB();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName, productCategory.categories]);

  const handleSelectChange = (event) => {
    event.preventDefault();
    setProductName(event.target.value);
    const combining = /[\u0300-\u036F]/g;
    setCategoryName(
      event.target.value
        .replace(/\s/g, "")
        .normalize("NFKD")
        .replace(combining, "")
    );
  };

  if (
    productCategory.categoriesLoading ||
    Object.keys(productItems.product).length === 0
  ) {
    return <Loader />;
  }

  return (
    <div className="w-full flex flex-col grow">
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
