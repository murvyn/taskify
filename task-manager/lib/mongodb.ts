import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    return console.log("connected to mongodb...");
  } catch (error) {
    console.log("there was an error", error);
  }
};

