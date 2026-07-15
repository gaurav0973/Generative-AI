import { geminiClient, gptClient, groqClient } from "./llm-client.js";


export async function callGroq(prompt){
    const response  = await groqClient.responses.create({
        model: "openai/gpt-oss-20b",
        input: prompt,
    });
    console.log(`Groq Response: `, response.output_text)
    return response.output_text;
}
export async function callGPT(prompt){
    const response = await gptClient.responses.create({
        model: "gpt-4o-mini",
        input: prompt
    });
    console.log(`GPT Response: `, response.output_text)
    return response.output_text;
}


export async function callGemini(prompt){
    const response = await geminiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    })
    console.log(`Gemini Response: `, response.text)
    return response.text;
}