import { tool } from "@langchain/core/tools";
import { tvlyClient } from "../index.js";
import {z} from "zod"
export const webpageExtractTool = tool(
    async ({ url }) => {
        return await tvlyClient.extract(url);
    },
    {
        name: "extract_webpage",
        description: "Extract the contents of a webpage from a URL.",
        schema: z.object({
            url: z.string().url(),
        }),
    },
);
