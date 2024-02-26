import { SystemStyleObject } from "@chakra-ui/styled-system"
import { createContext } from "@chakra-ui/utils/context"
import { createDescendantContext } from "../descendant"
import { UsePinInputReturn } from "./use-pin-input"

export const [
  PinInputDescendantsProvider,
  usePinInputDescendantsContext,
  usePinInputDescendants,
  usePinInputDescendant,
] = createDescendantContext<HTMLInputElement>()

export type PinInputContext = Omit<UsePinInputReturn, "descendants"> & {
  /**
   * Sets the pin input component to the disabled state
   */
  isDisabled?: boolean
  /**
   * Sets the pin input component to the invalid state
   */
  isInvalid?: boolean
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
