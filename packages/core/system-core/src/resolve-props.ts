/**
 * Framework-agnostic prop resolution for Chakra UI.
 * This is the core logic extracted from React's useResolvedProps hook,
 * made available for use by both React and Vue implementations.
 */
import { splitProps } from "./prop-utils"
import type {
  Dict,
  RecipeFn,
  ResolvePropsOptions,
  ResolvedPropsResult,
} from "./types"

/**
 * Converts a value to an array if it isn't already, filtering out falsy values.
 * @internal
 */
function toArray(val: any): any[] {
  const res = Array.isArray(val) ? val : [val]
  return res.filter(Boolean).flat()
}

/**
 * Resolves component props into styles and element props.
 *
 * This is the framework-agnostic version of React's `useResolvedProps` hook.
 * It performs the core style resolution logic that can be used by any framework.
 *
 * The resolution process:
 * 1. Split props into forwarded props, variant props, style props, and element props
 * 2. Apply the recipe function with variant props to get base styles
 * 3. Merge recipe styles with css prop and individual style props
 * 4. Return merged styles and cleaned props
 *
 * @param options - The resolution options
 * @returns The resolved styles and props
 *
 * @example
 * ```ts
 * // Framework-agnostic usage
 * const result = resolveProps({
 *   props: { variant: 'solid', colorPalette: 'blue', onClick: () => {}, padding: 4 },
 *   recipe: buttonRecipe,
 *   shouldForwardProp: (key, variantKeys) => !variantKeys.includes(key),
 *   css: system.css,
 *   isValidProperty: system.isValidProperty,
 * })
 *
 * // In React (wrapped with useMemo):
 * const result = useMemo(() => resolveProps(options), [deps])
 *
 * // In Vue (wrapped with computed):
 * const result = computed(() => resolveProps(options))
 * ```
 */
export function resolveProps(
  options: ResolvePropsOptions,
): ResolvedPropsResult {
  const {
    props: inProps,
    recipe,
    shouldForwardProp,
    css,
    isValidProperty,
  } = options

  // Extract children separately (not processed as style props)
  const { children, ...props } = inProps

  // Step 1: Split props into forwarded props and rest
  const [forwardedProps, restPropsB] = splitProps(props, (key) =>
    shouldForwardProp(key, recipe.variantKeys),
  )

  // Step 2: Split variant props from the rest
  const [variantProps, restPropsC] = splitProps(restPropsB, recipe.variantKeys)

  // Step 3: Split style props from element props
  const [styleProps, elementProps] = splitProps(restPropsC, isValidProperty)

  // Step 4: Handle special theming props that might not be in variantKeys
  const effectiveVariantProps = { ...variantProps }

  // colorPalette handling
  const hasColorPalette = recipe.variantKeys.includes("colorPalette")
  if (!hasColorPalette && props.colorPalette !== undefined) {
    effectiveVariantProps.colorPalette = props.colorPalette
  }

  // orientation handling
  const hasOrientation = recipe.variantKeys.includes("orientation")
  if (!hasOrientation && props.orientation !== undefined) {
    effectiveVariantProps.orientation = props.orientation
  }

  // Step 5: Apply recipe to get variant styles
  const recipeStyles = recipe(effectiveVariantProps)

  // Step 6: Extract css prop from style props
  const { css: cssStyles, ...propStyles } = styleProps

  // Step 7: Merge all styles in the correct order
  // Priority: recipe styles < css prop < individual style props
  const styles = css(recipeStyles, ...toArray(cssStyles), propStyles)

  return {
    styles,
    props: {
      ...forwardedProps,
      ...elementProps,
      children,
    },
  }
}

/**
 * Creates a default should-forward-prop function.
 *
 * This determines which props should be forwarded to the underlying element
 * versus being consumed by the styling system.
 *
 * @param additionalForwardedProps - Additional prop names to always forward
 * @returns A function that checks if a prop should be forwarded
 */
