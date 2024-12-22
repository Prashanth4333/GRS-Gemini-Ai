import React from 'react';
import { Gift, DollarSign, ThumbsUp } from 'lucide-react';
import type { GiftSuggestion } from '../types';

interface GiftSuggestionsProps {
  suggestions: GiftSuggestion[];
}

export default function GiftSuggestions({ suggestions }: GiftSuggestionsProps) {
  if (!suggestions.length) return null;

  return (
    <div className="w-full max-w-2xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <Gift className="w-6 h-6 text-indigo-600" />
        Gift Suggestions
      </h2>
      
      <div className="grid gap-6">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {suggestion.title}
            </h3>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                {suggestion.description}
              </p>
              
              <div className="flex items-start gap-2 text-gray-600">
                <ThumbsUp className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <p>{suggestion.reasoning}</p>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-5 h-5 text-indigo-500" />
                <p className="font-medium">{suggestion.estimatedPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}