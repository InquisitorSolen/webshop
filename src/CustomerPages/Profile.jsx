import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.userReducer);
  console.log(user);
  return (
    <>
      <h1>Profile</h1>
    </>
  );
}
