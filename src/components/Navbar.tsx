"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import { Menu, X, Home, Settings, MessageCircle, LogOut } from "lucide-react"
import Link from "next/link"
import { motion as motion2 } from "framer-motion"
import Image from "next/image"

const AnimatedLink = motion2(Link)

export default function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = () => {
    localStorage.removeItem("token")
    router.push("/signin")
  }

  const menuItems = [
    { icon: Home, text: "Dashboard", href: "/dashboard" },
    { icon: MessageCircle, text: "Chatbot", href: "/chatbot" },
    { icon: Settings, text: "Settings", href: "/settings" },
  ]

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Image className="h-8 w-auto" src={"./download.jpg"} alt="BeyondChats" />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <AnimatedLink
                key={item.text}
                href={item.href}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.text}
              </AnimatedLink>
            ))}
            <motion2.button
              onClick={handleSignOut}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </motion2.button>
          </div>
          <div className="flex items-center md:hidden">
            <motion2.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion2.button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion2.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <AnimatedLink
                  key={item.text}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.text}
                </AnimatedLink>
              ))}
              <motion2.button
                onClick={handleSignOut}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </motion2.button>
            </div>
          </motion2.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

