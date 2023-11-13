import {
  moveToAdmin,
  moveToCustomer,
  updateMapAdmin,
  updateMapCustomer,
} from "../../Slices/usersMapSlice";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersButton from "./UsersButton";

export default function UsersRender() {
  const userdata = useSelector((state) => state.userReducer);
  const usersMap = useSelector((state) => state.usersMapReducer);
  const dispatch = useDispatch();

  const [selectVal, setSelectVal] = useState("0");
  const [customersChunked, setCustomersChunked] = useState([]);
  const [adminChunked, setAdminChunked] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    if (usersMap.adminUsers.length <= 10) {
      setAdminChunked(usersMap.adminUsers);
    } else {
      setAdminChunked(usersMap.adminUsers.slice(0, 10));
    }
    if (usersMap.customerUsers.length <= 10) {
      setCustomersChunked(usersMap.customerUsers);
    } else {
      setCustomersChunked(usersMap.customerUsers.slice(0, 10));
    }
  }, [usersMap.adminUsers, usersMap.customerUsers]);

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
      <div className="flex flex-col grow items-center border border-black rounded-xl m-6 shadow-2xl bg-white">
        <select
          onChange={(event) => {
            setSelectVal(event.target.value);
            setCurrentPage(1);
          }}
          value={selectVal}
          className="py-2 px-6 rounded-lg border border-black my-3 w-fit font-bold"
        >
          <option value={0}>Admin felhasználók</option>
          <option value={1}>Vásárlói felhasználók</option>
        </select>
        <div className="flex flex-col px-6 text-center justify-between items-center grow">
          <table className="border border-black table-fixed w-full">
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
                ? adminChunked.map((user) => (
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
                : customersChunked.map((user) => (
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
          <UsersButton
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            selectVal={selectVal}
            setCustomersChunked={setCustomersChunked}
            setAdminChunked={setAdminChunked}
          />
        </div>
      </div>
    </div>
  );
}
