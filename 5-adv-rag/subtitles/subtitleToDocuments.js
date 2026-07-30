import { Document } from "@langchain/core/documents";

export function subtitleToDocuments(subtitles) {
    return subtitles.map((subtitle) => {
        return new Document({
            pageContent: subtitle.text,
            metadata: {
                start: subtitle.start,
                end: subtitle.end,
            },
        });
    });
}
