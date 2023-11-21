import { useEffect, useMemo, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";

export default function OrdersButton({
  currentPage,
  setCurrentPage,
  setOrdersArrayChunked,
}) {
  const orders = useSelector((state) => state.ordersReducer);

  const orderPagesArray = useMemo(
    () =>
      Array.from(
        { length: orders.adminOrdersArray.length / 20 + 1 },
        (_, i) => i + 1
      ),
    [orders.adminOrdersArray.length]
  );

  const [orderPagesSlicedArray, setOrderPagesSlicedArray] = useState([]);

  useEffect(() => {
    if (orderPagesSlicedArray.length > 5) {
      setOrderPagesSlicedArray(orderPagesSlicedArray.slice(1, 5));
    }
  }, [orderPagesSlicedArray]);

  const orderPageChangeHandler = (num) => {
    setCurrentPage(parseInt(num));
    const arrayHelper = (parseInt(num) - 1) * 20;
    if (orderPagesArray.length > 5) {
      if (num + 4 > orderPagesArray.length) {
        if (num === orderPagesArray.length) {
          setOrdersArrayChunked(
            orders.adminOrdersArray.slice(
              arrayHelper,
              orders.adminOrdersArray.length
            )
          );
        } else {
          setOrdersArrayChunked(
            orders.adminOrdersArray.slice(arrayHelper, arrayHelper + 20)
          );
        }
        setOrderPagesSlicedArray(
          orderPagesArray.slice(
            orderPagesArray.length - 5,
            orderPagesArray.length - 1
          )
        );
      } else {
        if (num === 1) {
          setOrdersArrayChunked(orders.adminOrdersArray.slice(0, arrayHelper));
          setOrderPagesSlicedArray(orderPagesArray.slice(num, num + 4));
        } else {
          if (num - 1 === 1) {
            setOrdersArrayChunked(
              orders.adminOrdersArray.slice(arrayHelper, arrayHelper + 20)
            );
            setOrderPagesSlicedArray(orderPagesArray.slice(num - 1, num + 3));
          } else {
            setOrdersArrayChunked(
              orders.adminOrdersArray.slice(arrayHelper, arrayHelper + 20)
            );
            setOrderPagesSlicedArray(orderPagesArray.slice(num - 2, num + 2));
          }
        }
      }
    } else {
      if (arrayHelper + 20 > orders.adminOrdersArray.length) {
        setOrdersArrayChunked(
          orders.adminOrdersArray.slice(
            arrayHelper,
            orders.adminOrdersArray.length
          )
        );
      } else {
        setOrdersArrayChunked(
          orders.adminOrdersArray.slice(arrayHelper, arrayHelper + 20)
        );
      }
    }
  };

  if (orderPagesArray.length > 5) {
    return (
      <div className="flex flex-row items-center justify-center w-full mt-3">
        {currentPage === 1 ? (
          <button
            className=" border border-primary mx-1 w-10 h-10 bg-white font-bold text-center text-2xl"
            onClick={() => {
              orderPageChangeHandler(1);
            }}
          >
            1
          </button>
        ) : (
          <button
            className="border mx-1 w-10 h-10 bg-white text-center text-2xl"
            onClick={() => {
              orderPageChangeHandler(1);
            }}
          >
            1
          </button>
        )}

        {orderPagesSlicedArray[0] - 1 === 1 && (
          <>
            {orderPagesSlicedArray.map((num) => {
              if (currentPage === num) {
                return (
                  <button
                    key={num}
                    className=" border border-primary mx-1 w-10 h-10 bg-white font-bold text-center text-2xl"
                    onClick={() => {
                      orderPageChangeHandler(num);
                    }}
                  >
                    {num}
                  </button>
                );
              } else {
                return (
                  <button
                    key={num}
                    className=" border mx-1 w-10 h-10 bg-white text-center text-2xl"
                    onClick={() => {
                      orderPageChangeHandler(num);
                    }}
                  >
                    {num}
                  </button>
                );
              }
            })}
            <BiDotsHorizontalRounded className="mx-1 w-10 h-10" />
          </>
        )}

        {orderPagesSlicedArray[0] - 1 !== 1 &&
          orderPagesSlicedArray[orderPagesSlicedArray.length - 1] + 1 !==
            orderPagesArray.length && (
            <>
              <BiDotsHorizontalRounded className="mx-1 w-10 h-10" />
              {orderPagesSlicedArray.map((num) => {
                if (currentPage === num) {
                  return (
                    <button
                      key={num}
                      className=" border border-primary mx-1 w-10 h-10 bg-white font-bold text-center text-2xl"
                      onClick={() => {
                        orderPageChangeHandler(num);
                      }}
                    >
                      {num}
                    </button>
                  );
                } else {
                  return (
                    <button
                      key={num}
                      className=" border mx-1 w-10 h-10 bg-white text-center text-2xl"
                      onClick={() => {
                        orderPageChangeHandler(num);
                      }}
                    >
                      {num}
                    </button>
                  );
                }
              })}
              <BiDotsHorizontalRounded className="mx-1 w-10 h-10" />
            </>
          )}

        {orderPagesSlicedArray[orderPagesSlicedArray.length - 1] + 1 ===
          orderPagesArray.length && (
          <>
            <BiDotsHorizontalRounded className="mx-1 w-10 h-10" />
            {orderPagesSlicedArray.map((num) => {
              if (currentPage === num) {
                return (
                  <button
                    key={num}
                    className=" border border-primary mx-1 w-10 h-10 bg-white font-bold text-center text-2xl"
                    onClick={() => {
                      orderPageChangeHandler(num);
                    }}
                  >
                    {num}
                  </button>
                );
              } else {
                return (
                  <button
                    key={num}
                    className=" border mx-1 w-10 h-10 bg-white text-center text-2xl"
                    onClick={() => {
                      orderPageChangeHandler(num);
                    }}
                  >
                    {num}
                  </button>
                );
              }
            })}
          </>
        )}

        {currentPage === orderPagesArray.length ? (
          <button
            className=" border border-primary mx-1 w-10 h-10 bg-white font-bold text-center text-2xl"
            onClick={() => {
              orderPageChangeHandler(orderPagesArray.length);
            }}
          >
            {orderPagesArray.length}
          </button>
        ) : (
          <button
            className="border mx-1 w-10 h-10 bg-white text-center text-2xl"
            onClick={() => {
              orderPageChangeHandler(orderPagesArray.length);
            }}
          >
            {orderPagesArray.length}
          </button>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-row items-center justify-evenly w-full h-10 mt-3">
        {orderPagesArray.length > 1 &&
          orderPagesArray.map((num) => {
            if (currentPage === num) {
              return (
                <button
                  key={num}
                  className=" border border-primary mx-1 w-10 h-10 bg-white font-bold text-center text-2xl"
                  onClick={() => {
                    orderPageChangeHandler(num);
                  }}
                >
                  {num}
                </button>
              );
            } else {
              return (
                <button
                  key={num}
                  className=" border mx-1 w-10 h-10 bg-white text-center text-2xl"
                  onClick={() => {
                    orderPageChangeHandler(num);
                  }}
                >
                  {num}
                </button>
              );
            }
          })}
      </div>
    );
  }
}
