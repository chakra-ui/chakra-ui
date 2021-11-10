import * as React from "react"
import { useColorMode } from "../src"

export default {
  title: "Color Mode",
}

export const BasicExample = () => {
  const { colorMode } = useColorMode()
  return <code>Color mode is: {colorMode}</code>
}
