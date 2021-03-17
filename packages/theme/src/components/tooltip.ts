import { mode } from "@chakra-ui/theme-tools"
import { getCSSVar } from "@chakra-ui/utils"

function baseStyle(props: Record<string, any>) {
  const bg = mode("gray.700", "gray.300")(props)
  return {
    px: "8px",
    py: "2px",
    bg,
    "--popper-arrow-bg": getCSSVar(props.theme, "colors", bg),
    color: mode("whiteAlpha.900", "gray.900")(props),
    borderRadius: "sm",
    fontWeight: "medium",
    fontSize: "sm",
    boxShadow: "md",
    maxW: "320px",
    zIndex: "tooltip",
  }
}

export default {
  baseStyle,
}
