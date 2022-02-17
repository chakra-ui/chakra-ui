import { formErrorAnatomy as parts } from "@chakra-ui/anatomy"
import type {
  PartsStyleObject,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import "@chakra-ui/theme-tools"

const baseStyleText: SystemStyleObject = {
  mt: 2,
  fontSize: "sm",
  lineHeight: "normal",

  _light: {
    color: "red.500",
  },

  _dark: {
    color: "red.300",
  },
}

const baseStyleIcon: SystemStyleObject = {
  marginEnd: "0.5em",

  _light: {
    color: "red.500",
  },

  _dark: {
    color: "red.300",
  },
}

const baseStyle: PartsStyleObject<typeof parts> = {
  text: baseStyleText,
  icon: baseStyleIcon,
}

export default {
  parts: parts.keys,
  baseStyle,
}
