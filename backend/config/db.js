import mongoose from "mongoose";

export const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        console.warn("MONGODB_URI is missing in backend/.env. Starting server without DB connection.");
        return false;
    }

    try {
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
        console.log("DB CONNECTED");
        return true;
    } catch (error) {
        console.error("DB connection failed:", error.message);
        return false;
    }
};