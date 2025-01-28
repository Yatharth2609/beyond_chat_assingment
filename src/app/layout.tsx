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
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  if (!clientId) {
    console.error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable")
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        {clientId ? (
          <GoogleOAuthProvider clientId={clientId}>
            <Navbar />
            <main>{children}</main>
          </GoogleOAuthProvider>
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500">Google OAuth configuration is missing</p>
          </div>
        )}
      </body>
    </html>
  )
}

