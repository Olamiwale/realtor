import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import realtor from "../assets/th.jpeg";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <div className="border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src={realtor}
            alt="logo"
            className="h-[50px] cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold${
                pathMatchRoute("/") &&
                "text-gray-400 border-b-[3px] border-b-red-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold ${
                pathMatchRoute("/offers") &&
                "text-gray-400 border-b-[3px] border-b-red-500"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                "text-gray-400 border-b-[3px] border-b-red-500"
              }`}
              onClick={() => navigate("/profile")}
            >
              Profile
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
