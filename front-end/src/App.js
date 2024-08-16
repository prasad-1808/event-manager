import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Album from "./pages/Album";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in by verifying token
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
          />

          {/* Protected Routes */}
          {isLoggedIn && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/albums" element={<Album />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}

          {/* Fallback Route */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
