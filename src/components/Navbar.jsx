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

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "underline text-primary font-semibold"
              : "hover:underline"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/lost-found-items"
          className={({ isActive }) =>
            isActive
              ? "underline text-primary font-semibold"
              : "hover:underline"
          }
        >
          Lost & Found Items
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-item"
          className={({ isActive }) =>
            isActive
              ? "underline text-primary font-semibold"
              : "hover:underline"
          }
        >
          Add Item
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/recovered-items"
          className={({ isActive }) =>
            isActive
              ? "underline text-primary font-semibold"
              : "hover:underline"
          }
        >
          Recovered Items
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/my-items"
            className={({ isActive }) =>
              isActive
                ? "underline text-primary font-semibold"
                : "hover:underline"
            }
          >
            My Items
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 shadow-md px-4 md:px-10">
      {/* Left: Logo & Mobile Dropdown */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
            {!user && (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-primary"
        >
          <img
            src="https://i.ibb.co/bgCktXkj/5654592.png"
            alt="Logo"
            className="w-8 h-8"
          />
          WhereIsIt
        </NavLink>
      </div>

      {/* Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>

      {/* Right: Auth Buttons, Theme Toggle or Profile */}
      <div className="navbar-end gap-3">
        {/* ✅ Theme Toggle Button */}
        <ThemeChange />

        {!user ? (
          <>
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
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
              data-tip={user.displayName || "User"}
            >
              <div className="w-10 rounded-full">
                <img
                  src={
                    user.photoURL || "https://i.ibb.co/Yy8Kjb6/avatar.png"
                  }
                  alt="user"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <p className="font-semibold">{user.displayName}</p>
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
