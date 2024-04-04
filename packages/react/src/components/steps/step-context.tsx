"use client"

import { createContext } from "../../create-context"
import { SystemStyleObject } from "../../styled-system"

export type StepItemStatus = "current" | "completed" | "incomplete"

export interface StepContext {
  /**
   * The status of the step
   * @type "active" | "complete" | "incomplete"
   */
  status: StepItemStatus
  /**
   * The total number of steps
   */
  count: number
  /**
   * The index of the step
   */
  index: number
  /**
   * Whether the step is the last step
   */
  isLast: boolean
  /**
   * Whether the step is the first step
   */
  isFirst: boolean
  /**
   * The data attributes for the step
   */
  dataAttrs: Record<`data-${string}`, any>
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
