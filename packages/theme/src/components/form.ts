import { mode } from "@chakra-ui/theme-tools"

type Dict = Record<string, any>

const parts = ["requiredIndicator", "helperText"]

function baseStyleRequiredIndicator(props: Dict) {
  return {
    ml: 1,
    color: mode("red.500", "red.300")(props),
  }
}

function baseStyleHelperText(props: Dict) {
  return {
    mt: 2,
    color: mode("gray.500", "whiteAlpha.600")(props),
    lineHeight: "normal",
    fontSize: "sm",
  }
}

const baseStyle = (props: Dict) => ({
  requiredIndicator: baseStyleRequiredIndicator(props),
  helperText: baseStyleHelperText(props),
})

export default {
  parts,
  baseStyle,
}
