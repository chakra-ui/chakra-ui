import { commandPaletteAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const commandPaletteSlotRecipe = defineSlotRecipe({
  className: "chakra-command-palette",
  slots: commandPaletteAnatomy.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      width: "full",
      minH: "0",
      bg: "bg.panel",
      borderWidth: "1px",
      borderRadius: "l3",
      overflow: "hidden",
      textStyle: "sm",
      "--command-palette-item-padding-x": "spacing.2",
      "--command-palette-item-padding-y": "spacing.1.5",
    },

    label: {
      srOnly: true,
    },

    control: {
      display: "flex",
      alignItems: "center",
      gap: "2",
      px: "4",
      borderBottomWidth: "1px",
      flexShrink: 0,
    },

    indicator: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "fg.muted",
      flexShrink: 0,
      _icon: {
        boxSize: "4",
      },
    },

    input: {
      flex: "1",
      width: "full",
      minW: "0",
      bg: "transparent",
      outline: "0",
      _placeholder: {
        color: "fg.muted",
      },
    },

    list: {
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      outline: "0",
      p: "1.5",
      scrollPadding: "1.5",
    },

    item: {
      position: "relative",
      userSelect: "none",
      display: "flex",
      alignItems: "center",
      gap: "2",
      cursor: "pointer",
      textAlign: "start",
      borderRadius: "l1",
      py: "var(--command-palette-item-padding-y)",
      px: "var(--command-palette-item-padding-x)",
      _hover: {
        bg: "bg.emphasized/60",
      },
      _highlighted: {
        bg: "bg.emphasized/60",
      },
      _disabled: {
        pointerEvents: "none",
        opacity: "0.5",
      },
      _icon: {
        boxSize: "4",
        color: "fg.muted",
      },
    },

    itemText: {
      flex: "1",
      lineClamp: "1",
    },

    itemCommand: {
      opacity: "0.6",
      textStyle: "xs",
      ms: "auto",
      ps: "4",
      letterSpacing: "widest",
      fontFamily: "inherit",
    },

    itemIndicator: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "fg",
      _icon: {
        boxSize: "4",
      },
    },

    itemGroup: {
      "& + &": {
        mt: "2",
      },
    },

    itemGroupLabel: {
      py: "1.5",
      px: "var(--command-palette-item-padding-x)",
      textStyle: "xs",
      fontWeight: "medium",
      color: "fg.muted",
    },

    empty: {
      py: "8",
      textAlign: "center",
      color: "fg.muted",
    },

    footer: {
      display: "flex",
      alignItems: "center",
      gap: "4",
      borderTopWidth: "1px",
      px: "4",
      py: "2.5",
      textStyle: "xs",
      color: "fg.muted",
      flexShrink: 0,
    },
  },

  variants: {
    size: {
      sm: {
        root: {
          "--command-palette-item-padding-y": "spacing.1",
        },
        control: {
          px: "3",
        },
        input: {
          py: "2.5",
        },
        list: {
          maxH: "64",
        },
        footer: {
          px: "3",
          py: "2",
        },
      },
      md: {
        input: {
          py: "3",
        },
        list: {
          maxH: "80",
        },
      },
      lg: {
        root: {
          "--command-palette-item-padding-y": "spacing.2",
        },
        input: {
          py: "3.5",
          textStyle: "md",
        },
        list: {
          maxH: "96",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
})
