import { ComponentDefaultProps } from "@chakra-ui/theme"
import { Dict, pipe } from "@chakra-ui/utils"
import { mergeThemeOverride } from "../extend-theme"
import { withDefaultColorScheme } from "./with-default-color-scheme"
import { withDefaultSize } from "./with-default-size"
import { withDefaultVariant } from "./with-default-variant"

export function withDefaultProps({
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

  return (theme: Dict) => mergeThemeOverride(pipe(...fns)(theme))
}
