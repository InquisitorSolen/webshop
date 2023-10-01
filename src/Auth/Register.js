import firebase from "../Utils/firebase";

const register = ({ email, pw }) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, pw)
    .then(() => {
      //navigation to main page
    })
    .catch((err) => {
      console.error(err);
    });
};

export default register();
