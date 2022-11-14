import * as React from "react"
import { DarkMode, useColorModeValue } from "../src"
import { Badge } from "@chakra-ui/layout"

export default {
  title: "System / Color Mode",
}

export const BasicExample = () => {
  const colorMode = useColorModeValue("Light", "Dark")
  return <code>Color mode is: {colorMode}</code>
}

export const ColorModeAsExample = () => {
  const colorMode = useColorModeValue("Light", "Dark")
  return (
    <div>
      <Badge colorScheme="green">Light Badge</Badge> Color mode is: {colorMode}{" "}
      <br />
      <DarkMode as="div">
        Dark mode here
        <Badge colorScheme="green">Dark Badge</Badge>
      </DarkMode>
    </div>
  )
}
