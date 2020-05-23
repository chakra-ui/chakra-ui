import { mode, Styles } from "../components/utils"

const styles: Styles = {
  global: (props) => ({
    fontFamily: "body",
    color: mode("gray.800", "whiteAlpha.900")(props),
    bg: mode("white", "gray.800")(props),
    lineHeight: "base",
    "*::placeholder": {
      color: mode("gray.400", "whiteAlpha.400")(props),
    },
    "*, *::before, &::after": {
      borderColor: mode("gray.200", "whiteAlpha.300")(props),
    },
    fontFeatureSettings: `"pnum"`,
    fontVariantNumeric: "proportional-nums",
  }),
  h1: {
    fontSize: 40,
    margin: 30,
    color: "green.200",
  },
  h2: {
    fontSize: "2xl",
    margin: 10,
    color: "red.500",
  },
}

export default styles
