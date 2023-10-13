import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import LoginBtn from "./LoginBtn";
import { useContext } from "react";
import { AuthContext } from "../Auth/Auth";
import { useSelector } from "react-redux";

export default function Navbar({ setLoginModalOpen }) {
  const { currentUser } = useContext(AuthContext);
  const userdata = useSelector((state) => state.userReducer);

  return (
    <nav className="bg-white ">
      <div className="flex items-center font-medium justify-around">
        <div>LOGO</div>
        <ul className="md:flex hidden uppercase items-center gap-8">
          <li>
            <Link to="/" className="py-7 px-3 inline-block">
              WebShop
            </Link>
          </li>
          <NavLinks />
          {currentUser !== null && (
            <li>
              <Link to="/profile" className="py-7 px-3 inline-block">
                Profil
              </Link>
            </li>
          )}
          {userdata.admin && (
            <li>
              <Link to="/profile" className="py-7 px-3 inline-block">
                Admin
              </Link>
            </li>
          )}
        </ul>
        <div>
          <LoginBtn setLoginModalOpen={setLoginModalOpen} />
        </div>
      </div>
    </nav>
  );
}
