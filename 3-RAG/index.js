import dotenv from "dotenv"
dotenv.config()
import { generateVectorEmbeddingsForFile } from "./rag/indexing.js"
import { query } from "./rag/query.js";



// generateVectorEmbeddingsForFile("dsa.pdf")
query('Explainn inorder, preorder,  and postoprderr traversal ');
