import { useDispatch } from "react-redux";
import { getUser } from "../Slices/userSlice";
import React, { useEffect, useState } from "react";
import firebase from "../Utils/firebase";
import Loader from "../UtilPages/Loader";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const userRefFB = firebase.firestore().collection("users");
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
                  addresses: doc.data().addresses,
                })
              );
              setLoading(false);
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
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = { currentUser };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
