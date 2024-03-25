import { SystemStyleObject } from "@chakra-ui/styled-system"
import { createContext } from "@chakra-ui/utils/context"
import { UsePinInputReturn } from "./use-pin-input"

/* -------------------------------------------------------------------------------------------------
 * Create context that stores pin-input logic
 * -----------------------------------------------------------------------------------------------*/

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
