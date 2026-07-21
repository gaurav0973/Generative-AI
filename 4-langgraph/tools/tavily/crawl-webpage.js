import { tool } from "@langchain/core/tools";
import { tvlyClient } from "../index.js";
import {z} from "zod"
export const webpageCrawlTool = tool(
    async ({ url, instructions }) => {
        return await tvlyClient.crawl(url, {
            instructions,
        });
    },
    {
        name: "crawl_webpage",
        description: "Crawl a website using instructions.",
        schema: z.object({
            url: z.string().url(),
            instructions: z.string(),
        }),
    }
);
