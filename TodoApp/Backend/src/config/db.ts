import mongoose from "mongoose";
import dotenv from 'dotenv';

const dconfig = dotenv.config();

export const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB is connected");
  }catch(error){
    console.error("MongoDB Connection Error:", error);
  }
}