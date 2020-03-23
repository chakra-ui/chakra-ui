import { Dict, isEmptyObject, runIfFn, deepmerge, get } from "@chakra-ui/utils"
import { css } from "./css"
import { CSSObject } from "./css.types"

/**
 * Check if a theme key refers to a components
 * or sub-component
 *
 * @param themeKey the theme key
 */
export function isSubcomponent(themeKey: string) {
  return themeKey.split(".").length > 1
}

/**
 * Gets the base styles of a component based
 * on the theme key
 *
 * @param props the props object including the theme
 * @param themeKey the component's theme key
 */
export function getBaseStyle(props: Dict, themeKey: string) {
  const [component, subComponent] = themeKey.split(".")

  const styleObjectOrFn = get(props.theme, `components.${component}.baseStyle`)

  if (!styleObjectOrFn) return undefined

  let baseStyle = runIfFn(styleObjectOrFn, props)

  if (isSubcomponent(themeKey)) {
    baseStyle = baseStyle[subComponent]
  }

  return baseStyle
}

const modifierMap = {
  sizes: "size",
  variants: "variant",
}

/**
 * Gets the modifier styles for a component.
 * Chakra UI assumes that most component will need
 * only `variants` and `sizes` modifiers
 *
 * @param props the props object (or component props)
 * @param themeKey the component's theme key
 * @param modifiers modifiers we support (for now, it's just variant, and size)
 */
export function getModifierStyles(
  props: Dict | undefined,
  themeKey: string | undefined,
  modifiers = Object.keys(modifierMap),
) {
  /**
   * if no theme key was passed or no prop was passed, bail out
   */
  if (!themeKey || !props) return undefined

  /**
   * For nested component theme key, for example "Menu.MenuList",
   * let's split into component and sub-component.
   */
  const [component, subComponent] = themeKey.split(".")

  /**
   * Check that the component styles exists in the theme object
   */
  const itExists = get(props.theme, `components.${component}`) != null

  if (!itExists) return undefined

  /**
   * Get the default modifier values defined in theme
   */
  const defaultProps = getComponentDefaults(props.theme, component) as
    | Dict
    | undefined

  let styles: Dict = {}

  /**
   * Iterate through each modifier (mostly variants and sizes),
   * can compute the styles based on theme.
   */
  for (const modifier of modifiers) {
    const _modifier = modifierMap[modifier as keyof typeof modifierMap]

    const value = props[_modifier] ?? defaultProps?.[_modifier]

    if (!value) continue

    const styleObjectOrFn = get(
      props.theme,
      `components.${component}.${modifier}.${value}`,
    )

    if (!styleObjectOrFn) continue

    const style = runIfFn(styleObjectOrFn, props)

    styles = isSubcomponent(themeKey)
      ? deepmerge(styles, style[subComponent])
      : deepmerge(styles, style)
  }

  return styles
}

/**
 * Check if a style object is not empty
 * @param val the style object
 */
function notEmpty(val: any): val is object {
  return val && !isEmptyObject(val)
}

/**
 * Computes the styles for a component based on the
 * defined theme key
 *
 * @param props the component props object
 * @param themeKey the component's theme key
 */
export function getComponentStyles(props: any, themeKey: string) {
  let styles: CSSObject = {}

  if (!themeKey) return undefined

  const baseStyleObject = getBaseStyle(props, themeKey)

  if (notEmpty(baseStyleObject)) {
    const baseStyle = css(baseStyleObject)(props.theme)
    styles = deepmerge(styles, baseStyle)
  }

  const modiferStyleObject = getModifierStyles(props, themeKey)

  if (notEmpty(modiferStyleObject)) {
    const modiferStyle = css(modiferStyleObject)(props.theme)
    styles = deepmerge(styles, modiferStyle)
  }

  return styles
}

export function getComponentDefaults(theme: any, themeKey: string) {
  return get(theme, `components.${themeKey}.defaultProps`)
}
