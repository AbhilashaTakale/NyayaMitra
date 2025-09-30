import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-gray-900 text-white flex flex-col items-center justify-center p-8">
      <header className="w-full max-w-3xl text-center mb-12 flex flex-col items-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="inline-block align-middle">
            {/* Scales of Justice SVG */}
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <circle cx="24" cy="24" r="23" stroke="#6366f1" strokeWidth="2" fill="#18181b" />
                <path d="M24 12v20M24 12l-10 20M24 12l10 20" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round"/>
                <ellipse cx="14" cy="34" rx="4" ry="2" fill="#fbbf24" />
                <ellipse cx="34" cy="34" rx="4" ry="2" fill="#fbbf24" />
                <circle cx="24" cy="12" r="2.5" fill="#6366f1" />
              </g>
            </svg>
          </span>
          <h1 className="text-5xl font-extrabold align-middle">NyayaMitra</h1>
        </div>
        <p className="text-xl text-gray-300 mb-6">
          Your Multilingual AI Legal Assistant for India. Get instant, simple legal help in English, Hindi, or Marathi—via text, voice, or document upload.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg font-semibold text-lg transition">Get Started</Link>
          <Link to="/features" className="bg-gray-800 hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold text-lg transition">See Features</Link>
        </div>
      </header>
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <Link to={"/chat"}>
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col items-center">
        <span className="text-4xl mb-2">💬</span>  
          <h3 className="font-bold text-lg mb-2">Chat in 3 Languages</h3>
          <p className="text-gray-400 text-center">English, Hindi, Marathi—switch anytime. Powered by advanced NLP.</p>
        </div>
        </Link>
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col items-center">
          <span className="text-4xl mb-2">📄</span>
          <h3 className="font-bold text-lg mb-2">Upload Documents</h3>
          <p className="text-gray-400 text-center">Get legal help from images, PDFs, or scanned documents using OCR.</p>
        </div>
       <Link to={"/lawyers"}>
       <div className="bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col items-center">
          <span className="text-4xl mb-2">👩‍⚖️</span>
          <h3 className="font-bold text-lg mb-2">Connect with Lawyers</h3>
          <p className="text-gray-400 text-center">Verified experts in every field. Book a call or chat instantly.</p>
        </div>
       </Link>
      </section>
      <section className="w-full max-w-4xl mb-16">
        <h2 className="text-2xl font-bold mb-4 text-center">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-4 shadow">
            <p className="mb-2">“I got help with my property dispute in Marathi. The chatbot was so easy to use!”</p>
            <span className="text-gray-400 text-sm">— Priya, Pune</span>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 shadow">
            <p className="mb-2">“Connecting with a real lawyer for my cyber case was seamless. Highly recommend!”</p>
            <span className="text-gray-400 text-sm">— Rohan, Delhi</span>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 shadow">
            <p className="mb-2">“I uploaded a scanned FIR and got a summary in Hindi. Amazing tech!”</p>
            <span className="text-gray-400 text-sm">— Sunita, Nagpur</span>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 shadow">
            <p className="mb-2">“The AI explained my consumer rights in simple English. Super helpful.”</p>
            <span className="text-gray-400 text-sm">— Amit, Mumbai</span>
          </div>
        </div>
      </section>
      <footer className="w-full max-w-3xl text-center text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} NyayaMitra — Empowering Legal Access for All
      </footer>
    </div>
  );
}
