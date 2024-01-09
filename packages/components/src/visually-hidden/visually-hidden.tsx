import { chakra } from "../system"
import { visuallyHiddenStyle } from "./visually-hidden.style"

/**
 * Visually hidden component used to hide
 * elements on screen
 *
 * @see Docs https://chakra-ui.com/docs/components/visually-hidden
 */
export const VisuallyHidden = chakra("span", {
  baseStyle: visuallyHiddenStyle,
})

VisuallyHidden.displayName = "VisuallyHidden"

/**
 * Visually hidden input component for designing
 * custom input components using the html `input`
 * as a proxy
 *
 * @see Docs https://chakra-ui.com/docs/components/visually-hidden#visually-hidden-input
 */
export const VisuallyHiddenInput = chakra("input", {
  baseStyle: visuallyHiddenStyle,
})

VisuallyHiddenInput.displayName = "VisuallyHiddenInput"
