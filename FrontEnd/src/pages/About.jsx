import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-4">About NyayaMitra</h1>
        <p className="mb-6 text-lg text-gray-300">
          NyayaMitra is a student-driven project to make legal help accessible, affordable, and multilingual for everyone in India. Our mission is to bridge the gap between citizens and legal support using AI, NLP, and a network of verified lawyers.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
        <ul className="mb-6 text-gray-400">
          <li>Abhilasha Takale — Project Lead</li>
          <li>Chetana Chaudhari — Backend & AI</li>
          <li>Disha Sonar — Frontend & UX</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
        <p className="text-gray-300">
          We believe legal knowledge should be a right, not a privilege. By combining technology and empathy, we aim to empower every Indian with the tools to understand and defend their rights.
        </p>
      </div>
    </div>
  );
}
