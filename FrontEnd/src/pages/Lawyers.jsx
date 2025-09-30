import React, { useState } from "react";
import dummyLawyers from "../data/dummyLawyers";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Lawyers() {
  const [loadingId, setLoadingId] = useState(null);
  const [feedback, setFeedback] = useState({});
  const navigate = useNavigate();

  const handleConnect = async (lawyer) => {
    setLoadingId(lawyer.id);
    setFeedback((f) => ({ ...f, [lawyer.id]: null }));
    try {
      // In real app, use lawyer._id from backend, here we use id for demo
      await api.post("/connections/request", { lawyerId: lawyer.id });
      setFeedback((f) => ({ ...f, [lawyer.id]: "Request sent! Go to Connections to chat once accepted." }));
    } catch (err) {
      setFeedback((f) => ({ ...f, [lawyer.id]: err.response?.data?.message || "Could not send request" }));
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">Our Lawyers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {dummyLawyers.map(lawyer => (
          <div key={lawyer.id} className="bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col">
            <h2 className="text-2xl font-semibold mb-2">{lawyer.name}</h2>
            <p className="text-indigo-400 font-medium mb-1">{lawyer.role}</p>
            <p className="text-yellow-400 mb-1">⭐ {lawyer.rating}</p>
            <p className="mb-1"><span className="font-semibold">Location:</span> {lawyer.location}</p>
            <p className="mb-1"><span className="font-semibold">Languages:</span> {lawyer.languages.join(", ")}</p>
            <p className="mb-1"><span className="font-semibold">Expertise:</span> {lawyer.expertise.join(", ")}</p>
            <button
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
              onClick={() => handleConnect(lawyer)}
              disabled={loadingId === lawyer.id}
            >
              {loadingId === lawyer.id ? "Connecting..." : "Connect"}
            </button>
            {feedback[lawyer.id] && (
              <div className="mt-2 text-sm text-green-400">{feedback[lawyer.id]}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
