import { useState } from "react"

export interface UseStepsProps {
  index?: number
  count?: number
}

export type StepStatus = "complete" | "active" | "incomplete"

export function useSteps(props: UseStepsProps = {}) {
  const { index = 0, count } = props

  const [activeStep, setActiveStep] = useState(index)

  const maxStep = typeof count === "number" ? count - 1 : 0
  const activeStepPercent = activeStep / maxStep

  const isActiveStep = (step: number) => step === activeStep
  const isCompleteStep = (step: number) => step < activeStep
  const isIncompleteStep = (step: number) => step > activeStep

  const getStatus = (step: number): StepStatus => {
    if (step < activeStep) return "complete"
    if (step > activeStep) return "incomplete"
    return "active"
  }

  const goToNext = () => {
    setActiveStep((step) => Math.min(maxStep, step + 1))
  }

  const goToPrevious = () => {
    setActiveStep((step) => Math.max(0, step - 1))
  }

  return {
    activeStep,
    setActiveStep,
    activeStepPercent,
    isActiveStep,
    isCompleteStep,
    isIncompleteStep,
    getStatus,
    goToNext,
    goToPrevious,
  }
}

export type UseStepsReturn = ReturnType<typeof useSteps>
