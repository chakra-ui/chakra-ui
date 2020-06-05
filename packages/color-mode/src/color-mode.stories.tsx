import * as React from "react"
import { useColorMode } from "."

export default {
  title: "Color Mode",
}

export const BasicExample = () => {
  const [mode] = useColorMode()
  return <code>Color mode is: {mode}</code>
}
