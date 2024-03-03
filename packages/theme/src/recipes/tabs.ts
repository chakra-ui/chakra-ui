import { tabsAnatomy as parts } from "@chakra-ui/anatomy"
import { defineSlotRecipe } from "@chakra-ui/react"

export const tabSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      position: "relative",
      colorPalette: "blue",
    },
    trigger: {
      outline: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transitionProperty: "common",
      transitionDuration: "normal",
      _focusVisible: {
        zIndex: 1,
        boxShadow: "outline",
      },
      _disabled: {
        cursor: "not-allowed",
        opacity: 0.4,
      },
    },
    list: {
      display: "flex",
    },
    content: {
      p: 4,
      outline: 0,
    },
  },
  variants: {
    orientation: {
      vertical: {
        root: { display: "flex" },
        contentGroup: { height: "100%" },
        list: { flexDirection: "column" },
      },
      horizontal: {
        root: { display: "block" },
        contentGroup: { width: "100%" },
        list: { flexDirection: "row" },
      },
    },
    isFitted: {
      true: {
        trigger: { flex: 1 },
      },
    },
    align: {
      start: {
        list: { justifyContent: "flex-start" },
      },
      center: {
        list: { justifyContent: "center" },
      },
      end: {
        list: { justifyContent: "flex-end" },
      },
    },
    size: {
      sm: {
        trigger: {
          py: 1,
          px: 4,
          fontSize: "sm",
        },
      },
      md: {
        trigger: {
          fontSize: "md",
          py: 2,
          px: 4,
        },
      },
      lg: {
        trigger: {
          fontSize: "lg",
          py: 3,
          px: 4,
        },
      },
    },
    variant: {
      line: {
        list: {
          borderColor: "inherit",
        },
        trigger: {
          borderColor: "transparent",
          _selected: {
            color: { base: "colorPalette.600", _dark: "colorPalette.300" },
            borderColor: "currentColor",
          },
          _active: {
            bg: { base: "gray.200", _dark: "whiteAlpha.300" },
          },
          _disabled: { _active: { bg: "none" } },
        },
      },
      enclosed: {
        list: {
          mb: "-1px",
          borderBottom: "1px solid",
          borderColor: "inherit",
        },
        trigger: {
          borderTopRadius: "md",
          border: "1px solid",
          borderColor: "transparent",
          mb: "-1px",
          _selected: {
            color: { base: "colorPalette.600", _dark: "colorPalette.300" },
            borderBottomColor: { base: "white", _dark: "gray.800" },
          },
        },
      },
      "enclosed-colored": {
        list: {
          mb: "-1px",
          borderBottom: "1px solid",
          borderColor: "inherit",
        },
        trigger: {
          border: "1px solid",
          borderColor: "inherit",
          marginBottom: "-1px",
          marginEnd: { _notLast: "-1px" },
          bg: { base: "gray.50", _dark: "whiteAlpha.50" },
          _selected: {
            bg: { base: "white", _dark: "gray.800" },
            color: { base: "colorPalette.600", _dark: "colorPalette.300" },
            borderColor: "inherit",
            borderTopColor: "currentColor",
            borderBottomColor: "transparent",
          },
        },
      },
      "soft-rounded": {
        trigger: {
          borderRadius: "full",
          fontWeight: "semibold",
          color: "gray.600",
          _selected: {
            color: "colorPalette.600",
            bg: "colorPalette.100",
          },
        },
      },
      "solid-rounded": {
        trigger: {
          borderRadius: "full",
          fontWeight: "semibold",
          color: { base: "gray.600", _dark: "inherit" },
          bg: { base: "gray.50", _dark: "whiteAlpha.50" },
          _selected: {
            color: { base: "white", _dark: "gray.800" },
            bg: { base: "colorPalette.600", _dark: "colorPalette.300" },
          },
        },
      },
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      variant: "line",
      css: {
        list: { borderBottom: "2px solid" },
        trigger: { borderBottom: "2px solid" },
      },
    },
    {
      orientation: "vertical",
      variant: "line",
      css: {
        list: { borderStart: "2px solid" },
        trigger: { borderStart: "2px solid" },
      },
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "line",
    orientation: "horizontal",
  },
})
