"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ProgressIndicator from "../../components/ProgressIndicator"
import { useRouter } from "next/navigation"
import { setUserStep, FLOW_STEPS, getNextStep } from "../../utils/flowControl"

// Dummy data for scraped pages
const scrapedPages = [
  // Changed from const to let
  { url: "https://example.com", status: "scraped" },
  { url: "https://example.com/about", status: "scraped" },
  { url: "https://example.com/products", status: "pending" },
  { url: "https://example.com/contact", status: "pending" },
]

interface ScrapedPage {
  url: string;
  status: string;
}


export default function ScrapingStatus() {
  const [selectedPage, setSelectedPage] = useState<ScrapedPage | null>(null)
  const router = useRouter()

  useEffect(() => {
    setUserStep(FLOW_STEPS.SCRAPING_STATUS)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br text-black from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8"
      >
        <ProgressIndicator currentStep={2} />
        <h1 className="text-3xl font-bold text-center mb-6">Website Scraping Status</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Detected Pages</h2>
            <ul className="space-y-2">
              {scrapedPages.map((page, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-2 rounded-md cursor-pointer ${
                    selectedPage === page ? "bg-blue-100" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedPage(page)}
                >
                  <span className="font-medium">{page.url}</span>
                  <span
                    className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      page.status === "scraped" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {page.status}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Page Details</h2>
            {selectedPage ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h3 className="text-lg font-medium mb-2">{selectedPage.url}</h3>
                <p className="mb-4">Status: {selectedPage.status}</p>
                {selectedPage.status === "scraped" && (
                  <div>
                    <h4 className="font-medium mb-2">Scraped Data Chunks:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Main content</li>
                      <li>Header information</li>
                      <li>Footer links</li>
                      <li>Product descriptions</li>
                    </ul>
                  </div>
                )}
              </motion.div>
            ) : (
              <p className="text-gray-500">Select a page to view details</p>
            )}
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              const nextStep = getNextStep(FLOW_STEPS.SCRAPING_STATUS)
              setUserStep(nextStep)
              router.push(`/${nextStep}`)
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue to Chatbot Integration
          </button>
        </div>
      </motion.div>
    </div>
  )
}

