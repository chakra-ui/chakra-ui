import { formAnatomy as parts } from "@chakra-ui/anatomy"
import type {
  PartsStyleObject,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import "@chakra-ui/theme-tools"

const baseStyleRequiredIndicator: SystemStyleObject = {
  marginStart: 1,

  _light: {
    color: "red.500",
  },

  _dark: {
    color: "red.300",
  },
}

const baseStyleHelperText: SystemStyleObject = {
  mt: 2,
  lineHeight: "normal",
  fontSize: "sm",

  _light: {
    color: "gray.500",
  },

  _dark: {
    color: "whiteAlpha.600",
  },
}

const baseStyle: PartsStyleObject<typeof parts> = {
  container: { width: "100%", position: "relative" },
  requiredIndicator: baseStyleRequiredIndicator,
  helperText: baseStyleHelperText,
}

export default {
  parts: parts.keys,
  baseStyle,
}
