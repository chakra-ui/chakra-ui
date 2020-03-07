import * as React from "react"
import { useColorMode, ColorModeProvider } from "./ColorModeProvider"

export default {
  title: "Color Mode",
  decorators: [
    (StoryFn: any) => (
      <ColorModeProvider>
        <StoryFn />
      </ColorModeProvider>
    ),
  ],
}

export const BasicExample = () => {
  const [mode] = useColorMode()
  return <code>Color mode is: {mode}</code>
}
