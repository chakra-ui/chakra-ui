import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { LightMode } from "../src/color-mode-provider"
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
      <LightMode>
        <MemoizedComponent />
      </LightMode>
      <button onClick={() => setRenderCount((c) => c + 1)}>Rerender</button>
    </>
  )
}

const NoMemoTest = () => {
  const [_, setRenderCount] = React.useState(0)

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
