import React, { useEffect, useState } from "react";
import firebase from "../Utils/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  function login(email, password) {
    console.log("login auth");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("logged in");
        setCurrentUser(user);
      } else {
        console.log("logged out");
        setCurrentUser(null);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = { login, currentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
