export function buildContext(docs) {
    return docs
        .map(
            (doc) => `
Video ID: ${doc.metadata.videoId}
Timestamp: ${doc.metadata.start} - ${doc.metadata.end}

Transcript:
${doc.pageContent}
`,
        )
        .join("\n----------------------------------------\n");
}
