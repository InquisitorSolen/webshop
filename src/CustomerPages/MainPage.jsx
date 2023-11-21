import { useSelector } from "react-redux";
import Loader from "../UtilPages/Loader";
import firebase from "../Utils/firebase";
import { getDocs } from "firebase/firestore";

export default function MainPage() {
  const ProductCategory = useSelector((state) => state.productCategoryReducer);

  if (ProductCategory.categoriesLoading) {
    return <Loader />;
  }

  getDocs(firebase.firestore().collection("StripeProducts")).then(
    (snapshot) => {
      const product = [];
      snapshot.docs.forEach((doc) => {
        product.push({ ...doc.data(), id: doc.id });
      });
      console.log(product);
    }
  );

  return (
    <>
      {ProductCategory.productCategoriesNames.map((category) => (
        <p key={category}>{category}</p>
      ))}
    </>
  );
}
