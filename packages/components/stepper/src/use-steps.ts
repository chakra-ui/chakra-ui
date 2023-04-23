import { useState } from "react"

export type UseStepsProps = {
  index?: number
  count?: number
}

export type StepStatus = "complete" | "active" | "incomplete"

export function useSteps(props: UseStepsProps = {}) {
  const { index = 0, count } = props
  const [activeStep, setActiveStep] = useState(index)

  return {
    activeStep,
    setActiveStep,
    isActiveStep(step: number) {
      return step === activeStep
    },
    getStatus(step: number): StepStatus {
      if (step < activeStep) return "complete"
      if (step > activeStep) return "incomplete"
      return "active"
    },
    goToNext() {
      setActiveStep((step) => {
        return typeof count === "number" ? Math.min(count, step + 1) : step + 1
      })
    },
    goToPrevious() {
      setActiveStep((step) => Math.max(0, step - 1))
    },
  }
}

export type UseStepsReturn = ReturnType<typeof useSteps>
