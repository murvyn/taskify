import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/userSchema";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await request.json();
    await connectDB();
    const user = await User.findOne({ email }).select("_id");
    if (user) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return NextResponse.json({ message: "Success", newUser }, { status: 201 });
  } catch (error) {
    console.log("an error ocurred", error);
    return NextResponse.json({ error: "an error ocurred" }, { status: 500 });
  }
}
