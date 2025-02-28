import React from "react";
import { Gift, DollarSign, ThumbsUp, Loader } from "lucide-react";
import type { GiftSuggestion } from "../types";

interface GiftSuggestionsProps {
  suggestions: GiftSuggestion[] | null; // Accepts null to prevent duplicate messages
  isLoading: boolean;
  infoMessage: string | null; // New prop to handle informational messages
}

const GiftSuggestions: React.FC<GiftSuggestionsProps> = ({ suggestions, isLoading, infoMessage }) => {
  console.log("🔹 Rendering Suggestions:", suggestions);

  if (isLoading) {
    return (
      <div className="text-center py-6">
        <Loader className="animate-spin w-8 h-8 text-indigo-600 mx-auto mb-2" />
        <p className="text-gray-600 text-lg font-medium">Generating gift ideas...</p>
      </div>
    );
  }

  return (
    <div className="mt-6 max-w-3xl mx-auto fade-in">
      {/* Info Message */}
      {infoMessage && (
        <p className="text-blue-600 text-lg font-medium text-center py-4">
          {infoMessage}
        </p>
      )}

      {/* Show gift list only if suggestions exist */}
      {suggestions && suggestions.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 justify-center">
            <Gift className="w-6 h-6 text-indigo-600" /> Gift Ideas
          </h2>
          <ul className="mt-4 space-y-4">
            {suggestions.map((gift, index) => (
              <li
                key={index}
                className="p-6 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{gift.title || "Unknown Gift"}</h3>
                <p className="text-gray-700">{gift.description || "No description provided."}</p>
                {gift.reasoning && (
                  <div className="flex items-start gap-2 text-gray-600 mt-2">
                    <ThumbsUp className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <p>{gift.reasoning}</p>
                  </div>
                )}
                {gift.estimatedPrice && (
                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                    <DollarSign className="w-5 h-5 text-indigo-500" />
                    <p className="font-medium">{gift.estimatedPrice}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default GiftSuggestions;
