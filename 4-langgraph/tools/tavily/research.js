import { tool } from "@langchain/core/tools";
import { tvlyClient } from "../index.js";
import {z} from "zod"
export const researchTool = tool(
    async ({ query }) => {
        return await tvlyClient.research(query);
    },
    {
        name: "research",
        description: "Perform deep research on a topic.",
        schema: z.object({
            query: z.string(),
        }),
    }
);
