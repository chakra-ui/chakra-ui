import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { DarkMode } from "../src"
import {
  DummyComponent,
  getColorModeButton,
  MemoizedComponent,
  RegularComponent,
  resetCounter,
} from "./color-mode-component.utils"

describe("<DarkMode />", () => {
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

  beforeEach(() => {
    resetCounter()
  })

  test("is always dark", () => {
    render(
      <DarkMode>
        <DummyComponent />
      </DarkMode>,
    )

    const button = screen.getByRole("button")

    expect(button).toHaveTextContent("dark")

    userEvent.click(button)

    expect(getColorModeButton()).toHaveTextContent("dark")
  })

  test("renders a DOM element with data-theme attribute when withSemanticTokens prop is set", async () => {
    const label = "Test Component"
    render(<DarkMode withSemanticTokens>{label}</DarkMode>)
    const element = await screen.findByText(label)
    expect(element).toHaveAttribute("data-theme", "dark")
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
