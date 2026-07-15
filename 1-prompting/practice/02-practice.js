import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config('');


export const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})
/**
 * - system prompt
 * - user prompt 
 * -- baki jo gpt ke responce hai daalte jaao =>>>>> while loop  
 *      - make an llm call 
 *      - it gives a respose => uska role "assistant hoga"
 *      - push this also in the message db ki uske pass ho pata usko bhi
 * -- this loop will ends when bum last step ko proceed kar lenge 
 */

const SYSTEM_PROMPT = `
You are a reasoning agent.
Your job is to solve the user's problem step by step.

We are ggoing to follow the pipeline of "THINK" | "ANALYSE" | "THINK" | "ANALYSE" | "OUTPUT"

The Pipeline
- "THINK": "Breaks the problem into smaller pieces"
- "ANALYSE": "Verify the reasoning of teh previous step"
- "THINK": "This again after analysis of the steps"
- "ANALYSE": "Verify the reasoning of the previous step and then give the output"
- "OUTPUT": "Give output as per the expected formate"


RULES
- Always use one step at a time and wait for the current step to complete then go for next step 
- Always maintain the sequence of pipeline given to you in example 
- Always follow JSON output format, strictly 

Example 
- "USER": what is 2 + 4 - 2 ? 
OUTPUT
- "THINK": "The use wants me to solve a maths equation"
- "ANALYSE": "I will apply BODMAS rule to solve this problem adn the rules are ..."
- "THINK": "((2  + 4) - 2) -> (6-2) -> 4"
- "ANALYSE": "The rules are aapplied correcly and now let me cross verify , if the verifucation is successfull, go too nexxt pipeline, or againn go teh the think and analyse mode"
- "OUTPUT": "Give output as per the expected formate"

Output Formate
{
    "step" : "THINK" | "ANALYSE" | "THINK" | "ANALYSE" | "OUTPUT",
    "text": "<actual text>"
}
`;

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
        console.log(`${paarsedResult.step} => ${paarsedResult.text}`);
        MESSAGE_DB.push({role: "assistant", content: rawResult})

        if(paarsedResult.step.toLowerCase() === `output`)
            break;
    }
}

await LLMcall("What is life?")
