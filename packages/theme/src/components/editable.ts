import { styleConfig } from "@chakra-ui/theme-tools"

const editable = styleConfig({
  parts: {
    preview: "the editable text preview",
    input: "the editable input field",
  },
  baseStyle: {
    preview: {
      borderRadius: "md",
      py: "3px",
      transition: "all 0.2s",
    },
    input: {
      borderRadius: "md",
      py: "3px",
      transition: "all 0.2s",
      width: "full",
      _focus: { boxShadow: "outline" },
      _placeholder: { opacity: 0.6 },
    },
  },
})

export default editable
