import React from "react"
import {
  useColorMode,
  ColorModeProvider,
  DarkMode,
  LightMode,
  useColorModeValue,
} from "../src"

export default {
  title: "Color Mode",
}

const ChildComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <code>Color mode is: {colorMode}</code>
      <hr />
      <button type="button" onClick={toggleColorMode}>
        change
      </button>
    </>
  )
}

export const BasicExample = () => {
  return (
    <ColorModeProvider>
      <ChildComponent />
    </ColorModeProvider>
  )
}

export const DarkModeOnly = () => {
  return (
    <DarkMode>
      <ChildComponent />
    </DarkMode>
  )
}

export const LightModeOnly = () => {
  return (
    <LightMode>
      <ChildComponent />
    </LightMode>
  )
}

export const UseColorModeValue = () => {
  const ChildComponent = () => {
    const { toggleColorMode } = useColorMode()

    const value = useColorModeValue("its day", "its night")

    return (
      <>
        <code>theme based value is: {value}</code>
        <hr />
        <button type="button" onClick={toggleColorMode}>
          change
        </button>
      </>
    )
  }

  return (
    <ColorModeProvider>
      <ChildComponent />
    </ColorModeProvider>
  )
}
