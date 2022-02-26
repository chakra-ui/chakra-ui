import * as React from "react"
import { useColorMode } from "@chakra-ui/color-mode"
import { screen } from "@testing-library/react"

let renderCount = 0
export const resetCounter = () => {
  renderCount = 0
}

export const MemoizedComponent = React.memo(() => {
  renderCount = renderCount + 1
  return <div data-testid="rendered">{renderCount}</div>
})

export const RegularComponent = () => {
  renderCount = renderCount + 1
  return <div data-testid="rendered">{renderCount}</div>
}

export const DummyComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <button type="button" onClick={toggleColorMode}>
      {colorMode}
    </button>
  )
}

export const getColorModeButton = () => screen.getByRole("button")
