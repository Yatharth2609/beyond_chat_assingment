"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { withAuth } from "../../components/withAuth"
import Modal from "../../components/Modal"
import { setUserStep, FLOW_STEPS } from "../../utils/flowControl"

function Success() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState("")

  useEffect(() => {
    setUserStep(FLOW_STEPS.SUCCESS)
  }, [])

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  const showComingSoonModal = (feature: string) => {
    setModalContent(`The ${feature} feature will be developed soon. Stay tuned!`)
    setIsModalOpen(true)
  }

  const shareOnTwitter = () => {
    const text = encodeURIComponent("I just set up my AI chatbot with BeyondChats! 🤖💬 #AIChat #CustomerService")
    const url = encodeURIComponent("https://beyondchats.com")
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent("https://beyondchats.com")
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank")
  }

  const shareOnFacebook = () => {
    const url = encodeURIComponent("https://beyondchats.com")
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-8 text-center"
      >
        <h1 className="text-4xl font-bold mb-6 text-indigo-600">Congratulations!</h1>
        <p className="text-xl mb-8">Your chatbot has been successfully integrated!</p>
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => showComingSoonModal("Admin Panel")}
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Explore Admin Panel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => showComingSoonModal("Chatbot")}
            className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Start Talking to Your Chatbot
          </motion.button>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Share Your Success</h2>
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={shareOnTwitter}
              className="p-2 bg-blue-400 text-white rounded-full"
              aria-label="Share on Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={shareOnLinkedIn}
              className="p-2 bg-blue-700 text-white rounded-full"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={shareOnFacebook}
              className="p-2 bg-blue-600 text-white rounded-full"
              aria-label="Share on Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">Coming Soon!</h2>
          <p className="text-gray-700 mb-6">{modalContent}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Got it!
          </motion.button>
        </div>
      </Modal>
    </div>
  )
}

export default withAuth(Success)

