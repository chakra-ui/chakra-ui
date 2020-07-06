import { SystemStyleObject } from "@chakra-ui/system"
import { BaseStyle } from "@chakra-ui/theme-tools"

const register = {
  parts: ["container", "preview", "input"],
} as const

const previewStyle: SystemStyleObject = {
  borderRadius: "md",
  paddingY: "3px",
  transition: "all 0.2s",
}

const baseStyle: BaseStyle<typeof register> = {
  container: {},
  preview: previewStyle,
  input: {
    ...previewStyle,
    width: "full",
    _focus: { boxShadow: "outline" },
    _placeholder: { opacity: 0.6 },
  },
}

const editable = {
  register,
  baseStyle,
}

export default editable
