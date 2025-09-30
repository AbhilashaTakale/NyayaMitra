import React from "react";

export default function Features() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-8">Features</h1>
        <ul className="space-y-6">
          <li className="bg-gray-900 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-2">Multilingual Chatbot</h2>
            <p className="text-gray-300">Chat in English, Hindi, or Marathi. The AI understands and responds in your language of choice.</p>
          </li>
          <li className="bg-gray-900 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-2">Voice & Document Input</h2>
            <p className="text-gray-300">Upload images, PDFs, or use voice input to get legal help. OCR and speech-to-text included.</p>
          </li>
          <li className="bg-gray-900 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-2">Connect with Lawyers</h2>
            <p className="text-gray-300">Verified lawyers available for chat or call. Filter by expertise and location.</p>
          </li>
          <li className="bg-gray-900 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-2">Legal Knowledge Base</h2>
            <p className="text-gray-300">Access simplified explanations of Indian laws, rights, and procedures.</p>
          </li>
          <li className="bg-gray-900 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-2">Feedback & Ratings</h2>
            <p className="text-gray-300">Rate answers and lawyers to help us improve the platform.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
