import { formAnatomy as parts } from "@chakra-ui/anatomy"
import type {
  PartsStyleFunction,
  SystemStyleFunction,
} from "@chakra-ui/theme-tools"
import { mode } from "@chakra-ui/theme-tools"

const baseStyleRequiredIndicator: SystemStyleFunction = (props) => {
  return {
    marginStart: 1,
    color: mode("red.500", "red.300")(props),
  }
}

const baseStyleHelperText: SystemStyleFunction = (props) => {
  return {
    mt: 2,
    color: mode("gray.500", "whiteAlpha.600")(props),
    lineHeight: "normal",
    fontSize: "sm",
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  container: { width: "100%", position: "relative" },
  requiredIndicator: baseStyleRequiredIndicator(props),
  helperText: baseStyleHelperText(props),
})

export default {
  parts: parts.keys,
  baseStyle,
}
