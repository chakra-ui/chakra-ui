import { userEvent, act, render } from "@chakra-ui/test-utils"
import React from "react"
import { LightMode } from "../src"
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

  test("is always light", async () => {
    render(
      <LightMode>
        <DummyComponent />
      </LightMode>,
    )

    const button = getColorModeButton()

    expect(button).toHaveTextContent("light")

    await act(() => userEvent.click(button))

    expect(getColorModeButton()).toHaveTextContent("light")
  })

  test("memoized component renders once", async () => {
    const { getByText, getByTestId } = render(<MemoTest />)

    await act(() => userEvent.click(getByText("Rerender")))
    await act(() => userEvent.click(getByText("Rerender")))
    expect(getByTestId("rendered")).toHaveTextContent("1")
  })

  test("non memoized component renders multiple", async () => {
    const { getByText, getByTestId } = render(<NoMemoTest />)

    await act(() => userEvent.click(getByText("Rerender")))
    await act(() => userEvent.click(getByText("Rerender")))

    expect(getByTestId("rendered")).toHaveTextContent("3")
  })
})