export function createShouldForwardProp(
  additionalForwardedProps: string[] = [],
): (key: string, variantKeys: string[]) => boolean {
  const forwardedSet = new Set(additionalForwardedProps)

  return (key: string, variantKeys: string[]): boolean => {
    // Always forward explicitly listed props
    if (forwardedSet.has(key)) return true

    // Don't forward variant keys - they're consumed by the recipe
    if (variantKeys.includes(key)) return false

    // By default, forward the prop
    return true
  }
}

/**
 * Merges multiple style objects, with later objects taking precedence.
 *
 * @param styles - Style objects to merge
 * @returns Merged style object
 */
export function mergeStyles(...styles: (Dict | undefined)[]): Dict {
  const result: Dict = {}

  for (const style of styles) {
    if (!style) continue
    Object.assign(result, style)
  }

  return result
}

/**
 * Deep merges style objects, handling nested objects recursively.
 *
 * @param target - Target object to merge into
 * @param sources - Source objects to merge from
 * @returns Merged object
 */
export function deepMergeStyles(target: Dict, ...sources: Dict[]): Dict {
  const isObject = (item: any): item is Dict =>
    item && typeof item === "object" && !Array.isArray(item)

  for (const source of sources) {
    if (!isObject(source)) continue

    for (const key of Object.keys(source)) {
      const sourceValue = source[key]
      const targetValue = target[key]

      if (isObject(sourceValue) && isObject(targetValue)) {
        target[key] = deepMergeStyles({ ...targetValue }, sourceValue)
      } else {
        target[key] = sourceValue
      }
    }
  }

  return target
}

/**
 * Runs a function if it's callable, otherwise returns the value as-is.
 *
 * @param valueOrFn - A value or a function that returns a value
 * @param args - Arguments to pass to the function if it's callable
 * @returns The resolved value
 */
export function runIfFn<T, Args extends any[]>(
  valueOrFn: T | ((...args: Args) => T),
  ...args: Args
): T {
  return typeof valueOrFn === "function"
    ? (valueOrFn as (...args: Args) => T)(...args)
    : valueOrFn
}

/**
 * Creates a simple recipe function from a style config.
 * This is useful for creating standalone recipes outside of the system.
 *
 * @param config - Style configuration
 * @returns A recipe function
 *
 * @example
 * ```ts
 * const buttonRecipe = createSimpleRecipe({
 *   base: { display: 'inline-flex' },
 *   variants: {
 *     size: {
 *       sm: { padding: '4px 8px' },
 *       md: { padding: '8px 16px' },
 *     },
 *     variant: {
 *       solid: { background: 'blue.500' },
 *       outline: { border: '1px solid' },
 *     },
 *   },
 *   defaultVariants: { size: 'md', variant: 'solid' },
 * })
 * ```
 */
export function createSimpleRecipe(config: {
  base?: Dict
  variants?: Dict<Dict<Dict>>
  defaultVariants?: Dict<string>
}): RecipeFn {
  const { base = {}, variants = {}, defaultVariants = {} } = config

  const variantKeys = Object.keys(variants)
  const variantMap: Dict<string[]> = {}

  for (const key of variantKeys) {
    variantMap[key] = Object.keys(variants[key] || {})
  }

  const recipeFn = (props: Dict = {}): Dict => {
    // Start with base styles
    const result: Dict = { ...base }

    // Apply variant styles
    for (const key of variantKeys) {
      const value = props[key] ?? defaultVariants[key]
      if (value && variants[key]?.[value]) {
        Object.assign(result, variants[key][value])
      }
    }

    return result
  }

  // Attach metadata
  recipeFn.variantKeys = variantKeys
  recipeFn.variantMap = variantMap
  recipeFn.splitVariantProps = <T extends Dict>(
    props: T,
  ): [Dict, Omit<T, string>] => {
    return splitProps(props, variantKeys) as [Dict, Omit<T, string>]
  }

  return recipeFn as RecipeFn
}
