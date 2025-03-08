import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado ao MongoDB Atlas!");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error);
  }
}
