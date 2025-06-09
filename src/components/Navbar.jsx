import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  // Dummy user status - replace with real Firebase user later
  const user = null; // উদাহরণ: const { user, logout } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold text-primary" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/lost-found-items"
          className={({ isActive }) =>
            isActive ? "font-bold text-primary" : ""
          }
        >
          Lost & Found Items
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-item"
          className={({ isActive }) =>
            isActive ? "font-bold text-primary" : ""
          }
        >
          Add Item
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/recovered-items"
          className={({ isActive }) =>
            isActive ? "font-bold text-primary" : ""
          }
        >
          Recovered Items
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-items"
          className={({ isActive }) =>
            isActive ? "font-bold text-primary" : ""
          }
        >
          My Items
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar sticky bg-base-100 shadow-sm">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/bgCktXkj/5654592.png"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <NavLink
            to="/"
            className="text-xl font-bold text-primary hidden sm:inline-block"
          >
            WhereIsIt
          </NavLink>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-1">{links}</ul>
      </div>

      <div className="navbar-end space-x-2">
        {!user ? (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-sm font-bold text-primary border border-primary"
                  : "btn btn-sm"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-sm btn-outline font-bold text-primary border border-primary"
                  : "btn btn-sm btn-outline"
              }
            >
              Register
            </NavLink>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "https://i.ibb.co/Yy8Kjb6/avatar.png"}
                  alt="Profile"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <p className="font-semibold">{user.displayName}</p>
              </li>
              <li>
                <button>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
