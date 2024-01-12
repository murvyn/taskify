import { connectDB } from "@/lib/mongodb";
import User from "@/models/userSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/authOptions";
import bcrypt from "bcryptjs";
import { UTApi } from "uploadthing/server";
import { IUser } from "@/types";

export async function GET(req: NextRequest): Promise<NextResponse<any>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.redirect(new URL("/auth/login", req.url));
    const email = session?.user?.email;
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.redirect(new URL("/auth/login", req.url));
    return NextResponse.json({ message: "Success", user }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "there was an error" }, { status: 409 });
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse<any>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("No user");
    const email = session?.user?.email;
    const profile = session?.user as IUser;
    const image = profile.fileKey;
    const data = await request.json();
    const deleteImage = async (image: string) => {
      const utapi = new UTApi();
      await utapi.deleteFiles(image);
      console.log("deleted");
    };
    await connectDB();
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error("No user");
    if (data.firstName) {
      user.firstName = data.firstName;
    }
    if (data.lastName && data.lastName !== "") {
      user.lastName = data.lastName;
    }

    if (data.oldPassword && (data.newPassword || data.newPassword !== "")) {
      const passwordMatch = await bcrypt.compare(
        data.oldPassword,
        user.password
      );
      if (passwordMatch) {
        user.password = await bcrypt.hash(data.newPassword, 10);
      } else {
        return NextResponse.json(
          { error: "incorrect password" },
          { status: 409 }
        );
      }
    }
    if (data.status === "add") {
      user.photoUrl = data.photoUrl;
      user.fileKey = data.fileKey;

      if (image) {
        deleteImage(image);
      }
    }
    if (data.status === "delete") {
      user.photoUrl = "";
      user.fileKey = "";
      if (image) {
        deleteImage(image);
      }
    }
    const res = await user.save();
    console.log(res);
    return NextResponse.json({ message: "Success", res }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "there was an error" }, { status: 409 });
  }
}
