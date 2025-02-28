import React, { useState } from "react";
import { Gift, Send } from "lucide-react";
import type { Recipient, GiftSuggestion } from "../types";
import { generateGiftSuggestions } from "../services/gemini";
import GiftSuggestions from "./GiftSuggestions";

interface QuestionnaireFormProps {
  onSubmit: (data: GiftSuggestion[]) => void;
}

const OCCASIONS = ["Birthday", "Anniversary", "Wedding", "Graduation", "Christmas", "Housewarming", "Baby Shower", "Other"];
const RELATIONSHIPS = ["Family", "Friend", "Colleague", "Partner", "Acquaintance", "Other"];

export default function QuestionnaireForm({ onSubmit }: QuestionnaireFormProps) {
  const [formData, setFormData] = useState<Recipient>({
    name: "",
    age: 0,
    occasion: "",
    interests: [],
    budget: 0,
    relationship: "",
  });

  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [currentInterest, setCurrentInterest] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Form Data Sent to AI:", formData);
      const generatedSuggestions = await generateGiftSuggestions(formData);
      console.log("Generated Suggestions:", generatedSuggestions);
      setSuggestions(generatedSuggestions);
      onSubmit(generatedSuggestions);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addInterest = () => {
    if (currentInterest.trim() && !formData.interests.includes(currentInterest.trim())) {
      setFormData((prev) => ({ ...prev, interests: [...prev.interests, currentInterest.trim()] }));
      setCurrentInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setFormData((prev) => ({ ...prev, interests: prev.interests.filter((i) => i !== interest) }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Gift className="w-8 h-8 text-gray-700 font-normal" />
          <h2 className="text-3xl font-semibold text-gray-700 font-normal font-greatvibes">Gift Recipient Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 font-ptsans">Recipient's Name</label>
            <input type="text" required className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-gray-700 focus:border-gray-700 p-2 text-lg font-pt-sans" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 font-pt-sans">Age</label>
            <input type="number" required min="0" className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-gray-700 focus:border-gray-700 p-2 text-lg font-pt-sans" value={formData.age || ""} onChange={(e) => setFormData((prev) => ({ ...prev, age: parseInt(e.target.value) || 0 }))} />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 font-pt-sans">Occasion</label>
            <select required className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-gray-700 focus:border-gray-700 p-2 text-lg font-pt-sans" value={formData.occasion} onChange={(e) => setFormData((prev) => ({ ...prev, occasion: e.target.value }))}>
              <option value="">Select an occasion</option>
              {OCCASIONS.map((occasion) => (<option key={occasion} value={occasion}>{occasion}</option>))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 font-pt-sans">Budget ($)</label>
            <input type="number" required min="0" className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-gray-700 focus:border-gray-700 p-2 text-lg font-pt-sans" value={formData.budget || ""} onChange={(e) => setFormData((prev) => ({ ...prev, budget: parseInt(e.target.value) || 0 }))} />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 font-pt-sans">Relationship</label>
            <select required className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-gray-700 focus:border-gray-700 p-2 text-lg font-pt-sans" value={formData.relationship} onChange={(e) => setFormData((prev) => ({ ...prev, relationship: e.target.value }))}>
              <option value="">Select relationship</option>
              {RELATIONSHIPS.map((relationship) => (<option key={relationship} value={relationship}>{relationship}</option>))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 font-pt-sans">Interests</label>
            <div className="flex gap-2">
              <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-gray-700 focus:border-gray-700 p-2 text-lg font-pt-sans" value={currentInterest} onChange={(e) => setCurrentInterest(e.target.value)} onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())} placeholder="Add an interest" />
              <button type="button" onClick={addInterest} className="mt-1 bg-gray-800 text-white py-2 px-4 rounded-md font-pt-sans">Add</button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.interests.map((interest) => (
                <span key={interest} className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 text-gray-900 font-pt-sans">
                  {interest}
                  <button type="button" onClick={() => removeInterest(interest)} className="ml-2 text-gray-600 hover:text-gray-800">×</button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button type="submit" disabled={isLoading} className="px-6 py-3 text-white bg-gray-800 hover:bg-gray-900 transition rounded-md flex items-center gap-2 font-pt-sans text-lg">
            {isLoading ? "Generating..." : <> <Send className="w-5 h-5" /> Get Suggestions </>}
          </button>
        </div>
      </form>

      {/* Gift Suggestions Component */}
      <GiftSuggestions suggestions={suggestions} isLoading={isLoading} />
    </div>
  );
}
