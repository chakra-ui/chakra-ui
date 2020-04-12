/**
 * Check if a theme key refers to a components
 * or sub-component
 */
export function isSubcomponent(themeKey: string) {
  return themeKey.split(".").length > 1
}
