import { useCallback, useState } from "react"

export type UseStepsProps = {
  index?: number
  count?: number
}

export type StepStatus = "complete" | "active" | "incomplete"

export function useSteps(props: UseStepsProps = {}) {
  const { index = 0, count } = props

  const [activeStep, setActiveStep] = useState(index)

  const maxStep = typeof count === "number" ? count - 1 : 0
  const activeStepPercent = activeStep / maxStep

  const isActiveStep = useCallback(
    (step: number) => step === activeStep,
    [activeStep],
  )

  const isCompleteStep = useCallback(
    (step: number) => step < activeStep,
    [activeStep],
  )

  const isIncompleteStep = useCallback(
    (step: number) => step > activeStep,
    [activeStep],
  )

  const getStatus = useCallback(
    (step: number): StepStatus => {
      if (step < activeStep) return "complete"
      if (step > activeStep) return "incomplete"
      return "active"
    },
    [activeStep],
  )

  const goToNext = useCallback(() => {
    setActiveStep((step) => {
      return typeof count === "number" ? Math.min(count, step + 1) : step + 1
    })
  }, [count])

  const goToPrevious = useCallback(
    () => setActiveStep((step) => Math.max(0, step - 1)),
    [],
  )

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
