import { useSelector } from "react-redux";

export default function ProductPageRender() {
  const productItems = useSelector((state) => state.productReducer);

  /*   console.log(productItems.product); */
  return (
    <>
      <h1>ProductPageRender</h1>
    </>
  );
}
