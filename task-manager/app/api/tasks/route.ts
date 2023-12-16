import { connectDB } from "@/lib/mongodb";
import Task from "@/models/taskSchema";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, description, important, date, time } = await request.json();
    await connectDB();
    const user = await User.findOne().select("_id");
    const dateTimeString = `${date} ${time}`;
    const task = new Task({
      title,
      description,
      important,
      dateTime: new Date(dateTimeString),
      user: user._id,
    });
    const res = await task.save();
    console.log(res);
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    console.log("an error ocurred", error);
    return NextResponse.json({ error: "an error ocurred" }, { status: 500 });
  }
}

export async function GET(request: Request){

}
