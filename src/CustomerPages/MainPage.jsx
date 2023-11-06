import { useSelector } from "react-redux";
import Loader from "../UtilPages/Loader";

export default function MainPage() {
  const ProductCategory = useSelector((state) => state.productCategoryReducer);

  if (ProductCategory.categoriesLoading) {
    return <Loader />;
  }

  return (
    <>
      {ProductCategory.productCategoriesNames.map((category) => (
        <p key={category}>{category}</p>
      ))}
    </>
  );
}
