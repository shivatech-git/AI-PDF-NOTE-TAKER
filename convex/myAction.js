import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { action } from "./_generated/server.js";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText:v.any(),
    fileId:v.string(),
  },
  handler: async (ctx) => {
    await ConvexVectorStore.fromTexts(
        args.splitText,
        args.fileId,
      /*["Hello world", "Bye bye", "What's this?"],
      [{ prop: 2 }, { prop: 1 }, { prop: 3 }],*/
      new GoogleGenerativeAIEmbeddings({
        apiKey:'AIzaSyDc2wQXf7xgMeNPiXzWdo_cWc5JbXR51qc',
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return 'completed'
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId:v.string()
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey:'AIzaSyDc2wQXf7xgMeNPiXzWdo_cWc5JbXR51qc',
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
       { ctx });

    const resultOne = (await vectorStore.similaritySearch(args.query, 1)).filter(q=>q,metadata.fileId==args.fileId);
    console.log(resultOne);

    return JSON.stringify(resultOne);
  },
});