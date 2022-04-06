import * as React from "react"
import { render, screen, userEvent } from "@chakra-ui/test-utils"
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
    render(
      <DarkMode>
        <DummyComponent />
      </DarkMode>,
    )

    const button = getColorModeButton()

    expect(button).toHaveTextContent("dark")

    await userEvent.click(button)

    expect(getColorModeButton()).toHaveTextContent("dark")
  })

  test("memoized component renders once", async () => {
    render(<MemoTest />)

    await userEvent.click(screen.getByText("Rerender"))
    await userEvent.click(screen.getByText("Rerender"))

    expect(screen.getByTestId("rendered")).toHaveTextContent("1")
  })

  test("non memoized component renders multiple", async () => {
    render(<NoMemoTest />)

    await userEvent.click(screen.getByText("Rerender"))
    await userEvent.click(screen.getByText("Rerender"))

    expect(screen.getByTestId("rendered")).toHaveTextContent("3")
  })
})
