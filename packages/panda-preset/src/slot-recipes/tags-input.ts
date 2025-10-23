import { defineSlotRecipe } from "../def"

export const tagsInputSlotRecipe = defineSlotRecipe({
  slots: [
    "root",
    "label",
    "control",
    "input",
    "clearTrigger",
    "item",
    "itemPreview",
    "itemInput",
    "itemText",
    "itemDeleteTrigger",
  ],
  className: "tags-input",
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
      width: "full",
    },
    label: {
      fontWeight: "medium",
      textStyle: "sm",
      _disabled: {
        opacity: "0.5",
      },
    },
    control: {
      "--focus-color": "colors.colorPalette.focusRing",
      "--error-color": "colors.border.error",
      minH: "var(--tags-input-height)",
      "--input-height": "var(--tags-input-height)",
      px: "var(--tags-input-px)",
      py: "var(--tags-input-py)",
      gap: "var(--tags-input-gap)",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      borderRadius: "l2",
      pos: "relative",
      transitionProperty: "border-color, box-shadow",
      transitionDuration: "normal",
      _disabled: {
        opacity: "0.5",
      },
      _invalid: {
        borderColor: "var(--error-color)",
      },
    },
    input: {
      flex: "1",
      minWidth: "20",
      outline: "none",
      bg: "transparent",
      color: "fg",
      px: "calc(var(--tags-input-item-px) / 1.25)",
      height: "var(--tags-input-item-height)",
      _readOnly: {
        display: "none",
      },
    },
    itemText: {
      lineClamp: "1",
    },
    itemInput: {
      outline: "none",
      bg: "transparent",
      minWidth: "2ch",
      color: "inherit",
      px: "var(--tags-input-item-px)",
      height: "var(--tags-input-item-height)",
    },
    itemPreview: {
      height: "var(--tags-input-item-height)",
      userSelect: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "1",
      rounded: "l1",
      px: "var(--tags-input-item-px)",
    },
    itemDeleteTrigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSize: "calc(var(--tags-input-item-height) / 1.5)",
      cursor: {
        base: "button",
        _disabled: "initial",
      },
      me: "-1",
      opacity: "0.4",
      _hover: {
        opacity: "1",
      },
      "[data-highlighted] &": {
        opacity: "1",
      },
      _icon: {
        boxSize: "80%",
      },
    },
    clearTrigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSize: "calc(var(--tags-input-item-height) / 1.5)",
      cursor: {
        base: "button",
        _disabled: "initial",
      },
      color: "fg.muted",
      focusVisibleRing: "inside",
      focusRingWidth: "2px",
      rounded: "l1",
      _icon: {
        boxSize: "5",
      },
    },
  },
  variants: {
    size: {
      xs: {
        root: {
          "--tags-input-height": "sizes.8",
          "--tags-input-px": "spacing.1.5",
          "--tags-input-py": "spacing.1",
          "--tags-input-gap": "spacing.1",
          "--tags-input-item-height": "sizes.6",
          "--tags-input-item-px": "spacing.2",
          textStyle: "xs",
        },
      },
      sm: {
        root: {
          "--tags-input-height": "sizes.9",
          "--tags-input-px": "spacing.1.5",
          "--tags-input-py": "spacing.1",
          "--tags-input-gap": "spacing.1",
          "--tags-input-item-height": "sizes.6",
          "--tags-input-item-px": "spacing.2",
          textStyle: "sm",
        },
      },
      md: {
        root: {
          "--tags-input-height": "sizes.10",
          "--tags-input-px": "spacing.1.5",
          "--tags-input-py": "spacing.1",
          "--tags-input-gap": "spacing.1",
          "--tags-input-item-height": "sizes.7",
          "--tags-input-item-px": "spacing.2",
          textStyle: "sm",
        },
      },
      lg: {
        root: {
          "--tags-input-height": "sizes.11",
          "--tags-input-px": "spacing.1.5",
          "--tags-input-py": "spacing.1",
          "--tags-input-gap": "spacing.1",
          "--tags-input-item-height": "sizes.8",
          "--tags-input-item-px": "spacing.2",
          textStyle: "md",
        },
      },
    },
    variant: {
      outline: {
        control: {
          borderWidth: "1px",
          bg: "bg",
          _focus: {
            outlineWidth: "1px",
            outlineStyle: "solid",
            outlineColor: "var(--focus-color)",
            borderColor: "var(--focus-color)",
            _invalid: {
              outlineColor: "var(--error-color)",
              borderColor: "var(--error-color)",
            },
          },
        },
        itemPreview: {
          bg: "colorPalette.subtle",
          _highlighted: {
            bg: "colorPalette.muted",
          },
        },
      },
      subtle: {
        control: {
          bg: "bg.muted",
          borderWidth: "1px",
          borderColor: "transparent",
          _focus: {
            outlineWidth: "1px",
            outlineStyle: "solid",
            outlineColor: "var(--focus-color)",
            borderColor: "var(--focus-color)",
            _invalid: {
              outlineColor: "var(--error-color)",
              borderColor: "var(--error-color)",
            },
          },
        },
        itemPreview: {
          bg: "bg",
          borderWidth: "1px",
          _highlighted: {
            bg: "colorPalette.subtle",
            borderColor: "colorPalette.emphasized",
          },
        },
      },
      flushed: {
        control: {
          borderRadius: "0",
          px: "0",
          bg: "transparent",
          borderBottomWidth: "1px",
          borderBottomColor: "border",
          _focus: {
            borderColor: "var(--focus-color)",
            boxShadow: "0px 1px 0px 0px var(--focus-color)",
          },
        },
        itemPreview: {
          bg: "colorPalette.subtle",
          _highlighted: {
            bg: "colorPalette.muted",
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
