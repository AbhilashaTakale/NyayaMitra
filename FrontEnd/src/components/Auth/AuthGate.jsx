import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../utils/api";

export default function AuthGate({ children }) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        await api.get("/users/auth/me");
        setAuthed(true);
      } catch (e) {
        setAuthed(false);
      } finally {
        setLoading(false);
      }
    };
    check();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!authed) return <Navigate to="/" replace />;
  return children;
}
