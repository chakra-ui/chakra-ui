const mode = (light: string, dark: string) => (props: any) =>
  props.colorMode === "light" ? light : dark

export default {
  root: (props: any) => ({
    color: mode("gray.800", "whiteAlpha.900")(props),
    bg: mode("white", "gray.800")(props),
    "*::placeholder": {
      color: mode("gray.400", "whiteAlpha.400")(props),
    },
    "*, *::before, &::after": {
      borderColor: mode("gray.200", "whiteAlpha.300")(props),
    },
  }),
  body: {
    text: "gray.800",
    background: "white",
    border: "gray.200",
    placeholder: "gray.400",
    __dark: {
      text: "whiteAlpha.900",
      background: "gray.800",
      border: "whiteAlpha.300",
      placeholder: "whiteAlpha.400",
    },
  },
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
