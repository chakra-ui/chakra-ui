import { ChakraTheme, ComponentDefaultProps } from "@chakra-ui/theme"
import { Dict, pipe } from "@chakra-ui/utils"
import { mergeThemeOverride, ThemeOverride } from "../extend-theme"
import { withDefaultColorScheme } from "./with-default-color-scheme"
import { withDefaultVariant } from "./with-default-variant"
import { withDefaultSize } from "./with-default-size"

export function withDefaultProps<
  BaseTheme extends ChakraTheme,
  Override extends ThemeOverride<BaseTheme>
>({
  defaultProps: { colorScheme, variant, size },
  components,
}: {
  defaultProps: ComponentDefaultProps
  components?: string[] | Dict
}) {
  const identity = <T>(t: T) => t
  const fns = [
    colorScheme
      ? withDefaultColorScheme({ colorScheme, components })
      : identity,
    size ? withDefaultSize({ size, components }) : identity,
    variant ? withDefaultVariant({ variant, components }) : identity,
  ]

  return (theme: Override) => mergeThemeOverride<BaseTheme>(pipe(...fns)(theme))
}
