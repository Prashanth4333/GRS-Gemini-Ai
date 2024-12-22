import OpenAI from 'openai';
import type { Recipient, GiftSuggestion } from '../types';
import { getMockSuggestions } from './mockData';

const openai = new OpenAI({
  apiKey: "",
  dangerouslyAllowBrowser: true
});

const parseGiftSuggestions = (content: string): GiftSuggestion[] => {
  return content.split('\n\n')
    .filter(block => block.trim().length > 0)
    .map(block => {
      const lines = block.split('\n');
      return {
        title: lines[0]?.replace(/^\d+\.\s*/, '') || 'Gift Suggestion',
        description: lines[1]?.replace(/Description:\s*/, '') || '',
        reasoning: lines[2]?.replace(/Why it's a good fit:\s*/, '') || '',
        estimatedPrice: lines[3]?.replace(/Estimated price:\s*/, '') || ''
      };
    });
};

export async function generateGiftSuggestions(recipient: Recipient): Promise<GiftSuggestion[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful gift recommendation expert. Provide specific, thoughtful gift suggestions based on the person's profile. Format each suggestion with a title, description, reasoning, and estimated price."
        },
        {
          role: "user",
          content: `Please suggest 3 thoughtful gifts for the following person:
            Name: ${recipient.name}
            Age: ${recipient.age}
            Occasion: ${recipient.occasion}
            Interests: ${recipient.interests.join(', ')}
            Budget: $${recipient.budget}
            Relationship: ${recipient.relationship}`
        }
      ],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return getMockSuggestions(recipient.budget);
    }

    return parseGiftSuggestions(content);
  } catch (error) {
    console.error('Error generating gift suggestions:', error);
    // Fallback to mock suggestions when API fails
    return getMockSuggestions(recipient.budget);
  }
}