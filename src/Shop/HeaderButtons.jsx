import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function HeaderButtons() {
  const userdata = useSelector((state) => state.userReducer);
  const currentPath = useLocation();

  return (
    <div className="flex flex-row">
      {currentPath.pathname === "/" && (
        <button className="border border-black rounded-xl mx-2 px-2">
          <Link to="/cart">Kocsi</Link>
        </button>
      )}
      {userdata.admin && (
        <div>
          <button className="border border-black rounded-xl mx-2 px-2">
            {currentPath.pathname === "/" ? (
              <Link to="/admin">Admin oldal</Link>
            ) : (
              <Link to="/">Shop oldal</Link>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
