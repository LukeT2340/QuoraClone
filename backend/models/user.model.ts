import mongoose, { Schema, Types } from "mongoose";

// Define roles
const roles = ["user", "admin"];

// User interface
export interface IUser  {
    _id: Types.ObjectId,
    email: string,
    displayName?: string,
    profilePicture?: string,
    googleId?: string,
    googleAccessToken?: string,
    googleRefreshToken?: string,
    role?: string,
    registeredAt: Date,
    password?: string,
}

// Define user schema
const userSchema = new Schema({
    email: { type: String, require: true },
    displayName: { type: String },
    profilePicture: { type: String },
    googleId: { type: String },
    googleAccessToken: { type: String },
    googleRefreshToken: { type: String },
    role: { type: String, enum: roles, default: "user" },
    registeredAt: { type: Date, default: Date.now },
    password: { type: String }
});

export default mongoose.model("User", userSchema);
