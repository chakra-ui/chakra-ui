import { commandAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const commandSlotRecipe = defineSlotRecipe({
  className: "chakra-command",
  slots: commandAnatomy.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "full",
      minH: "0",
      outline: 0,
      bg: "bg.panel",
      borderRadius: "l3",
      overflow: "hidden",
      textStyle: "sm",
    },

    label: {
      srOnly: true,
    },

    control: {
      display: "flex",
      alignItems: "center",
      gap: "2",
      px: "var(--command-control-padding-x)",
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
        boxSize: "var(--command-indicator-size)",
      },
    },

    input: {
      flex: "1",
      width: "full",
      minW: "0",
      h: "var(--command-input-height)",
      bg: "transparent",
      outline: "0",
      _placeholder: {
        color: "fg.muted",
      },
    },

    clearTrigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      boxSize: "6",
      rounded: "l1",
      color: "fg.muted",
      cursor: "button",
      focusVisibleRing: "inside",
      focusRingWidth: "2px",
      _hover: {
        bg: "bg.muted",
        color: "fg",
      },
      _icon: {
        boxSize: "3.5",
      },
    },

    list: {
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      overscrollBehavior: "contain",
      outline: "0",
      scrollbarWidth: "thin",
      p: "var(--command-list-padding)",
      scrollPaddingBlock: "var(--command-list-padding)",
      "& > *": {
        flexShrink: 0,
      },
    },

    item: {
      position: "relative",
      userSelect: "none",
      display: "flex",
      alignItems: "center",
      gap: "var(--command-item-gap)",
      flexShrink: 0,
      cursor: "option",
      textAlign: "start",
      borderRadius: "l1",
      py: "var(--command-item-padding-y)",
      px: "var(--command-item-padding-x)",
      _highlighted: {
        bg: "bg.emphasized/60",
      },
      _disabled: {
        layerStyle: "disabled",
      },
      _icon: {
        boxSize: "var(--command-indicator-size)",
        flexShrink: 0,
        color: "fg.muted",
      },
    },

    itemText: {
      flex: "1",
      minW: "0",
      truncate: true,
      "& mark": {
        bg: "transparent",
        color: "inherit",
        fontWeight: "semibold",
      },
    },

    itemCommand: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      minW: "5",
      h: "5",
      px: "1",
      ms: "auto",
      borderRadius: "l2",
      borderWidth: "1px",
      bg: "bg.subtle",
      color: "fg.muted",
      fontFamily: "mono",
      textStyle: "xs",
      fontWeight: "medium",
      whiteSpace: "nowrap",
      // Tighten consecutive keys of a chord like `G` `I`
      "& + &": {
        ms: "calc({spacing.1} - var(--command-item-gap))",
      },
    },

    itemGroup: {
      display: "flex",
      flexDirection: "column",
      "& + &": {
        mt: "1.5",
      },
    },

    itemGroupLabel: {
      py: "1.5",
      px: "var(--command-item-padding-x)",
      textStyle: "xs",
      fontWeight: "medium",
      color: "fg.muted",
      userSelect: "none",
    },

    empty: {
      py: "10",
      px: "4",
      textAlign: "center",
      color: "fg.muted",
    },

    loading: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "2",
      py: "10",
      px: "4",
      color: "fg.muted",
    },

    separator: {
      flexShrink: 0,
      borderTopWidth: "1px",
      my: "1.5",
      mx: "calc(var(--command-list-padding) * -1)",
    },

    footer: {
      display: "flex",
      alignItems: "center",
      gap: "4",
      borderTopWidth: "1px",
      bg: "bg.subtle",
      px: "var(--command-control-padding-x)",
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
          "--command-control-padding-x": "spacing.3",
          "--command-input-height": "sizes.10",
          "--command-indicator-size": "sizes.4",
          "--command-list-padding": "spacing.1",
          "--command-item-padding-x": "spacing.2",
          "--command-item-padding-y": "spacing.1.5",
          "--command-item-gap": "spacing.2",
        },
        list: {
          maxH: "72",
        },
        footer: {
          py: "2",
        },
      },
      md: {
        root: {
          "--command-control-padding-x": "spacing.4",
          "--command-input-height": "sizes.12",
          "--command-indicator-size": "sizes.4",
          "--command-list-padding": "spacing.1.5",
          "--command-item-padding-x": "spacing.2.5",
          "--command-item-padding-y": "spacing.2",
          "--command-item-gap": "spacing.2",
        },
        input: {
          textStyle: "sm",
        },
        list: {
          maxH: "96",
        },
      },
      lg: {
        root: {
          "--command-control-padding-x": "spacing.5",
          "--command-input-height": "sizes.14",
          "--command-indicator-size": "sizes.5",
          "--command-list-padding": "spacing.2",
          "--command-item-padding-x": "spacing.3",
          "--command-item-padding-y": "spacing.2.5",
          "--command-item-gap": "spacing.3",
        },
        control: {
          gap: "3",
        },
        input: {
          textStyle: "md",
        },
        list: {
          maxH: "md",
        },
        item: {
          textStyle: "md",
        },
        footer: {
          py: "3",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
})
