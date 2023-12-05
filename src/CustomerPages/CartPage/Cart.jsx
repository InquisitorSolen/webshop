import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { numberWithSpaces } from "../../Utils/utilFunctions";
import CartProductCard from "./CartProductCard";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  const cart = useSelector((state) => state.cartReducer);
  const user = useSelector((state) => state.userReducer);

  const pagesArray = Array.from(
    { length: cart.cartProducts.length / 10 + 1 },
    (_, i) => i + 1
  );

  const [shownProductArray, setShownProductArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    if (cart.cartProducts.length <= 10) {
      setShownProductArray(cart.cartProducts);
    } else {
      setShownProductArray(cart.cartProducts.slice(0, 10));
    }
  }, [cart.cartProducts]);

  const pageChangeHandler = (page) => {
    const arrayHelper = (parseInt(page) - 1) * 10;
    setCurrentPage(parseInt(page));
    if (arrayHelper + 10 > cart.cartProductslength) {
      setShownProductArray(
        cart.cartProducts.slice(arrayHelper, cart.cartProducts.length)
      );
    } else {
      setShownProductArray(
        cart.cartProducts.slice(arrayHelper, arrayHelper + 10)
      );
    }
  };

  return (
    <div className="text-center grow ">
      <div className="bg-slate-200 flex flex-col md:flex-row">
        <h1 className="text-2xl text-center md:text-start md:text-3xl font-bold md:ml-6 md:my-6">
          Kosár:
        </h1>
        <h2 className="text-center md:text-start md:text-2xl font-semibold md:ml-7 md:my-7">
          Összesen <b>{cart.cartItemNumber}</b> terméket tartalmaz
        </h2>
      </div>
      <div className="flex flex-row min-h-[30rem] justify-evenly mt-3">
        {cart.cartProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <FaShoppingCart className="w-20 h-20" />
            <p className="font-bold text-3xl mt-6">A kosarad jelenleg üres</p>
            <p className="font-normal text-xl mt-3">
              Válogass online kinálatunkból és találd meg könnyedén az általad
              keresett termékeket
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {shownProductArray.map((product) => (
              <div key={product.id} className="mb-3">
                <CartProductCard product={product} />
              </div>
            ))}
            {cart.cartProducts.length > 10 && (
              <div className="bg-slate-100 flex justify-center">
                <div className="flex flex-row m-6">
                  {pagesArray.map((value) => {
                    if (currentPage === value) {
                      return (
                        <button
                          key={value}
                          className=" border border-primary mx-1 w-10 h-10 bg-white font-bold text-center text-2xl"
                          onClick={() => pageChangeHandler(value)}
                        >
                          {value}
                        </button>
                      );
                    } else {
                      return (
                        <button
                          key={value}
                          className=" border mx-1 w-10 h-10 bg-white text-center text-2xl"
                          onClick={() => pageChangeHandler(value)}
                        >
                          {value}
                        </button>
                      );
                    }
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        <div className="border bg-white mr-6 h-fit">
          <h2 className="border-b text-xl font-bold px-12 mx-3 mt-6 pb-6">
            Kosár összesítő:
          </h2>
          <div className="flex flex-row justify-between px-3 mx-3 my-6 border-b pb-6">
            <p>Termékek</p>
            <p>{cart.cartItemNumber}</p>
          </div>
          {cart.cartItemNumber !== 0 && (
            <>
              {user.lvl === 2 && (
                <div className="flex flex-row justify-between px-3 mx-3 my-6 border-b pb-6">
                  <p>Kedvezmény</p>
                  <p>15%</p>
                </div>
              )}
              <div className="flex flex-row justify-between px-3 mx-3 my-6 border-b pb-6">
                <p>Összesen</p>
                {user.lvl === 2 ? (
                  <div className="flex flex-col text-end">
                    <p
                      className={`${user.lvl === 2 && "text-danger font-bold"}`}
                    >
                      {numberWithSpaces(
                        parseInt(
                          Math.round(cart.cartPrice - cart.cartPrice * 0.15) / 5
                        ) * 5
                      )}{" "}
                      Ft
                    </p>
                    <p className="line-through text-sm">
                      {numberWithSpaces(
                        parseInt(Math.round(cart.cartPrice) / 5) * 5
                      )}{" "}
                      Ft
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col text-end">
                    <p
                      className={`${user.lvl === 2 && "text-danger font-bold"}`}
                    >
                      {numberWithSpaces(
                        parseInt(
                          Math.round(cart.cartPrice - cart.cartPrice * 0.15) / 5
                        ) * 5
                      )}{" "}
                      Ft
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex flex-row justify-center px-3 mx-3 my-6">
            {cart.cartProducts.length === 0 ? (
              <button
                className="border border-secondary bg-slate-200 rounded-2xl py-1 px-2 font-bold"
                disabled
              >
                Megrendelés
              </button>
            ) : (
              <Link
                className="border border-primary rounded-2xl py-1 px-2 font-bold hover:bg-primary hover:text-white"
                to="/cart/order"
              >
                Megrendelés
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
