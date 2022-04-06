import * as React from "react"
import { renderInteractive, screen } from "@chakra-ui/test-utils"
import { DarkMode } from "../src"
import {
  DummyComponent,
  getColorModeButton,
  MemoizedComponent,
  RegularComponent,
  resetCounter,
} from "./utils"

const MemoTest = () => {
  const [, setRenderCount] = React.useState(0)

  return (
    <>
      <DarkMode>
        <MemoizedComponent />
      </DarkMode>
      <button onClick={() => setRenderCount((c) => c + 1)}>Rerender</button>
    </>
  )
}

const NoMemoTest = () => {
  const [, setRenderCount] = React.useState(0)

  return (
    <>
      <DarkMode>
        <RegularComponent />
      </DarkMode>
      <button onClick={() => setRenderCount((c) => c + 1)}>Rerender</button>
    </>
  )
}

describe("<DarkMode />", () => {
  beforeEach(() => {
    resetCounter()
  })

  test("is always dark", async () => {
    const { user } = renderInteractive(
      <DarkMode>
        <DummyComponent />
      </DarkMode>,
    )

    const button = getColorModeButton()

    expect(button).toHaveTextContent("dark")

    await user.click(button)

    expect(getColorModeButton()).toHaveTextContent("dark")
  })

  test("memoized component renders once", async () => {
    const { user } = renderInteractive(<MemoTest />)

    await user.click(screen.getByText("Rerender"))
    await user.click(screen.getByText("Rerender"))

    expect(screen.getByTestId("rendered")).toHaveTextContent("1")
  })

  test("non memoized component renders multiple", async () => {
    const { user } = renderInteractive(<NoMemoTest />)

    await user.click(screen.getByText("Rerender"))
    await user.click(screen.getByText("Rerender"))

    expect(screen.getByTestId("rendered")).toHaveTextContent("3")
  })
})
