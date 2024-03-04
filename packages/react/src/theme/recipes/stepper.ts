import { stepperAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const stepperSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    stepper: {
      display: "flex",
      justifyContent: "space-between",
      gap: "4",
      colorPalette: "blue",
      "--accent-color": {
        base: "colors.colorPalette.500",
        _dark: "colors.colorPalette.200",
      },
    },
    description: {
      color: "text.subtle",
    },
    separator: {
      bg: "border",
      flex: "1",
    },
    icon: {
      flexShrink: 0,
      width: "var(--icon-size)",
      height: "var(--icon-size)",
    },
    indicator: {
      flexShrink: 0,
      borderRadius: "full",
      width: "var(--size)",
      height: "var(--size)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  variants: {
    orientation: {
      vertical: {
        stepper: {
          flexDirection: "column",
          alignItems: "flex-start",
        },
        separator: {
          width: "2px",
          position: "absolute",
          height: "100%",
          maxHeight: `calc(100% - var(--size) - 8px)`,
          top: `calc(var(--size) + 4px)`,
          insetStart: `calc(var(--size) / 2 - 1px)`,
        },
      },
      horizontal: {
        stepper: {
          flexDirection: "row",
          alignItems: "center",
        },
        separator: {
          width: "100%",
          height: "2px",
          marginStart: "2",
        },
      },
    },
    status: {
      active: {
        indicator: {
          borderWidth: "2px",
          borderColor: "var(--accent-color)",
        },
      },
      complete: {
        indicator: {
          bg: "var(--accent-color)",
          color: "text.inverse",
        },
        separator: {
          bg: "var(--accent-color)",
        },
      },
      incomplete: {
        indicator: {
          borderWidth: "2px",
        },
      },
    },
    size: {
      xs: {
        stepper: {
          "--size": "sizes.4",
          "--icon-size": "sizes.3",
        },
        title: { fontSize: "xs" },
        description: { fontSize: "xs" },
      },
      sm: {
        stepper: {
          "--size": "sizes.6",
          "--icon-size": "sizes.4",
        },
        title: { fontSize: "sm" },
        description: { fontSize: "xs" },
      },
      md: {
        stepper: {
          "--size": "sizes.8",
          "--icon-size": "sizes.5",
        },
        title: { fontSize: "md" },
        description: { fontSize: "sm" },
      },
      lg: {
        stepper: {
          "--size": "sizes.10",
          "--icon-size": "sizes.6",
        },
        title: { fontSize: "lg" },
        description: { fontSize: "md" },
      },
    },
  },
  defaultVariants: {
    size: "md",
    orientation: "horizontal",
  },
})
