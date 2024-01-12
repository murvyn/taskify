export {default}from 'next-auth/middleware'
 

// See "Matching Paths" below to learn more
export const config = {
  matcher: [ '/((?!api|_next/static|_next/image|favicon.ico|auth/login).*)',],
}