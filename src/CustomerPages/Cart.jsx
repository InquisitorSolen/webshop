import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../Slices/cartSlice";
import Cookies from "js-cookie";

export default function Cart() {
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const increaseAmount = (name) => {
    const itemPrice = cart.cartProducts
      .map((item) => (item.name === name ? item.price : 0))
      .filter((item) => item !== 0)[0];
    const localCart = cart.cartProducts.map((item) => {
      if (item.name === name) {
        return { ...item, inCartAmount: item.inCartAmount + 1 };
      } else {
        return item;
      }
    });
    dispatch(
      getCart({
        cartProducts: localCart,
        cartPrice: cart.cartPrice + itemPrice,
        cartItemNumber: cart.cartItemNumber + 1,
      })
    );
    Cookies.set(
      "cart",
      JSON.stringify({
        cartProducts: localCart,
        cartPrice: cart.cartPrice + itemPrice,
        cartItemNumber: cart.cartItemNumber + 1,
      }),
      { expires: 2 }
    );
  };

  const decreaseAmount = (name) => {
    const itemPrice = cart.cartProducts
      .map((item) => (item.name === name ? item.price : 0))
      .filter((item) => item !== 0)[0];
    const localCart = cart.cartProducts
      .map((item) => {
        if (item.name === name) {
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
        cartPrice: cart.cartPrice - itemPrice,
        cartItemNumber: cart.cartItemNumber - 1,
      })
    );
    if (cart.cartItemNumber - 1 !== 0) {
      Cookies.set(
        "cart",
        JSON.stringify({
          cartProducts: localCart,
          cartPrice: cart.cartPrice - itemPrice,
          cartItemNumber: cart.cartItemNumber - 1,
        }),
        { expires: 2 }
      );
    } else {
      Cookies.remove("cart");
    }
  };

  return (
    <div className="text-center border border-black rounded-xl bg-white m-6 grow ">
      <table className="m-3 border border-black rounded-2xl table-fixed">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="border-l border-black">Termék neve:</th>
            <th className="border-l border-black hidden md:block">
              Termék egységára:
            </th>
            <th className="border-l border-black">Megrendelendő mennyiség:</th>
            <th className="border-l border-black">Összesített ár:</th>
          </tr>
        </thead>
        <tbody className="border-b border-black">
          {cart.cartProducts.map((item) => (
            <tr
              key={`${item.name}${item.type}`}
              className="border-b border-dotted border-black"
            >
              <td className="border-r border-dotted border-black p-2">
                {item.name}
              </td>
              <td className="hidden md:table-cell border-r border-dotted border-black">
                {item.price} Ft
              </td>
              <td className="border-r border-dotted border-black">
                <div className="flex flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => increaseAmount(item.name)}
                    className="my-2"
                  >
                    <AiOutlinePlus />
                  </button>
                  {item.inCartAmount}
                  <button
                    onClick={() => decreaseAmount(item.name)}
                    className="my-2"
                  >
                    <AiOutlineMinus />
                  </button>
                </div>
              </td>
              <td className="border-r border-dotted border-black">
                {item.inCartAmount * item.price} Ft
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
