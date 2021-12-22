import { selectAnatomy as parts } from "@chakra-ui/anatomy"
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import { mergeWith } from "@chakra-ui/utils"
import { mode } from "@chakra-ui/theme-tools"
import Input from "./input"

const baseStyleField: SystemStyleFunction = (props) => {
  return {
    ...Input.baseStyle.field,
    bg: mode("white", "gray.700")(props),
    appearance: "none",
    paddingBottom: "1px",
    lineHeight: "normal",
    "> option, > optgroup": {
      bg: mode("white", "gray.700")(props),
    },
  }
}

const baseStyleIcon: SystemStyleObject = {
  width: "1.5rem",
  height: "100%",
  insetEnd: "0.5rem",
  position: "relative",
  color: "currentColor",
  fontSize: "1.25rem",
  _disabled: {
    opacity: 0.5,
  },
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  field: baseStyleField(props),
  icon: baseStyleIcon,
})

const iconSpacing = { paddingInlineEnd: "2rem" }

const sizes: Record<string, PartsStyleObject<typeof parts>> = mergeWith(
  {},
  Input.sizes,
  {
    lg: {
      field: iconSpacing,
    },
    md: {
      field: iconSpacing,
    },
    sm: {
      field: iconSpacing,
    },
    xs: {
      field: iconSpacing,
      icon: { insetEnd: "0.25rem" },
    },
  },
)

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  variants: Input.variants,
  defaultProps: Input.defaultProps,
}
