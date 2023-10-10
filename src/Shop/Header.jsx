import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/Auth";
import { useSelector } from "react-redux";
import { useContext, useRef } from "react";
import firebase from "../Utils/firebase";
import HeaderButtons from "./HeaderButtons";

export default function Header() {
  const { currentUser, login } = useContext(AuthContext);
  const userdata = useSelector((state) => state.userReducer);

  const emailRef = useRef();
  const pwRef = useRef();

  const onSignIn = (event) => {
    event.preventDefault();
    try {
      login(emailRef.current.value, pwRef.current.value);
    } catch (error) {
      console.error("login error");
      console.error(error);
    }
  };

  const onSignOut = (event) => {
    event.preventDefault();
    firebase.auth().signOut();
  };

  return (
    <header>
      <div className="flex flex-row items-center justify-end border-b">
        <HeaderButtons />
        <div className="flex flex-col min-h-[120px] max-h-[120px]">
          {currentUser === null ? (
            <div className="py-2">
              <form onSubmit={onSignIn} className="flex flex-row">
                <div className="flex flex-col">
                  <input
                    type="email"
                    ref={emailRef}
                    placeholder="Email cím"
                    className="border border-black rounded my-1 px-2"
                  ></input>
                  <input
                    type="password"
                    ref={pwRef}
                    placeholder="Jelszó"
                    className="border border-black rounded my-1 px-2"
                  ></input>
                </div>
                <div className="flex items-center justify-center">
                  <button className="border border-black rounded-xl mx-2  px-2">
                    Belépés
                  </button>
                </div>
              </form>
              <p className="text-center">
                {"Nincs fiókod? "}
                <Link
                  to="/signup"
                  className="text-base underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                >
                  Regisztálj itt!
                </Link>
              </p>
            </div>
          ) : (
            <div className="flex-1 flex-col text-center items-center justify-center py-2 border-l px-6">
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
      </div>
    </header>
  );
}
