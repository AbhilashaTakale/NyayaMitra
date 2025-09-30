import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./components/Auth/Login";
import SignupScreen from "./components/Auth/Sign-up";
import ChatScreen from "./components/ChatScreen";
import LawyerConnectScreen from "./components/LawyerConsent";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Features from "./pages/Features";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Connections from "./pages/Connections";
import Header from "./components/Header";
import AuthGate from "./components/Auth/AuthGate";
import Lawyers from "./pages/Lawyers";

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-black text-white">
        <Header />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />

          {/* Authenticated routes */}
          <Route path="/chat" element={<AuthGate><ChatScreen /></AuthGate>} />
          <Route path="/lawyers" element={<Lawyers />} />
          <Route path="/connections" element={<AuthGate><Connections /></AuthGate>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
