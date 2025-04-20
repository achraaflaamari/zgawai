import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const initGeminiApi = (apiKey: string) => {
  return new GoogleGenerativeAI(apiKey);
};

// Prompt for generating safety tips
const SAFETY_PROMPT = `
Generate a professional, concise safety reminder for employees (1-2 sentences only). 
Choose randomly from one of these categories:
- Workplace ergonomics
- Emergency procedures
- Cybersecurity tips
- Mental health at work
- Physical safety
- Fire safety
- First aid awareness
- Equipment safety

Make it helpful, actionable, and suitable for a corporate environment.
Do not include the category name in the response.
Do not use quotation marks.
`;

// Generate a safety tip using Gemini
export const generateSafetyTip = async (apiKey: string): Promise<string> => {
  try {
    const genAI = initGeminiApi(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(SAFETY_PROMPT);
    const text = result.response.text();
    
    // Clean up the text (remove quotes if present)
    return text.replace(/^["']|["']$/g, '').trim();
  } catch (error) {
    console.error("Error generating safety tip:", error);
    throw new Error("Failed to generate safety tip. Please try again later.");
  }
};
