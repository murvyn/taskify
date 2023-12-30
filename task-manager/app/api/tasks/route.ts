import { connectDB } from "@/lib/mongodb";
import Task from "@/models/taskSchema";
import User from "@/models/userSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/authOptions";
import { signOut } from "next-auth/react";

export async function POST(request: NextRequest) {
  try {
    const { title, description, important, date, time } = await request.json();
    const tit = title.trim();
    const des = description.trim();
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("No user");
    const email = session?.user?.email;
    await connectDB();
    const user = await User.findOne({ email }).select("_id");
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
    return NextResponse.json(
      { error: "an error ocurred in post" },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse<any>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("No user");
    const email = session?.user?.email;
    await connectDB();
    const user = await User.findOne({ email }).select("_id");
    if (!user) {
      return NextResponse.redirect("/login");
    }
    const tasks = await Task.find({ user: user._id });
    return NextResponse.json({ message: "Success", tasks }, { status: 201 });
  } catch (error) {
    console.log("getting error");
    return NextResponse.json(
      { error: "an error ocurred in get" },
      { status: 409 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { title, description, important, date, time, id, complete } =
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
    if (complete || !complete) {
      tasks.complete = !tasks.complete;
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
    console.log("update error", error);
    return NextResponse.json(
      { error: "an error ocurred in update" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 500 });
    }
    await connectDB();
    const task = await Task.findByIdAndDelete(id);
    console.log(task);
    // if (!task) {
    //   return NextResponse.json({ error: "Task not found" }, { status: 404 });
    // }
    return NextResponse.json(
      { message: "Task deleted successfully", task },
      { status: 201 }
    );
  } catch (error) {
    console.log("delete error", error);
    return NextResponse.json(
      { error: "an error ocurred in delete" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, complete } = await request.json();
    await connectDB();
    const task = await Task.findById(id);
    if (!task)
      return NextResponse.json({ error: "Task not found" }, { status: 500 });
    task.complete = !complete;
    const res = await task.save();
    console.log(res);
    return NextResponse.json(
      { message: "Task complete successfully", task },
      { status: 201 }
    );
  } catch (error) {
    console.log("patch error", error);
    return NextResponse.json(
      { error: "an error ocurred in patch" },
      { status: 500 }
    );
  }
}
