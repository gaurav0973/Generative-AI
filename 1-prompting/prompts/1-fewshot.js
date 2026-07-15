import { client } from "../index.js";

export async function fewShot(prompt){
    const completion = await client.chat.completions.create({
        model: 'gpt-4',
        messages: [
            { role: 'user', content: prompt },
        ],
    });
    return completion.choices[0].message.content;
}

export default fewShot;