import { QdrantVectorStore } from "@langchain/qdrant";
import { embeddings } from "./llm.js";

export async function getVectorStore(embeddings) {
    return await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
            url: "http://localhost:6333",
            collectionName: "youtube-rag",
        }
    );
}
