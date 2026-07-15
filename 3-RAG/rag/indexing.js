import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function generateVectorEmbeddingsForFile(filepath) {
    // 1. Load PDF
    const loader = new PDFLoader(filepath);
    const docs = await loader.load();
    console.log("Type of docs: ", typeof docs);
    console.log(`Loaded ${docs.length} document(s)`);


    // 2. Embedding model
    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-small",
        apiKey: process.env.OPENAI_API_KEY,
    });

    // 3. Connect to embedding-model with Qdrant
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
            url: "http://localhost:6333",
            collectionName: "chaicode-docs",
        },
    );

    // 4. Store chunks
    await vectorStore.addDocuments(docs);

    console.log("✅ Documents Indexed Successfully");
}
