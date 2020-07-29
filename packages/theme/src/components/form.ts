import { mode, multiStyleConfig } from "@chakra-ui/theme-tools"

const parts = {
  errorText: "the error message",
  errorIcon: "the error icon",
  requiredIndicator: "the requied asterisks",
  helperText: "the helper text",
}

const baseStyleErrorText = function (props: any) {
  return {
    color: mode("red.500", "red.300")(props),
    mt: 2,
    fontSize: "sm",
  }
}

const baseStyleRequiredIndicator = function (props: any) {
  return {
    ml: 1,
    color: mode("red.500", "red.300")(props),
  }
}

const baseStyleHelperText = function (props: any) {
  return {
    mt: 2,
    color: mode("gray.500", "whiteAlpha.600")(props),
    lineHeight: "normal",
    fontSize: "sm",
  }
}

const baseStyleErrorIcon = function (props: any) {
  return {
    mr: "0.5em",
    color: mode("red.500", "red.300")(props),
  }
}

const baseStyle = (props: any) => ({
  errorText: baseStyleErrorText(props),
  requiredIndicator: baseStyleRequiredIndicator(props),
  helperText: baseStyleHelperText(props),
  errorIcon: baseStyleErrorIcon(props),
})

const form = multiStyleConfig({
  parts,
  baseStyle,
})

export const formStyles = {
  parts,
  baseStyleErrorText,
  baseStyleRequiredIndicator,
  baseStyleHelperText,
  baseStyleErrorIcon,
}

export default form
