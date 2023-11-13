import { getCart } from "../../Slices/cartSlice";
import { numberWithSpaces } from "../../Utils/utilFunctions";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import Cookies from "js-cookie";

export default function CartProductCard({ product }) {
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const increaseAmount = (id) => {
    const itemPrice = cart.cartProducts
      .map((item) => (item.id === id ? item.price : 0))
      .filter((item) => item !== 0)[0];
    const localCart = cart.cartProducts.map((item) => {
      if (item.id === id) {
        return { ...item, inCartAmount: item.inCartAmount + 1 };
      } else {
        return item;
      }
    });
    dispatch(
      getCart({
        cartProducts: localCart,
        cartPrice: parseInt(cart.cartPrice + itemPrice),
        cartItemNumber: cart.cartItemNumber + 1,
      })
    );
    Cookies.set(
      "cart",
      JSON.stringify({
        cartProducts: localCart,
        cartPrice: parseInt(cart.cartPrice + itemPrice),
        cartItemNumber: cart.cartItemNumber + 1,
      }),
      { expires: 2 }
    );
  };

  const decreaseAmount = (id) => {
    const itemPrice = cart.cartProducts
      .map((item) => (item.id === id ? item.price : 0))
      .filter((item) => item !== 0)[0];
    const localCart = cart.cartProducts
      .map((item) => {
        if (item.id === id) {
          if (item.inCartAmount === 1) {
            return 0;
          }
          return { ...item, inCartAmount: item.inCartAmount - 1 };
        } else {
          return item;
        }
      })
      .filter((item) => item !== 0);
    dispatch(
      getCart({
        cartProducts: localCart,
        cartPrice: parseInt(cart.cartPrice - itemPrice),
        cartItemNumber: cart.cartItemNumber - 1,
      })
    );
    if (cart.cartItemNumber - 1 !== 0) {
      Cookies.set(
        "cart",
        JSON.stringify({
          cartProducts: localCart,
          cartPrice: parseInt(cart.cartPrice - itemPrice),
          cartItemNumber: cart.cartItemNumber - 1,
        }),
        { expires: 2 }
      );
    } else {
      Cookies.remove("cart");
    }
  };

  return (
    <div className="border bg-white p-6 flex flex-row justify-between">
      <div className="flex flex-row">
        <img src={product.src} alt="" width={150} height={150} />
        <div className="text-start">
          <h1 className="font-bold text-lg">{product.name}</h1>
          <h2 className="font-bold text-lg">
            {product.type} {product.productCategory}
          </h2>
          <h2>{product.quantity} / db</h2>
        </div>
      </div>
      <div className="ml-6 text-start">
        <p className="font-bold text-3xl border-b mb-2 pb-2">
          {numberWithSpaces(product.price)} Ft / db
        </p>
        <div className="flex flex-row justify-between items-center border-b mb-2 pb-2">
          <p className="text-2xl">{product.inCartAmount}</p>
          <div className="flex justify-evenly w-full">
            <button
              className="text-xl"
              onClick={() => decreaseAmount(product.id)}
            >
              <AiOutlineMinusCircle className="text-2xl" />
            </button>
            <button
              className="text-xl"
              onClick={() => increaseAmount(product.id)}
            >
              <AiOutlinePlusCircle className="text-2xl" />
            </button>
          </div>
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
