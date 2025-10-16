import { defineSlotRecipe } from "../../styled-system"

export const carouselSlotRecipe = defineSlotRecipe({
  className: "carousel",
  slots: [
    "root",
    "itemGroup",
    "item",
    "control",
    "prevTrigger",
    "nextTrigger",
    "autoplayTrigger",
    "indicatorGroup",
    "indicator",
  ],
  base: {
    root: {
      position: "relative",
      overflow: "hidden",
      "--carousel-spacing": "spacing.4",
    },
    itemGroup: {
      display: "flex",
      transition: "transform 0.3s ease-in-out",
    },
    item: {
      minWidth: "0",
      flex: "0 0 auto",
      width: "full",
    },
    control: {
      position: "absolute",
      top: "50%",
      left: 0,
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transform: "translateY(-50%)",
      px: "var(--carousel-spacing)",
      zIndex: 2,
    },
    prevTrigger: {
      bg: "bg/80",
      color: "fg",
      border: "1px solid",
      borderColor: "border",
      borderRadius: "full",
      width: "10",
      height: "10",
      cursor: "pointer",
      transition: "all 0.2s",
      _hover: {
        bg: "bg.emphasized",
        transform: "scale(1.05)",
      },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "colorPalette.focusRing",
        outlineOffset: "2px",
      },
      _disabled: {
        opacity: "0.5",
        cursor: "not-allowed",
        _hover: {
          transform: "none",
        },
      },
    },
    nextTrigger: {
      bg: "bg/80",
      color: "fg",
      border: "1px solid",
      borderColor: "border",
      borderRadius: "full",
      width: "10",
      height: "10",
      cursor: "pointer",
      transition: "all 0.2s",
      _hover: {
        bg: "bg.emphasized",
        transform: "scale(1.05)",
      },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "colorPalette.focusRing",
        outlineOffset: "2px",
      },
      _disabled: {
        opacity: "0.5",
        cursor: "not-allowed",
        _hover: {
          transform: "none",
        },
      },
    },
    autoplayTrigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bg: "bg.subtle",
      border: "1px solid {colors.border}",
      borderRadius: "md",
      px: "3",
      py: "2",
      fontSize: "sm",
      cursor: "pointer",
      transition: "all 0.2s",
      _hover: {
        bg: "bg.emphasized",
      },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "colorPalette.focusRing",
        outlineOffset: "2px",
      },
    },
    indicatorGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "2",
      mt: "var(--carousel-spacing)",
    },
    indicator: {
      width: "3",
      height: "3",
      borderRadius: "full",
      bg: "bg.muted",
      cursor: "pointer",
      transition: "all 0.2s",
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "colorPalette.focusRing",
        outlineOffset: "2px",
      },
      _checked: {
        bg: "bg.subtle",
        transform: "scale(1.2)",
      },
      "&[data-current]": {
        bg: "fg",
        boxShadow: "0 0 0 2px var(--chakra-colors-colorPalette-focusRing)",
      },
    },
  },
  variants: {
    variant: {
      basic: {},
      enclosed: {
        root: {
          border: "1px solid {colors.border}",
          borderRadius: "lg",
          overflow: "hidden",
        },
        item: {
          borderRadius: "0",
        },
      },
      subtle: {
        root: {
          bg: "bg.subtle",
          borderRadius: "lg",
          p: "var(--carousel-spacing)",
        },
        prevTrigger: {
          bg: "bg.canvas",
          _hover: {
            bg: "bg.muted",
          },
        },
        nextTrigger: {
          bg: "bg.canvas",
          _hover: {
            bg: "bg.muted",
          },
        },
      },
    },
    size: {
      sm: {
        root: {
          "--carousel-spacing": "spacing.3",
        },
        prevTrigger: {
          width: "8",
          height: "8",
        },
        nextTrigger: {
          width: "8",
          height: "8",
        },
        indicator: {
          width: "2",
          height: "2",
        },
      },
      md: {
        root: {
          "--carousel-spacing": "spacing.4",
        },
        prevTrigger: {
          width: "10",
          height: "10",
        },
        nextTrigger: {
          width: "10",
          height: "10",
        },
        indicator: {
          width: "3",
          height: "3",
        },
      },
      lg: {
        root: {
          "--carousel-spacing": "spacing.6",
        },
        prevTrigger: {
          width: "12",
          height: "12",
        },
        nextTrigger: {
          width: "12",
          height: "12",
        },
        indicator: {
          width: "4",
          height: "4",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "basic",
  },
})
