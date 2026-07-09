import { dateInputAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const dateInputSlotRecipe = defineSlotRecipe({
  className: "chakra-date-input",
  slots: dateInputAnatomy.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
      width: "full",
      _disabled: {
        opacity: "0.5",
      },
    },

    label: {
      textStyle: "label",
    },

    control: {
      display: "flex",
      alignItems: "center",
    },

    segmentGroup: {
      width: "100%",
      minWidth: "0",
      outline: "0",
      position: "relative",
      appearance: "none",
      textAlign: "start",
      borderRadius: "l2",
      height: "var(--input-height)",
      minW: "var(--input-height)",
      "--focus-color": "colors.colorPalette.focusRing",
      "--error-color": "colors.border.error",
      _invalid: {
        focusRingColor: "var(--error-color)",
        borderColor: "var(--error-color)",
      },
      display: "flex",
      alignItems: "center",
      gap: "1",
      cursor: "text",
    },

    segment: {
      borderRadius: "l1",
      px: "0.5",
      outline: "none",
      _placeholderShown: {
        color: "fg.subtle",
      },
      "&[data-type=literal]": {
        px: "0",
        color: "fg.subtle",
      },
    },
  },

  variants: {
    size: {
      "2xs": {
        segmentGroup: {
          textStyle: "xs",
          px: "1.5",
          "--input-height": "sizes.7",
        },
      },
      xs: {
        segmentGroup: {
          textStyle: "xs",
          px: "1.5",
          "--input-height": "sizes.8",
        },
      },
      sm: {
        segmentGroup: {
          textStyle: "sm",
          px: "2",
          "--input-height": "sizes.9",
        },
      },
      md: {
        segmentGroup: {
          textStyle: "sm",
          px: "2.5",
          "--input-height": "sizes.10",
        },
      },
      lg: {
        segmentGroup: {
          textStyle: "md",
          px: "3.5",
          "--input-height": "sizes.11",
        },
      },
      xl: {
        segmentGroup: {
          textStyle: "md",
          px: "4",
          "--input-height": "sizes.12",
        },
      },
      "2xl": {
        segmentGroup: {
          textStyle: "lg",
          px: "4.5",
          "--input-height": "sizes.16",
        },
      },
    },

    variant: {
      outline: {
        segmentGroup: {
          bg: "transparent",
          borderWidth: "1px",
          borderColor: "border",
          focusRing: "inside",
          focusRingColor: "var(--focus-color)",
        },
        segment: {
          _focus: {
            bg: "colorPalette.emphasized",
            color: "fg",
          },
        },
      },

      subtle: {
        segmentGroup: {
          borderWidth: "1px",
          borderColor: "transparent",
          bg: "bg.muted",
          focusVisibleRing: "inside",
          focusRingColor: "var(--focus-color)",
        },
        segment: {
          _focus: {
            bg: "colorPalette.subtle",
            color: "colorPalette.fg",
          },
        },
      },

      flushed: {
        segmentGroup: {
          bg: "transparent",
          borderBottomWidth: "1px",
          borderBottomColor: "border",
          borderRadius: "0",
          px: "0",
          _focusVisible: {
            borderColor: "var(--focus-color)",
            boxShadow: "0px 1px 0px 0px var(--focus-color)",
            _invalid: {
              borderColor: "var(--error-color)",
              boxShadow: "0px 1px 0px 0px var(--error-color)",
            },
          },
        },
        segment: {
          _focus: {
            bg: "colorPalette.subtle",
            color: "colorPalette.fg",
          },
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
