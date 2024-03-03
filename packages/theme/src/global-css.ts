import { defineGlobalStyles } from "@chakra-ui/react"

export const globalCss = defineGlobalStyles({
  body: {
    fontFamily: "body",
    color: "text",
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
