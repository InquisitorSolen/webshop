import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full h-fit bg-slate-200 border-t border-black flex flex-col justify-center items-center">
      <div className="flex flex-row justify-evenly w-full">
        <div className="flex flex-row items-center">
          <img
            src={require("../assets/logo-black.png")}
            alt="logo"
            className="justify-cente h-[50px]"
          />
          <div className="flex flex-col h-[100px] justify-center ml-3">
            <a href="tel:+11111111111">+11 11 111 1111 </a>
            <a href="mailto:alkio2535@gmail.com">alkio2535@gmail.com</a>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold">Tudjon meg többet rólunk:</p>
          <Link
            to={"/aboutus"}
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          >
            itt!
          </Link>
        </div>
      </div>
      <p>AlkIO 2023 &copy; Minden jog fenntartva</p>
    </footer>
  );
}
