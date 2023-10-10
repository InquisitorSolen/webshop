import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../Utils/firebase";
import { AuthContext } from "../Auth/Auth";

export default function Header() {
  const { currentUser, login } = useContext(AuthContext);

  const emailRef = useRef();
  const pwRef = useRef();

  const onSignIn = (event) => {
    event.preventDefault();
    console.log("login header");
    login(emailRef.current.value, pwRef.current.value);
  };

  const onSignOut = (event) => {
    event.preventDefault();
    firebase.auth().signOut();
  };

  return (
    <header>
      <div className="flex flex-col items-end border-b py-2">
        {currentUser === null ? (
          <div>
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
              <button className="border border-black rounded-xl mx-2 my-5 px-2">
                Belépés
              </button>
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
          <div>
            <button
              className="border border-black rounded-xl mx-2 my-5 px-2"
              onClick={onSignOut}
            >
              Kilépés
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
