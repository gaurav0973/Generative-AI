import OpenAI from "openai";
import {GoogleGenAI} from '@google/genai';
import dotenv from "dotenv";
dotenv.config();


export const groqClient = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export const gptClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


export const  geminiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});


