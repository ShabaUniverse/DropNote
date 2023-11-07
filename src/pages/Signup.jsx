import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { setIsLogged, setCurrentUID } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { setDoc, doc } from "firebase/firestore";

const Signup = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    // that for displaying errors on wp
  const [errorMessage, setErrorMessage] = useState("");

  const createUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (credential) => {
          console.log(credential);
          dispatch(setIsLogged(true));
          dispatch(setCurrentUID(credential.user.uid))
          setDoc(doc(db,"users", credential.user.uid), {
            email: credential.user.email
          })
          navigate("/profile");
          setErrorMessage("")
        },
      );
    } catch(error) {
      console.log(error.code)
      if(error.code === "auth/invalid-email"){
        setErrorMessage("Invalid Email")
      }
    }
  };

  
  



  return (
    <div className="h-screen pl-48">
      <div className="container max-w-5xl mx-auto h-full">
        <div className="wrapper w-full h-full flex justify-center items-center">
          <div className="inputs flex flex-col justify-center items-center">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className=" bg-blue-100 outline-none border-none py-1 px-3 my-1 rounded-sm w-[250px]"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="bg-blue-100 outline-none border-none py-1 px-3 my-1 rounded-sm w-[250px]"
            />
            <button
              onClick={createUser}
              className=" bg-teal-400 text-white px-3 py-1 my-3 rounded-sm hover:bg-teal-500">
              Signup
            </button>
            <span className=" text-sm">Already user?</span>
            <Link to={"/login"} className="text-sm text-teal-500 underline">
              Login
            </Link>
            <span className=" text-sm text-red-500">{errorMessage}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
