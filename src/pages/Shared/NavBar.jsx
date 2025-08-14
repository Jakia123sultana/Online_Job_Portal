import React, {use} from "react";
import {NavLink} from "react-router";
import {AuthContext} from "../../Contexts/AuthContext";
//import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const NavBar = () => {
  const {user, logOut} = use(AuthContext);
  console.log(user);
  const handleSignOut = () => {
    logOut()
      .then(() => {
        console.log("signed out user");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li className="group relative">
        <NavLink
          to="/"
          className={({isActive}) =>
            `text-white  transition duration-300 
                 before:content-[''] before:absolute before:-bottom-1 before:left-0 
                 before:h-[2px] before:w-full before:bg-sky-400 before:scale-x-0 
                 before:origin-left before:transition-transform before:duration-300 
                 group-hover:before:scale-x-100 ${
                   isActive ? "before:scale-x-100" : ""
                 }`
          }
        >
          Home
        </NavLink>
      </li>
      <li className="group relative">
        <NavLink
          to="/alljobs"
          className={({isActive}) =>
            `text-white  transition duration-300 
                 before:content-[''] before:absolute before:-bottom-1 before:left-0 
                 before:h-[2px] before:w-full before:bg-sky-400 before:scale-x-0 
                 before:origin-left before:transition-transform before:duration-300 
                 group-hover:before:scale-x-100 ${
                   isActive ? "before:scale-x-100" : ""
                 }`
          }
        >
          All Jobs
        </NavLink>
      </li>
      {/* {
            user && <>
              
            </>
        } */}
      {user && (
        <>
          <li className="group relative">
            <NavLink
              to="/addJob"
              className={({isActive}) =>
                `text-white  transition duration-300 
                 before:content-[''] before:absolute before:-bottom-1 before:left-0 
                 before:h-[2px] before:w-full before:bg-sky-400 before:scale-x-0 
                 before:origin-left before:transition-transform before:duration-300 
                 group-hover:before:scale-x-100 ${
                   isActive ? "before:scale-x-100" : ""
                 }`
              }
            >
              Add Job
            </NavLink>
          </li>
          <li className="group relative">
            <NavLink
              to="/dashboard"
              className={({isActive}) =>
                `text-white  transition duration-300 
                 before:content-[''] before:absolute before:-bottom-1 before:left-0 
                 before:h-[2px] before:w-full before:bg-sky-400 before:scale-x-0 
                 before:origin-left before:transition-transform before:duration-300 
                 group-hover:before:scale-x-100 ${
                   isActive ? "before:scale-x-100" : ""
                 }`
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
   <div className="navbar sticky top-0 z-50 bg-[#061F21] text-white shadow-md shadow-black/40 pl-10 pr-10">

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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div>
            <a className="text-2xl font-bold text-white ml-3">Job</a>
             <a className="text-2xl font-bold text-[#00ced1]">Portal</a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end space-x-2">
        {user ? (
          <button
            onClick={handleSignOut}
            className="py-2 px-6 rounded-2xl bg-[#00CED1] text-white hover:bg-blue-600 font-semibold self-center lg:self-start transition-colors duration-300 ml-4"
          >
            Sign Out
          </button>
        ) : (
          <>
            <NavLink
              className="py-2 px-6 rounded-2xl bg-[#00CED1] text-white hover:bg-blue-600 ml-4"
              to="/register"
            >
              Register
            </NavLink>
            <NavLink
              className="py-2 px-6 rounded-2xl bg-white text-[#00CED1] border border-[#00CDE1] hover:bg-blue-100 ml-4"
              to="/signIn"
            >
              Sign In
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
