import { createContext } from "@chakra-ui/react-context"

export type StepperStatus = "active" | "completed" | "incomplete"

export type StepContextType = {
  status: StepperStatus
}

export const [StepContextProvider, useStepContext] =
  createContext<StepContextType>()
