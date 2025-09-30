
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import api from "../utils/api";

export default function LawyerConnectScreen() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [requestingId, setRequestingId] = useState(null);

  useEffect(() => {
    const fetchLawyers = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/users/lawyers");
        setLawyers(res.data.lawyers || []);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.response?.data?.message || "Could not fetch lawyers");
      }
    };
    fetchLawyers();
  }, []);

  const connectLawyer = async (lawyer) => {
    try {
      setRequestingId(lawyer._id || lawyer.id);
      await api.post("/connections/request", { lawyerId: lawyer._id || lawyer.id });
      alert(`Request sent to ${lawyer.name}`);
    } catch (err) {
      alert(err.response?.data?.message || "Could not send request");
    } finally {
      setRequestingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h2 className="text-xl font-semibold mb-6">Connect With The Lawyers</h2>
      {loading && <div className="mb-4 text-gray-400">Loading lawyers...</div>}
      {error && <div className="mb-4 text-red-400">{error}</div>}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
        className="space-y-4"
      >
        {lawyers.map((lawyer) => (
          <motion.div
            key={lawyer._id}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center justify-between bg-gray-900 p-4 rounded-xl shadow"
          >
            <div>
              <h3 className="font-semibold">{lawyer.name}</h3>
              <p className="text-sm text-gray-400">{lawyer.role || "Attorney-at-Law"}</p>
              <p className="text-xs text-gray-500">{lawyer.location}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-indigo-600 rounded-full disabled:opacity-50"
              onClick={() => connectLawyer(lawyer)}
              disabled={requestingId === (lawyer._id || lawyer.id)}
              title="Send connection request"
            >
              <Phone size={18} />
            </motion.button>
          </motion.div>
        ))}
        {!loading && !error && lawyers.length === 0 && (
          <div className="text-gray-400">No lawyers available right now.</div>
        )}
      </motion.div>
    </div>
  );
}
