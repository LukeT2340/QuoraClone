import mongoose, { Schema, Types } from "mongoose";

// Define comment schema
const commentSchema = new Schema({
    postID: { type: Types.ObjectId, required: true, index: true },
    userID: { type: Types.ObjectId, required: true, index: true },
    text: { type: String, required: true },
    media: [{ type: String, required: true }],
    likes: { type: Number, default: 0 },
    commentID: { type: Types.ObjectId },
    createdAt: { type: Date, default: Date.now, index: true },
    updatedAt: { type: Date }
});

// Indexes
commentSchema.index({ postID: 1 });
commentSchema.index({ userID: 1 });
commentSchema.index({ createdAt: 1 });

export default mongoose.model("Comment", commentSchema);
