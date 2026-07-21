import { tool } from "@langchain/core/tools";
import { tvlyClient } from "../index.js";
import {z} from "zod"
export const webpageMapTool = tool(
    async ({ url }) => {
        return await tvlyClient.map(url);
    },
    {
        name: "map_webpage",
        description: "Generate a sitemap of a website.",
        schema: z.object({
            url: z.string().url(),
        }),
    }
);
