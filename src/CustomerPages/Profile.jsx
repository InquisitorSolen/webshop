import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAdmin, updateCustomer } from "../Slices/userSlice";
import Loader from "../UtilPages/Loader";

export default function Profile() {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const defaultAddress = {
    postalCode: "",
    city: "",
    street: "",
    building: "",
    floor: "",
    doorNumber: "",
  };

  useEffect(() => {
    setFamilyName(user.familyName);
    setSurname(user.surname);
    if (user.addresses.length === 0) {
      setAddress(defaultAddress);
    } else {
      setAddress(user.addresses[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.addresses, user.familyName, user.surname]);

  const [familyName, setFamilyName] = useState(user.familyName);
  const [surname, setSurname] = useState(user.surname);
  const [selectVal, setSelectVal] = useState("1");
  const [address, setAddress] = useState(
    user.addresses.length === 0 ? defaultAddress : user.addresses[0]
  );

  const width = user.email.length;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

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

  const saveName = async (event) => {
    event.preventDefault();
    const localuser = { ...user };
    delete localuser.userLoading;

    if (user.admin) {
      dispatch(
        updateAdmin({
          id: user.id,
          data: { ...localuser, familyName: familyName, surname: surname },
        })
      );
    } else {
      dispatch(
        updateCustomer({
          id: user.id,
          data: { ...localuser, familyName: familyName, surname: surname },
        })
      );
    }
  };

  const addAddress = async (event) => {
    event.preventDefault();
    const localAddress = user.addresses.map((adr) => adr);
    const localuser = { ...user };
    delete localuser.userLoading;
    if (user.admin) {
      if (parseInt(selectVal) === 0) {
        localAddress.push(address);
      } else {
        localAddress.splice(selectVal - 1, 1, address);
      }
      dispatch(
        updateAdmin({
          id: user.id,
          data: { ...localuser, addresses: localAddress },
        })
      );
    } else {
      if (parseInt(selectVal) === 0) {
        localAddress.push(address);
      } else {
        localAddress.splice(selectVal - 1, 1, address);
      }
      dispatch(
        updateCustomer({
          id: user.id,
          data: { ...localuser, addresses: localAddress },
        })
      );
    }
  };

  if (user.addresses === undefined) {
    return <Loader />;
  }

  return (
    <div className="w-full flex flex-col md:flex-row md:grow justify-center items-center grow">
      <div className="text-center border border-black rounded-xl m-6 bg-white md:h-fit h-full md:w-full grow">
        <div className="flex flex-col md:flex-row h-full w-full">
          <form
            className="flex flex-col m-6 md:border-r border-b pb-6 md:pb-0 md:border-b-0 md:pr-10 items-center"
            onSubmit={saveName}
          >
            <h1 className="text-2xl font-bold">Profil adatok</h1>
            <div className="flex flex-col justify-center grow gap-6 mb-6 md:mb-0">
              <div className="flex flex-col ">
                <label>E-mail cím:</label>
                <input
                  type="text"
                  value={user.email}
                  required
                  disabled
                  size={width}
                  className="border-b border-black my-1 px-2 text-center"
                ></input>
              </div>
              <div className="flex flex-col">
                <label>Vezetéknév:</label>
                <input
                  type="text"
                  placeholder="Vezetéknév"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  required
                  size={width}
                  className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b"
                ></input>
              </div>
              <div className="flex flex-col">
                <label>Keresztnev(ek):</label>
                <input
                  type="text"
                  placeholder="Keresztnev(ek)"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                  size={width}
                  className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b"
                ></input>
              </div>
            </div>
            <button className="border border-black rounded-xl px-3 py-1 text-center text-base font-bold w-fit">
              Mentés
            </button>
          </form>
          {/* Address card */}
          <div className="w-full h-full flex flex-col">
            <div>
              <h1 className="text-2xl mt-6 font-bold">Kiszállítási cím</h1>
            </div>
            <div className="text-center border border-black rounded-xl m-6 shadow-2xl flex flex-col h-fit items-center">
              {user.addresses.length === 0 ? (
                <p className="text-lg mt-3 font-semibold">
                  Még nincs cím felvéve
                </p>
              ) : (
                <>
                  <p className="my-3 font-semibold w-full text-center">
                    Új cím felvételéhez válassza az "Új cím felvétele" opciót a
                    listából
                  </p>
                  <select
                    onChange={handleSelectChange}
                    value={selectVal}
                    className="py-2 px-6 rounded-lg border border-black mt-3 w-fit "
                  >
                    <option value={0}>Új cím felvétele</option>
                    {user.addresses.map((address, key) => (
                      <option key={key} value={key + 1}>
                        {`${address.city} - ${address.street}`}
                      </option>
                    ))}
                  </select>
                </>
              )}
              <form
                className="m-3 my-6 gap-3 flex flex-col grow w-full items-center justify-between"
                onSubmit={addAddress}
              >
                <div className="flex md:flex-row flex-col justify-evenly w-full items-center my-6 grow">
                  <div className="flex flex-col gap-6 mb-6 md:mb-0">
                    <div className="flex flex-col">
                      <label>Irányítószám:</label>
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Irányítószám"
                        value={address.postalCode}
                        onChange={changeHandler}
                        required
                        className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b"
                      ></input>
                    </div>
                    <div className="flex flex-col">
                      <label>Város neve:</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="Város neve"
                        value={address.city}
                        onChange={changeHandler}
                        required
                        className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b"
                      ></input>
                    </div>
                    <div className="flex flex-col">
                      <label>Közterület neve és megnevezése:</label>
                      <input
                        type="text"
                        name="street"
                        placeholder="Utca neve és megnevezése"
                        value={address.street}
                        onChange={changeHandler}
                        required
                        className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b"
                      ></input>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col">
                      <label>Épület száma:</label>
                      <input
                        type="text"
                        name="building"
                        placeholder="Épület száma"
                        value={address.building}
                        onChange={changeHandler}
                        required
                        className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b"
                      ></input>
                    </div>
                    <div className="flex flex-col">
                      <label>Emelet:</label>
                      <input
                        type="text"
                        name="floor"
                        placeholder="Emelet"
                        value={address.floor}
                        onChange={changeHandler}
                        required
                        className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b"
                      ></input>
                    </div>
                    <div className="flex flex-col">
                      <label>Ajtó:</label>
                      <input
                        type="text"
                        name="doorNumber"
                        placeholder="Ajtó"
                        value={address.doorNumber}
                        onChange={changeHandler}
                        required
                        className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b"
                      ></input>
                    </div>
                  </div>
                </div>
                <button className="border border-black rounded-xl px-3 py-1 text-center text-base font-bold w-fit">
                  Mentés
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
