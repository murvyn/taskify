import { connectDB } from "@/lib/mongodb";
import User from "@/models/userSchema";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { nullable } from "zod";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any, req) {
        try {
          if (!credentials?.email || !credentials?.password) return nullable;
          await connectDB;
          const user = await User.findOne({ email: credentials.email! });
          if (!user) return null;
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          return passwordMatch ? user : null;
        } catch (error) {
          console.log("an error ocurred", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
