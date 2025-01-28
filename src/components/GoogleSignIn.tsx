"use client"

import { GoogleLogin } from "@react-oauth/google"
import { useState } from "react"

interface GoogleSignInProps {
  onSuccess: (credentialResponse: any) => void
}

export default function GoogleSignIn({ onSuccess }: GoogleSignInProps) {
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="w-full">
      {error && <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded">{error}</div>}
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => {
          setError("Google Sign In failed. Please try again or use email sign in.")
          console.error("Google Sign In Failed")
        }}
        useOneTap
        auto_select={false}
      />
    </div>
  )
}

