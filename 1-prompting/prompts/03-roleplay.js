import { client } from "../index.js";

export async function roleplay(prompt, systemPrompt){
    const completion = await client.chat.completions.create({
        model: 'gpt-4',
        messages: [
            { role: `system`, content: systemPrompt },
            { role: 'user', content: prompt },
        ],
    });
    return completion.choices[0].message.content;
}

export default roleplay;