import { GoogleGenAI, Chat } from "@google/genai";

// Initialize Gemini
// Note: In a real production app, this should be proxied through a backend to hide the key.
// Since this is a client-side demo request:
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// We'll keep a simple in-memory chat instance for the session
let chatInstance: Chat | null = null;

export const initializeChat = (systemInstruction: string) => {
  try {
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
  if (!process.env.API_KEY) {
    return "Error: API_KEY is missing in environment variables.";
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
    return "Connection error. Please check your network or API key.";
  }
};