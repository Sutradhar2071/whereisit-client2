import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import ThemeChange from "./ThemeChange";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Success", "Logged out successfully!", "success");
        navigate("/");
      })
      .catch((err) => {
        Swal.fire("Error", err.message, "error");
      });
  };

  // ... আগের অংশ একই থাকবে

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold underline"
              : "hover:underline"
          }
        >
          Home
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/lost-found-items"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold underline"
                : "hover:underline"
            }
          >
            Lost & Found Items
          </NavLink>
        </li>
      )}
    </>
  );

  // user-specific লিঙ্কগুলো শুধু dropdown বা mobile menu তে দেখাবো
  const userLinks = user ? (
    <>
      <li>
        <NavLink to="/add-item">Add Item</NavLink>
      </li>
      <li>
        <NavLink to="/recovered-items">Recovered Items</NavLink>
      </li>
      <li>
        <NavLink to="/my-items">My Items</NavLink>
      </li>
    </>
  ) : null;

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 text-base-content shadow-md px-4 md:px-10">
      {/* Left: Logo */}
      <div className="navbar-start">
        <NavLink
          to="/"
          className="flex items-center gap-2 font-bold text-lg md:text-xl text-primary whitespace-nowrap"
        >
          <img
            src="https://i.ibb.co/bgCktXkj/5654592.png"
            alt="Logo"
            className="w-8 h-8"
          />
          <span className="inline">WhereIsIt</span>
        </NavLink>
      </div>

      {/* Center: Main Menu (Large Screen এ শুধু Home + Lost & Found দেখাবে) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">{navLinks}</ul>
      </div>

      {/* Right: Theme + Auth */}
      <div className="navbar-end gap-2">
        <ThemeChange />

        {/* Mobile Menu Dropdown (small screen এ navLinks + userLinks দেখাবে) */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
            {userLinks}
            {!user ? (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            ) : (
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            )}
          </ul>
        </div>

        {/* Desktop Auth Section */}
        {!user ? (
          <div className="hidden lg:flex gap-2">
            <NavLink
              to="/login"
              className="btn btn-sm border border-primary text-primary hover:bg-primary hover:text-white"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="btn btn-sm btn-outline border border-primary text-primary"
            >
              Register
            </NavLink>
          </div>
        ) : (
          <div className="hidden lg:block dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
              data-tip={user.displayName || "User"}
            >
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "https://i.ibb.co/Yy8Kjb6/avatar.png"}
                  alt="user"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <p className="font-semibold text-center">{user.displayName}</p>
              </li>
              <li>
                <NavLink to="/add-item">Add Item</NavLink>
              </li>
              <li>
                <NavLink to="/recovered-items">Recovered Items</NavLink>
              </li>
              <li>
                <NavLink to="/my-items">My Items</NavLink>
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
