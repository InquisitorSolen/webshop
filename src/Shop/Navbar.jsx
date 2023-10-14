import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import LoginBtn from "./LoginBtn";
import { useContext, useState } from "react";
import { AuthContext } from "../Auth/Auth";
import { useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Navbar({ setLoginModalOpen }) {
  const { currentUser } = useContext(AuthContext);
  const userdata = useSelector((state) => state.userReducer);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <nav className="bg-white ">
      <div className="flex items-center font-medium justify-around">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between">
          <p>LOGO</p>
          <div
            className="text-3xl md:hidden"
            onClick={() => {
              setMobileNavOpen(!mobileNavOpen);
            }}
          >
            {mobileNavOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>
        </div>
        <ul className="md:flex hidden uppercase items-center gap-8">
          <li>
            <Link to="/" className="py-7 px-3 inline-block font-bold">
              WebShop
            </Link>
          </li>
          <li>
            <Link to="/cart" className="py-7 px-3 inline-block font-bold">
              Kosár
            </Link>
          </li>
          <NavLinks />
          {currentUser !== null && (
            <li>
              <Link to="/profile" className="py-7 px-3 inline-block font-bold">
                Profil
              </Link>
            </li>
          )}
          {userdata.admin && (
            <li>
              <Link to="/" className="py-7 px-3 inline-block font-bold">
                Admin
              </Link>
            </li>
          )}
        </ul>
        <div className="md:block hidden">
          <LoginBtn setLoginModalOpen={setLoginModalOpen} />
        </div>
        {/* Mobile nav bar */}
        <ul
          className={`md:hidden bg-white absolute h-full w-full bottom-0 py-24 duration-500 ${
            mobileNavOpen ? "left-0" : "left-[-100%]"
          }`}
        >
          <li>
            <Link to="/" className="py-7 px-3 inline-block font-bold">
              WebShop
            </Link>
          </li>
          <li>
            <Link to="/cart" className="py-7 px-3 inline-block font-bold">
              Kosár
            </Link>
          </li>
          <NavLinks />
          {currentUser !== null && (
            <li>
              <Link to="/profile" className="py-7 px-3 inline-block font-bold">
                Profil
              </Link>
            </li>
          )}
          {userdata.admin && (
            <li>
              <Link to="/profile" className="py-7 px-3 inline-block font-bold">
                Admin
              </Link>
            </li>
          )}
          <div className="py-5">
            <LoginBtn setLoginModalOpen={setLoginModalOpen} />
          </div>
        </ul>
      </div>
    </nav>
  );
}
