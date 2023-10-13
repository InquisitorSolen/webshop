import { useState } from "react";
import { useSelector } from "react-redux";
import { AiFillCaretDown } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

export default function HeaderButtons() {
  const userdata = useSelector((state) => state.userReducer);
  const currentPath = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div>
      <ul className="flex flex-col font-semibold gap-6 md:flex-row md:gap-0">
        {currentPath.pathname !== "/cart" && (
          <li className="mx-2 px-2 text-xl text-sky-700 hover:text-sky-500">
            <Link to="/cart">Kosár</Link>
          </li>
        )}
        {userdata.lvl !== 0 && currentPath.pathname !== "/profile" && (
          <li className="mx-2 px-2 text-xl text-sky-700 hover:text-sky-500">
            <Link to="/profile">Profil</Link>
          </li>
        )}
        {userdata.admin && (
          <div className="mx-2 px-2">
            <li className="text-xl text-sky-700 hover:text-sky-500 flex flex-row items-center">
              <Link to="/admin">Admin oldalak</Link>
              <AiFillCaretDown />
            </li>
            <ul className="hidden">
              <li className=" text-xl text-sky-700 hover:text-sky-500">
                <Link to="/admin">Pénzügyek</Link>
              </li>
              <li className=" text-xl text-sky-700 hover:text-sky-500">
                <Link to="/admin">Áruk</Link>
              </li>
            </ul>
          </div>
        )}
        {currentPath.pathname !== "/" && (
          <li className="mx-2 px-2 text-xl text-sky-700 hover:text-sky-500">
            <Link to="/">Webshop</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
