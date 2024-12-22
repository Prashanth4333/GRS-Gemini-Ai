import React, { useState } from 'react';
import { Gift, Send } from 'lucide-react';
import type { Recipient } from '../types';

interface QuestionnaireFormProps {
  onSubmit: (data: Recipient) => void;
  isLoading: boolean;
}

const OCCASIONS = [
  'Birthday', 'Anniversary', 'Wedding', 'Graduation',
  'Christmas', 'Housewarming', 'Baby Shower', 'Other'
];

const RELATIONSHIPS = [
  'Family', 'Friend', 'Colleague', 'Partner',
  'Acquaintance', 'Other'
];

export default function QuestionnaireForm({ onSubmit, isLoading }: QuestionnaireFormProps) {
  const [formData, setFormData] = useState<Recipient>({
    name: '',
    age: 0,
    occasion: '',
    interests: [],
    budget: 0,
    relationship: ''
  });

  const [currentInterest, setCurrentInterest] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addInterest = () => {
    if (currentInterest.trim() && !formData.interests.includes(currentInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, currentInterest.trim()]
      }));
      setCurrentInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Gift className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-900">Gift Recipient Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Recipient's Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            required
            min="0"
            max="150"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.age || ''}
            onChange={e => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Occasion</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.occasion}
            onChange={e => setFormData(prev => ({ ...prev, occasion: e.target.value }))}
          >
            <option value="">Select an occasion</option>
            {OCCASIONS.map(occasion => (
              <option key={occasion} value={occasion}>{occasion}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Budget ($)</label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.budget || ''}
            onChange={e => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) || 0 }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Relationship</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.relationship}
            onChange={e => setFormData(prev => ({ ...prev, relationship: e.target.value }))}
          >
            <option value="">Select relationship</option>
            {RELATIONSHIPS.map(relationship => (
              <option key={relationship} value={relationship}>{relationship}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Interests</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={currentInterest}
              onChange={e => setCurrentInterest(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addInterest())}
              placeholder="Add an interest"
            />
            <button
              type="button"
              onClick={addInterest}
              className="mt-1 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.interests.map(interest => (
              <span
                key={interest}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
              >
                {interest}
                <button
                  type="button"
                  onClick={() => removeInterest(interest)}
                  className="ml-2 inline-flex items-center p-0.5 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Suggestions...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Get Gift Suggestions
            </>
          )}
        </button>
      </div>
    </form>
  );
}