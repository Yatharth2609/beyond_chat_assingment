"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ProgressIndicator from "../../components/ProgressIndicator"
import { withAuth } from "../../components/withAuth"
import { useRouter } from "next/navigation"
import { setUserStep, FLOW_STEPS, getNextStep } from "../../utils/flowControl"

function SetupOrganization() {
  const [companyName, setCompanyName] = useState("")
  const [companyWebsite, setCompanyWebsite] = useState("")
  const [companyDescription, setCompanyDescription] = useState("")
  const router = useRouter()

  useEffect(() => {
    setUserStep(FLOW_STEPS.SETUP_ORGANIZATION)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ companyName, companyWebsite, companyDescription })
    const nextStep = getNextStep(FLOW_STEPS.SETUP_ORGANIZATION)
    setUserStep(nextStep)
    router.push(`/${nextStep}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-lg shadow-xl p-8"
      >
        <ProgressIndicator currentStep={1} />
        <h1 className="text-3xl text-black font-bold text-center mb-6">Setup Your Organization</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="mt-1 block text-black w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700">
              Company Website URL
            </label>
            <input
              type="url"
              id="companyWebsite"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              required
              className="mt-1 block text-black w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700">
              Company Description
            </label>
            <textarea
              id="companyDescription"
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              required
              rows={4}
              className="mt-1 block text-black w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Next
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default withAuth(SetupOrganization)

