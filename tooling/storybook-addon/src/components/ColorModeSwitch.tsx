import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react"
import React from "react"
import { FaMoon, FaSun } from "react-icons/fa"


const ColorModeSwitch = () => {
  const { toggleColorMode } = useColorMode()
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const nextMode = useColorModeValue("dark", "light")

  return (
      <IconButton
        size="md"
        position="absolute"
        top={10}
        right={10}
        fontSize="lg"
        aria-label={`Switch to ${nextMode} mode`}
        variant="ghost"
        color="current"
        _hover={{ opacity: 1 }}
        opacity={0.4}
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
      />
  )
}

export default ColorModeSwitch