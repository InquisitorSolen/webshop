import { Outlet } from "react-router-dom";
import Header from "../Shop/Header";

export default function AdminLayout() {
  return (
    <>
      <Header />
      <h1>AdminLayer</h1>
      <Outlet />
    </>
  );
}
