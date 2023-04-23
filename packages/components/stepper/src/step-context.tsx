import { createContext } from "@chakra-ui/react-context"
import { createStylesContext } from "@chakra-ui/system"

export type StepStatus = "active" | "complete" | "incomplete"

export type Orientation = "horizontal" | "vertical"

export type StepContext = {
  status: StepStatus
  count: number
  index: number
  orientation: Orientation
  isLast: boolean
  isFirst: boolean
}

export const [StepContextProvider, useStepContext] = createContext<StepContext>(
  { name: "StepContext" },
)

export const [StepperStylesProvider, useStepperStyles] =
  createStylesContext("Stepper")
