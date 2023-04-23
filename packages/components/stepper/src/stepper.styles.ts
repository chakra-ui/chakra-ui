import { createMultiStyleConfigHelpers, cssVar } from "@chakra-ui/system"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers([
    "stepper",
    "step",
    "title",
    "description",
    "indicator",
    "separator",
    "icon",
  ])

const $size = cssVar("stepper-indicator-size")
const $iconSize = cssVar("stepper-icon-size")

const baseStyle = definePartsStyle({
  stepper: {
    display: "flex",
    justifyContent: "space-between",
    gap: "4",
    "&[data-orientation=vertical]": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    "&[data-orientation=horizontal]": {
      flexDirection: "row",
      alignItems: "center",
    },
  },
  title: {
    fontWeight: "medium",
  },
  description: {
    fontSize: "sm",
    color: "gray.600",
  },
  step: {
    flexShrink: 0,
    position: "relative",
    display: "flex",
    gap: "2",
    "&[data-orientation=horizontal]": {
      alignItems: "center",
    },
    "&:not(:last-of-type)": {
      flex: "1",
    },
  },
  icon: {
    flexShrink: 0,
    width: $iconSize.reference,
    height: $iconSize.reference,
  },
  indicator: {
    flexShrink: 0,
    bg: "white",
    borderRadius: "full",
    width: $size.reference,
    height: $size.reference,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&[data-status=active]": {
      borderWidth: "2px",
      borderColor: "tomato",
    },
    "&[data-status=complete]": {
      bg: "tomato",
      color: "white",
    },
    "&[data-status=incomplete]": {
      borderWidth: "2px",
    },
  },
})

export const stepperTheme = defineMultiStyleConfig({
  baseStyle,
  sizes: {
    sm: definePartsStyle({
      stepper: {
        [$size.variable]: "sizes.3",
        [$iconSize.variable]: "sizes.2",
      },
    }),
    md: definePartsStyle({
      stepper: {
        [$size.variable]: "sizes.6",
        [$iconSize.variable]: "sizes.4",
      },
    }),
    lg: definePartsStyle({
      stepper: {
        [$size.variable]: "sizes.10",
        [$iconSize.variable]: "sizes.6",
      },
    }),
  },
  defaultProps: {
    size: "lg",
  },
})
