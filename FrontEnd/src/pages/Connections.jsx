import React, { useEffect, useState, useRef } from "react";
import api from "../utils/api";
import { io } from "socket.io-client";

export default function Connections() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null;
  const [statusFilter, setStatusFilter] = useState('all');
  const [lawyerFilter, setLawyerFilter] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [activeConnection, setActiveConnection] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const socketRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, chatOpen]);

  const fetchConnections = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/connections/mine");
      setConnections(res.data.connections || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Could not load connections");
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      await api.patch(`/connections/${id}/status`, { status });
      await fetchConnections();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  const openChat = (connection) => {
    setActiveConnection(connection);
    setChatOpen(true);
    setChatMessages([]);
    if (!socketRef.current) {
      socketRef.current = io(import.meta.env.VITE_API_URL || "http://localhost:3000", {
        withCredentials: true,
      });
    }
    socketRef.current.emit("join", { room: connection._id });
    socketRef.current.off("chat").on("chat", (msg) => {
      setChatMessages((prev) => [...prev, msg]);
    });
    socketRef.current.off("chat-history").on("chat-history", (msgs) => {
      setChatMessages(msgs);
    });
  };

  const closeChat = () => {
    setChatOpen(false);
    setActiveConnection(null);
    setChatMessages([]);
    if (socketRef.current) {
      socketRef.current.emit("leave", { room: activeConnection?._id });
    }
  };

  const sendChat = () => {
    if (!chatInput.trim() || !activeConnection) return;
    const msg = { text: chatInput, sender: user?.name || "Me", room: activeConnection._id };
    socketRef.current.emit("chat", msg);
    setChatMessages((prev) => [...prev, msg]);
    setChatInput("");
  };

  const dummyConnections = [
    {
      _id: '1',
      user: { name: 'Test User' },
      lawyer: { name: 'Disha Sonar' },
      status: 'pending',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      _id: '2',
      user: { name: 'Test User' },
      lawyer: { name: 'Chetana Chaudhari' },
      status: 'accepted',
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
      _id: '3',
      user: { name: 'Test User' },
      lawyer: { name: 'Abhilasha Takale' },
      status: 'rejected',
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    },
  ];

  const allConnections = connections.length > 0 ? connections : dummyConnections;
  const filteredConnections = allConnections.filter(c => {
    const statusMatch = statusFilter === 'all' || c.status === statusFilter;
    const lawyerMatch = c.lawyer?.name.toLowerCase().includes(lawyerFilter.toLowerCase());
    return statusMatch && lawyerMatch;
  });

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h2 className="text-xl font-semibold mb-6">My Connections</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="bg-gray-800 text-white px-3 py-2 rounded-lg"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
        <input
          type="text"
          value={lawyerFilter}
          onChange={e => setLawyerFilter(e.target.value)}
          placeholder="Filter by lawyer name"
          className="bg-gray-800 text-white px-3 py-2 rounded-lg"
        />
      </div>
      {loading && <div className="mb-4 text-gray-400">Loading...</div>}
      {error && <div className="mb-4 text-red-400">{error}</div>}
      <div className="space-y-3">
        {filteredConnections.map((c) => (
          <div key={c._id} className="bg-gray-900 p-4 rounded-xl flex items-center justify-between">
            <div>
              <div className="font-semibold">{c.user?.name} ↔ {c.lawyer?.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded text-xs font-bold 
                  ${c.status === "pending" ? "bg-yellow-600 text-yellow-100" : ""}
                  ${c.status === "accepted" ? "bg-green-700 text-green-100" : ""}
                  ${c.status === "rejected" ? "bg-red-700 text-red-100" : ""}
                `}>
                  {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                </span>
                <span className="text-xs text-gray-400">
                  {c.createdAt ? `Connected: ${new Date(c.createdAt).toLocaleDateString()}` : "Date unknown"}
                </span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              {user?.role === "lawyer" && String(c.lawyer?._id) === String(user.id) && (
                <>
                  <button
                    onClick={() => updateStatus(c._id, "accepted")}
                    disabled={updatingId === c._id}
                    className="px-3 py-2 bg-green-600 rounded-lg disabled:opacity-50"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(c._id, "rejected")}
                    disabled={updatingId === c._id}
                    className="px-3 py-2 bg-red-600 rounded-lg disabled:opacity-50"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => openChat(c)}
                className="px-3 py-2 bg-indigo-700 rounded-lg hover:bg-indigo-800"
              >
                Chat
              </button>
            </div>
          </div>
        ))}
        {!loading && filteredConnections.length === 0 && (
          <div className="text-gray-400">No connections match your filters.</div>
        )}
        {!loading && connections.length === 0 && filteredConnections.length > 0 && (
          <div className="text-gray-400">(Showing demo data)</div>
        )}
      </div>
      {chatOpen && activeConnection && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md flex flex-col h-[80vh]">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
              <div className="font-bold text-lg flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-700 text-white font-bold text-base">
                  {((user?.id === activeConnection.lawyer?.id ? activeConnection.user?.name : activeConnection.lawyer?.name) || "?")[0]}
                </span>
                Chat with {user?.id === activeConnection.lawyer?.id ? activeConnection.user?.name : activeConnection.lawyer?.name}
              </div>
              <button onClick={closeChat} className="text-gray-400 hover:text-white text-2xl">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-950">
              {chatMessages.map((msg, idx) => {
                const isMe = msg.sender === (user?.name || "Me");
                return (
                  <div key={idx} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    {!isMe && (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-white font-bold mr-2">
                        {msg.sender[0]}
                      </span>
                    )}
                    <div className={`rounded-2xl px-4 py-2 max-w-[70%] shadow-md text-sm ${isMe ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-100"} relative`}>
                      <div className="mb-1 font-semibold text-xs flex items-center gap-2">
                        {isMe ? "You" : msg.sender}
                        <span className="text-gray-400 text-[10px] font-normal">{msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}</span>
                      </div>
                      <div>{msg.text}</div>
                    </div>
                    {isMe && (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-700 text-white font-bold ml-2">
                        {user?.name ? user.name[0] : "M"}
                      </span>
                    )}
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>
            <div className="px-4 py-3 border-t border-gray-800 bg-gray-900 flex gap-2 items-center">
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") sendChat(); }}
                className="flex-1 p-3 rounded-full bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="Type a message..."
              />
              <button
                onClick={sendChat}
                className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-full font-semibold text-white shadow transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
