import { merge, isNotEmptyObject } from "@chakra-ui/utils"
import { css, CSSObject } from "@chakra-ui/css"
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

  if (isNotEmptyObject(baseStyleObject)) {
    const baseStyle = css(baseStyleObject)(props.theme)
    styles = merge(styles, baseStyle)
  }

  const modiferStyleObject = getModifierStyles(props, options)

  if (isNotEmptyObject(modiferStyleObject)) {
    const modiferStyle = css(modiferStyleObject)(props.theme)
    styles = merge(styles, modiferStyle)
  }

  return styles
}
