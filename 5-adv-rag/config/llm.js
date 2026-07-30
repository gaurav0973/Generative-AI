import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";

export const model = new ChatOpenAI({
    model: "gpt-5.4-mini",
    apiKey: process.env.OPENAI_API_KEY,
});

export const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY,
});
