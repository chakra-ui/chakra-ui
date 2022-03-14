import { ChakraTheme } from "@chakra-ui/react"

export interface ChakraOptions {
  theme: ChakraTheme
  colorModeSwitch: ColorModeSwitchOptions
}

export interface ColorModeSwitchOptions {
  enable: boolean
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  zIndex: number
  margin: number
}
