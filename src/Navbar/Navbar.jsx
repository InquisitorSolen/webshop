import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import NavLinks from "./NavLinks";
import LoginBtn from "./LoginBtn";
import NavAdminLinks from "./NavAdminLinks";

export default function Navbar({ setLoginModalOpen }) {
  const userdata = useSelector((state) => state.userReducer);
  const cart = useSelector((state) => state.cartReducer);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showMobilesublinks, setShowMobileSunlinks] = useState("");

  return (
    <nav className="bg-white border-b border-black">
      <div className="flex items-center font-medium justify-around">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between">
          <p>LOGO</p>
          <div
            className="text-3xl md:hidden"
            onClick={() => {
              setShowMobileSunlinks("");
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
          <li className="flex">
            <Link
              to="/cart"
              className={`py-7 pl-3 inline-block font-bold ${
                cart.cartItemNumber === 0 ? "pr-5" : "pr-0"
              }`}
            >
              Kosár
            </Link>
            {cart.cartItemNumber !== 0 && (
              <div className="mt-5 border border-warning rounded-full w-5 h-5 bg-danger flex items-center justify-center text-sm">
                <p className="text-sm">{cart.cartItemNumber}</p>
              </div>
            )}
          </li>
          <NavLinks
            showMobilesublinks={showMobilesublinks}
            setShowMobileSunlinks={setShowMobileSunlinks}
          />
          {userdata.admin && (
            <NavAdminLinks
              showMobilesublinks={showMobilesublinks}
              setShowMobileSunlinks={setShowMobileSunlinks}
            />
          )}
        </ul>
        <div className="md:block hidden">
          <LoginBtn setLoginModalOpen={setLoginModalOpen} mobile={false} />
        </div>
        {/* Mobile nav bar */}
        <ul
          className={`md:hidden bg-white absolute h-full w-full bottom-0 py-24 duration-500 ${
            mobileNavOpen ? "left-0" : "left-[-100%]"
          }`}
        >
          <div className="py-5">
            <LoginBtn
              setLoginModalOpen={setLoginModalOpen}
              setShowMobileSunlinks={setShowMobileSunlinks}
              setMobileNavOpen={setMobileNavOpen}
              mobileNavOpen={mobileNavOpen}
              mobile={true}
            />
          </div>
          <li className="border-t">
            <Link
              to="/"
              className="py-7 px-3 inline-block font-bold"
              onClick={() => {
                setShowMobileSunlinks("");
                setMobileNavOpen(!mobileNavOpen);
              }}
            >
              WebShop
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="py-7 px-3 inline-block font-bold"
              onClick={() => {
                setShowMobileSunlinks("");
                setMobileNavOpen(!mobileNavOpen);
              }}
            >
              Kosár
            </Link>
          </li>
          <NavLinks
            showMobilesublinks={showMobilesublinks}
            setShowMobileSunlinks={setShowMobileSunlinks}
            setMobileNavOpen={setMobileNavOpen}
          />
          {userdata.admin && (
            <NavAdminLinks
              showMobilesublinks={showMobilesublinks}
              setShowMobileSunlinks={setShowMobileSunlinks}
              setMobileNavOpen={setMobileNavOpen}
            />
          )}
        </ul>
      </div>
    </nav>
  );
}
