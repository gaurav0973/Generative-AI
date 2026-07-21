import { ChatGroq } from "@langchain/groq";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import readline from "readline/promises";
import { webpageCrawlTool } from "./tools/tavily/crawl-webpage.js";
import { webpageExtractTool } from "./tools/tavily/extrach-webpage.js";
import { webpageMapTool } from "./tools/tavily/map-webpage.js";
import { researchTool } from "./tools/tavily/research.js";
import { webSearchTool } from "./tools/tavily/web-search.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// initialise teh llm
const llm = new ChatGroq({
    model: "openai/gpt-oss-20b",
    temperature: 0,
    maxRetries: 2,
});
// ToolNode
const tools = [
    webSearchTool,
    webpageExtractTool,
    webpageCrawlTool,
    webpageMapTool,
    researchTool,
];
const toolNode = new ToolNode(tools);
const llmWithTools = llm.bindTools(tools);

/**
 * define node funcction
 * build the graph
 * campile and build the graph
 */

async function callModel(state) {
    console.log("calling an llm...");
    const response = await llmWithTools.invoke(state.messages);
    return {
        messages: [response],
    };
}



function shouldContinue(state) {
    console.log("\nChecking if tool should be called...\n");
    const lastMessage = state.messages.at(-1);
    if (lastMessage.tool_calls?.length) {
        console.log("🛠 Tool Call Detected");
        console.log("Tool Called: ",lastMessage.tool_calls)
        return "tools";
    }

    console.log("✅ No Tool Needed");
    return "__end__";
}

// Build the graph
const workflow = new StateGraph(MessagesAnnotation)
    .addNode("agent", callModel)
    .addNode("tools", toolNode)
    .addEdge("__start__", "agent")
    .addEdge("agent", "__end__")
    .addEdge("tools", "agent")
    .addConditionalEdges("agent", shouldContinue);

// compile the graph
const app = workflow.compile();

async function main() {
    while (true) {
        const userInput = await rl.question("You: ");
        if (userInput.trim() === "/bye") break;

        const finalMessage = await app.invoke({
            messages: [
                {
                    role: "user",
                    content: userInput,
                },
            ],
        });
        const lastMessagge = finalMessage.messages.at(-1);
        console.log(lastMessagge.content);
    }
    rl.close();
}
main();
