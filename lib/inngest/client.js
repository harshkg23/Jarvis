import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "jarvis", // Unique app ID
  name: "Jarvis",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
