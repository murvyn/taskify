import clientPromise from "@/lib/mongo";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/userSchema";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs"
import CredentialsProvider from "next-auth/providers/credentials";




export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {},
        async authorize(credentials: any, req) {
          if (!credentials?.email || !credentials?.password) return null;
          await connectDB;
          const user = await User.findOne({ email: credentials.email! });
          if (!user) return null;
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          return passwordMatch ? user : null;
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
    adapter: MongoDBAdapter(clientPromise),
  };