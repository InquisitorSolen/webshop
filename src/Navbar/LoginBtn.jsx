import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/Auth";
import { useSelector } from "react-redux";
import firebase from "../Utils/firebase";

export default function LoginBtn({
  setLoginModalOpen,
  setShowMobileSunlinks,
  setMobileNavOpen,
  mobileNavOpen,
  mobile,
}) {
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
    <div className="flex flex-col justify-center items-center">
      {currentUser === null ? (
        <>
          <button
            className="border border-primary rounded-xl w-fit px-2 py-1 font-bold hover:bg-primary hover:text-white"
            onClick={login}
          >
            Bejelentkezés
          </button>
          <p className="text-center py-6 md:py-2">
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
        <div className="flex flex-col md:flex-row md:gap-4 ">
          <Link
            to="/profile"
            className="flex flex-col mb-2 font-bold text-lg items-center pb-3 md:pb-0 md:mb-0 hover:text-slate-600"
            onClick={() => {
              if (mobile) {
                setShowMobileSunlinks("");
                setMobileNavOpen(!mobileNavOpen);
              }
            }}
          >
            <p className=" mx-1 md:mx-0">{userdata.familyName}</p>
            <p>{userdata.surname}</p>
          </Link>
          <div className="flex items-center justify-center">
            <button
              className="border border-primary rounded-xl mx-2 px-2 py-1 hover:bg-primary hover:text-white"
              onClick={onSignOut}
            >
              <Link to="/">Kijelentkezés</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
