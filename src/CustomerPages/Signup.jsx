import { pwCheck } from "../Utils/regexChecks";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import firebase from "../Utils/firebase";

export default function Signup() {
  const userRefFB = firebase.firestore().collection("users");
  const navigate = useNavigate();

  const [familyName, setFamilyName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConf, setPwConf] = useState("");
  const [pwSame, setPwSame] = useState(false);
  const [pwCorrectMessage, setPwCorrectMessage] = useState(false);
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!(pwSame || pwCorrectMessage)) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pw)
        .then((res) => {
          if (res) {
            const id = uuidv4();
            userRefFB
              .doc("customer")
              .update({
                [id]: {
                  id,
                  email,
                  familyName,
                  surname,
                  lvl: 1,
                  admin: false,
                  addresses: [],
                },
              })
              .catch((err) => {
                console.error(err);
              });
          }
        })
        .then(navigate("/"))
        .catch((err) => {
          setEmailAlreadyInUse(true);
          console.error(err);
        });
    }
  };

  const pwChangeHandler = (event) => {
    if (pwCheck(event.target.value)) {
      if (event.target.value.length === 0) {
        setPwCorrectMessage(false);
        setPw("");
      } else {
        setPwCorrectMessage(true);
        setPw(event.target.value);
      }
    } else {
      setPwCorrectMessage(false);
      setPw(event.target.value);
      if (event.target.value === pwConf) {
        setPwSame(false);
      } else {
        setPwSame(true);
      }
    }
  };

  const pwConfChangeHandler = (event) => {
    if (event.target.value === pw) {
      setPwConf(event.target.value);
      setPwSame(false);
    } else {
      if (event.target.value.length === 0) {
        setPwConf("");
        setPwSame(false);
      } else {
        setPwConf(event.target.value);
        setPwSame(true);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="border border-black shadow-xl rounded-3xl p-6 text-center min-w-[350px]">
        <h1 className="mb-6 text-xl font-bold">Regisztrálj ingyenesen!</h1>
        <div className="flex flex-col md:flex-row">
          <form onSubmit={onSubmit} className="flex flex-col">
            <input
              type="text"
              value={familyName}
              onChange={(event) => setFamilyName(event.target.value)}
              placeholder="Vezetéknév"
              required
              className="border-b my-2 px-2 focus:outline-none focus:border-b"
            ></input>
            <input
              type="text"
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
              placeholder="Keresztnev(ek)"
              required
              className="border-b my-2 px-2 focus:outline-none focus:border-b"
            ></input>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Email cím"
              required
              className="border-b my-2 px-2 focus:outline-none focus:border-b"
            ></input>
            <input
              value={pw}
              onChange={pwChangeHandler}
              type="password"
              placeholder="Jelszó"
              required
              className="border-b my-2 px-2 focus:outline-none focus:border-b"
            ></input>
            <input
              value={pwConf}
              onChange={pwConfChangeHandler}
              type="password"
              placeholder="Jelszó megerősítése"
              required
              className="border-b my-2 px-2 focus:outline-none focus:border-b"
            ></input>
            <button className="border border-black rounded-xl mx-16 my-6 px-2 py-1">
              Regisztráció
            </button>
          </form>
          <div className="text-center md:text-left md:ml-3 md:pl-3 border-t md:border-l md:border-t-0">
            <div className="mt-3 md:mt-0 mb-3 pb-3 border-b">
              <p className="max-w-[300px] md:max-w-3xl bg-yellow-100 px-2 pt-2 rounded-t-lg">
                A jelszónak legalább 8 karakter hosszúnak kell lennie!
              </p>
              <p className="max-w-[300px] md:max-w-3xl bg-yellow-100 px-2">
                A jelszónak tartalmaznia kell kis- és nagybetűt!
              </p>
              <p className="max-w-[300px] md:max-w-3xl bg-yellow-100 px-2 pb-2 rounded-b-lg">
                A jelszónak tartalmaznia kell speciális karaktert!
              </p>
            </div>
            <div className="text-center flex flex-col items-center justify-center">
              {pwCorrectMessage && (
                <p className="max-w-[300px] bg-red-100 border border-red-400 text-red-700 rounded mt-3 p-1">
                  A jelszó nem felel meg az elvárásoknak!
                </p>
              )}
              {pwSame && (
                <p className="max-w-[300px] bg-red-100 border border-red-400 text-red-700 rounded mt-3 p-1">
                  A két jelszónak egyeznie kell!
                </p>
              )}
              {emailAlreadyInUse && (
                <p className="max-w-[300px] bg-red-100 border border-red-400 text-red-700 rounded mt-3 p-1">
                  Az e-mail cím már regisztrálva van!
                </p>
              )}
            </div>
          </div>
        </div>
        <p className="mt-6">
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
