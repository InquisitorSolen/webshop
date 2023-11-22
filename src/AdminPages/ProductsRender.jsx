import { asciify } from "../Utils/regexChecks";
import { getNewProduct, getProduct } from "../Slices/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../UtilPages/Loader";
import ProductsMobile from "./Products/ProductsMobile";
import ProductsWeb from "./Products/ProductsWeb";

export default function ProductsRender() {
  const productCategory = useSelector((state) => state.productCategoryReducer);
  const productItems = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState(
    productCategory.productCategoriesKeys[0]
  );
  const [productName, setProductName] = useState(
    productCategory.productCategoriesNames[0]
  );

  useEffect(() => {
    dispatch(getProduct(categoryName));
    dispatch(getNewProduct());
  }, [categoryName, dispatch]);

  const handleSelectChange = (event) => {
    event.preventDefault();
    setProductName(event.target.value);
    setCategoryName(asciify(event.target.value));
  };

  if (productCategory.categoriesLoading || productItems.newProductLoading) {
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
