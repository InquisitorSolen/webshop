import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../Slices/cartSlice";
import Cookies from "js-cookie";

export default function ProductCard({ product, type }) {
  const productCategory = useSelector((state) => state.productCategoryReducer);
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const itemInCart = cart.cartProducts.find(
    (item) => item.name === product.name
  );

  const typeName = productCategory.productCategoriesKeys
    .map((product, key) => {
      if (product === type) {
        return productCategory.productCategoriesNames[key];
      } else {
        return "";
      }
    })
    .find((element) => element !== "")
    .toLowerCase();

  const decreaseNumInCart = () => {
    const localCart = cart.cartProducts
      .map((item) => {
        if (item.name === product.name) {
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
        cartPrice: cart.cartPrice - product.price,
        cartItemNumber: cart.cartItemNumber - 1,
      })
    );
    if (cart.cartItemNumber - 1 !== 0) {
      Cookies.set(
        "cart",
        JSON.stringify({
          cartProducts: localCart,
          cartPrice: cart.cartPrice - product.price,
          cartItemNumber: cart.cartItemNumber - 1,
        }),
        { expires: 2 }
      );
    } else {
      Cookies.remove("cart");
    }
  };

  const increaseNumInCart = () => {
    const localCart = cart.cartProducts.map((item) => {
      if (item.name === product.name) {
        return { ...item, inCartAmount: item.inCartAmount + 1 };
      } else {
        return item;
      }
    });
    dispatch(
      getCart({
        cartProducts: localCart,
        cartPrice: cart.cartPrice + product.price,
        cartItemNumber: cart.cartItemNumber + 1,
      })
    );
    Cookies.set(
      "cart",
      JSON.stringify({
        cartProducts: localCart,
        cartPrice: cart.cartPrice + product.price,
        cartItemNumber: cart.cartItemNumber + 1,
      }),
      { expires: 2 }
    );
  };

  const addToCart = () => {
    const localproduct = { ...product, inCartAmount: 1 };
    const localCart = cart.cartProducts.map((item) => item);
    localCart.push(localproduct);
    dispatch(
      getCart({
        cartProducts: localCart,
        cartPrice: cart.cartPrice + product.price,
        cartItemNumber: cart.cartItemNumber + 1,
      })
    );
    Cookies.set(
      "cart",
      JSON.stringify({
        cartProducts: localCart,
        cartPrice: cart.cartPrice + product.price,
        cartItemNumber: cart.cartItemNumber + 1,
      }),
      { expires: 2 }
    );
  };

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
        {itemInCart ? (
          <div className="flex justify-evenly">
            <button onClick={decreaseNumInCart}>
              <AiOutlineMinus />
            </button>
            <p>{itemInCart.inCartAmount}</p>
            <button onClick={increaseNumInCart}>
              <AiOutlinePlus />
            </button>
          </div>
        ) : (
          <button
            className="border border-black rounded-xl px-1 text-center text-base font-bold w-fit"
            onClick={addToCart}
          >
            Hozzáadás
          </button>
        )}
      </div>
    </div>
  );
}
