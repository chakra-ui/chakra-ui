import { defineLayerStyles } from "../styled-system"

export const layerStyles = defineLayerStyles({
  // fill: some background color + color combination
  "fill.muted": {
    value: {
      background: "colorPalette.muted",
      color: "colorPalette.fg",
    },
  },
  "fill.subtle": {
    value: {
      background: "colorPalette.subtle",
      color: "colorPalette.fg",
    },
  },
  "fill.surface": {
    value: {
      background: "colorPalette.subtle",
      color: "colorPalette.fg",
      boxShadow: "0 0 0px 1px var(--shadow-color)",
      boxShadowColor: "colorPalette.muted",
    },
  },
  "fill.solid": {
    value: {
      background: "colorPalette.solid",
      color: "colorPalette.contrast",
    },
  },

  // outline: some border color + color combination
  "outline.subtle": {
    value: {
      color: "colorPalette.fg",
      boxShadow: "inset 0 0 0px 1px var(--shadow-color)",
      boxShadowColor: "colorPalette.subtle",
    },
  },
  "outline.solid": {
    value: {
      borderWidth: "1px",
      borderColor: "colorPalette.solid",
      color: "colorPalette.fg",
    },
  },

  // indicator: floating border color or left/bottom border
  "indicator.bottom": {
    value: {
      position: "relative",
      "--indicator-color-fallback": "colors.colorPalette.solid",
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
      "--indicator-color-fallback": "colors.colorPalette.solid",
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
      "--indicator-color-fallback": "colors.colorPalette.solid",
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
      "--indicator-color-fallback": "colors.colorPalette.solid",
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

  none: {
    value: {},
  },
})
