import { defineLayerStyles } from "../styled-system"

export const layerStyles = defineLayerStyles({
  // fill: some background color + color combination
  "fill.muted": {
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
        base: "colorPalette.200",
        _dark: "colorPalette.200/20",
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
  "outline.muted": {
    value: {
      color: { base: "colorPalette.800", _dark: "colorPalette.200" },
      boxShadow: "inset 0 0 0px 1px var(--shadow-color)",
      boxShadowColor: {
        base: "colorPalette.200",
        _dark: "colorPalette.200/20",
      },
    },
  },
  "outline.solid": {
    value: {
      borderWidth: "1px",
      borderColor: "colorPalette.600",
      color: { base: "colorPalette.800", _dark: "colorPalette.400" },
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
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
})
