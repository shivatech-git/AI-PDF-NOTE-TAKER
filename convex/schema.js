import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    user:defineTable({
        userName:v.string(),
        email:v.string(),
        imageUrl:v.string()
    }),

    pdfFiles:defineTable({
        fileId:v.string(),
        storageId:v.string(),
        fileName:v.string(),
        fileUrl:v.string(),
        createdBy:v.string()
    }),

    users:defineTable({
        email:v.string(),
        imageUrl:v.string(),
        userName:v.string(),
        upgrade:v.optional(v.boolean())
    }),

    documents: defineTable({
        embedding: v.array(v.number()),
        text: v.string(),
        metadata: v.any(),
      }).vectorIndex("byEmbedding", {
        vectorField: "embedding",
        dimensions: 768,
     }),

    notes:defineTable({
        fileId:v.string(),
        notes:v.any(),
        createdBy:v.string()
    })
})

