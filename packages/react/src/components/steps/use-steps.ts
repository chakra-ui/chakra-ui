"use client"

import { useState } from "react"
import { StepItemStatus } from "./step-context"

export interface UseStepsProps {
  index?: number
  count?: number
}

export function useSteps(props: UseStepsProps = {}) {
  const { index = 0, count } = props

  const [activeStep, setActiveStep] = useState(index)

  const maxStep = typeof count === "number" ? count - 1 : 0
  const activeStepPercent = activeStep / maxStep

  const isActiveStep = (step: number) => step === activeStep
  const isCompleteStep = (step: number) => step < activeStep
  const isIncompleteStep = (step: number) => step > activeStep

  const getStatus = (step: number): StepItemStatus => {
    if (step < activeStep) return "completed"
    if (step > activeStep) return "incomplete"
    return "current"
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
