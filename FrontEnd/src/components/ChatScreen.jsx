import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../utils/api";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "mr", label: "Marathi" },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("en");
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    const startChat = async () => {
      setError("");
      try {
        const res = await api.post("/chat/start", {});
        setChatId(res.data._id);
        setMessages(res.data.messages || []);
      } catch (err) {
        setError(err.response?.data?.message || "Could not start chat");
      }
    };
    startChat();
  }, []);

  useEffect(() => {
    if (!chatId) return;
    const fetchChat = async () => {
      setError("");
      try {
        const res = await api.get(`/chat/${chatId}`);
        setMessages(res.data.messages || []);
      } catch (err) {
        setError(err.response?.data?.message || "Could not fetch chat");
      }
    };
    fetchChat();
  }, [chatId]);

  const ensureChat = async () => {
    if (chatId) return chatId;
    const res = await api.post("/chat/start", {});
    setChatId(res.data._id);
    return res.data._id;
  };

  const sendMessage = async () => {
    if (!input && !file) return;
    setLoading(true);
    setError("");
    try {
      const id = await ensureChat();
      const res = await api.post(`/chat/${id}/message`, { text: input, sender: "user" });
      setMessages(res.data.messages || []);
      setInput("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(err.response?.data?.message || "Could not send message");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">NyayaMitra</h2>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="bg-gray-800 border border-gray-700 p-2 rounded-lg text-white"
        >
          {LANGUAGES.map(l => (
            <option key={l.code} value={l.code}>{l.label}</option>
          ))}
        </select>
      </div>
      {error && <div className="mb-2 text-red-400">{error}</div>}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {loading && <div className="text-gray-400">Loading...</div>}
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ x: msg.sender === "user" ? 50 : -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`p-3 rounded-lg max-w-md ${msg.sender === "user" ? "bg-indigo-600 self-end ml-auto" : msg.sender === "bot" ? "bg-gray-800" : "bg-green-700"}`}
          >
            {msg.file && (
              <div className="mb-2 text-xs text-gray-300">📎 {msg.file}</div>
            )}
            <p>{msg.text}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Write a message... (Shift+Enter for newline)"
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 h-16 resize-none"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={e => setFile(e.target.files[0])}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-gray-600">
          📎
        </label>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={sendMessage}
          className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg font-semibold"
          disabled={loading}
        >
          Send
        </motion.button>
      </div>
    </div>
  );
}
