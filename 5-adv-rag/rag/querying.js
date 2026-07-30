import { embeddings, model } from "../config/llm.js";
import { getVectorStore } from "../config/vectorstore.js";
import { teacherPrompt } from "../prompt/teacherPrompt.js";
import { buildContext } from "../utils/buildContext.js";

export async function query(userQuery) {
    // Connect to the vector database using the embedding model
    const vectorStore = await getVectorStore(embeddings);

    // Create a retriever to perform semantic search
    const retriever = vectorStore.asRetriever({
        k: 3,
    });

    // Retrieve the most relevant documents for the user's question
    const docs = await retriever.invoke(userQuery);

    // Convert the retrieved documents into a context string
    const context = buildContext(docs);

    // Create the final prompt by combining the context and user's question
    const messages = await teacherPrompt.invoke({
        context,
        question: userQuery,
    });

    // Generate the final answer using the LLM
    const response = await model.invoke(messages);

    console.log(response.content);
}
