import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getCart, setPurchase } from "../../Slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CartOrder() {
  const cart = useSelector((state) => state.cartReducer);
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultAddress = {
    postalCode: "",
    city: "",
    street: "",
    building: "",
    floor: "",
    doorNumber: "",
  };

  const [selectVal, setSelectVal] = useState(
    user.addresses.length === 0 ? "0" : "1"
  );
  const [address, setAddress] = useState(
    user.addresses.length === 0 ? defaultAddress : user.addresses[0]
  );
  const [paymentType, setPaymentType] = useState("cash");
  const [contact, setContact] = useState({ email: "", name: "" });

  const handleSelectChange = (event) => {
    const val = parseInt(event.target.value);
    if (val === 0) {
      setAddress(defaultAddress);
      setSelectVal("0");
    } else {
      setSelectVal(val);
      setAddress(user.addresses[val - 1]);
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const pay = (e) => {
    e.preventDefault();

    const fulladdress = `${address.postalCode} ${address.city} ${address.street} ${address.building} ${address.floor} ${address.doorNumber} `;
    const cartitems = cart.cartProducts.map((item) => {
      return {
        id: item.id,
        quantity: item.inCartAmount,
        name: `${item.name} ${item.type} ${item.productCategory}`,
      };
    });
    let data = {
      cartProducts: cartitems,
      address: fulladdress,
    };
    if (user.lvl === 2) {
      data = {
        ...data,
        price:
          parseInt(Math.round(cart.cartPrice - cart.cartPrice * 0.15) / 5) * 5,
      };
    } else {
      data = { ...data, price: parseInt(Math.round(cart.cartPrice) / 5) * 5 };
    }

    if (user.lvl === 0) {
      const contact = {};
      dispatch(setPurchase({ user: null, data, contact }));
      dispatch(getCart({ cartProducts: [], cartPrice: 0, cartItemNumber: 0 }));
    } else {
      if (user.lvl) {
      }
      const contact = {
        email: user.email,
        name: `${user.familyName} ${user.surname}`,
      };
      dispatch(setPurchase({ user, data, contact }));
      dispatch(getCart({ cartProducts: [], cartPrice: 0, cartItemNumber: 0 }));
    }

    navigate("/");
  };

  if (cart.cartProducts.length === 0) {
    return <Navigate to="*" />;
  }

  return (
    <div className="flex grow justify-center">
      {/* Address Card */}
      <div className="text-center border m-6 h-fit">
        <h1 className="mx-3 border-b py-6 px-3 font-bold text-xl">
          Kiszállítási cím:
        </h1>
        {user.addresses.length !== 0 && (
          <div className="mx-3 border-b py-6 px-3">
            <select
              onChange={handleSelectChange}
              value={selectVal}
              className="bg-slate-100 focus:outline-none"
            >
              <option value={0}>Másik cím választása</option>
              {user.addresses.map((address, key) => (
                <option key={key} value={key + 1}>
                  {`${address.city} - ${address.street}`}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectVal === "0" ? (
          <form
            className="flex flex-col justify-center"
            id="addressForm"
            onSubmit={pay}
          >
            {user.lvl === 0 && (
              <div className="mx-3 border-b py-6 px-3 flex flex-row">
                <div className="flex flex-col w-60 mx-3 py-6 px-3 ">
                  <label>E-mail cím:</label>
                  <input
                    className="mt-3 border bg-white text-center focus:outline-none"
                    type="email"
                    name="email"
                    placeholder="E-mail cím"
                    value={contact.email}
                    onChange={handleContactChange}
                    required
                  ></input>
                </div>
                <div className="flex flex-col w-60 mx-3 py-6 px-3">
                  <label>Vásárló neve:</label>
                  <input
                    className="mt-3 border bg-white text-center focus:outline-none"
                    type="text"
                    name="name"
                    placeholder="Vásárló neve"
                    value={contact.name}
                    onChange={handleContactChange}
                    required
                  ></input>
                </div>
              </div>
            )}
            <div className="flex flex-row justify-center">
              <div className="flex flex-col">
                <div className="flex flex-col w-60 mx-3 py-6 px-3">
                  <label>Irányítószám:</label>
                  <input
                    className="mt-3 border bg-white text-center focus:outline-none"
                    type="text"
                    name="postalCode"
                    placeholder="Irányítószám"
                    value={address.postalCode}
                    onChange={changeHandler}
                    required
                  ></input>
                </div>
                <div className="flex flex-col w-60 mx-3 py-6 px-3">
                  <label>Város neve:</label>
                  <input
                    className="mt-3 border bg-white text-center focus:outline-none"
                    type="text"
                    name="city"
                    placeholder="Város neve"
                    value={address.city}
                    onChange={changeHandler}
                    required
                  ></input>
                </div>
                <div className="flex flex-col w-60 mx-3 py-6 px-3">
                  <label>Közterület neve:</label>
                  <input
                    className="mt-3 border bg-white text-center focus:outline-none"
                    type="text"
                    name="street"
                    placeholder="Közterület neve"
                    value={address.street}
                    onChange={changeHandler}
                    required
                  ></input>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col w-60 mx-3 py-6 px-3">
                  <label>Épület száma:</label>
                  <input
                    className="mt-3 border bg-white text-center focus:outline-none"
                    type="text"
                    name="building"
                    placeholder="Épület száma"
                    value={address.building}
                    onChange={changeHandler}
                    required
                  ></input>
                </div>
                <div className="flex flex-col w-60 mx-3 py-6 px-3">
                  <label>Emelet:</label>
                  <input
                    className="mt-3 border bg-white text-center focus:outline-none"
                    type="text"
                    name="floor"
                    placeholder="Emelet"
                    value={address.floor}
                    onChange={changeHandler}
                    required
                  ></input>
                </div>
                <div className="flex flex-col w-60 mx-3 py-6 px-3">
                  <label>Ajtó:</label>
                  <input
                    className="mt-3 border bg-white text-center focus:outline-none"
                    type="text"
                    name="doorNumber"
                    placeholder="Ajtó"
                    value={address.doorNumber}
                    onChange={changeHandler}
                    required
                  ></input>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex flex-row justify-center">
            <div className="flex flex-col">
              <div className="flex flex-col w-60 mx-3 py-6 px-3">
                <label>Irányítószám:</label>
                <p className="mt-3 border bg-white text-center">
                  {address.postalCode}
                </p>
              </div>
              <div className="flex flex-col w-60 mx-3 py-6 px-3">
                <label>Város neve:</label>
                <p className="mt-3 border bg-white text-center">
                  {address.city}
                </p>
              </div>
              <div className="flex flex-col w-60 mx-3 py-6 px-3">
                <label>Közterület neve:</label>
                <p className="mt-3 border bg-white text-center">
                  {address.street}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col w-60 mx-3 py-6 px-3">
                <label>Épület száma:</label>
                <p className="mt-3 border bg-white text-center">
                  {address.building}
                </p>
              </div>
              <div className="flex flex-col w-60 mx-3 py-6 px-3">
                <label>Emelet:</label>
                <p className="mt-3 border bg-white text-center">
                  {address.floor}
                </p>
              </div>
              <div className="flex flex-col w-60 mx-3 py-6 px-3">
                <label>Ajtó:</label>
                <p className="mt-3 border bg-white text-center">
                  {address.doorNumber}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center">
        <div className="text-center border m-6 h-fit">
          <h1 className="mx-3 border-b py-6 px-3 font-bold text-xl">
            Fizetési mód:
          </h1>
          <div className="mx-3 border-b py-6 px-3 flex justify-between">
            <label>Utánvét:</label>
            <input
              type="radio"
              onChange={setPaymentType}
              value="cash"
              checked={paymentType === "cash"}
            ></input>
          </div>
          <div className="mx-3 py-6 px-3 flex justify-between">
            <label>Bankkártya:</label>
            <input
              type="radio"
              onChange={setPaymentType}
              value="card"
              checked={paymentType === "card"}
              disabled
            ></input>
          </div>
        </div>
        {selectVal === "0" ? (
          <button
            type="submit"
            form="addressForm"
            className="border border-primary rounded-2xl py-1 px-2 font-bold w-fit bg-slate-200"
          >
            Megrendelés
          </button>
        ) : (
          <button
            className="border border-primary rounded-2xl py-1 px-2 font-bold w-fit bg-slate-200"
            onClick={pay}
          >
            Megrendelés
          </button>
        )}
      </div>
    </div>
  );
}
