import { compare } from "../../Utils/utilFunctions";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

export default function ProductPageRender({ pathname }) {
  const productItems = useSelector((state) => state.productReducer);

  const productsArray = Object.values(productItems.product).sort(compare);

  return (
    <>
      {productsArray.map((product) => (
        <div key={`${product.name}${product.type}`}>
          <ProductCard product={product} type={pathname} />
        </div>
      ))}
    </>
  );
}
