import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "../components/Navbar"
import { GoogleOAuthProvider } from "@react-oauth/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BeyondChats - Chatbot Setup",
  description: "Set up your AI-powered chatbot for your business",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
        <body className={inter.className}>
          <Navbar />
          <main>{children}</main>
        </body>
      </GoogleOAuthProvider>
    </html>
  )
}

