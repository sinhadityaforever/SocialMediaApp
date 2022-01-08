import React, { useEffect } from "react";
import "./app.css";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/login/login";
import Register from "./pages/register/Register";
import EditProfile from "./pages/EditProfile/EditProfile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { loginSuccess } from "./features/userSlice";
import Error from "./pages/error/Error";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      dispatch(loginSuccess(foundUser));
    } else {
    }
  }, []);
  const user = useAppSelector((state) => state.user.user);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/profile/:username"
          element={user ? <Profile /> : <Login />}
        />
        <Route
          path="/profile/edit"
          element={user ? <EditProfile /> : <Register />}
        />
      </Routes>
    </Router>
  );
}

export default App;
