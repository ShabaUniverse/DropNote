import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="menu w-44 fixed bg-teal-400 h-screen px-2 flex flex-col justify-center items-center">
      <Link to='/login' className=" text-white font-semibold">Login</Link>
      <Link to="/signup" className=" text-white font-semibold">Signup</Link>
      <Link to="/dashboard" className=" text-white font-semibold">Dashboard</Link>
    </div>
  );
};

export default Menu;
