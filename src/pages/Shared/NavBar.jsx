import React, { useContext } from "react";
import { NavLink } from "react-router"; 
import { AuthContext } from "../../Contexts/AuthContext";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then(() => console.log("signed out user"))
      .catch((error) => console.log(error));
  };

  // Reusable link style
  const linkClasses = ({ isActive }) =>
    `relative px-3 py-2 transition duration-300 
     before:content-[''] before:absolute before:-bottom-1 before:left-0 
     before:h-[2px] before:w-full before:bg-[#00CED1] before:scale-x-0 
     before:origin-left before:transition-transform before:duration-300 
     hover:before:scale-x-100
     ${isActive ? "text-[#00CED1] font-semibold before:scale-x-100" : "text-white"}`;

  const links = (
    <>
      <li><NavLink to="/" className={linkClasses}>Home</NavLink></li>
      <li><NavLink to="/alljobs" className={linkClasses}>All Jobs</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/addJob" className={linkClasses}>Add Job</NavLink></li>
          <li><NavLink to="/dashboard" className={linkClasses}>Dashboard</NavLink></li>
         
        </>
      )}
      <li><NavLink to="/aboutus" className={linkClasses}>About Us</NavLink></li>
      <li><NavLink to="/contact" className={linkClasses}>Contact</NavLink></li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-[#061F21] text-white shadow-md shadow-black/40">
      <div className="navbar px-6">
        {/* LEFT (Logo + Mobile Menu) */}
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown">
            <button tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content absolute left-0 mt-3 w-60 rounded-lg bg-[#061F21] p-3 shadow-lg z-[999]"
            >
              {links}

              {/* MOBILE AUTH SECTION */}
              <div className="block lg:hidden mt-3 space-y-2">
                {user ? (
                  <>
                    <div className="flex items-center space-x-2 px-3">
                      <img
                        src={user.photoURL || "https://i.ibb.co/2n4d9xm/default-avatar.png"}
                        alt="user"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-white">{user.displayName || "User"}</span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full py-2 px-4 rounded-xl bg-[#00CED1] text-white hover:bg-blue-600 transition"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/register"
                      className="block w-full py-2 px-4 text-center rounded-xl bg-[#00CED1] text-white hover:bg-blue-600 transition"
                    >
                      Register
                    </NavLink>
                    <NavLink
                      to="/signIn"
                      className="block w-full py-2 px-4 text-center rounded-xl bg-white text-[#00CED1] border border-[#00CED1] hover:bg-blue-100 transition"
                    >
                      Sign In
                    </NavLink>
                  </>
                )}
              </div>
            </ul>
          </div>
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white ml-2">Job</span>
            <span className="text-2xl font-bold text-[#00CED1]">Portal</span>
          </div>
        </div>

        {/* CENTER (Desktop links) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">{links}</ul>
        </div>

        {/* RIGHT (Desktop Auth Section) */}
        <div className="navbar-end hidden lg:flex items-center space-x-3">
          {user ? (
            <>
              <img
                src={user.photoURL || "https://i.ibb.co/2n4d9xm/default-avatar.png"}
                alt="user"
                className="w-9 h-9 rounded-full"
              />
            
              <button
                onClick={handleSignOut}
                className="py-2 px-6 rounded-2xl bg-[#00CED1] text-white hover:bg-blue-600 font-semibold transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <NavLink
                className="py-2 px-6 rounded-2xl bg-[#00CED1] text-white hover:bg-blue-600 transition"
                to="/register"
              >
                Register
              </NavLink>
              <NavLink
                className="py-2 px-6 rounded-2xl bg-white text-[#00CED1] border border-[#00CED1] hover:bg-blue-100 transition"
                to="/signIn"
              >
                Sign In
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
