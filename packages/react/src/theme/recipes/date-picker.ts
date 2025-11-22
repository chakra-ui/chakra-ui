import { datePickerAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const datePickerSlotRecipe = defineSlotRecipe({
  className: "date-picker",
  slots: datePickerAnatomy.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
    },
    label: {
      fontWeight: "medium",
      textStyle: "sm",
    },
    control: {
      display: "flex",
      position: "relative",
    },
    input: {
      width: "full",
      minWidth: "0",
      outline: "0",
      position: "relative",
      appearance: "none",
      transitionProperty: "common",
      transitionDuration: "normal",
      _disabled: {
        layerStyle: "disabled",
      },
    },
    trigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      position: "absolute",
      top: "0",
      insetEnd: "0",
      height: "full",
      aspectRatio: "1",
      pointerEvents: "auto",
      _icon: {
        width: "1.2em",
        height: "1.2em",
      },
    },
    clearTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      position: "absolute",
      top: "0",
      insetEnd: "8",
      height: "full",
      aspectRatio: "1",
      pointerEvents: "auto",
      _icon: {
        width: "1.2em",
        height: "1.2em",
      },
    },
    positioner: {
      position: "absolute",
      zIndex: "dropdown",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      background: "bg.panel",
      borderRadius: "l3",
      boxShadow: "lg",
      minWidth: "20rem",
      maxWidth: "calc(100vw - 2rem)",
      maxHeight: "calc(100vh - 2rem)",
      zIndex: "dropdown",
      p: "4",
      gap: "3",
      _open: {
        animation: "fade-in, scale-in",
      },
      _closed: {
        animation: "fade-out, scale-out",
      },
    },
    viewControl: {
      display: "flex",
      gap: "2",
      alignItems: "center",
      justifyContent: "space-between",
    },
    prevTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      _icon: {
        width: "1.2em",
        height: "1.2em",
      },
    },
    nextTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      _icon: {
        width: "1.2em",
        height: "1.2em",
      },
    },
    viewTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "medium",
      textStyle: "sm",
    },
    rangeText: {
      fontWeight: "medium",
      textStyle: "sm",
    },
    table: {
      width: "full",
      borderCollapse: "collapse",
    },
    tableHead: {},
    tableBody: {},
    tableRow: {
      display: "flex",
      gap: "1",
    },
    tableHeader: {
      flex: "1",
      textAlign: "center",
      textStyle: "xs",
      fontWeight: "medium",
      color: "fg.muted",
      height: "8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    tableCell: {
      flex: "1",
      textAlign: "center",
    },
    tableCellTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "full",
      height: "8",
      borderRadius: "l2",
      fontWeight: "normal",
      textStyle: "sm",
      outline: "0",
      _hover: {
        background: "bg.muted",
      },
      _selected: {
        background: "colorPalette.solid",
        color: "colorPalette.contrast",
      },
      _today: {
        _before: {
          content: '""',
          position: "absolute",
          insetInline: "0",
          bottom: "0",
          height: "2px",
          background: "colorPalette.solid",
        },
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
    view: {},
    monthSelect: {
      appearance: "none",
      outline: "0",
    },
    yearSelect: {
      appearance: "none",
      outline: "0",
    },
    presetTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  variants: {
    size: {
      sm: {
        input: {
          textStyle: "sm",
          px: "2.5",
          h: "9",
          minW: "9",
          borderRadius: "l2",
        },
        trigger: {
          textStyle: "sm",
        },
      },
      md: {
        input: {
          textStyle: "sm",
          px: "3",
          h: "10",
          minW: "10",
          borderRadius: "l2",
        },
        trigger: {
          textStyle: "md",
        },
      },
      lg: {
        input: {
          textStyle: "md",
          px: "3.5",
          h: "11",
          minW: "11",
          borderRadius: "l3",
        },
        trigger: {
          textStyle: "md",
        },
      },
      xl: {
        input: {
          textStyle: "md",
          px: "4",
          h: "12",
          minW: "12",
          borderRadius: "l3",
        },
        trigger: {
          textStyle: "lg",
        },
      },
    },
    variant: {
      outline: {
        input: {
          borderWidth: "1px",
          borderColor: "border",
          bg: "bg",
          _focusVisible: {
            borderColor: "colorPalette.focusRing",
            boxShadow: "0 0 0 1px var(--shadow-color)",
            shadowColor: "colorPalette.focusRing",
          },
        },
      },
      filled: {
        input: {
          borderWidth: "1px",
          borderColor: "transparent",
          bg: "bg.muted",
          _focusVisible: {
            bg: "bg",
            borderColor: "colorPalette.focusRing",
            boxShadow: "0 0 0 1px var(--shadow-color)",
            shadowColor: "colorPalette.focusRing",
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
