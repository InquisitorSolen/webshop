import firebase from "../Utils/firebase";

const login = ({ email, pw }) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, pw)
    .catch((err) => {
      console.error(err);
    });
};

export default login();
