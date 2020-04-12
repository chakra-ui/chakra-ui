import { Dict, get, merge, runIfFn } from "@chakra-ui/utils"
import { filterUndefined, isSubcomponent } from "../utils"
import { ChakraOptions, ModifierStyleProps } from "./types"
import { getComponentDefaults } from "./get-default-props"

const modifierMap = {
  sizes: "size",
  variants: "variant",
}

function checkModifiers(
  props: ModifierStyleProps,
  options: ChakraOptions,
  partId: string,
) {
  const isInOptions = options.variants != null || options.sizes != null
  const isInProps = get(props.theme, partId) != null
  return isInOptions || isInProps
}

/**
 * Gets the modifier styles for a component.
 * Chakra UI assumes that most component will need
 * only `variants` and `sizes` modifiers
 *
 * @param props the props object (or component props)
 * @param options the component's theming options
 * @param modifiers modifiers we support (for now, it's just variant, and size)
 */
export function getModifierStyles(
  props: ModifierStyleProps,
  options?: ChakraOptions,
  modifiers = Object.keys(modifierMap),
) {
  /**
   * if no theme key was passed or no prop was passed, bail out
   */
  if (!options || !props) return undefined

  /**
   * For nested component theme key, for example "Menu.MenuList",
   * let's split into component and sub-component.
   */
  const [component, subComponent] = options.themeKey?.split(".") ?? []

  /**
   * Check that the component styles exists in the theme object
   */
  const itExists = checkModifiers(props, options, `components.${component}`)

  if (!itExists) return undefined

  /**
   * Get the default modifier values defined in theme
   */
  const defaultPropsInTheme = getComponentDefaults(props.theme, component) as
    | Dict
    | undefined

  let styles: Dict = {}

  /**
   * Merge the props with defaultProps defined in theme
   * to provider sensible fallbacks
   */
  const computedProps = defaultPropsInTheme
    ? { ...defaultPropsInTheme, ...filterUndefined(props) }
    : props

  /**
   * Iterate through each modifier (mostly variants and sizes),
   * can compute the styles based on theme.
   */
  for (const modifier of modifiers) {
    const _modifier = modifierMap[modifier as keyof typeof modifierMap]
    const value = computedProps[_modifier as keyof typeof props]

    if (!value) continue

    /**
     * Check if the modifier is in `options`.
     *
     * We'd like users to be able style component variants
     * without putting it in the theme.
     *
     * @example
     *
     * ```jsx
     * const Button = chakra("button", {
     *   variants: {
     *     solid: {},
     *     outline: {}
     *   },
     *   sizes: {
     *     large: {},
     *     medium: {}
     *   }
     * })
     * ```
     */
    const modifierInOptions = options?.[modifier as keyof ChakraOptions]

    const modifierStylesOrFn =
      modifierInOptions && runIfFn(modifierInOptions, props)

    const modifierStylesInOptions =
      modifierStylesOrFn?.[value as keyof typeof modifierInOptions]

    /**
     * Get styles from options if it exists else, get styles from theme
     */
    const styleObjectOrFn =
      modifierStylesInOptions ??
      get(props.theme, `components.${component}.${modifier}.${value}`)

    if (!styleObjectOrFn) continue

    const style = runIfFn(styleObjectOrFn, computedProps) as Dict | undefined

    if (!style) continue

    const subcomponentStyle = style[subComponent]

    const _isSubcomponent = options.themeKey && isSubcomponent(options.themeKey)

    if (_isSubcomponent && subcomponentStyle) {
      styles = merge(styles, subcomponentStyle)
    } else {
      styles = merge(styles, style)
    }
  }

  return styles
}
