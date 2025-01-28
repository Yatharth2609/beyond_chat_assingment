"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ProgressIndicator from "../components/ProgressIndicator"
import { useRouter } from "next/navigation"
import { GoogleLogin } from "@react-oauth/google"
import { setUserStep, FLOW_STEPS } from "../utils/flowControl"

export default function Registration() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    setUserStep(FLOW_STEPS.REGISTRATION)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem("token", data.token)
        router.push("/setup-organization")
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError("Something went wrong: " + error)
    }
  }

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem("token", data.token)
        router.push("/setup-organization")
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError("Something went wrong: " + error)
    }
  }

  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-lg shadow-xl p-8"
      >
        <ProgressIndicator currentStep={0} />
        <h1 className="text-3xl font-bold text-center mb-6">Create Your Account</h1>
        <div className="space-y-4">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError("Google Sign In Failed")} />
          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-300"/>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"/>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

