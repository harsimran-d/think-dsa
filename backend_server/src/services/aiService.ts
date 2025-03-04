import { prisma } from "../lib/db";
import axios from "axios";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const AI_MODEL = "gpt-4-turbo";

export const generateLearningPathAI = async (userProgress: any) => {
  try {
    const prompt = `
      The user has the following strengths: ${JSON.stringify(
        userProgress.strengths
      )}.
      The user has the following weaknesses: ${JSON.stringify(
        userProgress.weaknesses
      )}.

      Generate a structured DSA learning path that focuses on improving their weak areas while reinforcing their strengths.
      Suggest specific topics and recommended platforms (like LeetCode, Codeforces, or GeeksforGeeks) to practice.
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: AI_MODEL,
        messages: [{ role: "system", content: prompt }],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.choices || response.data.choices.length === 0) {
      throw new Error("Invalid AI response");
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("AI Learning Path Generation Error:", error);
    return "Error generating learning path. Please try again later.";
  }
};

export const generateQuestionExplanation = async (questionText: string) => {
  try {
    const prompt = `
      Explain the solution to the following Data Structures & Algorithms (DSA) problem in simple terms:
      "${questionText}"
      
      Provide an optimal approach, code example, and common mistakes to avoid.
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: AI_MODEL,
        messages: [{ role: "system", content: prompt }],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.choices || response.data.choices.length === 0) {
      throw new Error("Invalid AI response");
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("AI Explanation Generation Error:", error);
    return "Error generating explanation. Please try again later.";
  }
};
