import { useSelector } from "react-redux";

export default function ProductCard({ product, type }) {
  const productCategory = useSelector((state) => state.productCategoryReducer);

  const typeName = productCategory.categoriesNames
    .map((product, key) => {
      if (product === type) {
        return productCategory.categories[key];
      } else {
        return "";
      }
    })
    .find((element) => element !== "")
    .toLowerCase();

  return (
    <div className="text-center border border-black rounded-xl p-6 bg-white w-fit h-fit">
      <div className="w-fit h-fit">
        <img src={product.src} alt="" width={150} height={150} />
        <p>{product.name}</p>
        <div className="flex flex-row items-center justify-center">
          <p>
            {product.type} {typeName}
          </p>
        </div>
        <p>{product.quantity}</p>
        <p>{product.price} Ft</p>
      </div>
    </div>
  );
}
