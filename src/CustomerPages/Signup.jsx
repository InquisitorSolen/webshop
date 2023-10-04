import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1>Signup for free</h1>
          <input ref={nameRef} placeholder="Full Name"></input>
          <input
            ref={emailRef}
            type="email"
            placeholder="Email Address"
          ></input>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
          ></input>
          <input
            ref={passwordConfirmRef}
            type="password"
            placeholder="Password Confirmation"
          ></input>
          <button className="btn">Singup</button>
        </form>
        <p>
          Already registered?
          <Link to="/">Sign in here</Link>
        </p>
      </div>
    </div>
  );
}
