import { connectDB } from "@/lib/mongodb";
import User from "@/models/userSchema";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { IUser } from "@/types";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any, req) {
        try {
          if (!credentials?.email || !credentials?.password) return null;
          await connectDB();
          const user = await User.findOne({ email: credentials.email! }).select(
            "+password"
          );
          console.log("user", user);
          if (!user) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!passwordMatch) {
            return null;
          }
          if(user){
            console.log(user)
            return user};
        } catch (error) {
          console.log("an error ocurred", error);
          return NextResponse.redirect("/")
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
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        token.user = session.user
        return token;
      }
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      const user = token.user as IUser;
      session.user = user as IUser;
      return session;
    },
  },
};
