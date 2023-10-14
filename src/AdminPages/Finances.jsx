import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Finances() {
  const userdata = useSelector((state) => state.userReducer);

  if (!userdata.admin) {
    return <Navigate to="*" />;
  }

  return (
    <>
      <h1>Finances</h1>
    </>
  );
}
