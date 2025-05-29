import React from "react";
import { User, Code, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore.js";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton.jsx";

const Navbar = () => {
  const { authUser } = useAuthStore();

  // console.log("AUTH_USER",authUser)

  return (

    <nav className="w-full bg-transparent py-5 relative z-50">
      <div className="flex w-full justify-between mx-auto max-w-7xl bg-black/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-200/10 p-4 rounded-2xl transition-all duration-300 hover:shadow-neutral-600/10">
        {/* Left Side - Logo Section */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="h-12 w-12 bg-primary/20 text-primary border-none p-2 rounded-full transition-all duration-300 group-hover:scale-105">
            <img
              src="/logo.png"
              className="h-full w-full object-contain"
              alt="LeetLab Logo"
            />
          </div>
          <span
            style={{ fontFamily: "font4" }}
            className="text-lg md:text-2xl font-bold tracking-tight transition-all duration-300 group-hover:text-primary bg-clip-text text-transparent bg-gradient-to-r from-[#FFBA2D] via-[#DE60D0] to-[#FE9332]"
          >
            LeetLab
          </span>
        </Link>

        {/* Right Side - Icons + Profile */}
        <div className="flex items-center gap-4 sm:gap-6 relative">
          {/* Notification Icon */}
          <button className="p-2 rounded-full hover:bg-gray-200/10 transition-all duration-300 hover:scale-110 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#FFD580]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          </button>

          {/* Fire Icon */}
          <button className="p-2 rounded-full hover:bg-gray-200/10 transition-all duration-300 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-orange-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
              />
            </svg>
          </button>

          {/* Profile Section */}
          <div className="dropdown dropdown-end relative">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar flex flex-row hover:scale-105 transition-transform duration-300"
            >
              <div className="w-10 rounded-full ring-2 ring-gray-400/30 hover:ring-primary/50 transition-all duration-300">
                <img
                  src={
                    authUser?.image ||
                    "https://avatar.iran.liara.run/public/boy"
                  }
                  alt="User Avatar"
                  className="object-cover"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 space-y-3 absolute right-0 top-full z-[1000]"
            >
              <li>
                <p className="text-base font-semibold">{authUser?.username}</p>
                <hr className="border-gray-200/10" />
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:bg-primary hover:text-white text-base font-semibold"
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
              </li>
              {authUser?.role === "ADMIN" && (
                <li>
                  <Link
                    to="/add-problem"
                    className="hover:bg-primary hover:text-white text-base font-semibold"
                  >
                    <Code className="w-4 h-4 mr-1" />
                    Add Problem
                  </Link>
                </li>
              )}
              <li>
                <LogoutButton className="hover:bg-primary hover:text-white">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </LogoutButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
