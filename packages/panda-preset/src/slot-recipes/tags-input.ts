import { defineSlotRecipe } from "../def"

export const tagsInputSlotRecipe = defineSlotRecipe({
  slots: [
    "root",
    "control",
    "input",
    "item",
    "itemText",
    "itemDeleteTrigger",
    "itemInput",
    "itemPreview",
    "label",
    "clearTrigger",
  ],
  className: "tags-input",
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
    },
    label: {
      fontWeight: "medium",
      color: "fg",
      _disabled: {
        opacity: "0.5",
      },
    },
    control: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "1.5",
      px: "3",
      py: "2",
      borderRadius: "l2",
      borderWidth: "1px",
      borderColor: "border",
      bg: "bg",
      transitionProperty: "border-color, box-shadow",
      transitionDuration: "normal",
      _focusWithin: {
        borderColor: "colorPalette.solid",
        boxShadow: "0 0 0 1px var(--colors-color-palette-solid)",
      },
      _disabled: {
        opacity: "0.5",
        cursor: "not-allowed",
      },
      _invalid: {
        borderColor: "border.error",
        _focusWithin: {
          borderColor: "border.error",
          boxShadow: "0 0 0 1px var(--colors-border-error)",
        },
      },
    },
    input: {
      flex: "1",
      minWidth: "20",
      outline: "none",
      bg: "transparent",
      color: "fg",
      placeholder: "fg.muted",
      _disabled: {
        cursor: "not-allowed",
      },
    },
    item: {
      display: "inline-flex",
      alignItems: "center",
      gap: "1",
      px: "2",
      py: "0.5",
      borderRadius: "l1",
      bg: "colorPalette.subtle",
      color: "colorPalette.fg",
      fontSize: "sm",
      maxWidth: "full",
      _disabled: {
        opacity: "0.5",
      },
      _highlighted: {
        bg: "colorPalette.muted",
      },
    },
    itemText: {
      userSelect: "none",
      lineClamp: "1",
    },
    itemInput: {
      outline: "none",
      bg: "transparent",
      minWidth: "2ch",
      color: "inherit",
    },
    itemPreview: {
      userSelect: "none",
      lineClamp: "1",
      display: "inline-flex",
      alignItems: "center",
      gap: "1",
      maxWidth: "full",
    },
    itemDeleteTrigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "4",
      height: "4",
      borderRadius: "l1",
      color: "fg.muted",
      cursor: "pointer",
      flexShrink: "0",
      _hover: {
        bg: "bg.muted",
        color: "fg",
      },
      _disabled: {
        opacity: "0.5",
        cursor: "not-allowed",
      },
    },
    clearTrigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "fg.muted",
      cursor: "pointer",
      flexShrink: "0",
      _hover: {
        color: "fg",
      },
      _disabled: {
        opacity: "0.5",
        cursor: "not-allowed",
      },
    },
  },
  variants: {
    size: {
      sm: {
        control: {
          minHeight: "8",
          px: "2.5",
          py: "1.5",
          gap: "1",
        },
        input: {
          fontSize: "sm",
        },
        label: {
          fontSize: "sm",
        },
        item: {
          px: "1.5",
          py: "0.5",
          fontSize: "xs",
        },
        itemDeleteTrigger: {
          width: "3",
          height: "3",
        },
      },
      md: {
        control: {
          minHeight: "10",
          px: "3",
          py: "2",
          gap: "1.5",
        },
        input: {
          fontSize: "sm",
        },
        label: {
          fontSize: "sm",
        },
        item: {
          px: "2",
          py: "0.5",
          fontSize: "sm",
        },
        itemDeleteTrigger: {
          width: "4",
          height: "4",
        },
      },
      lg: {
        control: {
          minHeight: "12",
          px: "4",
          py: "2.5",
          gap: "2",
        },
        input: {
          fontSize: "md",
        },
        label: {
          fontSize: "md",
        },
        item: {
          px: "2.5",
          py: "1",
          fontSize: "sm",
        },
        itemDeleteTrigger: {
          width: "5",
          height: "5",
        },
      },
    },
    variant: {
      outline: {
        control: {
          borderColor: "border",
          bg: "bg",
        },
      },
      filled: {
        control: {
          borderColor: "transparent",
          bg: "bg.muted",
        },
      },
      flushed: {
        control: {
          borderColor: "transparent",
          borderBottomColor: "border",
          borderRadius: "0",
          px: "0",
          bg: "transparent",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
