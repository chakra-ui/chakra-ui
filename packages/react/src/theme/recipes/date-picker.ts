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
      width: "full",
      // maxWidth: "24rem",
    },
    label: {
      textStyle: "sm",
      fontWeight: "medium",
      color: "fg",
      userSelect: "none",
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
      px: "var(--datepicker-input-px)",
      textStyle: "sm",
      background: "transparent",
      borderWidth: "1px",
      borderColor: "border",
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
      _disabled: {
        opacity: 0.5,
        filter: "grayscale(100%)",
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
      _disabled: {
        opacity: 0.5,
        filter: "grayscale(100%)",
      },
      _icon: {
        width: "4",
        height: "4",
      },
    },
    content: {
      display: "flex",
      flexDirection: "column",
      gap: "3",
      p: "4",
      minWidth: "17.5rem",
      background: "bg.panel",
      borderWidth: "1px",
      borderColor: "border",
      borderRadius: "l3",
      boxShadow: "md",
      zIndex: "dropdown",
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
      _hidden: {
        display: "none",
      },
    },
    viewControl: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "2",
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
      background: "transparent",
      borderRadius: "l1",
      color: "fg",
      transition: "background 0.15s ease",
      _hover: {
        background: "bg.subtle",
      },
      _focusVisible: {
        background: "bg.subtle",
        outline: "2px solid var(--colors-color-palette-focus-ring)",
      },
    },
    prevTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "8",
      height: "8",
      borderRadius: "l2",
      color: "fg",
      transitionDuration: "normal",
      transitionProperty: "background, border-color",
      _hover: {
        background: "bg.subtle",
      },
      _focusVisible: {
        background: "bg.subtle",
        boxShadow: "0 0 0 2px var(--colors-color-palette-focus-ring)",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      _icon: {
        width: "4",
        height: "4",
      },
    },
    nextTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "8",
      height: "8",
      borderRadius: "l2",
      color: "fg",
      transitionDuration: "normal",
      transitionProperty: "background, border-color",
      _hover: {
        background: "bg.subtle",
      },
      _focusVisible: {
        background: "bg.subtle",
        boxShadow: "0 0 0 2px var(--colors-color-palette-focus-ring)",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      _icon: {
        width: "4",
        height: "4",
      },
    },
    rangeText: {
      textStyle: "sm",
      fontWeight: "semibold",
      color: "fg",
    },
    table: {
      width: "full",
      borderCollapse: "separate",
      borderSpacing: "0",
    },
    tableHeader: {
      py: "2",
      px: "1.5",
      textStyle: "xs",
      fontWeight: "medium",
      color: "fg.muted",
      textAlign: "center",
      textTransform: "uppercase",
      letterSpacing: "wider",
    },
    tableCell: {
      p: "0",
      textAlign: "center",
    },
    tableCellTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "8",
      height: "8",
      textStyle: "sm",
      background: "transparent",
      borderRadius: "l2",
      color: "fg",
      userSelect: "none",
      _hover: {
        background: "bg.subtle",
      },
      _focusVisible: {
        outline: "2px solid var(--colors-color-palette-solid)",
        outlineOffset: "-2px",
        zIndex: "1",
      },
      _today: {
        fontWeight: "semibold",
        color: "colorPalette.fg",
      },
      _selected: {
        background: "colorPalette.solid",
        color: "colorPalette.contrast",
        margin: "2px",
        fontWeight: "medium",
        _hover: {
          background: "colorPalette.solid",
        },
      },
      "&[data-in-range]": {
        background: "colorPalette.subtle",
        color: "colorPalette.fg",
        borderRadius: "0",
        _hover: { background: "colorPalette.subtle" },
      },
      "&[data-range-start]": {
        background: "colorPalette.solid",
        color: "colorPalette.contrast",
        borderRadius: "0",
        borderStartRadius: "l2",
        _hover: { background: "colorPalette.solid" },
      },
      "&[data-range-end]": {
        background: "colorPalette.solid",
        color: "colorPalette.contrast",
        borderRadius: "0",
        borderEndRadius: "l2",
        _hover: { background: "colorPalette.solid" },
      },
      "&[data-range-start][data-range-end]": {
        borderRadius: "l2",
      },
      _disabled: {
        color: "fg.muted",
        opacity: 0.4,
        cursor: "not-allowed",
        _hover: { background: "transparent" },
      },
    },
    monthSelect: {
      height: "8",
      px: "2",
      textStyle: "sm",
      background: "bg.subtle",
      borderWidth: "1px",
      borderColor: "border",
      borderRadius: "l1",
      outline: "none",
      _focusVisible: {
        borderColor: "colorPalette.solid",
        boxShadow: "0 0 0 1px var(--colors-color-palette-solid)",
      },
    },
    yearSelect: {
      height: "8",
      px: "2",
      textStyle: "sm",
      background: "bg.subtle",
      borderWidth: "1px",
      borderColor: "border",
      borderRadius: "l1",
      outline: "none",
      _focusVisible: {
        borderColor: "colorPalette.solid",
        boxShadow: "0 0 0 1px var(--colors-color-palette-solid)",
      },
    },
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
    indicatorGroup: {
      position: "absolute",
      right: "0.5rem",
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5",
      height: "fit-content",
      pointerEvents: "auto",
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
          borderColor: "border",
          background: "transparent",
        },
      },
      subtle: {
        input: {
          borderWidth: "0px",
          borderColor: "transparent",
          background: "bg.subtle",
          _focus: {
            background: "bg.muted",
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
