'use client'

import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import { ReactNode } from "react"

const AuthProvider = ({children}: {children: ReactNode}, {pageProps}: AppProps) => (
    <SessionProvider session={pageProps}>{children}</SessionProvider>
)

export default AuthProvider