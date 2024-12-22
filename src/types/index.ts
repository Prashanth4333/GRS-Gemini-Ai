export interface Recipient {
  name: string;
  age: number;
  occasion: string;
  interests: string[];
  budget: number;
  relationship: string;
}

export interface GiftSuggestion {
  title: string;
  description: string;
  reasoning: string;
  estimatedPrice: string;
}

export interface QuestionnaireFormData {
  recipient: Recipient;
}