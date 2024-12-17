import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Mongo Error:", err.message);
  }
};

export default connectToDB;
