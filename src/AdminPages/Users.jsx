import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminUsers,
  getCustomerUsers,
  moveToAdmin,
  moveToCustomer,
  updateMapAdmin,
  updateMapCustomer,
} from "../Slices/usersMapSlice";
import Loader from "../UtilPages/Loader";

export default function Users() {
  const userdata = useSelector((state) => state.userReducer);
  const usersMap = useSelector((state) => state.usersMapReducer);
  const dispatch = useDispatch();

  const [selectVal, setSelectVal] = useState("0");

  useEffect(() => {
    dispatch(getAdminUsers());
    dispatch(getCustomerUsers());
  }, [dispatch]);

  const LVLChangeHandlerAdmin = ({ event, user }) => {
    const lvl = parseInt(event.target.value);
    const localuser = { ...user, lvl: lvl };

    dispatch(updateMapAdmin({ id: user.id, data: localuser }));
  };

  const LVLChangeHandlerCustomer = ({ event, user }) => {
    const lvl = parseInt(event.target.value);
    const localuser = { ...user, lvl: lvl };

    dispatch(updateMapCustomer({ id: user.id, data: localuser }));
  };

  const moveToAdminClick = (user) => {
    const localuser = { ...user, admin: true };

    dispatch(moveToAdmin({ id: user.id, data: localuser }));
  };

  const moveToCustomerClick = (user) => {
    const localuser = { ...user, admin: false };

    dispatch(moveToCustomer({ id: user.id, data: localuser }));
  };

  if (!userdata.admin) {
    return <Navigate to="*" />;
  }

  if (usersMap.usersMapLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col grow">
      <div className="bg-slate-200 flex flex-col md:flex-row">
        <h1 className="text-xl text-center md:text-start md:text-3xl font-bold md:ml-6 md:my-6">
          Felhasználók:
        </h1>
        <h2 className="text-center md:text-start md:text-2xl font-semibold md:ml-7 md:my-7">
          Összesen{" "}
          <b>{usersMap.customerUsers.length + usersMap.adminUsers.length}</b>{" "}
          felhasználó
        </h2>
      </div>
      <div className="grow text-center justify-center items-center">
        <select
          onChange={(event) => setSelectVal(event.target.value)}
          value={selectVal}
          className="py-2 px-6 rounded-lg border border-black my-3 w-fit "
        >
          <option value={0}>Admin felhasználók</option>
          <option value={1}>Vásárlói felhasználók</option>
        </select>
        <div className="flex text-center justify-center items-center grow">
          <table className="mx-3 border border-black table-fixed grow">
            <thead>
              <tr>
                <th className="border border-black">Felhasználó neve</th>
                <th className="border border-black">Felhasználó e-mail cím</th>
                <th className="border border-black">Felhasználó szintje</th>
                <th className="border border-black">Felhasználó müveletek</th>
              </tr>
            </thead>
            <tbody>
              {selectVal === "0"
                ? usersMap.adminUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="border border-black">
                        {user.familyName} {user.surname}
                      </td>
                      <td className="border border-black">{user.email}</td>
                      <td className="border border-black">
                        <select
                          value={user.lvl}
                          onChange={(event) =>
                            LVLChangeHandlerAdmin({ event, user })
                          }
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                        </select>
                      </td>
                      <td className="border border-black py-1">
                        <button
                          className="border-2 border-danger text-danger rounded-2xl px-2 font-bold"
                          onClick={() => moveToCustomerClick(user)}
                        >
                          Admin jog megvonása
                        </button>
                      </td>
                    </tr>
                  ))
                : usersMap.customerUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="border border-black">
                        {user.familyName} {user.surname}
                      </td>
                      <td className="border border-black">{user.email}</td>
                      <td className="border border-black">
                        <select
                          value={user.lvl}
                          onChange={(event) =>
                            LVLChangeHandlerCustomer({ event, user })
                          }
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                        </select>
                      </td>
                      <td className="border border-black py-1">
                        <button
                          className="border-2 border-warning text-black rounded-2xl px-2 font-bold"
                          onClick={() => moveToAdminClick(user)}
                        >
                          Admin jog adása
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
