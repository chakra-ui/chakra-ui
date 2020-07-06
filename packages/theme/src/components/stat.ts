import { BaseStyle, DefaultProps, Sizes } from "@chakra-ui/theme-tools"

const register = {
  parts: ["label", "helpText", "number", "container", "icon"],
  sizes: ["sm", "md", "lg"],
} as const

const baseStyle: BaseStyle<typeof register> = {
  container: {
    flex: "1",
    paddingRight: 4,
  },
  label: {
    fontWeight: "medium",
  },
  helpText: {
    opacity: 0.8,
    marginBottom: 2,
  },
  number: {
    verticalAlign: "baseline",
    fontWeight: "semibold",
  },
  icon: {
    marginRight: 1,
    width: "14px",
    height: "14px",
    verticalAlign: "middle",
  },
}

const sizes: Sizes<typeof register> = {
  md: {
    label: { fontSize: "sm" },
    helpText: { fontSize: "sm" },
    number: { fontSize: "2xl" },
  },
}

const defaultProps: DefaultProps<typeof register> = {
  size: "md",
}

const stat = {
  defaultProps,
  baseStyle,
  sizes,
}

export default stat
