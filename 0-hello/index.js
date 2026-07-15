import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const completion = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [
        { role: 'developer', content: 'Talk like a pirate.' },
        { role: 'user', content: 'Are semicolons optional in JavaScript?' },
    ],
});

console.log(completion.choices[0].message.content);