import mongoose from "mongoose";

export default async function connectDB() {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri);
    console.log("DB Connected");
  } catch (error) {
    throw new Error(error.message);
  }
}
