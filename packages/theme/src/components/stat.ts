import { statAnatomy as parts } from "@chakra-ui/anatomy"
import type {
  PartsStyleObject,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"

const baseStyleLabel: SystemStyleObject = {
  fontWeight: "medium",
}

const baseStyleHelpText: SystemStyleObject = {
  opacity: 0.8,
  marginBottom: 2,
}

const baseStyleNumber: SystemStyleObject = {
  verticalAlign: "baseline",
  fontWeight: "semibold",
}

const baseStyleIcon: SystemStyleObject = {
  marginEnd: 1,
  w: "14px",
  h: "14px",
  verticalAlign: "middle",
}

const baseStyle: PartsStyleObject<typeof parts> = {
  container: {},
  label: baseStyleLabel,
  helpText: baseStyleHelpText,
  number: baseStyleNumber,
  icon: baseStyleIcon,
}

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  md: {
    label: { fontSize: "sm" },
    helpText: { fontSize: "sm" },
    number: { fontSize: "2xl" },
  },
}

const defaultProps = {
  size: "md",
}

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps,
}
