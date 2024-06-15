import mongoose, { Schema, Types } from "mongoose";

// Define post schema
const postSchema = new Schema({
    userID: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    media: [{ type: String, required: true }],
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

export default mongoose.model("Post", postSchema)