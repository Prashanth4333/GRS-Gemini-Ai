import React, { useState } from "react";
import QuestionnaireForm from "./components/QuestionnaireForm";
import GiftSuggestions from "./components/GiftSuggestions";
import { generateGiftSuggestions } from "./services/gemini";
import type { Recipient, GiftSuggestion } from "./types";

function App() {
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const handleSubmit = async (recipient: Recipient) => {
    setIsLoading(true);
    setError(null);
    setInfoMessage(null);
    setSuggestions([]);

    try {
      const newSuggestions = await generateGiftSuggestions(recipient);
      console.log("🎁 Received Suggestions:", newSuggestions);

      if (!Array.isArray(newSuggestions) || newSuggestions.length === 0) {
        setInfoMessage(`✅ Successfully generated gifts!`);
        return;
      }

      setError("No suggestions available. Try again.");
    } catch (err) {
      setError("Failed to generate gift suggestions. Please try again.");
      console.error("❌ Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-white via-rose-50 to-rose-200">
      {/* Glassmorphic Card */}
      <div className="max-w-3xl w-full p-10 bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl border border-pink-200 shadow-xl">
        {/* Elegant Title */}
        <h1 className="text-4xl font-bold text-gray-900 text-center tracking-wide">
          🎁 <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">
            Gift Genius AI
          </span>
        </h1>
        <p className="text-gray-600 text-lg text-center mt-2 font-medium">
          AI-powered personalized gift recommendations
        </p>

        {/* Elegant Divider */}
        <div className="w-32 h-1 bg-gradient-to-r from-rose-300 to-pink-400 mx-auto mt-3 rounded-full"></div>

        {/* Form Container */}
        <div className="mt-6 p-6 rounded-xl bg-white bg-opacity-95 border border-rose-200 shadow-md">
          <QuestionnaireForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-lg font-semibold text-center mt-4">
            {error}
          </p>
        )}

        {/* Gift Suggestions Section */}
        <div className="mt-6">
          <GiftSuggestions suggestions={suggestions} isLoading={isLoading} />
        </div>

        {/* Success Message */}
        {infoMessage && (
          <p className="text-green-700 text-lg font-semibold text-center mt-4">
            {infoMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
