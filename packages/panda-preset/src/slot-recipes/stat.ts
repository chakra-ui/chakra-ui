import { defineSlotRecipe } from "../def"

export const statSlotRecipe = defineSlotRecipe({
  className: "stat",
  slots: ["root", "label", "helpText", "valueText", "valueUnit", "indicator"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1",
      position: "relative",
      flex: "1",
    },
    label: {
      display: "inline-flex",
      gap: "1.5",
      alignItems: "center",
      color: "fg.muted",
      textStyle: "sm",
    },
    helpText: {
      color: "fg.muted",
      textStyle: "xs",
    },
    valueUnit: {
      color: "fg.muted",
      textStyle: "xs",
      fontWeight: "initial",
      letterSpacing: "initial",
    },
    valueText: {
      verticalAlign: "baseline",
      fontWeight: "semibold",
      letterSpacing: "tight",
      fontFeatureSettings: "pnum",
      fontVariantNumeric: "proportional-nums",
      display: "inline-flex",
      gap: "1",
    },
    indicator: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      marginEnd: 1,
      "& :where(svg)": {
        w: "1em",
        h: "1em",
      },
      "&[data-type=up]": {
        color: "fg.success",
      },
      "&[data-type=down]": {
        color: "fg.error",
      },
    },
  },
  variants: {
    size: {
      sm: {
        valueText: {
          textStyle: "xl",
        },
      },
      md: {
        valueText: {
          textStyle: "2xl",
        },
      },
      lg: {
        valueText: {
          textStyle: "3xl",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
