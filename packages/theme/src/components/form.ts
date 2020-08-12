import { mode } from "@chakra-ui/theme-tools"

const parts = {
  errorText: "the error message",
  errorIcon: "the error icon",
  requiredIndicator: "the requied asterisks",
  helperText: "the helper text",
}

const baseStyleErrorText = function (props: Record<string, any>) {
  return {
    color: mode("red.500", "red.300")(props),
    mt: 2,
    fontSize: "sm",
  }
}

const baseStyleRequiredIndicator = function (props: Record<string, any>) {
  return {
    ml: 1,
    color: mode("red.500", "red.300")(props),
  }
}

const baseStyleHelperText = function (props: Record<string, any>) {
  return {
    mt: 2,
    color: mode("gray.500", "whiteAlpha.600")(props),
    lineHeight: "normal",
    fontSize: "sm",
  }
}

const baseStyleErrorIcon = function (props: Record<string, any>) {
  return {
    mr: "0.5em",
    color: mode("red.500", "red.300")(props),
  }
}

const baseStyle = (props: Record<string, any>) => ({
  errorText: baseStyleErrorText(props),
  requiredIndicator: baseStyleRequiredIndicator(props),
  helperText: baseStyleHelperText(props),
  errorIcon: baseStyleErrorIcon(props),
})

export const Form = {
  parts,
  baseStyle,
}
