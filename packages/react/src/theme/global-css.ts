import { defineGlobalStyles } from "../styled-system"

export const globalCss = defineGlobalStyles({
  body: {
    fontFamily: "body",
    color: "fg",
    bg: "bg",
    lineHeight: "1.5",
  },
  "*::placeholder": {
    color: "text.placeholder",
  },
  "*, *::before, &::after": {
    borderColor: "border",
  },
})
