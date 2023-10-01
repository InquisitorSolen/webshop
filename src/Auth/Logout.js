import firebase from "../Utils/firebase";

const logOut = () => {
  firebase.auth().signOut();
};

export default logOut();
