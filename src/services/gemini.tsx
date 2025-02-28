import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("⚠️ Missing API Key. Ensure VITE_GEMINI_API_KEY is set.");
}

console.log("✅ API Key Loaded:", apiKey ? "Yes" : "No");

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const generateGiftSuggestions = async (formData) => {
  if (!formData || !formData.occasion || !formData.relationship || !formData.interests?.length || !formData.budget) {
    console.warn("⚠️ Skipping API call due to incomplete form data.", formData);
    return [];
  }

  console.log("🔹 Generating suggestions for:", formData);

  try {
    const prompt = `Provide 5 unique gift ideas based on the following details:
      Occasion: ${formData.occasion}
      Relationship: ${formData.relationship}
      Interests: ${formData.interests.join(", ")}
      Budget: $${formData.budget}
      
      Format the response as a valid JSON array containing objects with:
      - title (string)
      - description (string)
      - reasoning (string)
      - estimatedPrice (string)
      
      **Ensure the response is valid JSON with no extra text or formatting.**`;

    const requestPayload = { contents: [{ parts: [{ text: prompt }] }] };

    console.log("📩 Sending Request to Gemini API...");
    const result = await model.generateContent(requestPayload);

    if (!result?.response) {
      throw new Error("Invalid API response structure.");
    }

    const textResponse = await result.response.text();
    console.log("📩 API Raw Response:", textResponse);

    // Extract JSON data safely (remove any extra text)
    const jsonMatch = textResponse.match(/\[.*\]/s);
    if (!jsonMatch) {
      throw new Error("JSON not properly formatted in response.");
    }

    const cleanJson = jsonMatch[0];
    const suggestions = JSON.parse(cleanJson);

    if (!Array.isArray(suggestions)) throw new Error("Parsed data is not an array.");

    return suggestions.map(({ title, description, reasoning, estimatedPrice }) => ({
      title: title?.trim() || "Gift",
      description: description?.trim() || "No description available.",
      reasoning: reasoning?.trim() || "No reasoning provided.",
      estimatedPrice: estimatedPrice?.trim() || "Price unknown",
    }));
  } catch (error) {
    console.error("❌ Error generating suggestions:", error.message);
    return [
      {
        title: "Error",
        description: "Sorry, we couldn't generate suggestions at this time. Please try again.",
        reasoning: "AI service error.",
        estimatedPrice: "$0",
      },
    ];
  }
};
