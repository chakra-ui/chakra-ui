import { ResponsiveValue, SystemProps } from "@chakra-ui/system"
import { mapResponsive } from "@chakra-ui/utils"

export type StackDirection = ResponsiveValue<
  "row" | "column" | "row-reverse" | "column-reverse"
>

/**
 * If we ever run into SSR issues with this, check this post to find a fix for it:
 * @see https://medium.com/@emmenko/patching-lobotomized-owl-selector-for-emotion-ssr-5a582a3c424c
 */
export const selector = "& > *:not(style) ~ *:not(style)"

interface Options {
  spacing: SystemProps["margin"]
  direction: StackDirection
}

export function getStackStyles(options: Options) {
  const { spacing, direction } = options

  const directionStyles = {
    column: {
      marginTop: spacing,
      marginEnd: 0,
      marginBottom: 0,
      marginStart: 0,
    },
    row: { marginTop: 0, marginEnd: 0, marginBottom: 0, marginStart: spacing },
    "column-reverse": {
      marginTop: 0,
      marginEnd: 0,
      marginBottom: spacing,
      marginStart: 0,
    },
    "row-reverse": {
      marginTop: 0,
      marginEnd: spacing,
      marginBottom: 0,
      marginStart: 0,
    },
  }

  return {
    flexDirection: direction,
    [selector]: mapResponsive(direction, (value) => directionStyles[value]),
  }
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
    "&": mapResponsive(direction, (value) => dividerStyles[value]),
  }
}
