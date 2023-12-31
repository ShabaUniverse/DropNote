import React, { useEffect } from "react";
import { auth, db } from "../firebase/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setIsLogged, setCurrentUID, setCurrentEmail } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.userSlice.isLogged);
  const currentUID = useSelector((state) => state.userSlice.currentUID);
  const currentEmail = useSelector((state) => state.userSlice.currentEmail);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      dispatch(setIsLogged(false));
      dispatch(setCurrentUID(""));
      dispatch(setCurrentEmail(""));
      console.log("user logged out");
    } catch (error) {
      console.log("error while logging out");
    }
  };

  useEffect(() => {
    // this was to display email on Dashboard page, but this function
    // i guess no need to be presented, but good demonstration of 
    // getting reference and snapshot from firebase
    const getEmail = async () => {
      const docRef = doc(db, "users", localStorage.currentUID);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        let data = docSnap.data();
        // dispatch(setCurrentEmail(data.email));
      }else{
        console.log("no such document")
      }
    }
    getEmail();
  }, [])


  return (
    <div className="pl-2 pt-10 md:pl-48">
      <h1 className=" font-bold text-xl mb-10 text-teal-500">Dashboard</h1>
      <p className="text-lg font-bold">User UID: <br /> <span className="text-teal-400">{localStorage.currentUID}</span> </p>
      <p className="text-lg font-bold">User EMail: <br /> <span className="text-teal-400">{localStorage.currentEmail}</span> </p>
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


