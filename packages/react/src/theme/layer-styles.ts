import { defineLayerStyles } from "../styled-system"

export const layerStyles = defineLayerStyles({
  // fill: some background color + color combination
  "fill.subtle": {
    value: {
      background: { base: "colorPalette.100", _dark: "colorPalette.400/20" },
      color: { base: "colorPalette.800", _dark: "colorPalette.200" },
    },
  },
  "fill.surface": {
    value: {
      background: { base: "colorPalette.50", _dark: "colorPalette.300/20" },
      color: { base: "colorPalette.800", _dark: "colorPalette.200" },
      boxShadow: "inset 0 0 0px 1px var(--shadow-color)",
      boxShadowColor: {
        base: "colorPalette.300",
        _dark: "colorPalette.200/10",
      },
    },
  },
  "fill.solid": {
    value: {
      background: "colorPalette.600",
      color: "white",
    },
  },

  // outline: some border color + color combination
  "outline.subtle": {
    value: {
      color: { base: "colorPalette.800", _dark: "colorPalette.200" },
      boxShadow: "inset 0 0 0px 1px var(--shadow-color)",
      boxShadowColor: {
        base: "colorPalette.300",
        _dark: "colorPalette.200/10",
      },
    },
  },
  "outline.solid": {
    value: {
      borderWidth: "1px",
      borderColor: "colorPalette.500",
      color: "colorPalette.600",
    },
  },

  // ghost: for menu items, nav links, buttons, etc.
  "ghost.subtle": {
    value: {
      "--interative-color": "colors.bg.muted",
      _hover: {
        background: "var(--interative-color)",
      },
      _highlighted: {
        background: "var(--interative-color)",
      },
      _selected: {
        background: "var(--interative-color)",
      },
    },
  },
  "ghost.solid": {
    value: {
      "--interative-color": "colors.colorPalette.500",
      _hover: {
        background: "var(--interative-color)",
        color: "white",
      },
      _highlighted: {
        background: "var(--interative-color)",
        color: "white",
      },
      _selected: {
        background: "var(--interative-color)",
        color: "white",
      },
    },
  },

  // indicator: floating border color or left/bottom border
  "indicator.bottom": {
    value: {
      position: "relative",
      "--indicator-color-fallback": "colors.colorPalette.500",
      _before: {
        content: `""`,
        position: "absolute",
        bottom: "var(--indicator-offset-y, 0)",
        insetInline: "var(--indicator-offset-x, 0)",
        height: "var(--indicator-thickness, 2px)",
        background: "var(--indicator-color, var(--indicator-color-fallback))",
      },
    },
  },
  "indicator.top": {
    value: {
      position: "relative",
      "--indicator-color-fallback": "colors.colorPalette.500",
      _before: {
        content: `""`,
        position: "absolute",
        top: "var(--indicator-offset-y, 0)",
        insetInline: "var(--indicator-offset-x, 0)",
        height: "var(--indicator-thickness, 2px)",
        background: "var(--indicator-color, var(--indicator-color-fallback))",
      },
    },
  },
  "indicator.start": {
    value: {
      position: "relative",
      "--indicator-color-fallback": "colors.colorPalette.500",
      _before: {
        content: `""`,
        position: "absolute",
        insetInlineStart: "var(--indicator-offset-x, 0)",
        insetBlock: "var(--indicator-offset-y, 0)",
        width: "var(--indicator-thickness, 2px)",
        background: "var(--indicator-color, var(--indicator-color-fallback))",
      },
    },
  },
  "indicator.end": {
    value: {
      position: "relative",
      "--indicator-color-fallback": "colors.colorPalette.500",
      _before: {
        content: `""`,
        position: "absolute",
        insetInlineEnd: "var(--indicator-offset-x, 0)",
        insetBlock: "var(--indicator-offset-y, 0)",
        width: "var(--indicator-thickness, 2px)",
        background: "var(--indicator-color, var(--indicator-color-fallback))",
      },
    },
  },

  disabled: {
    value: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
})
