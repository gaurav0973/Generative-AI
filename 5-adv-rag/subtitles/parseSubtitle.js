import path from "path";

import { parseSrt } from "./parseSrt.js";
import { parseVtt } from "./parseVtt.js";

export async function parseSubtitle(filePath) {

    const extension = path.extname(filePath).toLowerCase();

    switch (extension) {

        case ".srt":
            return parseSrt(filePath);

        case ".vtt":
            return parseVtt(filePath);

        default:
            throw new Error(
                `Unsupported subtitle format: ${extension}`
            );

    }

}
