import React from "react";
import { auth } from "../firebase/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login")
      console.log("user logged out");

    } catch (error) {
      console.log("error while logging out");
    }
  };

  return (
    <div className="Dashboard pl-48">
      <h1>Dashboard</h1>
      <button
        onClick={() => handleLogout()}
        className="bg-teal-400 text-white px-3 py-1 my-3 rounded-sm hover:bg-teal-500">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
