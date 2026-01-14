/**
 * Framework-agnostic style config resolution for Chakra UI.
 * These functions resolve component style configurations from the theme.
 */
import { compact, omit } from "./prop-utils"
import { deepMergeStyles, runIfFn } from "./resolve-props"
import type {
  Dict,
  ResolveStyleConfigOptions,
  SlotStyleConfig,
  StyleConfig,
  SystemStyleObject,
  ThemingProps,
} from "./types"

/**
 * Gets a nested value from an object using a dot-notation path.
 *
 * @param obj - The object to get the value from
 * @param path - Dot-notation path (e.g., "components.Button")
 * @param fallback - Fallback value if path doesn't exist
 * @returns The value at the path or the fallback
 */
export function get<T = any>(obj: Dict, path: string, fallback?: T): T {
  const keys = path.split(".")
  let result: any = obj

  for (const key of keys) {
    if (result == null) return fallback as T
    result = result[key]
  }

  return (result ?? fallback) as T
}

/**
 * Resolves a single-part style config into final styles.
 *
 * @param styleConfig - The style configuration
 * @param props - Props including variant, size, colorPalette
 * @returns Resolved style object
 */
export function resolveStyleConfig(
  styleConfig: StyleConfig,
  props: ThemingProps & Dict,
): SystemStyleObject {
  const {
    baseStyle,
    variants = {},
    sizes = {},
    defaultProps = {},
  } = styleConfig

  // Merge default props with provided props
  const mergedProps = {
    ...defaultProps,
    ...compact(props),
  }

  const { variant, size, colorPalette, ...restProps } = mergedProps

  // Context to pass to style functions
  const context = {
    colorPalette,
    colorMode: props.colorMode ?? "light",
    theme: props.theme ?? {},
    ...restProps,
  }

  // Resolve base style (can be function or object)
  const resolvedBase = runIfFn(baseStyle, context) ?? {}

  // Resolve variant style
  const variantStyle = variant ? variants[variant] : undefined
  const resolvedVariant = runIfFn(variantStyle, context) ?? {}

  // Resolve size style
  const sizeStyle = size ? sizes[size] : undefined
  const resolvedSize = runIfFn(sizeStyle, context) ?? {}

  // Merge in order: base < size < variant
  return deepMergeStyles({}, resolvedBase, resolvedSize, resolvedVariant)
}

/**
 * Resolves a multi-part (slot) style config into final styles.
 *
 * @param styleConfig - The slot style configuration
 * @param props - Props including variant, size, colorPalette
 * @returns Object with resolved styles for each slot
 */
export function resolveSlotStyleConfig(
  styleConfig: SlotStyleConfig,
  props: ThemingProps & Dict,
): Dict<SystemStyleObject> {
  const {
    baseStyle = {},
    variants = {},
    sizes = {},
    defaultProps = {},
  } = styleConfig

  // Merge default props with provided props
  const mergedProps = {
    ...defaultProps,
    ...compact(props),
  }

  const { variant, size, colorPalette, ...restProps } = mergedProps

  // Context to pass to style functions
  const context = {
    colorPalette,
    colorMode: props.colorMode ?? "light",
    theme: props.theme ?? {},
    ...restProps,
  }

  // Get all slot names from baseStyle
  const slots = Object.keys(baseStyle)
  const result: Dict<SystemStyleObject> = {}

  for (const slot of slots) {
    // Resolve base style for this slot
    const slotBase = runIfFn(baseStyle[slot], context) ?? {}

    // Resolve variant style for this slot
    const variantStyles = variant ? variants[variant] : undefined
    const slotVariant = variantStyles
      ? (runIfFn(variantStyles[slot], context) ?? {})
      : {}

    // Resolve size style for this slot
    const sizeStyles = size ? sizes[size] : undefined
    const slotSize = sizeStyles
      ? (runIfFn(sizeStyles[slot], context) ?? {})
      : {}

    // Merge in order: base < size < variant
    result[slot] = deepMergeStyles({}, slotBase, slotSize, slotVariant)
  }

  return result
}

/**
 * Resolves component style config from theme.
 *
 * This is the main function for getting component styles. It:
 * 1. Looks up the style config in the theme by key
 * 2. Merges default props with provided props
 * 3. Resolves all style functions with the merged props
 * 4. Returns the final style object
 *
 * @param options - Resolution options
 * @returns Resolved style object (single or multi-part)
 *
 * @example
 * ```ts
 * // In a React hook
 * const styles = resolveComponentStyleConfig({
 *   themeKey: 'Button',
 *   theme,
 *   colorMode: 'light',
 *   props: { variant: 'solid', size: 'md' },
 * })
 *
 * // In a Vue composable
 * const styles = computed(() => resolveComponentStyleConfig({
 *   themeKey: 'Button',
 *   theme: theme.value,
 *   colorMode: colorMode.value,
 *   props: { variant: props.variant, size: props.size },
 * }))
 * ```
 */
