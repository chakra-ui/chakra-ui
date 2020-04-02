import { ComponentTheme } from "./utils"
import { SystemProps } from "@chakra-ui/system"

const sharedProps: SystemProps = {
  fontSize: "inherit",
  fontWeight: "inherit",
  textAlign: "inherit",
  bg: "transparent",
  transition: "all 0.2s",
  borderRadius: "md",
  paddingX: "3px",
  marginX: "-3px",
}

const Editable: ComponentTheme = {
  baseStyle: {
    Preview: {
      ...sharedProps,
      cursor: "text",
      display: "inline-block",
    },
    Input: {
      ...sharedProps,
      outline: 0,
      width: "full",
      _focus: {
        boxShadow: "outline",
      },
      _placeholder: {
        opacity: 0.6,
      },
    },
  },
}

export default Editable
