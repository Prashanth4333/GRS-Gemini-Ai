import React, { useState } from "react";
import QuestionnaireForm from "./components/QuestionnaireForm";
import GiftSuggestions from "./components/GiftSuggestions";
import { generateGiftSuggestions } from "./services/gemini";
import type { Recipient, GiftSuggestion } from "./types";
import Snowfall from "react-snowfall";

const App = () => {
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

      setSuggestions(newSuggestions);
    } catch (err) {
      setError("Failed to generate gift suggestions. Please try again.");
      console.error("❌ Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-100 to-purple-300 overflow-hidden">
      {/* Improved Snowfall Effect */}
      <Snowfall
        snowflakeCount={150} // Increased snowflakes
        color="white"
        speed={[0.5, 2]} // More natural fall speed variation
        wind={[0, 0.5]} // Slight wind effect
        radius={[2, 5]} // Varied snowflake sizes
      />

      <div className="max-w-3xl w-full p-10 bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl border border-purple-200 shadow-xl">
        <h1 className="text-4xl font-bold text-gray-900 text-center tracking-wide">
          🎁 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Gift Genius AI
          </span>
        </h1>
        <p className="text-gray-600 text-lg text-center mt-2 font-medium">
          AI-powered personalized gift recommendations
        </p>

        <div className="w-32 h-1 bg-gradient-to-r from-blue-300 to-purple-400 mx-auto mt-3 rounded-full"></div>

        <div className="mt-6 p-6 rounded-xl bg-white bg-opacity-95 border border-blue-200 shadow-md">
          <QuestionnaireForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {error && (
          <p className="text-red-600 text-lg font-semibold text-center mt-4">{error}</p>
        )}

        <div className="mt-6">
          <GiftSuggestions suggestions={suggestions} isLoading={isLoading} />
        </div>

        {infoMessage && (
          <p className="text-green-700 text-lg font-semibold text-center mt-4">{infoMessage}</p>
        )}
      </div>

      <p className="mt-10 font-semibold text-sm text-gray-600">© 2025 Prashanth. All Rights Reserved</p>
          
    </div>
  );
};

export default App;
