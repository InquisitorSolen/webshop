import { useDispatch } from "react-redux";
import { getUser } from "../Slices/userSlice";
import React, { useEffect, useState } from "react";
import firebase from "../Utils/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const userRefFB = firebase.firestore().collection("users");
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState(null);

  function login(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(getUser({ lvl: 0, admin: false, userLoading: true }));
        setCurrentUser(user);
        userRefFB
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
                })
              );
            } else {
              console.error("error getting user");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        dispatch(
          getUser({
            email: "",
            familyName: "",
            surname: "",
            lvl: 0,
            admin: false,
          })
        );
        setCurrentUser(null);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = { login, currentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
