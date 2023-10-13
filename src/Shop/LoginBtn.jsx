import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/Auth";
import { useSelector } from "react-redux";
import firebase from "../Utils/firebase";

export default function LoginBtn({ setLoginModalOpen }) {
  const { currentUser } = useContext(AuthContext);
  const userdata = useSelector((state) => state.userReducer);

  const login = (event) => {
    event.preventDefault();
    setLoginModalOpen(true);
  };

  const onSignOut = (event) => {
    event.preventDefault();
    firebase.auth().signOut();
  };

  return (
    <div className="flex flex-col">
      {currentUser === null ? (
        <>
          <button
            className="border border-black rounded-xl mx-2  px-2"
            onClick={login}
          >
            Bejelentkezés
          </button>
          <p className="text-center">
            {"Nincs fiókod? "}
            <Link
              to="/signup"
              className="text-base underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            >
              Regisztálj itt!
            </Link>
          </p>
        </>
      ) : (
        <div className="flex flex-row gap-4">
          <div className="flex flex-col mb-2 font-bold text-lg">
            <p>{userdata.familyName}</p>
            <p>{userdata.surname}</p>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="border border-black rounded-xl mx-2 px-2"
              onClick={onSignOut}
            >
              Kijelentkezés
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
