import { embeddings } from "../config/llm.js";
import { getVectorStore } from "../config/vectorstore.js";
import { extractVideoId } from "../youtube/extractVideoId.js";
import { fetchTranscript } from "../youtube/fetchTranscript.js";
import { transcriptToDocuments } from "../youtube/transcriptToDocuments.js";

export async function indexYouTubeVideo(videoUrl) {

    // extract video Id
    const videoId = extractVideoId(videoUrl);

    // get the transcript
    const transcript = await fetchTranscript(videoId);

    // convert transcript => document
    const docs = transcriptToDocuments(transcript,videoId);

    // convert document to vector embedding with some emdebeedding model
    const vectorStore = await getVectorStore(embeddings);

    // strore the embedding inn the vector store
    await vectorStore.addDocuments(docs);
    
    console.log("Video Indexed Successfully");
}
