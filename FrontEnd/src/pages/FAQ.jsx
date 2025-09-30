import React from "react";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
        <div className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">What is NyayaMitra?</h2>
            <p className="text-gray-300">NyayaMitra is an AI-powered chatbot that provides legal information and connects you with real lawyers in India.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Is it free to use?</h2>
            <p className="text-gray-300">Yes! You can chat with the AI and access legal info for free. Connecting with lawyers may have a fee.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Which languages are supported?</h2>
            <p className="text-gray-300">English, Hindi, and Marathi are fully supported for chat and document input.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Can I upload legal documents?</h2>
            <p className="text-gray-300">Yes, you can upload images or PDFs. The AI will extract and summarize the content for you.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">How do I connect with a lawyer?</h2>
            <p className="text-gray-300">After chatting with the AI, you can view a list of verified lawyers and request a call or chat.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Is my data secure?</h2>
            <p className="text-gray-300">We use industry-standard security practices. Your data is never shared without your consent.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
