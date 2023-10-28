import { Routes, Route } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

// bg-gray-800 - dark
// bg-teal-500 - dark teal:
// bg-teal-400 - light teal: menu
// bg-blue-100 gray

function App() {
  return (
    <div className="App text-gray-800">
      <Menu />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
