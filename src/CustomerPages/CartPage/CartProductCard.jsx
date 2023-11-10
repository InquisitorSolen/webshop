import { numberWithSpaces } from "../../Utils/utilFunctions";

export default function CartProductCard({ product }) {
  console.log(product);
  return (
    <div className="border bg-white p-6 flex flex-row">
      <img src={product.src} alt="" width={150} height={150} />
      <div className="text-start">
        <h1 className="font-bold text-lg">{product.name}</h1>
        <h2 className="font-bold text-lg">
          {product.type} {product.productCategory}
        </h2>
        <h2>{product.quantity} / db</h2>
      </div>
      <div className="ml-6 text-start">
        <p className="font-bold text-3xl">
          {numberWithSpaces(product.price)} Ft / db
        </p>
        <div className="flex flex-row">
          <p>{product.inCartAmount}</p> + -
        </div>
        <p>{product.inCartAmount} a kosárban</p>
        <p>
          Összesen:{" "}
          <b>{numberWithSpaces(product.inCartAmount * product.price)} Ft</b>
        </p>
      </div>
    </div>
  );
}
