import { mode, Props, StyleObject } from "@chakra-ui/theme-tools"
import Input, { InputTheme } from "./input"

function outline(props: Props): StyleObject {
  return {
    border: "1px solid",
    borderColor: mode("inherit", "whiteAlpha.50")(props),
    bg: mode("gray.100", "whiteAlpha.300")(props),
  }
}

function filled(props: Props): StyleObject {
  return {
    border: "2px solid",
    borderColor: "transparent",
    bg: mode("gray.100", "whiteAlpha.50")(props),
  }
}

const flushed: StyleObject = {
  borderBottom: "2px solid",
  borderColor: "inherit",
  borderRadius: 0,
  paddingX: 0,
  bg: "transparent",
}

const unstyled = {
  bg: "transparent",
  paddingX: 0,
  height: "auto",
}

const sizes: InputTheme["sizes"] = Input.sizes

const InputAddon: InputTheme = {
  sizes,
  variants: {
    outline,
    filled,
    flushed,
    unstyled,
  },
}

export const InputAddonVariants = {
  outline: "outline",
  filled: "filled",
  flushed: "flushed",
  unstyled: "unstyled",
}

export default InputAddon
