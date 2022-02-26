import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { LightMode } from "../src"
import {
  DummyComponent,
  getColorModeButton,
  MemoizedComponent,
  RegularComponent,
  resetCounter,
} from "./color-mode-component.utils"

const MemoTest = () => {
  const [, setRenderCount] = React.useState(0)

  return (
    <>
      <LightMode>
        <MemoizedComponent />
      </LightMode>
      <button onClick={() => setRenderCount((c) => c + 1)}>Rerender</button>
    </>
  )
}

const NoMemoTest = () => {
  const [, setRenderCount] = React.useState(0)

  return (
    <>
      <LightMode>
        <RegularComponent />
      </LightMode>
      <button onClick={() => setRenderCount((c) => c + 1)}>Rerender</button>
    </>
  )
}

describe("<LightMode />", () => {
  beforeEach(() => {
    resetCounter()
  })

  test("is always light", () => {
    render(
      <LightMode>
        <DummyComponent />
      </LightMode>,
    )

    const button = getColorModeButton()

    expect(button).toHaveTextContent("light")

    userEvent.click(button)

    expect(getColorModeButton()).toHaveTextContent("light")
  })

  test("renders a DOM element with data-theme attribute when withSemanticTokens prop is set", async () => {
    const label = "Test Component"
    render(<LightMode withSemanticTokens>{label}</LightMode>)
    const element = await screen.findByText(label)
    expect(element).toHaveAttribute("data-theme", "light")
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
