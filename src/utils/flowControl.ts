export const FLOW_STEPS = {
  REGISTRATION: "registration",
  SETUP_ORGANIZATION: "setup-organization",
  SCRAPING_STATUS: "scraping-status",
  CHATBOT_INTEGRATION: "chatbot-integration",
  SUCCESS: "success",
}

export const getNextStep = (currentStep: string): string => {
  const steps = Object.values(FLOW_STEPS)
  const currentIndex = steps.indexOf(currentStep)
  if (currentIndex < steps.length - 1) {
    return steps[currentIndex + 1]
  }
  return steps[steps.length - 1]
}

export const setUserStep = (step: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userStep", step)
  }
}

export const getUserStep = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userStep") || FLOW_STEPS.REGISTRATION
  }
  return FLOW_STEPS.REGISTRATION
}

