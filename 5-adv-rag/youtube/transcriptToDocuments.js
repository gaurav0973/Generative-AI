import { Document } from "@langchain/core/documents";

export function transcriptToDocuments(transcript, videoId) {
    return transcript.map((item) => {
        return new Document({
            pageContent: item.text,
            metadata: {
                videoId,
                start: item.offset,
                end: item.offset + item.duration,
            },
        });
    });
}
