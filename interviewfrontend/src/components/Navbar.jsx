// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Your Logo</div>

        <div className="hidden md:flex space-x-4">
          <Link to={"/students"} className="text-white hover:text-gray-300">
            Students
          </Link>
          <Link to={"/teachers"} className="text-white hover:text-gray-300">
            Teachers
          </Link>
          <Link to={"/marks"} className="text-white hover:text-gray-300">
            Marks
          </Link>
        </div>

        <div className="md:hidden">
          {/* Add your mobile menu button/icon here */}
          {/* For example, you can use a hamburger menu icon */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
