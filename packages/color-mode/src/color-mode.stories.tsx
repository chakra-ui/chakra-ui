import * as React from "react"
import { useColorMode, ColorModeProvider } from "./ColorModeProvider"
import { storiesOf } from "@storybook/react"

const stories = storiesOf("Color Mode", module)

stories.addDecorator((fn: Function) => (
  <ColorModeProvider>{fn()}</ColorModeProvider>
))

const BasicExample = () => {
  const [mode] = useColorMode()
  return <code>Color mode is: {mode}</code>
}

stories.add("Basic Example", () => <BasicExample />)
