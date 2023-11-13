import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminUsers, getCustomerUsers } from "../Slices/usersMapSlice";
import Loader from "../UtilPages/Loader";
import UsersRender from "./UsersPage/UsersRender";

export default function Users() {
  const userdata = useSelector((state) => state.userReducer);
  const usersMap = useSelector((state) => state.usersMapReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminUsers());
    dispatch(getCustomerUsers());
  }, [dispatch]);

  if (!userdata.admin) {
    return <Navigate to="*" />;
  }

  if (usersMap.usersMapLoading) {
    return <Loader />;
  }

  return <UsersRender></UsersRender>;
}
