import { useDispatch } from "react-redux";
import { getUser, getUserAsync } from "../Slices/userSlice";
import React, { useEffect, useState } from "react";
import firebase from "../Utils/firebase";
import Loader from "../UtilPages/Loader";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        dispatch(getUserAsync(user.email));
        setLoading(false);
      } else {
        console.log("-----");
        dispatch(
          getUser({
            lvl: 0,
            email: "",
            familyName: "",
            surname: "",
            admin: false,
            addresses: [],
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
