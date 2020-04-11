import { merge } from "@chakra-ui/utils"
import { css } from "../css"
import { CSSObject } from "../css.types"
import { isNotEmpty } from "../utils"
import { getBaseStyle } from "./get-base-style"
import { getModifierStyles } from "./get-modifier-style"
import { ChakraOptions, ModifierStyleProps } from "./types"

type Props = ModifierStyleProps & { colorMode?: string }

/**
 * Computes the styles for a component based on the
 * defined theme key
 *
 * @param props the component props object
 * @param options the component's options
 */
export function getComponentStyles(props: Props, options?: ChakraOptions) {
  let styles: CSSObject = {}

  if (!options || !props.theme) return undefined

  const baseStyleObject = getBaseStyle(props, options)

  if (isNotEmpty(baseStyleObject)) {
    const baseStyle = css(baseStyleObject)(props.theme)
    styles = merge(styles, baseStyle)
  }

  const modiferStyleObject = getModifierStyles(props, options)

  if (isNotEmpty(modiferStyleObject)) {
    const modiferStyle = css(modiferStyleObject)(props.theme)
    styles = merge(styles, modiferStyle)
  }

  return styles
}
