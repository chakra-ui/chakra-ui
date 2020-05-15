import { get, runIfFn, Dict } from "@chakra-ui/utils"
import { isSubcomponent, filterUndefined } from "./utils"
import { ModifierStyleProps, ChakraOptions } from "./types"
import { getComponentDefaults } from "./get-default-props"

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

  /**
   * Get the default modifier values defined in theme
   */
  const defaultPropsInTheme = getComponentDefaults(props.theme, component) as
    | Dict
    | undefined

  /**
   * Merge the props with defaultProps defined in theme
   * to provider sensible fallbacks
   */
  const computedProps = defaultPropsInTheme
    ? { ...defaultPropsInTheme, ...filterUndefined(props) }
    : props

  const styleObjectOrFn = get(props.theme, `components.${component}.baseStyle`)

  if (!styleObjectOrFn) return undefined

  let style = runIfFn(styleObjectOrFn, computedProps)

  if (isSubcomponent(options.themeKey)) {
    style = style[subComponent]
  }

  return style
}
