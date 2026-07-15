import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config('');


export const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})
/**
 * - system prompt
 * - user prompt 
 * - baki jo gpt ke responce hai daalte jaao =>>>>> while loop  
 *      - make an llm call 
 *      - it gives a respose => uska role "assistant hoga"
 *      - push this also in the message db ki uske pass ho pata usko bhi
 */

const SYSTEM_PROMPT = `
You are a helpful assistant that solves math problems.
You are given a math problem and you need to solve it.
You need to return the answer in the following format:
{
    "answer": "The answer to the math problem",
    "explanation": "The explanation of the answer"
}
`

const MESSAGE_DB = [{role: `system`, content: SYSTEM_PROMPT}]

async function LLMcall(prompt){
    MESSAGE_DB.push({role: "user", content: prompt});

    while(true){
        const response  = await client.chat.completions.create({
            model: 'gpt-4',
            messages: MESSAGE_DB,
        });
        const rawResult = response.choices[0].message.content;
        const paarsedResult = JSON.parse(rawResult);
        console.log(`Type of rawResult: `, typeof rawResult) // string  
        console.log(`Type of parsedResult: `, typeof paarsedResult) // object
        console.log(`Parsed Result : `, paarsedResult);
        MESSAGE_DB.push({role: "assistant", content: rawResult})
    }
}

await LLMcall("whaat is 2 + 5")

/**
 * Problems here : 
 *  - Break kaise karunga loop se ? 
 *  - simply set a pipeline for that 
 * PIPELINE : "THINK" | "ANALYSE" | "THINK" | "ANALYSE" | "OUTPUT" 
 */