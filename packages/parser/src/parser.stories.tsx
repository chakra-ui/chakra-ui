/**@jsx jsx */
import { jsx } from "@emotion/core"
import { createParser } from "./create-parser"

export default {
  title: "Parser",
}

const spaceConfig = {
  padding: {
    property: "padding",
    scale: "space",
  },
  paddingX: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space",
  },
  paddingY: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space",
  },
  marginX: {
    properties: ["marginLeft", "marginRight"],
    scale: "space",
  },
}

const parser = createParser(spaceConfig)

const theme = {
  breakpoints: { mobile: 400, tablet: 700, desktop: 1000 },
  space: [0, 4, 8, 16, 32],
  colors: {
    primary: "rebeccapurple",
    secondary: "tomato",
  },
}

const styles = parser({
  theme,
  marginX: [2, 4],
  paddingY: { all: "12px", mobile: 4, desktop: "90px" },
})

export const Test = () => {
  console.log(styles)
  return <div css={styles}>Testing</div>
}
