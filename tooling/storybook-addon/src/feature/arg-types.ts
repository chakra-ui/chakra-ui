import type { ArgTypes } from "@storybook/react"
import type { ThemingProps } from "@chakra-ui/react"

/**
 * `keyof` alternative which omits non-string keys
 */
type KeyOf<T> = [T] extends [never]
  ? never
  : T extends object
  ? Extract<keyof T, string>
  : never

export type ThemingArgTypeKey = "variant" | "size" | "colorScheme"

/**
 * Checks if the given color scale object has all required keys: 50, 100, 200...900.
 */
function validateColorScheme(value: object) {
  const valueKeys = Object.keys(value || {})
  return [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ].every((term) => valueKeys.includes(term))
}

/**
 * Create Storybook controls based on a Chakra UI theme component.
 *
 * @example
 * export default {
 *   title: "Components / Forms / Button",
 *   argTypes: getThemingArgTypes(theme, "Button"),
 * }
 *
 * @example full example
 * import { Meta, StoryFn } from "@storybook/react"
 * import { getThemingArgTypes } from "@chakra-ui/storybook-addon"
 * import { theme } from "<your-theme>"
 *
 * export default {
 *   title: "Components / Forms / Button",
 *   argTypes: {
 *     ...getThemingArgTypes(theme, "Button"),
 *     children: "string"
 *   },
 *   args: { children: "Button" },
 * } as Meta
 *
 * interface StoryProps extends ThemingProps<"Button"> {
 *   children?: React.ReactNode
 * }
 *
 * export const Basic: StoryFn<StoryProps> = (props) => <Button {...props} />
 *
 * @param theme same Chakra UI theme used in .storybook/preview.tsx
 * @param componentName component name to create the ArgTypes for
 */
export function getThemingArgTypes<
  Theme extends {
    colors: Record<string, any>
    components: Record<string, any>
  },
  ComponentName extends KeyOf<Theme["components"]>,
>(theme: Theme, componentName: ComponentName) {
  const component = theme.components[componentName]
  if (!component) {
    return undefined
  }

  const argTypes: ArgTypes<
    Partial<Pick<ThemingProps<ComponentName>, ThemingArgTypeKey>>
  > = {}

  const variantOptions = Object.keys(component.variants || {})
  if (variantOptions.length) {
    argTypes.variant = {
      type: { name: "enum", value: variantOptions },
      defaultValue: component.defaultProps?.variant,
    }
  }

  const sizeOptions = Object.keys(component.sizes || {})
  if (sizeOptions.length) {
    argTypes.size = {
      type: { name: "enum", value: sizeOptions },
      defaultValue: component.defaultProps?.size,
    }
  }

  if (component.defaultProps?.["colorScheme"]) {
    const colorSchemes = Object.entries(theme.colors)
      .filter(([, value]) => validateColorScheme(value))
      .map(([key]) => key)

    if (colorSchemes.length) {
      argTypes.colorScheme = {
        type: { name: "enum", value: colorSchemes },
        defaultValue: component.defaultProps?.colorScheme,
      }
    }
  }

  return argTypes
}
