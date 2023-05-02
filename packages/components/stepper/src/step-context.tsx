import { createContext } from "@chakra-ui/react-context"
import { createStylesContext } from "@chakra-ui/system"

export type StepStatusType = "active" | "complete" | "incomplete"

export type Orientation = "horizontal" | "vertical"

export interface StepContext {
  /**
   * The status of the step
   * @type "active" | "complete" | "incomplete"
   */
  status: StepStatusType
  /**
   * The total number of steps
   */
  count: number
  /**
   * The index of the step
   */
  index: number
  /**
   * The orientation of the stepper
   */
  orientation: Orientation
  /**
   * Whether the step is the last step
   */
  isLast: boolean
  /**
   * Whether the step is the first step
   */
  isFirst: boolean
}

export const [StepContextProvider, useStepContext] = createContext<StepContext>(
  { name: "StepContext" },
)

export const [StepperStylesProvider, useStepperStyles] =
  createStylesContext("Stepper")
