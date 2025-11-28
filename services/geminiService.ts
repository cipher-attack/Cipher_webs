import { GoogleGenAI, Chat } from "@google/genai";

// Initialize Gemini
// We check both import.meta.env (Vite standard) and process.env (Node/Next standard)
// Note: Ensure your Vercel environment variable is named 'VITE_API_KEY'
const getApiKey = () => {
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY;
    }
  } catch (e) {}
  
  return process.env.API_KEY || process.env.VITE_API_KEY || '';
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

// We'll keep a simple in-memory chat instance for the session
let chatInstance: Chat | null = null;

export const initializeChat = (systemInstruction: string) => {
  try {
    const key = getApiKey();
    if (!key) {
      console.warn("Cipher AI: No API Key found. Chat functionality will be limited.");
      return;
    }

    chatInstance = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
  } catch (error) {
    console.error("Failed to initialize chat:", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  const key = getApiKey();
  if (!key) {
    return "Configuration Error: API Key is missing. Please set VITE_API_KEY in your environment variables.";
  }

  if (!chatInstance) {
    // Fallback if not initialized
    initializeChat("You are a helpful cybersecurity assistant for CIPHER, a security agency.");
  }

  try {
    if (!chatInstance) throw new Error("Chat instance not ready");
    
    const response = await chatInstance.sendMessage({ message });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Secure connection failed. The AI node is currently unreachable. Please check your network.";
  }
};
