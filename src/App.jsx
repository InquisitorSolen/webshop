/* import { useEffect, useState } from "react";
import firebase from "./Utils/firebase"; */
import { Outlet, RouterProvider } from "react-router-dom";
import router from "./Utils/router";

function App() {
  /*   const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("users");
  console.log(ref);

  function getUsers() {
    setLoading(true);
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      console.log(items);
      setUsers(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  } */

  return (
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  );
}

export default App;
