import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import firebase from "../Utils/firebase";
import pwCheck from "../Utils/pwCheck";

export default function Signup() {
  const nameRef1 = useRef();
  const nameRef2 = useRef();
  const emailRef = useRef();

  const [pw, setPw] = useState();
  const [pwConf, setPwConf] = useState();
  const [pwMessage, setPwMessage] = useState();
  const [pwSame, setPwSame] = useState(false);
  const [pwCorrectMessage, setPwCorrectMessage] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!(pwSame || pwCorrectMessage)) {
      console.log(pw);
      /*       firebase
        .auth()
        .createUserWithEmailAndPassword(emailRef, pw)
        .catch((err) => {
          console.error(err);
        }); */
    }
  };

  const pwChangeHandler = (event) => {
    console.log(event.target.value);
    if (pwCheck(event.target.value)) {
      if (event.target.value.length === 0) {
        setPwCorrectMessage(false);
      } else {
        setPwCorrectMessage(true);
      }
      setPwMessage(pwCheck(event.target.value));
    } else {
      console.log("pwset");
      setPwCorrectMessage(false);
      setPw(pw);
    }
  };

  const pwConfChangeHandler = (event) => {
    if (event.target.value === pw) {
      console.log("pwConf");
      setPwConf(event.target.value);
      setPwSame(false);
    } else {
      console.log("-----------------");
      console.log(pw);
      console.log(event.target.value);
      console.log("-----------------");
      if (event.target.value.length === 0) {
        setPwSame(false);
      } else {
        setPwSame(true);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="border border-black shadow-xl rounded-3xl p-6 text-center min-w-[350px]">
        <h1 className="mb-6 text-xl font-bold">Regisztrálj ingyenesen!</h1>
        <form onSubmit={onSubmit} className="flex flex-col">
          <input
            type="text"
            ref={nameRef1}
            placeholder="Vezetéknév"
            className="border-b my-2 px-2 focus:outline-none focus:border-b"
          ></input>
          <input
            type="text"
            ref={nameRef2}
            placeholder="Keresztnev(ek)"
            className="border-b my-2 px-2 focus:outline-none focus:border-b"
          ></input>
          <input
            ref={emailRef}
            type="email"
            placeholder="Email cím"
            className="border-b my-2 px-2 focus:outline-none focus:border-b"
          ></input>
          {pwCorrectMessage && <p className="max-w-[300px]">{pwMessage}</p>}
          <input
            value={pw}
            onChange={pwChangeHandler}
            type="password"
            placeholder="Jelszó"
            className="border-b my-2 px-2 focus:outline-none focus:border-b"
          ></input>
          {pwSame && (
            <p className="max-w-[300px]">A két jelszónak egyeznie kell!</p>
          )}
          <input
            value={pwConf}
            onChange={pwConfChangeHandler}
            type="password"
            placeholder="Jelszó megerősítése"
            className="border-b my-2 px-2 focus:outline-none focus:border-b"
          ></input>
          <button className="border border-black rounded-xl mx-16 my-6 px-2 py-1">
            Regisztráció
          </button>
        </form>
        <p>
          {"Már regisztrált? "}
          <Link
            to="/"
            className="text-base underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          >
            Jelnetkezzen be itt
          </Link>
        </p>
      </div>
    </div>
  );
}
