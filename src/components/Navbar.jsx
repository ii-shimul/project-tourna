import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { BiExit } from "react-icons/bi";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const logOut = () => {
    localStorage.clear("user");
    toast.success("Logout successful");
    window.location.reload();
  };

  const links = (
    <>
      <li className="text-lg roboto font-semibold">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="text-lg roboto font-semibold">
        <NavLink to="/add-team">Add Team</NavLink>
      </li>
      <li className="text-lg roboto font-semibold">
        <NavLink to="/add-tourna">Add Tournament</NavLink>
      </li>
      <li className="text-lg roboto font-semibold">
        <NavLink to="/about">About Us</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost lg:text-3xl text-xl liter">Tourna</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div className="avatar cursor-pointer">
              <div tabIndex={0} className="w-10 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-30 p-2 shadow-sm"
            >
              <li>
                <button onClick={logOut}>
                  <BiExit /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to={"/login"} className="btn bg-black text-white roboto">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
