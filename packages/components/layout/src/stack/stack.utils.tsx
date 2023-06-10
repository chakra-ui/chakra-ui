import { ResponsiveValue, SystemProps } from "@chakra-ui/system"
import { mapResponsive } from "@chakra-ui/breakpoint-utils"

export type StackDirection = ResponsiveValue<
  "row" | "column" | "row-reverse" | "column-reverse"
>

interface Options {
  spacing: SystemProps["margin"]
  direction: StackDirection
}

export function getDividerStyles(options: Options) {
  const { spacing, direction } = options

  const dividerStyles = {
    column: {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px",
    },
    "column-reverse": {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px",
    },
    row: {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0,
    },
    "row-reverse": {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0,
    },
  }

  return {
    "&": mapResponsive(
      direction,
      (value: keyof typeof dividerStyles) => dividerStyles[value],
    ),
  }
}
