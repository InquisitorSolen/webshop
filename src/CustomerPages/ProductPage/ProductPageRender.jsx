import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

export default function ProductPageRender({ pathname }) {
  const productItems = useSelector((state) => state.productReducer);
  const productCategory = useSelector((state) => state.productCategoryReducer);

  const categoryName = productCategory.productCategoriesKeys
    .map((product, key) => {
      if (product === pathname) {
        return productCategory.productCategoriesNames[key];
      } else {
        return "";
      }
    })
    .find((element) => element !== "");

  const pagesArray = Array.from(
    { length: productItems.productArray.length / 30 + 1 },
    (_, i) => i + 1
  );

  const [shownProductArray, setShownProductArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    if (productItems.productArray.length <= 30) {
      setShownProductArray(productItems.productArray);
    } else {
      setShownProductArray(productItems.productArray.slice(0, 30));
    }
  }, [productItems.productArray]);

  const pageChangeHandler = (page) => {
    const arrayHelper = (parseInt(page) - 1) * 30;
    setCurrentPage(parseInt(page));
    if (arrayHelper + 30 > productItems.productArray.length) {
      setShownProductArray(
        productItems.productArray.slice(
          arrayHelper,
          productItems.productArray.length
        )
      );
    } else {
      setShownProductArray(
        productItems.productArray.slice(arrayHelper, arrayHelper + 30)
      );
    }
  };

  return (
    <div className="flex flex-col grow">
      <div className="bg-slate-200 flex flex-col md:flex-row">
        <h1 className="text-xl text-center md:text-start md:text-3xl font-bold md:ml-6 md:my-6">
          {categoryName}:
        </h1>
        <h2 className="text-center md:text-start md:text-2xl font-semibold md:ml-7 md:my-7">
          Összesen <b>{productItems.productArray.length}</b> termék
        </h2>
      </div>
      <div className="grow">
        <div className=" my-6 grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-flow-row gap-3 justify-center items-center content-center">
          {shownProductArray.map((product) => (
            <div
              key={product.id}
              className="flex justify-center items-center content-center"
            >
              <ProductCard product={product} type={pathname} />
            </div>
          ))}
        </div>
      </div>
      {productItems.productArray.length > 30 && (
        <div className="bg-slate-100 flex justify-center">
          <div className="flex flex-row mx-6 mb-6">
            {pagesArray.map((value) => {
              if (currentPage === value) {
                return (
                  <button
                    key={value}
                    className=" border border-primary mx-1 w-10 h-10 bg-white font-bold text-center text-2xl"
                    onClick={() => pageChangeHandler(value)}
                  >
                    {value}
                  </button>
                );
              } else {
                return (
                  <button
                    key={value}
                    className=" border mx-1 w-10 h-10 bg-white text-center text-2xl"
                    onClick={() => pageChangeHandler(value)}
                  >
                    {value}
                  </button>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
}
