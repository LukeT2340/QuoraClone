import mongoose, { Schema } from "mongoose";

// Define roles
const roles = ["user", "admin"];

// Define user schema
const userSchema = new Schema({
    email: { type: String, required: true },
    displayName: { type: String, required: true },
    profilePicture: { type: String },
    googleId: { type: String, required: true },
    googleAccessToken: { type: String, required: true },
    googleRefreshToken: { type: String, required: true },
    role: { type: String, enum: roles, default: "user", required: true },
    registeredAt: { type: Date, default: Date.now },
    password: { type: String }
});

export default mongoose.model("User", userSchema);
