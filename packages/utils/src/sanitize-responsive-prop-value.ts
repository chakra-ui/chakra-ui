/**
 * Fallback primitive values as well as null and undefined
 * to [value], so they can be used as an argument for useBreakpointValue.
 * @example sanitizeResponsivePropValue("sm") => ["sm"]
 * @example sanitizeResponsivePropValue(null) => [null]
 * @example sanitizeResponsivePropValue(undefined) => [undefined]
 */
export function sanitizeResponsivePropValue<T>(
  value: T,
): T extends null | undefined | string | number ? [T] : T {
  return value == null || typeof value === "string" || typeof value === "number"
    ? [value]
    : (value as any)
}
