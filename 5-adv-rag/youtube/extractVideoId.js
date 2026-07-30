import youtubeUrl from "youtube-url";

export function extractVideoId(videoUrl) {
    return youtubeUrl.extractId(videoUrl);
}
