import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const Mongo_Url = process.env.MONGO_URL || "mongodb+srv://admin:KHbZy44xoHcsLUT0@cluster0.gmjypdy.mongodb.net/thirdb";
export const connectDB = async () => {
    try {
        await mongoose.connect(Mongo_Url);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Error connecting to MongoDB:", err.message);
    }
};
