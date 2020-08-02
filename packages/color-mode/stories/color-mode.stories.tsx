import * as React from "react"
import { useColorMode } from "../src"

export default {
  title: "Color Mode",
}

export const BasicExample = () => {
  const { colorMode: mode } = useColorMode()
  return <code>Color mode is: {mode}</code>
}
