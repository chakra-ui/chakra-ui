import { defineGlobalStyles } from "../styled-system"

const empty = "var(--chakra-empty,/*!*/ /*!*/)"

export const globalCss = defineGlobalStyles({
  "*": {
    fontFeatureSettings: '"cv11"',
    "--ring-inset": empty,
    "--ring-offset-width": "0px",
    "--ring-offset-color": "#fff",
    "--ring-color": "rgba(66, 153, 225, 0.6)",
    "--ring-offset-shadow": "0 0 #0000",
    "--ring-shadow": "0 0 #0000",
    ...Object.fromEntries(
      [
        "brightness",
        "contrast",
        "grayscale",
        "hue-rotate",
        "invert",
        "saturate",
        "sepia",
        "drop-shadow",
      ].map((prop) => [`--${prop}`, empty]),
    ),
    ...Object.fromEntries(
      [
        "blur",
        "brightness",
        "contrast",
        "grayscale",
        "hue-rotate",
        "invert",
        "opacity",
        "saturate",
        "sepia",
      ].map((prop) => [`--backdrop-${prop}`, empty]),
    ),
  },
  body: {
    fontFamily: "body",
    color: "fg",
    bg: "bg",
    lineHeight: "1.5",
  },
  "*::placeholder": {
    color: "fg.muted",
  },
  "*, *::before, &::after": {
    borderColor: "border",
    wordWrap: "break-word",
  },
})
