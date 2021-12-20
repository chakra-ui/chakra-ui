import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { DarkMode } from "../src/color-mode-provider"
import {
  DummyComponent,
  getColorModeButton,
  MemoizedComponent,
  RegularComponent,
  resetCounter,
} from "./utils"

const MemoTest = () => {
  const [_, setRenderCount] = React.useState(0)

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
  const [_, setRenderCount] = React.useState(0)

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

  test("is always dark", () => {
    render(
      <DarkMode>
        <DummyComponent />
      </DarkMode>,
    )

    const button = getColorModeButton()

    expect(button).toHaveTextContent("dark")

    userEvent.click(button)

    expect(getColorModeButton()).toHaveTextContent("dark")
  })

  test("memoized component renders once", () => {
    const { getByText, getByTestId } = render(<MemoTest />)

    userEvent.click(getByText("Rerender"))
    userEvent.click(getByText("Rerender"))

    expect(getByTestId("rendered")).toHaveTextContent("1")
  })

  test("non memoized component renders multiple", () => {
    const { getByText, getByTestId } = render(<NoMemoTest />)

    userEvent.click(getByText("Rerender"))
    userEvent.click(getByText("Rerender"))

    expect(getByTestId("rendered")).toHaveTextContent("3")
  })
})
