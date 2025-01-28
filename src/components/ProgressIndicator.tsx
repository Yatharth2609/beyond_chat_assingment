import { motion } from "framer-motion"

const steps = ["Registration", "Organization Setup", "Integration", "Success"]

export default function ProgressIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8 text-black">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              {index + 1}
            </motion.div>
            <motion.span
              className="mt-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 + 0.1 }}
            >
              {step}
            </motion.span>
          </div>
        ))}
      </div>
      <motion.div
        className="mt-4 h-2 bg-gray-200 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="h-full bg-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </div>
  )
}

