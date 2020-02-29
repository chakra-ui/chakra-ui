import { createParser } from "../create-parser"

export const shadow = createParser({
  boxShadow: {
    property: "boxShadow",
    scale: "shadows",
  },
  textShadow: {
    property: "textShadow",
    scale: "shadows",
  },
})

export default shadow
