import type { GiftSuggestion } from '../types';

export const getMockSuggestions = (budget: number): GiftSuggestion[] => {
  const suggestions: GiftSuggestion[] = [
    {
      title: "Premium Wireless Headphones",
      description: "High-quality noise-canceling headphones with excellent sound quality and comfort",
      reasoning: "Perfect for music lovers and commuters, offering both style and functionality",
      estimatedPrice: `$${Math.min(299, budget).toFixed(2)}`
    },
    {
      title: "Personalized Photo Album",
      description: "Custom-made photo album with high-quality prints and elegant design",
      reasoning: "A thoughtful way to preserve memories and show care through personalization",
      estimatedPrice: `$${Math.min(75, budget).toFixed(2)}`
    },
    {
      title: "Experience Gift Box",
      description: "Curated box of activities and experiences tailored to recipient's interests",
      reasoning: "Provides memorable experiences rather than just material items",
      estimatedPrice: `$${Math.min(150, budget).toFixed(2)}`
    }
  ];

  return suggestions.filter(s => parseFloat(s.estimatedPrice.replace('$', '')) <= budget);
};