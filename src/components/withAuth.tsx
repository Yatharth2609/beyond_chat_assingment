"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getUserStep, FLOW_STEPS } from "../utils/flowControl"

export function withAuth(WrappedComponent: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter()

    useEffect(() => {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/signin")
      } else {
        const currentStep = getUserStep()
        const currentPath = window.location.pathname.slice(1) // Remove leading slash

        if (currentPath === "" && currentStep !== FLOW_STEPS.REGISTRATION) {
          router.push(`/${currentStep}`)
        } else if (currentPath !== currentStep && currentStep !== FLOW_STEPS.SUCCESS) {
          router.push(`/${currentStep}`)
        }
      }
    }, [router])

    return <WrappedComponent {...props} />
  }
}

