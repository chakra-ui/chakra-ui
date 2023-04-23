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
const $titleFontSize = cssVar("stepper-title-font-size")
const $descFontSize = cssVar("stepper-description-font-size")

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
    fontSize: $titleFontSize.reference,
    fontWeight: "medium",
  },
  description: {
    fontSize: $descFontSize.reference,
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
  separator: {
    bg: "gray.200",
    flex: "1",
    height: "2px",
    "&[data-status=complete]": {
      bg: "tomato",
    },
    "&[data-orientation=horizontal]": {
      marginStart: "2",
    },
    "&[data-orientation=vertical]": {
      width: "2px",
      position: "absolute",
      height: "100%",
      maxHeight: `calc(100% - ${$size.reference} - 8px)`,
      top: `calc(${$size.reference} + 4px)`,
      insetStart: `calc(${$size.reference} / 2 - 1px)`,
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
        [$titleFontSize.variable]: "fontSizes.sm",
        [$descFontSize.variable]: "fontSizes.xs",
      },
    }),
    md: definePartsStyle({
      stepper: {
        [$size.variable]: "sizes.6",
        [$iconSize.variable]: "sizes.4",
        [$titleFontSize.variable]: "fontSizes.md",
        [$descFontSize.variable]: "fontSizes.sm",
      },
    }),
    lg: definePartsStyle({
      stepper: {
        [$size.variable]: "sizes.10",
        [$iconSize.variable]: "sizes.6",
        [$titleFontSize.variable]: "fontSizes.md",
        [$descFontSize.variable]: "fontSizes.sm",
      },
    }),
  },
  defaultProps: {
    size: "lg",
  },
})
