import { connectDB } from "@/lib/mongodb";
import Task from "@/models/taskSchema";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, description, important, date, time } = await request.json();
    const tit = title.trim();
    const des = description.trim();
    await connectDB();
    const user = await User.findOne().select("_id");
    const dateTimeString = `${date} ${time}`;
    const task = new Task({
      title: tit,
      description: des,
      important,
      dateTime: new Date(dateTimeString),
      user: user._id,
    });
    const res = await task.save();
    console.log(res);
    return NextResponse.json({ message: "Success", res }, { status: 201 });
  } catch (error) {
    console.log("posting error ", error);
    return NextResponse.json({ error: "an error ocurred in post" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const user = await User.findOne().select("_id");
    console.log(user)
    const tasks = await Task.find({ user: user._id });
    return NextResponse.json({ message: "Success", tasks }, { status: 201 });
  } catch (error) {
    console.log('getting error',error);
    return NextResponse.json({ error: "an error ocurred in get" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { title, description, important, date, time, id } =
      await request.json();
    const dateTime = `${date} ${time}`;
    await connectDB();
    const tasks = await Task.findById(id);
    if (!tasks)
      return NextResponse.json({ error: "Task not found" }, { status: 500 });
    if (title !== undefined && title.trim() !== "") {
      tasks.title = title.trim();
    }
    if (description !== undefined && description.trim() !== "") {
      tasks.description = description.trim();
    }
    const data = await tasks.set({
      important,
      dateTime: new Date(dateTime),
    });
    console.log(data);
    const res = await tasks.save();
    console.log(res);
    return NextResponse.json(
      { message: "Task updated successfully", res },
      { status: 201 }
    );
  } catch (error) {
    console.log('update error',error);
    return NextResponse.json({ error: "an error ocurred in update" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest){
  try{
    const {id} = await request.json()
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 500 });
    }
    await connectDB()
    const task = await Task.findByIdAndDelete(id)
    console.log(task)
    // if (!task) {
    //   return NextResponse.json({ error: "Task not found" }, { status: 404 });
    // }
    return NextResponse.json(
      { message: "Task deleted successfully", task },
      { status: 201 })
  }catch(error){
    console.log('delete error', error)
    return NextResponse.json({ error: "an error ocurred in delete" }, { status: 500 });
  }
}