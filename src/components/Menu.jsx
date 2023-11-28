import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Menu = () => {
  const isLogged = useSelector((state) => state.userSlice.isLogged);
  const [hamMenu, setHamMenu] = useState(true);
  
  return (
    <div className="menu">
      {/* CLOSE OPEN ----------------------------------------------------- */}
      <div className="ham-menu md:hidden">
        {hamMenu ? (
          <svg
            className="z-20 fixed w-8 right-3 top-4"
            fill="#2dd4bf"
            onClick={() => setHamMenu(!hamMenu)}
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2,9 L2,7 L14,7 L14,9 L2,9 Z M2,13 L2,11 L14,11 L14,13 L2,13 Z M2,5 L2,3 L14,3 L14,5 L2,5 Z"
              fillRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="z-20 fixed w-8 left-3 top-4"
            onClick={() => setHamMenu(!hamMenu)}
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            id="Layer_1"
            // style="enable-background:new 0 0 512 512;"
            version="1.1"
            viewBox="0 0 512 512"
            width="512px"
            xmlSpace="preserve">
            <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
          </svg>
        )}
      </div>

      {/* NAVIGATION ------------------------------------------ */}
      <div
        className={
          hamMenu
            ? "w-44 fixed bg-teal-400 h-screen px-2 hidden md:flex flex-col justify-center items-center"
            : "w-44 fixed bg-teal-400 h-screen px-2 flex flex-col justify-center items-center top-0"
        }>
        {!isLogged && (
          <Link to="/" className=" text-white font-semibold text-base mb-4">
            <svg
              onClick={() => setHamMenu(true)}
              className="w-8"
              fill="white"
              version="1.1"
              viewBox="0 0 24 24"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <g id="info" />
              <g id="icons">
                <path
                  d="M23.6,10.3L13.2,2.4c-0.7-0.5-1.7-0.5-2.5,0L0.4,10.3C-0.4,10.9,0,12,1,12h1v6.1C2,20.2,3.8,22,6,22h2   c0.6,0,1-0.4,1-1v-4.9C9,15,9.9,14,11,14h2c1.1,0,2,1,2,2.1V21c0,0.5,0.4,1,1,1h2c2.2,0,4-1.8,4-3.9V12h1   C23.9,12,24.3,10.9,23.6,10.3z"
                  id="home"
                />
              </g>
            </svg>
          </Link>
        )}

        {!isLogged && (
          <Link
            to="/login"
            className=" text-white font-semibold text-base mb-4"
            onClick={() => setHamMenu(true)}
            >
            Login
          </Link>
        )}

        {!isLogged && (
          <Link
            to="/signup"
            className=" text-white font-semibold text-base mb-4"
            onClick={() => setHamMenu(true)}
            >
            Signup
          </Link>
        )}

        {isLogged && (
          <Link
            to="/dashboard"
            className=" text-white font-semibold text-base mb-4">
            <svg
              onClick={() => setHamMenu(true)}
              className=" w-8"
              fill="white"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z" />
            </svg>
          </Link>
        )}

        {isLogged && (
          <Link
            to="/profile"
            className=" text-white font-semibold text-base mb-4">
            <svg
              onClick={() => setHamMenu(true)}
              className=" w-8"
              fill="white"
              version="1.1"
              viewBox="0 0 24 24"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <g id="info" />
              <g id="icons">
                <g id="user">
                  <ellipse cx="12" cy="8" rx="5" ry="6" />
                  <path d="M21.8,19.1c-0.9-1.8-2.6-3.3-4.8-4.2c-0.6-0.2-1.3-0.2-1.8,0.1c-1,0.6-2,0.9-3.2,0.9s-2.2-0.3-3.2-0.9    C8.3,14.8,7.6,14.7,7,15c-2.2,0.9-3.9,2.4-4.8,4.2C1.5,20.5,2.6,22,4.1,22h15.8C21.4,22,22.5,20.5,21.8,19.1z" />
                </g>
              </g>
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Menu;
