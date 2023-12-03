import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../Slices/userSlice";
import Loader from "../UtilPages/Loader";
import ProfileOrder from "./ProfilePage/ProfileOrder";
import ProfileDeleteModal from "./ProfilePage/ProfileDeleteModal";

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
  const [selectPage, setSelectPage] = useState("1");
  const [modalOpen, setModalOpen] = useState(false);

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

    dispatch(
      updateUser({
        id: user.id,
        data: { ...user, familyName: familyName, surname: surname },
      })
    );
  };

  const addAddress = async (event) => {
    event.preventDefault();
    const localAddress = user.addresses.map((adr) => adr);

    if (parseInt(selectVal) === 0) {
      localAddress.push(address);
    } else {
      localAddress.splice(selectVal - 1, 1, address);
    }
    dispatch(
      updateUser({
        id: user.id,
        data: { ...user, addresses: localAddress },
      })
    );
  };

  if (user.addresses === undefined) {
    return <Loader />;
  }

  return (
    <div className="w-full flex flex-col md:grow grow">
      <div className="bg-slate-200 flex flex-col md:flex-row w-full justify-between">
        <div className="flex flex-row">
          <h1 className="text-2xl text-center md:text-start md:text-3xl font-bold md:ml-6 md:my-6">
            Profil:
          </h1>
          <h2 className="text-center md:text-start md:text-2xl font-semibold md:ml-3 md:my-7">
            {user.familyName} {user.surname}
          </h2>
        </div>
        <div className="flex flex-row gap-6 items-center">
          <button
            className={`border ${
              selectPage === "2"
                ? "border-primary hover:bg-primary hover:text-white"
                : "border-slate-600 bg-slate-600 text-white"
            } rounded-2xl py-1 px-2 font-bold  h-fit`}
            disabled={selectPage === "1"}
            onClick={() => {
              setSelectPage("1");
            }}
          >
            Profil
          </button>
          <button
            className={`border ${
              user.orders.length === 0
                ? "border-slate-600 bg-slate-600 text-white"
                : selectPage === "1"
                ? "border-primary hover:bg-primary hover:text-white"
                : "border-slate-600 bg-slate-600 text-white"
            }  rounded-2xl py-1 px-2 font-bold  h-fit`}
            disabled={user.orders.length === 0 || selectPage === "2"}
            onClick={() => {
              setSelectPage("2");
            }}
          >
            Rendelések
          </button>
        </div>
        <button
          className="border border-danger rounded-2xl py-1 px-2 font-bold hover:bg-danger h-fit my-7 mr-6"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Profil törlése
        </button>
      </div>
      {selectPage === "1" ? (
        <div className="text-center  grow">
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
                    className="border-b border-black my-1 px-2 text-center w-56"
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
                    className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b w-56"
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
                    className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b w-56"
                  ></input>
                </div>
              </div>
              <button className="border border-primary hover:bg-primary hover:text-white rounded-xl px-3 py-1 text-center text-base font-bold w-fit">
                Mentés
              </button>
            </form>
            {/* Address card */}
            <div className="w-full h-full flex flex-col ">
              <div>
                <h1 className="text-2xl mt-6 font-bold">Kiszállítási cím</h1>
              </div>
              <div className="text-center border border-black rounded-xl m-6 shadow-2xl flex flex-col h-fit items-center bg-white">
                {user.addresses.length === 0 ? (
                  <p className="text-lg mt-3 font-semibold">
                    Még nincs cím felvéve
                  </p>
                ) : (
                  <>
                    <p className="my-3 font-semibold w-full text-center">
                      Új cím felvételéhez válassza az "Új cím felvétele" opciót
                      a listából
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
                          className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b w-64"
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
                          className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b w-64"
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
                          className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b w-64"
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
                          className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b w-64"
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
                          className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b w-64"
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
                          className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b w-64"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <button className="border border-primary hover:bg-primary hover:text-white rounded-xl px-3 py-1 text-center text-base font-bold w-fit">
                    Mentés
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ProfileOrder />
      )}
      <ProfileDeleteModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}
