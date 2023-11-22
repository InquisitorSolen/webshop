import { useSelector } from "react-redux";
import Loader from "../UtilPages/Loader";
import ProductCard from "./ProductPage/ProductCard";

export default function MainPage() {
  const ProductCategory = useSelector((state) => state.productCategoryReducer);
  const productItems = useSelector((state) => state.productReducer);

  if (ProductCategory.categoriesLoading || productItems.newProductLoading) {
    return <Loader />;
  }

  return (
    <div className="grow">
      <div className="bg-slate-200 flex flex-row">
        <h1 className="text-xl text-center md:text-start md:text-3xl font-bold md:ml-6 md:my-6">
          Üdvözöljük az AlkIO webshopján
        </h1>
      </div>
      <div className="flex flex-col items-center mt-6">
        <h2 className="text-lg my-3 font-bold">Leguljabb termékeink</h2>
        <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-flow-row gap-3">
          {productItems.newProductsArray.map((product) => (
            <div
              key={product.id}
              className="flex justify-center items-center content-center"
            >
              <ProductCard product={product} type={product.category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
