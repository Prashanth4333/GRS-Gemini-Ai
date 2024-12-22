import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import QuestionnaireForm from './components/QuestionnaireForm';
import GiftSuggestions from './components/GiftSuggestions';
import { generateGiftSuggestions } from './services/openai';
import type { Recipient, GiftSuggestion } from './types';

function App() {
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (recipient: Recipient) => {
    setIsLoading(true);
    setError(null);
    try {
      const newSuggestions = await generateGiftSuggestions(recipient);
      setSuggestions(newSuggestions);
    } catch (err) {
      setError('Failed to generate gift suggestions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Gift className="w-16 h-16 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Perfect Gift Finder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about the person you're shopping for, and we'll use AI to suggest thoughtful, personalized gift ideas that match their interests and your budget.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-12">
          <QuestionnaireForm onSubmit={handleSubmit} isLoading={isLoading} />
          
          {error && (
            <div className="w-full max-w-2xl bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
              {error}
            </div>
          )}

          {suggestions.length > 0 && (
            <GiftSuggestions suggestions={suggestions} />
          )}
        </div>
        <p className='text-center text-gray-800 mt-20 font-medium '>Copyright © 2024 by Prashanth.</p>
      </div>
    </div>
  );
}

export default App;