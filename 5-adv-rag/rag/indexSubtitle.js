import { embeddings } from "../config/llm.js";
import { getVectorStore } from "../config/vectorstore.js";
import { parseSrt } from "../subtitles/parseSrt.js";
import { parseSubtitle } from "../subtitles/parseSubtitle.js";
import { subtitleToDocuments } from "../subtitles/subtitleToDocuments.js";

export async function indexSubtitle(filePath) {

    // Parse the subtitle file
    const subtitles = await parseSubtitle(filePath);

    // Convert subtitles into LangChain Documents
    const documents = subtitleToDocuments(subtitles);

    // Connect to the vector database
    const vectorStore = await getVectorStore(embeddings);

    // Generate embeddings and store documents
    await vectorStore.addDocuments(documents);

    console.log("✅ Subtitle indexed successfully.");
}
