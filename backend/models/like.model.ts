import mongoose, { Schema, Types } from "mongoose";

// Define like schema
const likeSchema = new Schema({
    postID: { type: Types.ObjectId, index: true },
    commentID: { type: Types.ObjectId, index: true },
    userID: { type: Types.ObjectId, required: true, index: true },
    createdAt: { type: Date, default: Date.now }
});

// Indexes
likeSchema.index({ postID: 1 });
likeSchema.index({ commentID: 1 });
likeSchema.index({ userID: 1 });

export default mongoose.model("Like", likeSchema);
