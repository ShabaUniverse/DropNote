import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
import Home from "./pages/Home";

// bg-gray-800 - dark
// bg-teal-500 - dark teal:
// bg-teal-400 - light teal: menu
// bg-blue-100 gray

function App() {
  const isLogged = useSelector((state) => state.userSlice.isLogged);

  return (
    <div className="App text-gray-800">
      <Menu />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route
          path="/login"
          element={isLogged ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/signup"
          element={isLogged ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route
          path="/dashboard"
          element={isLogged ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
