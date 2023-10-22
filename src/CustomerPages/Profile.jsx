import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Slices/userSlice";
import Loader from "../UtilPages/Loader";
import firebase from "../Utils/firebase";

export default function Profile() {
  const user = useSelector((state) => state.userReducer);
  const usersRefFB = firebase.firestore().collection("users");
  const dispatch = useDispatch();

  const [familyName, setFamilyName] = useState(user.familyName);
  const [surname, setSurname] = useState(user.surname);
  const [postalCode, setPostalCode] = useState(
    user.addresses.length === 0 ? "" : user.addresses[0].postalCode
  );
  const [city, setCity] = useState(
    user.addresses.length === 0 ? "" : user.addresses[0].city
  );
  const [street, setStreet] = useState(
    user.addresses.length === 0 ? "" : user.addresses[0].street
  );
  const [building, setBuilding] = useState(
    user.addresses.length === 0 ? "" : user.addresses[0].building
  );
  const [floor, setFloor] = useState(
    user.addresses.length === 0 ? "" : user.addresses[0].floor
  );
  const [doorNumber, setDoorNumber] = useState(
    user.addresses.length === 0 ? "" : user.addresses[0].doorNumber
  );

  const [selectVal, setSelectVal] = useState("1");

  const width = user.email.length;

  const getUsers = () => {
    usersRefFB
      .doc(user.email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch(
            getUser({
              email: doc.data().email,
              familyName: doc.data().familyName,
              surname: doc.data().surname,
              lvl: doc.data().lvl,
              admin: doc.data().admin,
              userLoading: false,
              addresses: doc.data().addresses,
            })
          );
        }
      });
  };

  const handleSelectChange = (event) => {
    const val = parseInt(event.target.value);
    if (val === 0) {
      setPostalCode("");
      setCity("");
      setStreet("");
      setBuilding("");
      setFloor("");
      setDoorNumber("");
      setSelectVal("0");
    } else {
      setSelectVal(val);
      setPostalCode(user.addresses[val - 1].postalCode);
      setCity(user.addresses[val - 1].city);
      setStreet(user.addresses[val - 1].street);
      setBuilding(user.addresses[val - 1].building);
      setFloor(user.addresses[val - 1].floor);
      setDoorNumber(user.addresses[val - 1].doorNumber);
    }
  };

  const saveName = async (event) => {
    event.preventDefault();
    try {
      await usersRefFB.doc(user.email).update({ surname, familyName });
      getUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const addAddress = async (event) => {
    event.preventDefault();

    const address = { postalCode, city, street, building, floor, doorNumber };

    if (user.addresses.length === 0) {
      try {
        await usersRefFB.doc(user.email).update({ addresses: [address] });
        getUsers();
      } catch (err) {
        console.error(err);
      }
    } else {
      const localAddress = user.addresses.map((adr) => adr);
      localAddress.push(address);
      try {
        await usersRefFB.doc(user.email).update({ addresses: localAddress });
        getUsers();
        setSelectVal(localAddress.length);
      } catch (err) {
        console.error(err);
      }
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
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col">
                      <label>Irányítószám:</label>
                      <input
                        type="text"
                        placeholder="Irányítószám"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                        className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b"
                      ></input>
                    </div>
                    <div className="flex flex-col">
                      <label>Város neve:</label>
                      <input
                        type="text"
                        placeholder="Város neve"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b"
                      ></input>
                    </div>
                    <div className="flex flex-col">
                      <label>Utca neve és megnevezése:</label>
                      <input
                        type="text"
                        placeholder="Utca neve és megnevezése"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
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
                        placeholder="Épület száma"
                        value={building}
                        onChange={(e) => setBuilding(e.target.value)}
                        required
                        className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b"
                      ></input>
                    </div>
                    <div className="flex flex-col">
                      <label>Emelet:</label>
                      <input
                        type="text"
                        placeholder="Emelet"
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                        required
                        className="border-b border-black my-1 px-2 text-center md:focus:outline-none md:focus:border-b"
                      ></input>
                    </div>
                    <div className="flex flex-col">
                      <label>Ajtó:</label>
                      <input
                        type="text"
                        placeholder="Ajtó"
                        value={doorNumber}
                        onChange={(e) => setDoorNumber(e.target.value)}
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
