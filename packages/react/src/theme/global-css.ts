import { defineGlobalStyles } from "../styled-system"

export const globalCss = defineGlobalStyles({
  "*": {
    fontFeatureSettings: '"cv11"',
    "--ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
    "--ring-offset-width": "0px",
    "--ring-offset-color": "#fff",
    "--ring-color": "rgba(66, 153, 225, 0.6)",
    "--ring-offset-shadow": "0 0 #0000",
    "--ring-shadow": "0 0 #0000",
  },
  body: {
    fontFamily: "body",
    color: "fg",
    bg: "bg",
    lineHeight: "1.5",
  },
  "*::placeholder": {
    color: "fg.subtle",
  },
  "*, *::before, &::after": {
    borderColor: "border",
  },
})
