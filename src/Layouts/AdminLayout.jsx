import { Navigate, Outlet } from "react-router-dom";
import Header from "../Shop/Header";
import { useSelector } from "react-redux";

export default function AdminLayout() {
  const userdata = useSelector((state) => state.userReducer);

  if (!userdata.admin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <h1>AdminLayer</h1>
      <Outlet />
    </>
  );
}
