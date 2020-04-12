import { get, runIfFn } from "@chakra-ui/utils"
import { isSubcomponent } from "../utils"
import { ModifierStyleProps, ChakraOptions } from "./types"

/**
 * Gets the base styles of a component based on the
 * theme key in `options`
 */
export function getBaseStyle(
  props: ModifierStyleProps,
  options: ChakraOptions,
) {
  if (!options.themeKey) return undefined

  const [component, subComponent] = options.themeKey.split(".")

  const styleObjectOrFn = get(props.theme, `components.${component}.baseStyle`)

  if (!styleObjectOrFn) return undefined

  let style = runIfFn(styleObjectOrFn, props)

  if (isSubcomponent(options.themeKey)) {
    style = style[subComponent]
  }

  return style
}
