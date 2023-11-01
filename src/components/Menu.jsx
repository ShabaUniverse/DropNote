import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Menu = () => {
  const isLogged = useSelector((state) => state.userSlice.isLogged);
  return (
    <div className="menu w-44 fixed bg-teal-400 h-screen px-2 flex flex-col justify-center items-center">
      {!isLogged && (
        <Link to="/login" className=" text-white font-semibold">
          Login
        </Link>
      )}
      
      {!isLogged && (
        <Link to="/signup" className=" text-white font-semibold">
          Signup
        </Link>
      )}

      {isLogged && (
        <Link to="/dashboard" className=" text-white font-semibold">
          Dashboard
        </Link>
      )}
    </div>
  );
};

export default Menu;
