import { createContext } from "@chakra-ui/react-context"
import { createStylesContext } from "@chakra-ui/system"

export type StepperStatus = "active" | "completed" | "incomplete"

export type StepContextType = {
  status: StepperStatus
}

export const [StepContextProvider, useStepContext] =
  createContext<StepContextType>()

export const [StepperStylesProvider, useStepperStyles] =
  createStylesContext("Stepper")
