import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import AuthContext from "../../Context/AuthContext";
import { FiMoon, FiSun } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Header = () => {
  const { user, photoURL, isLoading, logout } = useContext(AuthContext);

  const [theme, setTheme] = useState("light");

  const handleLogOut = () => {
    logout()
      .then(() => {
        alert("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const navLink = (
    <>
      {[
        { to: "/", label: "Home" },
        { to: "/allRecipe", label: "All Recipes" },
        { to: "/dashboard", label: "Dashboard" },
        { to: "/about", label: "About us" },
        { to: "/contact", label: "support" },
     
      ].map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              `relative text-white font-semibold px-2 py-1 text-lg
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px]
              after:bg-white after:transition-all after:duration-300
              ${isActive ? "after:w-full" : "after:w-0 "}`
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <div>
      <Tooltip id="my-tooltip" />
      <div className="bg-primary shadow-sm">
        <div className="navbar max-w-7xl mx-auto ">
          {/* Navbar Start */}
          <div className="navbar-start pl-10 md:pl-10 lg:pl-10">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
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
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navLink}
              </ul>
            </div>

            <Link to={"/"} className="text-xl">
              <img
                className="h-26 md:pl-18"
                src="https://i.ibb.co/WpyMdg60/crave-Fusion.png"
                alt="Crave&Fusion"
              />
            </Link>
          </div>

          {/* Navbar End */}
          <div className="navbar-end hidden lg:flex items-center space-x-4">
            <ul className="menu menu-horizontal px-1">{navLink}</ul>

            {!isLoading && (
              <>
                {!user ? (
                  <>
                    <Link
                      to={"/logIn"}
                      className="btn btn-sm bg-white text-secondary btn-primary"
                    >
                      Login
                    </Link>
                    <Link to={"/register"} className="btn bg-white text-secondary btn-sm btn-primary">
                      Register
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center space-x-4">
                    {/* Move the theme toggle button OUTSIDE dropdown */}
                    <button
                      className="btn btn-ghost text-xl"
                      onClick={toggleTheme}
                    >
                      {theme === "light" ? (
                        <div
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Dark"
                        >
                          <FiMoon className="text-white" />
                        </div>
                      ) : (
                        <div
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Light"
                        >
                          <FiSun className="text-white" />
                        </div>
                      )}
                    </button>

                    {/* Avatar Dropdown */}
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 rounded-full">
                          <img alt={user?.displayName} src={photoURL} />
                        </div>
                      </div>

                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-28 p-2 shadow"
                      >
                        <li>{user?.displayName}</li>
                        <li onClick={handleLogOut}>Log out</li>
                      </ul>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
