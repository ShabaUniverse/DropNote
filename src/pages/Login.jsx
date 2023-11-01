import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { setIsLogged } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogged = useSelector((state) => state.userSlice.isLogged);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // that for displaying errors on wp
  const [errorMessage, setErrorMessage] = useState("");

  const loginUser = async () => {
    try{
      await signInWithEmailAndPassword(auth, email, password);
      console.log("successfully signed in");
      dispatch(setIsLogged(true))
      navigate("/dashboard")
    }catch(error){
      console.log(error.code);
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
            <button onClick={() => loginUser()} className=" bg-teal-400 text-white px-3 py-1 my-3 rounded-sm hover:bg-teal-500">
              Login
            </button>
            <span className=" text-sm">Not user yet?</span>
            <Link to="/signup" className="text-sm text-teal-500 underline">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
