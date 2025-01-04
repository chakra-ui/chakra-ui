import { defineSlotRecipe } from "../def"

export const tagSlotRecipe = defineSlotRecipe({
  slots: ["root", "label", "closeTrigger", "startElement", "endElement"],
  className: "tag",
  base: {
    root: {
      display: "inline-flex",
      alignItems: "center",
      verticalAlign: "top",
      maxWidth: "100%",
      userSelect: "none",
      borderRadius: "l2",
      focusVisibleRing: "outside",
    },
    label: {
      lineClamp: "1",
    },
    closeTrigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "0",
      borderRadius: "l1",
      color: "currentColor",
      focusVisibleRing: "inside",
      focusRingWidth: "2px",
    },
    startElement: {
      flexShrink: 0,
      boxSize: "var(--tag-element-size)",
      ms: "var(--tag-element-offset)",
      "&:has([data-scope=avatar])": {
        boxSize: "var(--tag-avatar-size)",
        ms: "calc(var(--tag-element-offset) * 1.5)",
      },
      _icon: {
        boxSize: "100%",
      },
    },
    endElement: {
      flexShrink: 0,
      boxSize: "var(--tag-element-size)",
      me: "var(--tag-element-offset)",
      _icon: {
        boxSize: "100%",
      },
      "&:has(button)": {
        ms: "calc(var(--tag-element-offset) * -1)",
      },
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          px: "1.5",
          minH: "4.5",
          gap: "1",
          "--tag-avatar-size": "spacing.3",
          "--tag-element-size": "spacing.3",
          "--tag-element-offset": "-2px",
        },
        label: {
          textStyle: "xs",
        },
      },
      md: {
        root: {
          px: "1.5",
          minH: "5",
          gap: "1",
          "--tag-avatar-size": "spacing.3.5",
          "--tag-element-size": "spacing.3.5",
          "--tag-element-offset": "-2px",
        },
        label: {
          textStyle: "xs",
        },
      },
      lg: {
        root: {
          px: "2",
          minH: "6",
          gap: "1.5",
          "--tag-avatar-size": "spacing.4.5",
          "--tag-element-size": "spacing.4",
          "--tag-element-offset": "-3px",
        },
        label: {
          textStyle: "sm",
        },
      },
      xl: {
        root: {
          px: "2.5",
          minH: "8",
          gap: "1.5",
          "--tag-avatar-size": "spacing.6",
          "--tag-element-size": "spacing.4.5",
          "--tag-element-offset": "-4px",
        },
        label: {
          textStyle: "sm",
        },
      },
    },
    variant: {
      subtle: {
        root: {
          bg: "colorPalette.subtle",
          color: "colorPalette.fg",
        },
      },
      solid: {
        root: {
          bg: "colorPalette.solid",
          color: "colorPalette.contrast",
        },
      },
      outline: {
        root: {
          color: "colorPalette.fg",
          shadow: "inset 0 0 0px 1px var(--shadow-color)",
          shadowColor: "colorPalette.muted",
        },
      },
      surface: {
        root: {
          bg: "colorPalette.subtle",
          color: "colorPalette.fg",
          shadow: "inset 0 0 0px 1px var(--shadow-color)",
          shadowColor: "colorPalette.muted",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "surface",
  },
})
