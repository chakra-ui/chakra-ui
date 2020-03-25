import { mode, Styles } from "../components/utils"

const styles: Styles = {
  root: props => ({
    fontFamily: "body",
    color: mode("gray.800", "whiteAlpha.900")(props),
    bg: mode("white", "gray.800")(props),
    "*::placeholder": {
      color: mode("gray.400", "whiteAlpha.400")(props),
    },
    "*, *::before, &::after": {
      borderColor: mode("gray.200", "whiteAlpha.300")(props),
    },
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
