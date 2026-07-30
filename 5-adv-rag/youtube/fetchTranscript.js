import { YoutubeTranscript } from "youtube-transcript";

export async function fetchTranscript(videoId) {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    console.log(`Loaded ${transcript.length} transcript lines`);
    return transcript;
}
