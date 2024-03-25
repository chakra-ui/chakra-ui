import { tabsAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const tabSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      position: "relative",
      colorPalette: "gray",
    },
    trigger: {
      outline: 0,
      display: "flex",
      alignItems: "center",
      fontWeight: "medium",
      _focusVisible: {
        zIndex: 1,
        outline: "2px solid",
        outlineColor: "colorPalette.500",
      },
      _disabled: {
        cursor: "not-allowed",
        opacity: 0.5,
      },
    },
    list: {
      display: "flex",
    },
    content: {
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "colorPalette.500",
      },
    },
    indicator: {
      borderRadius: "sm",
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
    fitted: {
      true: {
        trigger: { flex: 1 },
      },
    },
    justify: {
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
          py: "1",
          px: "2.5",
          fontSize: "sm",
        },
      },
      md: {
        trigger: {
          py: "1.5",
          px: "3",
          fontSize: "sm",
        },
      },
      lg: {
        trigger: {
          py: "2",
          px: "3",
          fontSize: "md",
        },
      },
    },
    variant: {
      line: {
        list: {
          borderColor: "border",
        },
        trigger: {
          borderColor: "transparent",
          _selected: {
            color: { base: "colorPalette.600", _dark: "colorPalette.300" },
            borderColor: "currentColor",
          },
          _disabled: {
            _active: { bg: "initial" },
          },
        },
      },
      enclosed: {
        list: {
          bg: "bg.muted",
          padding: "1",
          borderRadius: "md",
        },
        trigger: {
          flex: "1",
          justifyContent: "center",
          color: "fg.subtle",
          borderRadius: "sm",
          _selected: {
            bg: "bg",
            shadow: "xs",
            color: { base: "colorPalette.700", _dark: "colorPalette.300" },
          },
        },
      },
      outline: {
        list: {
          marginBottom: "-1px",
          borderBottom: "1px solid",
          borderColor: "inherit",
        },
        trigger: {
          border: "1px solid",
          borderColor: "inherit",
          marginBottom: "-1px",
          marginEnd: { _notLast: "-1px" },
          bg: "bg.subtle",
          _selected: {
            bg: "bg",
            color: { base: "colorPalette.600", _dark: "colorPalette.300" },
            borderColor: "inherit",
            borderTopColor: "currentColor",
            borderBottomColor: "transparent",
          },
        },
      },
      plain: {
        trigger: {
          _hover: {
            bg: "bg.muted",
            borderRadius: "sm",
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
        list: { borderBottomWidth: "1px" },
        trigger: { borderBottomWidth: "2px", marginBottom: "-1px" },
      },
    },
    {
      orientation: "vertical",
      variant: "line",
      css: {
        list: { borderEndWidth: "1px" },
        trigger: { borderEndWidth: "2px", marginEnd: "-1px" },
      },
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "line",
    orientation: "horizontal",
  },
})
