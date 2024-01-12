// export { default } from "next-auth/middleware";

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(req: NextRequest){
    const token = await getToken({req})
    if(token) return NextResponse.next()
    return NextResponse.redirect(new URL("/auth/login", req.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*"],
};
 