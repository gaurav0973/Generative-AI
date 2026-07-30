import dotenv from "dotenv"
dotenv.config()
import { indexYouTubeVideo } from "./rag/indexYouTube.js";
import { query } from "./rag/querying.js";
import { parseSrt } from "./subtitles/parseSrt.js";
import { indexSubtitle } from "./rag/indexSubtitle.js";

// async function main() {
//     const videoUrl = "https://www.youtube.com/watch?v=VIDEO_ID";

//     // Step 1: Index the video
//     await indexYouTubeVideo(videoUrl);

//     // Step 2: Ask questions
//     await query("What is this video about?");
// }

// main().catch(console.error);

// indexYouTubeVideo("https://youtu.be/KCr-UNsM3vA?si=w_wZ5Y9eecxuSXQj");
// query("You mean toi say we are talking about any document for some topic")



await indexSubtitle("./abcd.vtt");

