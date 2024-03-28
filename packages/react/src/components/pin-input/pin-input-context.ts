"use client"

import { createContext } from "../../create-context"
import { SystemStyleObject } from "../../styled-system"
import { UsePinInputReturn } from "./use-pin-input"

export type PinInputContext = UsePinInputReturn & {
  /**
   * Sets the pin input component to the disabled state
   */
  disabled?: boolean
  /**
   * Sets the pin input component to the invalid state
   */
  invalid?: boolean
}

export const [PinInputProvider, usePinInputContext] =
  createContext<PinInputContext>({
    name: "PinInputContext",
    errorMessage:
      "usePinInputContext: `context` is undefined. Seems you forgot to place all pin input fields within `<PinInput />`",
  })

export const [PinInputStylesProvider, usePinInputStyles] =
  createContext<SystemStyleObject>({
    name: "PinInputStylesContext",
    errorMessage:
      "usePinInputStyles: `context` is undefined. Seems you forgot to place all pin input fields within `<PinInput />`",
  })
