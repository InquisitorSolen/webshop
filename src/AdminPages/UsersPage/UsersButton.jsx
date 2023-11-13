import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { BiDotsHorizontalRounded } from "react-icons/bi";

export default function UsersButton({
  currentPage,
  setCurrentPage,
  selectVal,
  setCustomersChunked,
  setAdminChunked,
}) {
  const usersMap = useSelector((state) => state.usersMapReducer);

  const adminPagesArray = useMemo(
    () =>
      Array.from(
        { length: usersMap.adminUsers.length / 10 + 1 },
        (_, i) => i + 1
      ),
    [usersMap.adminUsers.length]
  );

  const customerPagesArray = useMemo(
    () =>
      Array.from(
        { length: usersMap.customerUsers.length / 10 + 1 },
        (_, i) => i + 1
      ),
    [usersMap.customerUsers.length]
  );

  const [customerPagesSlicedArray, setCustomerPagesSlicedArray] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [adminPagesSlicedArray, setAdminPagesSlicedArray] = useState([]);

  useEffect(() => {
    if (customerPagesArray.length > 5) {
      setCustomerPagesSlicedArray(customerPagesArray.slice(1, 5));
    }
    if (adminPagesArray.length > 5) {
      setAdminPagesSlicedArray(adminPagesArray.slice(1, 5));
    }
  }, [adminPagesArray, customerPagesArray]);

  const customerPageChangeHandler = (num) => {
    setCurrentPage(parseInt(num));
    const arrayHelper = (parseInt(num) - 1) * 10;
    if (customerPagesArray.length > 5) {
      if (num + 4 > customerPagesArray.length) {
        if (num === customerPagesArray.length) {
          setCustomersChunked(
            usersMap.customerUsers.slice(
              arrayHelper,
              usersMap.customerUsers.length
            )
          );
        } else {
          setCustomersChunked(
            usersMap.customerUsers.slice(arrayHelper, arrayHelper + 10)
          );
        }
        setCustomerPagesSlicedArray(
          customerPagesArray.slice(
            customerPagesArray.length - 5,
            customerPagesArray.length - 1
          )
        );
      } else {
        if (num === 1) {
          setCustomersChunked(usersMap.customerUsers.slice(0, arrayHelper));
          setCustomerPagesSlicedArray(customerPagesArray.slice(num, num + 4));
        } else {
          if (num - 1 === 1) {
            setCustomersChunked(
              usersMap.customerUsers.slice(arrayHelper, arrayHelper + 10)
            );
            setCustomerPagesSlicedArray(
              customerPagesArray.slice(num - 1, num + 3)
            );
          } else {
            setCustomersChunked(
              usersMap.customerUsers.slice(arrayHelper, arrayHelper + 10)
            );
            setCustomerPagesSlicedArray(
              customerPagesArray.slice(num - 2, num + 2)
            );
          }
        }
      }
    } else {
      if (arrayHelper + 10 > usersMap.customerUsers.length) {
        setCustomersChunked(
          usersMap.customerUsers.slice(
            arrayHelper,
            usersMap.customerUsers.length
          )
        );
      } else {
        setCustomersChunked(
          usersMap.customerUsers.slice(arrayHelper, arrayHelper + 30)
        );
      }
    }
  };

  const adminPageChangeHandler = (num) => {
    setCurrentPage(parseInt(num));
    const arrayHelper = (parseInt(num) - 1) * 10;
    if (arrayHelper + 10 > usersMap.adminUsers.length) {
      setAdminChunked(
        usersMap.adminUsers.slice(arrayHelper, usersMap.adminUsers.length)
      );
    } else {
      setAdminChunked(usersMap.adminUsers.slice(arrayHelper, arrayHelper + 30));
    }
  };

  if (selectVal === "0") {
    return (
      <div className="flex flex-row items-center justify-evenly w-full h-10 mb-3">
        {adminPagesArray.length > 1 &&
          adminPagesArray.map((num) => {
            if (currentPage === num) {
              return (
                <button
                  key={num}
                  className=" border border-primary mx-1 w-10 h-10 bg-white font-bold text-center text-2xl"
                  onClick={() => {
                    adminPageChangeHandler(1);
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
                    adminPageChangeHandler(1);
                  }}
                >
                  {num}
                </button>
              );
            }
          })}
      </div>
    );
  } else {
    if (customerPagesArray.length > 5) {
      return (
        <div className="flex flex-row items-center justify-center w-full mb-3">
          {currentPage === 1 ? (
            <button
              className=" border border-primary mx-1 w-10 h-10 bg-white font-bold text-center text-2xl"
              onClick={() => {
                customerPageChangeHandler(1);
              }}
            >
              1
            </button>
          ) : (
            <button
              className="border mx-1 w-10 h-10 bg-white text-center text-2xl"
              onClick={() => {
                customerPageChangeHandler(1);
              }}
            >
              1
            </button>
          )}

          {customerPagesSlicedArray[0] - 1 === 1 && (
            <>
              {customerPagesSlicedArray.map((num) => {
                if (currentPage === num) {
                  return (
                    <button
                      key={num}
                      className=" border border-primary mx-1 w-10 h-10 bg-white font-bold text-center text-2xl"
                      onClick={() => {
                        customerPageChangeHandler(num);
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
                        customerPageChangeHandler(num);
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

          {customerPagesSlicedArray[0] - 1 !== 1 &&
            customerPagesSlicedArray[customerPagesSlicedArray.length - 1] +
              1 !==
              customerPagesArray.length && (
              <>
                <BiDotsHorizontalRounded className="mx-1 w-10 h-10" />
                {customerPagesSlicedArray.map((num) => {
                  if (currentPage === num) {
                    return (
                      <button
                        key={num}
                        className=" border border-primary mx-1 w-10 h-10 bg-white font-bold text-center text-2xl"
                        onClick={() => {
                          customerPageChangeHandler(num);
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
                          customerPageChangeHandler(num);
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

          {customerPagesSlicedArray[customerPagesSlicedArray.length - 1] + 1 ===
            customerPagesArray.length && (
            <>
              <BiDotsHorizontalRounded className="mx-1 w-10 h-10" />
              {customerPagesSlicedArray.map((num) => {
                if (currentPage === num) {
                  return (
                    <button
                      key={num}
                      className=" border border-primary mx-1 w-10 h-10 bg-white font-bold text-center text-2xl"
                      onClick={() => {
                        customerPageChangeHandler(num);
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
                        customerPageChangeHandler(num);
                      }}
                    >
                      {num}
                    </button>
                  );
                }
              })}
            </>
          )}

          {currentPage === customerPagesArray.length ? (
            <button
              className=" border border-primary mx-1 w-10 h-10 bg-white font-bold text-center text-2xl"
              onClick={() => {
                customerPageChangeHandler(customerPagesArray.length);
              }}
            >
              {customerPagesArray.length}
            </button>
          ) : (
            <button
              className="border mx-1 w-10 h-10 bg-white text-center text-2xl"
              onClick={() => {
                customerPageChangeHandler(customerPagesArray.length);
              }}
            >
              {customerPagesArray.length}
            </button>
          )}
        </div>
      );
    } else {
      return (
        <div className="flex flex-row items-center justify-evenly w-full h-10 mb-3">
          {customerPagesArray.length > 1 &&
            customerPagesArray.map((num) => {
              if (currentPage === num) {
                return (
                  <button
                    key={num}
                    className=" border border-primary mx-1 w-10 h-10 bg-white font-bold text-center text-2xl"
                    onClick={() => {
                      customerPageChangeHandler(num);
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
                      customerPageChangeHandler(num);
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
}
