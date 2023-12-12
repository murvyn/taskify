import mongoose from "mongoose"
import { NextResponse } from "next/server";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    return console.log("connected to mongodb...");
  } catch (error) {
    console.log("there was an error", error);
    return NextResponse.json({ error: "an error ocurred" }, { status: 500 });
  }
};

