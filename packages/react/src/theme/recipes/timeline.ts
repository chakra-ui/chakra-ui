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
      insetInlineStart: "calc(var(--timeline-size) / 2)",
      insetBlock: "0",
      borderColor: "border",
    },
    indicator: {
      outline: "2px solid {colors.bg}",
      position: "relative",
      flexShrink: 0,
      boxSize: "var(--timeline-size)",
      fontSize: "var(--timeline-font-size)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      rounded: "full",
      fontWeight: "medium",
    },
    connector: {
      alignSelf: "stretch",
      position: "relative",
    },
    content: {
      pb: "6",
      mt: "-0.5",
    },
  },

  variants: {
    variant: {
      subtle: {
        indicator: {
          bg: "bg.subtle",
        },
      },
      solid: {
        indicator: {
          bg: "bg.inverted",
          color: "fg.inverted",
        },
      },
      outline: {
        indicator: {
          bg: "bg",
          borderWidth: "2px",
        },
      },
      plain: {},
    },

    size: {
      sm: {
        root: {
          "--timeline-size": "sizes.4",
          "--timeline-margin": "0px",
          "--timeline-font-size": "fontSizes.2xs",
        },
      },
      md: {
        root: {
          "--timeline-size": "sizes.6",
          "--timeline-margin": "2px",
          "--timeline-font-size": "fontSizes.xs",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "solid",
  },
})
