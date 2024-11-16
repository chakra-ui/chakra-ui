import { timelineAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const timelineSlotRecipe = defineSlotRecipe({
  slots: timelineAnatomy.keys(),
  className: "chakra-timeline",
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      width: "full",
      "--timeline-thickness": "1px",
      "--timeline-gutter": "4px",
    },
    item: {
      display: "flex",
      position: "relative",
      alignItems: "flex-start",
      flexShrink: 0,
      gap: "4",
      _last: {
        "& :where(.chakra-timeline__separator)": { display: "none" },
      },
    },
    separator: {
      position: "absolute",
      borderStartWidth: "var(--timeline-thickness)",
      ms: "calc(-1 * var(--timeline-thickness) / 2)",
      insetInlineStart: "calc(var(--timeline-indicator-size) / 2)",
      insetBlock: "0",
      borderColor: "border",
    },
    indicator: {
      outline: "2px solid {colors.bg}",
      position: "relative",
      flexShrink: "0",
      boxSize: "var(--timeline-indicator-size)",
      fontSize: "var(--timeline-font-size)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "full",
      fontWeight: "medium",
    },
    connector: {
      alignSelf: "stretch",
      position: "relative",
    },
    content: {
      pb: "6",
      display: "flex",
      flexDirection: "column",
      width: "full",
      gap: "2",
    },
    title: {
      display: "flex",
      fontWeight: "medium",
      flexWrap: "wrap",
      gap: "1.5",
      alignItems: "center",
      mt: "var(--timeline-margin)",
    },
    description: {
      color: "fg.muted",
      textStyle: "xs",
    },
  },

  variants: {
    variant: {
      subtle: {
        indicator: {
          bg: "colorPalette.muted",
        },
      },
      solid: {
        indicator: {
          bg: "colorPalette.solid",
          color: "colorPalette.contrast",
        },
      },
      outline: {
        indicator: {
          bg: "currentBg",
          borderWidth: "1px",
          borderColor: "colorPalette.muted",
        },
      },
      plain: {},
    },

    size: {
      sm: {
        root: {
          "--timeline-indicator-size": "sizes.4",
          "--timeline-font-size": "fontSizes.2xs",
        },
        title: {
          textStyle: "xs",
        },
      },
      md: {
        root: {
          "--timeline-indicator-size": "sizes.5",
          "--timeline-font-size": "fontSizes.xs",
        },
        title: {
          textStyle: "sm",
        },
      },
      lg: {
        root: {
          "--timeline-indicator-size": "sizes.6",
          "--timeline-font-size": "fontSizes.xs",
        },
        title: {
          mt: "0.5",
          textStyle: "sm",
        },
      },
      xl: {
        root: {
          "--timeline-indicator-size": "sizes.8",
          "--timeline-font-size": "fontSizes.sm",
        },
        title: {
          mt: "1.5",
          textStyle: "sm",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "solid",
  },
})
