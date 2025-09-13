import React, { useState } from "react";

const App = () => {
  const [step, setStep] = useState("landing"); // landing → portal → dashboard

  return (
    <div className="h-screen w-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-purple-700 via-pink-600 to-blue-600 animate-gradient bg-[length:400%_400%]"></div>

      {/* Overlay to keep text legible */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        {step === "landing" && (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">CreativeOps Portal</h1>
            <button
              onClick={() => setStep("portal")}
              className="px-8 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-lg font-semibold backdrop-blur-lg shadow-lg transition transform hover:scale-105"
            >
              Enter Portal
            </button>
          </div>
        )}

        {step === "portal" && (
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-6">Welcome to the Portal</h2>
            <button
              onClick={() => setStep("dashboard")}
              className="px-8 py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white text-lg font-semibold shadow-lg transition transform hover:scale-105"
            >
              Continue to Dashboard
            </button>
          </div>
        )}

        {step === "dashboard" && (
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4">Dashboard</h2>
            <p className="mb-4">
              Key metrics and recent activity for <b>Creative Deck & Fence, LLC</b>.
            </p>
            <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md shadow-xl">
              {/* This is where your app modules will load */}
              <p>📊 Your live dashboard goes here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
