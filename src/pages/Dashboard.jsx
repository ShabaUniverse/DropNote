import React from "react";
import { auth } from "../firebase/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setIsLogged } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.userSlice.isLogged);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      dispatch(setIsLogged(false));
      console.log("user logged out");
    } catch (error) {
      console.log("error while logging out");
    }
  };

  return (
    <div className="Dashboard pl-48">
      <h1>Dashboard</h1>
      {isLogged && (
        <button
          onClick={() => handleLogout()}
          className="bg-teal-400 text-white px-3 py-1 my-3 rounded-sm hover:bg-teal-500">
          Logout
        </button>
      )}
    </div>
  );
};

export default Dashboard;
