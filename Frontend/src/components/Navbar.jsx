import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-100 text-gray-900 p-4 flex justify-between shadow-md">
      <h1 className="text-xl font-bold">ResumeAI</h1>
      <div className="flex space-x-8">  {/* Increased spacing between links */}
        <NavLink to="/" text="Home" />
        <NavLink to="/resume-builder" text="Resume Builder" />
        <NavLink to="/ats-checker" text="ATS Checker" />
        <NavLink to="/interview-prep" text="Interview Prep" />
        <NavLink to="/cover-letter" text="Cover Letter" />
      </div>
    </nav>
  );
};

// Reusable NavLink Component with Custom Underline Color
const NavLink = ({ to, text }) => (
  <Link
    to={to}
    className="relative text-lg font-medium transition-all duration-300 
               before:absolute before:w-full before:h-0.5 before:bg-blue-500 before:bottom-0 
               before:left-0 before:scale-x-0 before:origin-right before:transition-transform 
               before:duration-300 hover:before:scale-x-100 hover:before:origin-left"
  >
    {text}
  </Link>
);

export default Navbar;
