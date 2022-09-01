import { chakra } from "@chakra-ui/system"
import { visuallyHiddenStyle } from "./visually-hidden.style"

/**
 * Visually hidden component used to hide
 * elements on screen
 */
export const VisuallyHidden = chakra("span", {
  baseStyle: visuallyHiddenStyle,
})

VisuallyHidden.displayName = "VisuallyHidden"

/**
 * Visually hidden input component for designing
 * custom input components using the html `input`
 * as a proxy
 */
export const VisuallyHiddenInput = chakra("input", {
  baseStyle: visuallyHiddenStyle,
})

VisuallyHiddenInput.displayName = "VisuallyHiddenInput"

export default VisuallyHidden
