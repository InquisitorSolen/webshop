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

  const [categoryName, setCategoryName] = useState(
    productCategory.categories[0]
  );

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
      setCategoryName(productCategory.categories[0]);
    } else {
      getProductFB();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName, productCategory.categories]);

  const handleSelectChange = (event) => {
    event.preventDefault();
    setCategoryName(event.target.value);
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
      />
      {/* Mobile version */}
      <ProductsMobile
        handleSelectChange={handleSelectChange}
        categoryName={categoryName}
      />
    </div>
  );
}
