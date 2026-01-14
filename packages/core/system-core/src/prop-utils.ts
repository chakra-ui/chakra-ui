/**
 * Framework-agnostic prop utilities for Chakra UI.
 * These functions can be used by both React and Vue implementations.
 */
import type { Dict, PropPredicate, ThemingProps } from "./types"

/**
 * Theming prop keys that should be removed before passing to the DOM
 */
export const themingPropKeys = [
  "variant",
  "size",
  "colorPalette",
  "colorScheme", // Alias for colorPalette
  "styleConfig",
] as const

/**
 * HTML props that need special handling
 */
export const htmlProps = new Set([
  "htmlWidth",
  "htmlHeight",
  "htmlSize",
  "htmlTranslate",
])

/**
 * Check if a prop is an HTML prop that needs special handling
 */
export function isHtmlProp(prop: unknown): boolean {
  return typeof prop === "string" && htmlProps.has(prop)
}

/**
 * Splits an object into two parts based on a predicate function.
 *
 * @param props - The object to split
 * @param predicate - Function that returns true for props to include in the first result
 * @returns Tuple of [matched props, remaining props]
 *
 * @example
 * ```ts
 * const [styleProps, elementProps] = splitProps(props, isStyleProp)
 * ```
 */
export function splitProps<T extends Dict>(
  props: T,
  predicate: PropPredicate | string[],
): [Dict, Dict] {
  const isMatch =
    typeof predicate === "function"
      ? predicate
      : (key: string) => (predicate as string[]).includes(key)

  const matched: Dict = {}
  const remaining: Dict = {}

  for (const key of Object.keys(props)) {
    if (isMatch(key)) {
      matched[key] = props[key]
    } else {
      remaining[key] = props[key]
    }
  }

  return [matched, remaining]
}

/**
 * Creates a reusable split function for a fixed set of keys.
 *
 * @param keys - Array of keys to split on
 * @returns A function that splits props based on those keys
 */
export function createSplitProps<K extends string>(keys: readonly K[]) {
  return function split<T extends Partial<Record<K, any>>>(
    props: T,
  ): [Pick<T, K>, Omit<T, K>] {
    return splitProps(props, keys as unknown as string[]) as [
      Pick<T, K>,
      Omit<T, K>,
    ]
  }
}

/**
 * Removes theming props from an object, returning the remaining props.
 * Theming props include: variant, size, colorPalette, colorScheme, styleConfig
 *
 * @param props - Props object that may contain theming props
 * @returns Props object with theming props removed
 *
 * @example
 * ```ts
 * const elementProps = omitThemingProps({ variant: 'solid', onClick: () => {} })
 * // Result: { onClick: () => {} }
 * ```
 */
export function omitThemingProps<T extends ThemingProps>(
  props: T,
): Omit<T, keyof ThemingProps> {
  const result: Dict = {}

  for (const key of Object.keys(props)) {
    if (!themingPropKeys.includes(key as (typeof themingPropKeys)[number])) {
      result[key] = (props as Dict)[key]
    }
  }

  return result as Omit<T, keyof ThemingProps>
}

/**
 * Extracts theming props from a props object.
 *
 * @param props - Props object that may contain theming props
 * @returns Object containing only the theming props
 *
 * @example
 * ```ts
 * const themingProps = extractThemingProps({ variant: 'solid', onClick: () => {} })
 * // Result: { variant: 'solid' }
 * ```
 */
export function extractThemingProps<T extends ThemingProps>(
  props: T,
): ThemingProps {
  const result: ThemingProps = {}

  if (props.variant !== undefined) result.variant = props.variant
  if (props.size !== undefined) result.size = props.size
  if (props.colorPalette !== undefined) result.colorPalette = props.colorPalette
  if ((props as Dict).colorScheme !== undefined) {
    result.colorPalette = (props as Dict).colorScheme
  }
  if (props.styleConfig !== undefined) result.styleConfig = props.styleConfig

  return result
}

/**
 * Omit specified keys from an object.
 *
 * @param obj - The source object
 * @param keys - Keys to omit
 * @returns New object without the specified keys
 */
export function omit<T extends Dict, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result: Dict = {}
  const keySet = new Set(keys as string[])

  for (const key of Object.keys(obj)) {
    if (!keySet.has(key)) {
      result[key] = obj[key]
    }
  }

  return result as Omit<T, K>
}

/**
 * Pick specified keys from an object.
 *
 * @param obj - The source object
 * @param keys - Keys to pick
 * @returns New object with only the specified keys
 */
export function pick<T extends Dict, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result: Dict = {}

  for (const key of keys) {
    if (key in obj) {
      result[key as string] = obj[key]
    }
  }

  return result as Pick<T, K>
}

/**
 * Removes undefined and null values from an object.
 *
 * @param obj - The source object
 * @returns New object without undefined/null values
 */
export function compact<T extends Dict>(obj: T): T {
  const result: Dict = {}

  for (const key of Object.keys(obj)) {
    const value = obj[key]
    if (value !== undefined && value !== null) {
      result[key] = value
    }
  }

  return result as T
}

/**
 * Filters an object based on a predicate function.
 *
 * @param obj - The source object
 * @param predicate - Function that returns true to keep the entry
 * @returns New filtered object
 */
export function filterObject<T extends Dict>(
  obj: T,
  predicate: (value: any, key: string) => boolean,
): Partial<T> {
  const result: Dict = {}

  for (const key of Object.keys(obj)) {
    if (predicate(obj[key], key)) {
      result[key] = obj[key]
    }
  }

  return result as Partial<T>
}
