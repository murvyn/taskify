import { connectDB } from "@/lib/mongodb";
import User from "@/models/userSchema";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any, req) {
        try {
          if (!credentials?.email || !credentials?.password) return null;
          await connectDB();
          const user = await User.findOne({ email: credentials.email! });
          if (!user) return null;
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!passwordMatch){
            console.log('password does not match')
            return null
          }
          return user 
        } catch (error) {
          // console.log("an error ocurred", error);
          return NextResponse.json({ error: "an error ocurred" }, { status: 500 });
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
