const radii = {
  none: "0",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
}

/**
 * @deprecated
 * You can derive the Radii type from the DefaultChakraTheme
 *
 * type Radii = DefaultChakraTheme['radii']
 */
export type Radii = typeof radii

export default radii
