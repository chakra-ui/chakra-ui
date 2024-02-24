/**
 * Get the CSS variable ref stored in the theme
 */
export function getCSSVar(
  theme: Record<string, any>,
  scale: string,
  value: any,
) {
  return theme.__cssMap?.[`${scale}.${value}`]?.varRef ?? value
}
