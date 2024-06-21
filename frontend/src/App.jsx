import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import useTheme from "./store/useTheme";

function App() {
  const { authUser } = useAuthContext();
  const { theme } = useTheme();
  return (
    // .bg-gradient class to add moving gradients in bg
    <div
      className={`p-4 h-screen flex items-center justify-center ${
        theme ? "bg-gradient" : "bg-white text-black"
      }`}
    >
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
