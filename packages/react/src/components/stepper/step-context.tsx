import { createContext } from "@chakra-ui/utils"
import { SystemStyleObject } from "../../styled-system"

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
  /**
   * Whether to show or not the last separator while in vertical orientation
   */
  showLastSeparator?: boolean
}

export const [StepContextProvider, useStepContext] = createContext<StepContext>(
  { name: "StepContext" },
)

export const [StepperStylesProvider, useStepperStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `StepperStylesContext`,
  errorMessage: `useStepperStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Stepper />" `,
})
