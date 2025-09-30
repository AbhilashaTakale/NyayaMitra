import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null;
  const role = user?.role || "guest";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="w-full bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold">NyayaMitra</Link>
        <nav className="flex gap-4 items-center text-sm">
          {role === "lawyer" ? (
            <>
              <Link to="/connections">My Connections</Link>
              <Link to="/lawyers">Find Clients</Link>
              <Link to="/chat">AI Lawyer</Link>
            </>
          ) : (
            <>
              <Link to="/features">Features</Link>
              <Link to="/lawyers">Lawyers</Link>
              <Link to="/connections">Connections</Link>
              <Link to="/chat" title="Chat with free AI Lawyer">AI Lawyer (Free)</Link>
            </>
          )}
          {user ? (
            <button onClick={logout} className="bg-indigo-600 px-3 py-1 rounded">Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

