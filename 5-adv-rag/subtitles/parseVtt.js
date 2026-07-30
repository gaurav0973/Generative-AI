import fs from "fs/promises";
import { parseTimestamp } from "./parseTimestamp.js";

export async function parseVtt(filePath) {
    const fileContent = await fs.readFile(filePath, "utf-8");

    const subtitleBlocks = fileContent
        .replace(/^WEBVTT\s*/, "")
        .trim()
        .split(/\r?\n\r?\n/);

    return subtitleBlocks.map((block) => {
        const lines = block.split(/\r?\n/);

        const [timestamp, ...textLines] = lines;

        const { start, end } = parseTimestamp(timestamp);

        return {
            start,
            end,
            text: textLines.join(" "),
        };
    });
}
