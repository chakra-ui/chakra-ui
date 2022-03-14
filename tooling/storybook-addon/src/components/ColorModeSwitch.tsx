import {
  IconButton,
  IconButtonProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import React from "react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"

export const ColorModeSwitch = (props: Partial<IconButtonProps>) => {
  const { toggleColorMode } = useColorMode()
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon)
  const nextMode = useColorModeValue("dark", "light")

  return (
    <IconButton
      size="md"
      position="absolute"
      fontSize="lg"
      aria-label={`Switch to ${nextMode} mode`}
      variant="ghost"
      color="current"
      _hover={{ opacity: 1 }}
      opacity={0.4}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  )
}
