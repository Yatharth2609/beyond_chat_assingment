"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ProgressIndicator from "../../components/ProgressIndicator"
import { useRouter } from "next/navigation"
import { setUserStep, FLOW_STEPS, getNextStep } from "../../utils/flowControl"

export default function ChatbotIntegration() {
  const router = useRouter()
  const [integrationMethod, setIntegrationMethod] = useState<"code" | "email" | null>(null)

  useEffect(() => {
    setUserStep(FLOW_STEPS.CHATBOT_INTEGRATION)
  }, [])

  const handleTestChatbot = () => {
    // Here you would typically open a new window or modal with the client's website and dummy chatbot
    window.open("https://example.com?chatbot=true", "_blank")
  }

  const handleIntegrate = (method: "code" | "email") => {
    setIntegrationMethod(method)
    const nextStep = getNextStep(FLOW_STEPS.CHATBOT_INTEGRATION)
    setUserStep(nextStep)
    setTimeout(() => {
      router.push(`/${nextStep}`)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-8"
      >
        <ProgressIndicator currentStep={3} />
        <h1 className="text-3xl font-bold text-center mb-6">Chatbot Integration & Testing</h1>
        <div className="space-y-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTestChatbot}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Test Chatbot
          </motion.button>
          <div>
            <h2 className="text-xl font-semibold mb-4">Integrate on your website</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleIntegrate("code")}
                className="py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Copy Integration Code
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleIntegrate("email")}
                className="py-3 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Email Instructions to Developer
              </motion.button>
            </div>
          </div>
          {integrationMethod === "code" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h3 className="text-lg font-semibold mb-2">Integration Code</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`<script>
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://beyondchats.com/widget.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'beyondchats-widget'));
</script>`}
                </code>
              </pre>
            </motion.div>
          )}
          {integrationMethod === "email" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h3 className="text-lg font-semibold mb-2">Email Sent</h3>
              <p>Integration instructions have been sent to your developer&apos;s email address.</p>
            </motion.div>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const nextStep = getNextStep(FLOW_STEPS.CHATBOT_INTEGRATION)
              setUserStep(nextStep)
              router.push(`/${nextStep}`)
            }}
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Test Integration
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

