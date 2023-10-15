import { useSelector } from "react-redux";
import Loader from "../UtilPages/Loader";

export default function MainPageRender() {
  const ProductCategory = useSelector((state) => state.productCategoryReducer);

  if (ProductCategory.categoriesLoading) {
    return <Loader />;
  }

  return (
    <>
      {ProductCategory.categories.map((category) => (
        <p key={category}>{category}</p>
      ))}
    </>
  );
}
