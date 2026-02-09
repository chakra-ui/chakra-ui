import { datePickerAnatomy } from "../../anatomy"
import { defineSlotRecipe, defineStyle } from "../../styled-system"

// PrevTrigger, NextTrigger
const navTriggerStyle = defineStyle({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  boxSize: "8",
  borderRadius: "l2",
  color: "fg",
  transitionDuration: "normal",
  transitionProperty: "bg, border-color",
  focusVisibleRing: "inside",
  _hover: {
    bg: "colorPalette.subtle",
  },
  _focusVisible: {
    bg: "colorPalette.subtle",
    boxShadow: "0 0 0 2px var(--colors-color-palette-focus-ring)",
  },
  _disabled: {
    opacity: 0.5,
  },
  _icon: {
    width: "4",
    height: "4",
  },
})

// MonthSelect, YearSelect
const selectStyle = defineStyle({
  height: "8",
  px: "2",
  textStyle: "sm",
  bg: "bg.subtle",
  borderWidth: "1px",
  borderRadius: "l1",
  outline: "none",
  _focusVisible: {
    borderColor: "colorPalette.solid",
    boxShadow: "0 0 0 1px var(--colors-color-palette-solid)",
  },
})

export const datePickerSlotRecipe = defineSlotRecipe({
  className: "date-picker",
  slots: datePickerAnatomy.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
      width: "full",
      _disabled: {
        opacity: 0.5,
      },
    },

    label: {
      textStyle: "sm",
      fontWeight: "medium",
    },

    indicatorGroup: {
      position: "absolute",
      insetEnd: "3",
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1",
    },

    control: {
      display: "flex",
      alignItems: "center",
      gap: "2",
      width: "full",
      position: "relative",
    },

    input: {
      flex: "1",
      minWidth: "0",
      height: "var(--datepicker-input-height)",
      "--input-height": "var(--datepicker-input-height)",
      px: "var(--datepicker-input-px)",
      textStyle: "sm",
      bg: "transparent",
      borderWidth: "1px",
      borderRadius: "l2",
      outline: "0",
      appearance: "none",
      color: "fg",
      transitionDuration: "normal",
      transitionProperty: "border-color, box-shadow",
      "--focus-color": "colors.colorPalette.focusRing",
      "--error-color": "colors.border.error",
      _placeholder: {
        color: "fg.muted",
      },
      _focus: {
        borderColor: "var(--focus-color)",
        boxShadow: "0 0 0 1px var(--colors-color-palette-solid)",
      },
      focusVisibleRing: "inside",
      _invalid: {
        borderColor: "var(--error-color)",
        _focus: {
          borderColor: "var(--error-color)",
          boxShadow: "0 0 0 1px var(--colors-fg-error)",
        },
      },
    },

    trigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "6",
      height: "6",
      borderRadius: "l1",
      color: "fg.muted",
      outline: "none",
      _hover: {
        color: "fg",
      },
      focusVisibleRing: "inside",
      focusRingWidth: "2px",
      _icon: {
        boxSize: "4",
      },
    },

    content: {
      display: "flex",
      flexDirection: "column",
      gap: "3",
      p: "3",
      minWidth: "xs",
      bg: "bg.panel",
      borderRadius: "l2",
      boxShadow: "lg",
      color: "fg",
      maxHeight: "var(--available-height)",
      "--date-picker-z-index": "zIndex.popover",
      zIndex: "calc(var(--date-picker-z-index) + var(--layer-index, 0))",
      outline: "none",
      _open: {
        animationStyle: "scale-fade-in",
        animationDuration: "fast",
      },
      _closed: {
        animationStyle: "scale-fade-out",
        animationDuration: "faster",
      },
    },

    view: {
      display: "flex",
      flexDirection: "column",
      gap: "3",
    },

    viewControl: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "2",
      height: "var(--table-cell-size)",
    },

    viewTrigger: {
      display: "inline-flex",
      flex: "1",
      alignItems: "center",
      justifyContent: "center",
      gap: "1",
      py: "1.5",
      px: "2",
      textStyle: "sm",
      fontWeight: "semibold",
      borderRadius: "l2",
      focusVisibleRing: "inside",
      focusRingWidth: "2px",
      _hover: {
        bg: "colorPalette.subtle",
      },
    },

    prevTrigger: navTriggerStyle,
    nextTrigger: navTriggerStyle,

    rangeText: {
      textStyle: "sm",
      fontWeight: "semibold",
    },

    table: {
      borderCollapse: "separate",
      borderSpacing: "0",
      "--table-cell-size": "sizes.10",
    },

    tableHeader: {
      width: "var(--table-cell-size)",
      py: "2",
      textStyle: "xs",
      fontWeight: "medium",
      color: "fg.muted",
      textAlign: "center",
      textTransform: "uppercase",
    },

    tableCellTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "var(--table-cell-size)",
      minHeight: "var(--table-cell-size)",
      width: "full",
      textStyle: "sm",
      borderRadius: "l2",
      focusVisibleRing: "inside",
      focusRingWidth: "2px",
      focusRingOffset: "0px",
      cursor: "default",
      position: "relative",
      _hover: {
        bg: "colorPalette.subtle",
      },
      _today: {
        color: "colorPalette.fg",
        fontWeight: "semibold",
        textDecoration: "underline",
        textUnderlineOffset: "3px",
        textDecorationThickness: "2px",
      },
      _selected: {
        bg: "colorPalette.solid",
        color: "colorPalette.contrast",
        _hover: {
          bg: "colorPalette.solid",
        },
      },
      "&[data-in-range]": {
        bg: "colorPalette.subtle",
        color: "colorPalette.fg",
        borderRadius: "0",
        _hover: {
          bg: "colorPalette.subtle",
        },
      },
      "&[data-range-start]": {
        bg: "colorPalette.solid",
        color: "colorPalette.contrast",
        borderRadius: "0",
        borderStartRadius: "l2",
        _hover: { bg: "colorPalette.solid" },
      },
      "&[data-range-end]": {
        bg: "colorPalette.solid",
        color: "colorPalette.contrast",
        borderRadius: "0",
        borderEndRadius: "l2",
        _hover: { bg: "colorPalette.solid" },
      },
      "&[data-range-start][data-range-end]": {
        borderRadius: "l2",
      },
      _disabled: {
        color: "fg.muted",
        opacity: 0.4,
        cursor: "not-allowed",
        _hover: { bg: "transparent" },
      },
    },

    monthSelect: selectStyle,
    yearSelect: selectStyle,

    clearTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "6",
      height: "6",
      flexShrink: 0,
      textStyle: "xs",
      borderRadius: "l2",
      color: "fg.muted",
      _hover: {
        color: "fg",
      },
      focusVisibleRing: "inside",
      _icon: {
        width: "4",
        height: "4",
      },
    },
  },

  variants: {
    size: {
      xs: {
        root: {
          "--datepicker-input-height": "sizes.8",
          "--datepicker-input-px": "sizes.2",
        },
      },
      sm: {
        root: {
          "--datepicker-input-height": "sizes.9",
          "--datepicker-input-px": "sizes.2.5",
        },
      },
      md: {
        root: {
          "--datepicker-input-height": "sizes.10",
          "--datepicker-input-px": "sizes.3",
        },
      },
      lg: {
        root: {
          "--datepicker-input-height": "sizes.11",
          "--datepicker-input-px": "sizes.4",
        },
      },
      xl: {
        root: {
          "--datepicker-input-height": "sizes.12",
          "--datepicker-input-px": "sizes.4.5",
        },
      },
    },

    variant: {
      outline: {
        input: {
          borderWidth: "1px",
          bg: "transparent",
        },
      },
      subtle: {
        input: {
          borderWidth: "0px",
          bg: "bg.subtle",
          _focus: {
            bg: "bg.muted",
            boxShadow: "0 0 0 1px var(--colors-color-palette-solid)",
          },
        },
      },
      flushed: {
        input: {
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
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
