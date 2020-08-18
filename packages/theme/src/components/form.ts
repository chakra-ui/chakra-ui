import { mode } from "@chakra-ui/theme-tools"

type Dict = Record<string, any>

const parts = {
  errorText: "the error message",
  errorIcon: "the error icon",
  requiredIndicator: "the requied asterisks",
  helperText: "the helper text",
}

function baseStyleErrorText(props: Dict) {
  return {
    color: mode("red.500", "red.300")(props),
    mt: 2,
    fontSize: "sm",
  }
}

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

function baseStyleErrorIcon(props: Dict) {
  return {
    mr: "0.5em",
    color: mode("red.500", "red.300")(props),
  }
}

const baseStyle = (props: Dict) => ({
  errorText: baseStyleErrorText(props),
  requiredIndicator: baseStyleRequiredIndicator(props),
  helperText: baseStyleHelperText(props),
  errorIcon: baseStyleErrorIcon(props),
})

export default {
  parts,
  baseStyle,
}
