import { formErrorAnatomy as parts } from "@chakra-ui/anatomy"
import type {
  PartsStyleFunction,
  SystemStyleFunction,
} from "@chakra-ui/theme-tools"
import { mode } from "@chakra-ui/theme-tools"

const baseStyleText: SystemStyleFunction = (props) => {
  return {
    color: mode("red.500", "red.300")(props),
    mt: 2,
    fontSize: "sm",
  }
}

const baseStyleIcon: SystemStyleFunction = (props) => {
  return {
    marginEnd: "0.5em",
    color: mode("red.500", "red.300")(props),
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  text: baseStyleText(props),
  icon: baseStyleIcon(props),
})

export default {
  parts: parts.keys,
  baseStyle,
}
