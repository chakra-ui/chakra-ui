import { inputSearchAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const rootStyles = defineStyle({
  width: "100%",
  position: "relative",
})

const baseDropdown = defineStyle({
  position: "absolute",
  top: "100%",
  left: "0",
  right: "0",
  zIndex: "1",
  boxShadow: "md",
  borderRadius: "md",
  border: "1px solid",
  borderColor: "gray.200",
  bg: "white",
})

const baseDropdownItem = defineStyle({
  p: "2",
  cursor: "pointer",
  _hover: {
    bg: "gray.100",
  },
})

const baseStyle = definePartsStyle({
  root: rootStyles,
  dropdown: baseDropdown,
  dropdownItem: baseDropdownItem,
})

export const inputSearchTheme = defineMultiStyleConfig({
  baseStyle,
})
