import { tool } from "@langchain/core/tools";
import { tvlyClient } from "../index.js";
import {z} from "zod"
export const webSearchTool = tool(
    async ({ query }) => {
        return await tvlyClient.search(query);
    },
    {
        name: "web_search",
        description: "Search the web for recent information.",
        schema: z.object({
            query: z.string(),
        }),
    }
);
