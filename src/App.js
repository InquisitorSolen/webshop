import { useEffect, useState } from "react";
import firebase from "./firebase";

function App() {
  const [users, setUsers] = useState([]);
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
  }

  return (
    <div className="App">
      <header className="App-header">
        {users.map((user) => (
          <div key={user.key}>
            <h1>{user.name}</h1>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