export function resolveComponentStyleConfig(
  options: ResolveStyleConfigOptions,
): SystemStyleObject | Dict<SystemStyleObject> {
  const {
    themeKey,
    theme,
    colorMode,
    props,
    styleConfig: styleConfigProp,
  } = options

  // Get style config from theme or use provided one
  const themeStyleConfig = themeKey
    ? get(theme, `components.${themeKey}`)
    : undefined

  const styleConfig = styleConfigProp ?? themeStyleConfig

  // If no style config found, return empty object
  if (!styleConfig) {
    return {}
  }

  // Create props with theme and colorMode for style functions
  const propsWithContext = {
    ...omit(props, ["children"]),
    theme,
    colorMode,
  }

  // Check if it's a slot recipe (has slots or baseStyle is an object with slot keys)
  const isSlotRecipe = isSlotStyleConfig(styleConfig)

  if (isSlotRecipe) {
    return resolveSlotStyleConfig(
      styleConfig as SlotStyleConfig,
      propsWithContext,
    )
  }

  return resolveStyleConfig(styleConfig as StyleConfig, propsWithContext)
}

/**
 * Checks if a style config is a slot-based (multi-part) config.
 *
 * @param styleConfig - The style config to check
 * @returns True if it's a slot style config
 */
export function isSlotStyleConfig(
  styleConfig: StyleConfig | SlotStyleConfig,
): styleConfig is SlotStyleConfig {
  // A slot style config has baseStyle as an object with slot names as keys
  // where each value is either a style object or a function
  const { baseStyle } = styleConfig

  if (!baseStyle || typeof baseStyle !== "object") {
    return false
  }

  // If baseStyle is a function, it's a single-part config
  if (typeof baseStyle === "function") {
    return false
  }

  // Check if values are style objects or functions (slot config)
  // vs being style properties directly (single-part config)
  const values = Object.values(baseStyle)
  if (values.length === 0) {
    return false
  }

  // If any value is a function or an object (slot styles), it's a slot config
  // We need to differentiate between { slot: { ...styles } } and { display: 'flex', ... }
  // CSS properties are typically strings or numbers, slot styles are objects or functions
  const firstKey = Object.keys(baseStyle)[0]
  const firstValue = baseStyle[firstKey]

  // If the first value is a function, it's likely a slot with a style function
  if (typeof firstValue === "function") {
    return true
  }

  // If the first value is an object, check if it looks like CSS properties
  // CSS properties have string/number values, slot styles have nested objects
  if (typeof firstValue === "object" && firstValue !== null) {
    const nestedKeys = Object.keys(firstValue)
    // Common CSS property indicators
    const cssIndicators = [
      "display",
      "position",
      "flex",
      "grid",
      "padding",
      "margin",
      "color",
      "background",
      "border",
      "font",
      "width",
      "height",
    ]
    const hasCssProperty = nestedKeys.some(
      (key) =>
        cssIndicators.some((indicator) =>
          key.toLowerCase().includes(indicator),
        ) || key.startsWith("_"), // Pseudo-selectors like _hover
    )

    // If the nested object has CSS-like properties, it's a slot style
    // If not, the first level might be CSS properties (single-part)
    return hasCssProperty
  }

  return false
}

/**
 * Gets the default props from a style config.
 *
 * @param styleConfig - The style configuration
 * @returns Default props object
 */
export function getStyleConfigDefaultProps(
  styleConfig: StyleConfig | SlotStyleConfig | undefined,
): ThemingProps {
  if (!styleConfig) return {}
  return styleConfig.defaultProps ?? {}
}

/**
 * Merges multiple style configs together.
 *
 * @param configs - Style configs to merge
 * @returns Merged style config
 */
export function mergeStyleConfigs(
  ...configs: (StyleConfig | undefined)[]
): StyleConfig {
  const result: StyleConfig = {}

  for (const config of configs) {
    if (!config) continue

    if (config.baseStyle) {
      result.baseStyle = config.baseStyle
    }

    if (config.variants) {
      result.variants = { ...result.variants, ...config.variants }
    }

    if (config.sizes) {
      result.sizes = { ...result.sizes, ...config.sizes }
    }

    if (config.defaultProps) {
      result.defaultProps = { ...result.defaultProps, ...config.defaultProps }
    }
  }

  return result
}
