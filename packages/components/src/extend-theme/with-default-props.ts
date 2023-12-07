import { ComponentDefaultProps } from "@chakra-ui/theme"
import { mergeThemeOverride } from "./extend-theme"
import { withDefaultColorScheme } from "./with-default-color-scheme"
import { withDefaultSize } from "./with-default-size"
import { withDefaultVariant } from "./with-default-variant"

function pipe<R>(...fns: Array<(a: R) => R>) {
  return (v: R) => fns.reduce((a, b) => b(a), v)
}
export function withDefaultProps({
  defaultProps: { colorScheme, variant, size },
  components,
}: {
  defaultProps: ComponentDefaultProps
  components?: string[] | Record<string, any>
}) {
  const identity = <T>(t: T) => t
  const fns = [
    colorScheme
      ? withDefaultColorScheme({ colorScheme, components })
      : identity,
    size ? withDefaultSize({ size, components }) : identity,
    variant ? withDefaultVariant({ variant, components }) : identity,
  ]

  return (theme: Record<string, any>) => mergeThemeOverride(pipe(...fns)(theme))
}
