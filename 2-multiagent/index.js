import readline from "node:readline";
import { callGemini, callGPT, callGroq } from "./utils/api-call.js";


const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// 1. get all the model response
// 2. use chatGPT to validate and cross verify the response and give the output based on the all three responses
// 3. display this new response

async function main(prompt) {
	
    //  promise,all => jab sare responce aa jaye then move aage
    const [geminiResponse, gptResponse, groqResponse] = await Promise.all([
		callGemini(prompt),
		callGPT(prompt),
		callGroq(prompt),
	]);

	const finalPrompt = `
        You are analysing the three answers to the same user prompt. The output given by teh three models are as follows

        MODEL RESPONSES:
        "User prompt": ${prompt},
        "Gemini answer": ${geminiResponse},
        "GPT answer":${gptResponse},
        "Groq answer":${groqResponse}

        Compare the three answers, correct any mistakes, and return one final concise answer for the user.
        `;
	const finalResponse = await callGroq(finalPrompt);
	console.log("\nFinal Response:\n", finalResponse);
}

async function startChat(){
    rl.question("You: ", async(prompt) => {
        if(prompt.toLowerCase() === "exit"){
            console.log("Goodbye!");
            rl.close(); 
            return;
        }
        
        await main(prompt);
        console.log("\n-----------------------------\n");
        await startChat(); 
    })
}

startChat();

