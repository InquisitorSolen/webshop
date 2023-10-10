import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../Shop/Header";
import Loader from "../UtilPages/Loader";

export default function CustomerLayout() {
  const userdata = useSelector((state) => state.userReducer);

  if (userdata.userLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <h1>CustomerLayout</h1>
      <Outlet />
    </>
  );
}
