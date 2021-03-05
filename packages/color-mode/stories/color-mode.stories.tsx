import * as React from "react"
import { useColorModeValue } from "../src"

export default {
  title: "Color Mode",
}

export const BasicExample = () => {
  const colorMode = useColorModeValue("Light", "Dark")
  return <code>Color mode is: {colorMode}</code>
}
