import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

export async function query(userQuery) {

    //1. Embedding model
    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-small",
        apiKey: process.env.OPENAI_API_KEY,
    });

    //2. Connect the embedding-model to vector DB
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
            url: "http://localhost:6333",
            collectionName: "chaicode-docs",
        },
    );

    //3. Retriever => only top 5 result
    const retriever = vectorStore.asRetriever({k: 5});
    // console.log("Type of Retriver: ",typeof retriever)
    // console.log("Content in retriver: ", retriever)


    //4. Retrieve relevant chunks
    const docs = await retriever.invoke(userQuery);

    //5. Format context
    const context = docs.map((doc) => `
            Source: ${doc.metadata.source}
            Page: ${doc.metadata.loc?.pageNumber}
            ${doc.pageContent}`,
        ).join("\n----------------------\n");

    //6. Prompt
    const prompt = ChatPromptTemplate.fromMessages([[ "system",`
            You are an expert assistant.
            Answer ONLY using the provided context.

            If the answer is not found in the context, say:

            "I couldn't find that information in the uploaded document."

            Always mention the page number and source document whenever possible.

            Context:
            ${context}`],
        ["human", "{question}"],
    ]);

    // LLM
    const model = new ChatOpenAI({
        model: "gpt-5.4-mini",
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Create messages
    const messages = await prompt.invoke({
        context,
        question: userQuery,
    });

    // Generate answer
    const response = await model.invoke(messages);

    console.log("\n=========================");
    console.log(response.content);
    console.log("=========================\n");
}
