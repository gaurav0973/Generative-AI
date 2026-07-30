import fs from "fs/promises";
import { parseTimestamp } from "./parseTimestamp.js";

export async function parseSrt(filePath) {
    const fileContent = await fs.readFile(filePath, "utf-8");

    const subtitleBlocks = fileContent.trim().split(/\r?\n\r?\n/);

    const subtitles = subtitleBlocks.map((block) => {
        const lines = block.split(/\r?\n/);
        const [index, timestamp, ...textLines] = lines;
        const { start, end } = parseTimestamp(timestamp);

        return {
            index: Number(index),
            start,
            end,
            text: textLines.join(" "),
        };
    });
    console.log(subtitles);
    return subtitles;
}
