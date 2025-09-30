
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/users/login", { email, password });
      const me = await api.get("/users/auth/me");
      localStorage.setItem("user", JSON.stringify(me.data.user));
      setLoading(false);
      navigate("/chat");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl p-8 rounded-2xl bg-gray-900 shadow-lg"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-gray-400 mb-6">Login to continue your legal journey with NyayaMitra.</p>
            {error && <div className="mb-4 text-red-400">{error}</div>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-sm text-gray-300">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-300">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  required
                />
              </div>
              <div>
                <span className="block mb-2 text-sm text-gray-300">Role</span>
                <div className="flex gap-4">
                  <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${role==='user' ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-700'}`}>
                    <input type="radio" name="role" value="user" checked={role==='user'} onChange={() => setRole('user')} />
                    <span>User</span>
                  </label>
                  <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${role==='lawyer' ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-700'}`}>
                    <input type="radio" name="role" value="lawyer" checked={role==='lawyer'} onChange={() => setRole('lawyer')} />
                    <span>Lawyer</span>
                  </label>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg font-semibold transition"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Log In"}
              </motion.button>
              <p className="text-sm text-gray-400">New here? <button type="button" onClick={() => navigate('/signup')} className="text-indigo-400 hover:underline">Create an account</button></p>
            </form>
          </div>
          <div className="hidden md:block self-center text-gray-300">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="font-semibold mb-2">Why NyayaMitra?</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>AI Lawyer (Free) chat 24/7</li>
                <li>Multilingual: English, Hindi, Marathi</li>
                <li>Connect with verified lawyers</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
