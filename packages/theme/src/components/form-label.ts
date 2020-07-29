import { styleConfig } from "@chakra-ui/theme-tools"

const baseStyle = {
  fontSize: "md",
  mr: 3,
  mb: 2,
  fontWeight: "medium",
  transition: "all 0.2s",
  opacity: 1,
  _disabled: {
    opacity: 0.4,
  },
}

const label = styleConfig({
  baseStyle,
})

export const formLabelStyles = {
  baseStyle,
}

export default label
