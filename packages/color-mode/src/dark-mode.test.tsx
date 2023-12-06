import * as React from "react"
import { render, screen } from "@chakra-ui/test-utils"
import { DarkMode } from "."
import {
  DummyComponent,
  getColorModeButton,
  MemoizedComponent,
  mockMatchMedia,
  RegularComponent,
  resetCounter,
} from "./test.fixture"

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
    mockMatchMedia("light")
  })

  test("is always dark", async () => {
    const { user } = render(
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
    const { user } = render(<MemoTest />)

    await user.click(screen.getByText("Rerender"))
    await user.click(screen.getByText("Rerender"))

    expect(screen.getByTestId("rendered")).toHaveTextContent("1")
  })

  test("non memoized component renders multiple", async () => {
    const { user } = render(<NoMemoTest />)

    await user.click(screen.getByText("Rerender"))
    await user.click(screen.getByText("Rerender"))

    expect(screen.getByTestId("rendered")).toHaveTextContent("3")
  })
})
