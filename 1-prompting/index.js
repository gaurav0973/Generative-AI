import OpenAI from "openai";
import dotenv from "dotenv";
import zeroShot from "./prompts/0-zero-shot.js";
import fewShot from "./prompts/1-fewshot.js";
import { chainOfThoughtsSystemPrompt, rolePlaySystemPrompt } from "./utils/systemPrompts.js";
import chainOfThoughts from "./prompts/02-chaiOfThoughts.js";
import roleplay from "./prompts/03-roleplay.js";
dotenv.config();

export const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// --- Zero shot prompt ---
// const response = await zeroShot("what is 2 + 3 ?");
// console.log(response);
// console.log(typeof response)

// --- Few shot prompt ---
// const response = await fewShot(`
//     What is 2 + 8 ? 
//     Example:
//     - What is 2 + 8 ?
//         Expected: 10
//     - What is 5 + 8 ?
//         Expected: 13
// `);
// console.log(response);
// console.log(typeof response)

// --- Chain of thought prompt ---
// const response = await chainOfThoughts("What is 2 + 3 ?", chainOfThoughtsSystemPrompt);
// console.log(response);
// console.log(typeof response)


// --- Role Play prompt
// const response = await roleplay("How to solve Two sum problem in DSA ?", rolePlaySystemPrompt);
// console.log(response)