import { Outlet } from "react-router-dom";
import Header from "../CustomerPages/Shop/Header";

export default function CustomerLayout() {
  return (
    <>
      <Header />
      <h1>CustomerLayout</h1>
      <Outlet />
    </>
  );
}
