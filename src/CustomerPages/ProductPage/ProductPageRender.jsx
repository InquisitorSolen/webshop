import { compare } from "../../Utils/utilFunctions";
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

  const productsArray = Object.values(productItems.productObj).sort(compare);

  return (
    <div className="flex flex-col border border-black rounded-xl p-6 bg-white m-6 text-center grow">
      <h1 className="text-3xl font-bold mb-4">{categoryName}</h1>
      <div className="grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-flow-row gap-3 justify-center items-center content-center">
        {productsArray.map((product) => (
          <div
            key={`${product.name}${product.type}`}
            className="flex justify-center items-center content-center"
          >
            <ProductCard product={product} type={pathname} />
          </div>
        ))}
      </div>
    </div>
  );
}
