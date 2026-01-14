/**
 * Framework-agnostic type definitions for Chakra UI system core.
 * These types are shared between React and Vue implementations.
 */

/**
 * Generic dictionary type for objects with string keys
 */
export type Dict<T = any> = Record<string, T>

/**
 * System style object - represents CSS-in-JS style definitions
 * This is a simplified type that both React and Vue can use
 */
export type SystemStyleObject = Dict

/**
 * Theming props that components receive for styling variations
 */
export interface ThemingProps {
  /**
   * The visual variant of the component
   */
  variant?: string
  /**
   * The size of the component
   */
  size?: string
  /**
   * The color palette to use for the component
   */
  colorPalette?: string
  /**
   * Custom style config to override the default
   */
  styleConfig?: StyleConfig
}

/**
 * Style configuration for a component
 */
export interface StyleConfig {
  /**
   * Base styles applied to all variants
   */
  baseStyle?: SystemStyleObject | ((props: Dict) => SystemStyleObject)
  /**
   * Size variations
   */
  sizes?: Dict<SystemStyleObject | ((props: Dict) => SystemStyleObject)>
  /**
   * Visual variants
   */
  variants?: Dict<SystemStyleObject | ((props: Dict) => SystemStyleObject)>
  /**
   * Default props for the component
   */
  defaultProps?: {
    variant?: string
    size?: string
    colorPalette?: string
  }
}

/**
 * Multi-part style configuration for components with slots
 */
export interface SlotStyleConfig {
  /**
   * Base styles for each slot
   */
  baseStyle?: Dict<SystemStyleObject | ((props: Dict) => SystemStyleObject)>
  /**
   * Size variations for each slot
   */
  sizes?: Dict<Dict<SystemStyleObject | ((props: Dict) => SystemStyleObject)>>
  /**
   * Visual variants for each slot
   */
  variants?: Dict<
    Dict<SystemStyleObject | ((props: Dict) => SystemStyleObject)>
  >
  /**
   * Default props for the component
   */
  defaultProps?: {
    variant?: string
    size?: string
    colorPalette?: string
  }
}

/**
 * Options for resolving component styles
 */
export interface ResolveStylesOptions {
  /**
   * Base styles to apply
   */
  baseStyle?: SystemStyleObject | ((props: Dict) => SystemStyleObject)
  /**
   * Internal CSS styles (__css prop)
   */
  __css?: SystemStyleObject
  /**
   * User-provided sx styles
   */
  sx?: SystemStyleObject
  /**
   * Style props extracted from component props
   */
  styleProps?: Dict
  /**
   * Theme object
   */
  theme: Dict
  /**
   * Current color mode
   */
  colorMode?: "light" | "dark"
}

/**
 * Options for resolving component style config from theme
 */
export interface ResolveStyleConfigOptions {
  /**
   * The theme key to look up (e.g., "Button", "Input")
   */
  themeKey: string | null
  /**
   * Theme object
   */
  theme: Dict
  /**
   * Current color mode
   */
  colorMode: "light" | "dark"
  /**
   * Component props including theming props
   */
  props: ThemingProps & Dict
  /**
   * Custom style config to use instead of theme lookup
   */
  styleConfig?: StyleConfig | SlotStyleConfig
}

/**
 * Result of splitting props
 */
export interface SplitPropsResult<T extends Dict = Dict> {
  /**
   * Props that matched the predicate
   */
  matched: Dict
  /**
   * Props that did not match the predicate
   */
  remaining: T
}

/**
 * Predicate function for filtering props
 */
export type PropPredicate = (key: string) => boolean

/**
 * CSS function type - merges styles and returns CSS object
 */
export type CssFn = (...styles: (SystemStyleObject | undefined)[]) => Dict

/**
 * Recipe function type - creates styles based on variant props
 */
export interface RecipeFn {
  (props?: Dict): Dict
  variantKeys: string[]
  variantMap: Dict<string[]>
  splitVariantProps: <T extends Dict>(props: T) => [Dict, Omit<T, string>]
}

/**
 * Context for style resolution (framework-agnostic)
 */
export interface StyleResolverContext {
  /**
   * CSS merging function
   */
  css: CssFn
  /**
   * Check if a property is a valid style property
   */
  isValidProperty: (prop: string) => boolean
  /**
   * Theme object
   */
  theme: Dict
  /**
   * Current color mode
   */
  colorMode: "light" | "dark"
}

/**
 * Result of resolving props (framework-agnostic)
 */
export interface ResolvedPropsResult {
  /**
   * Merged CSS styles
   */
  styles: Dict
  /**
   * Remaining props to pass to the element
   */
  props: Dict
}

/**
 * Options for the resolveProps function
 */
export interface ResolvePropsOptions {
  /**
   * Input props from the component
   */
  props: Dict
  /**
   * Recipe function for the component
   */
  recipe: RecipeFn
  /**
   * Function to determine if a prop should be forwarded
   */
  shouldForwardProp: (key: string, variantKeys: string[]) => boolean
  /**
   * CSS merging function
   */
  css: CssFn
  /**
   * Function to check if a prop is a valid style property
   */
  isValidProperty: (prop: string) => boolean
}
