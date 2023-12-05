import * as React from "react"
import { render, screen } from "@chakra-ui/test-utils"
import { LightMode } from "."
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
    mockMatchMedia("dark")
    resetCounter()
  })

  test("is always light", async () => {
    const { user } = render(
      <LightMode>
        <DummyComponent />
      </LightMode>,
    )

    const button = getColorModeButton()

    expect(button).toHaveTextContent("light")

    await user.click(button)

    expect(getColorModeButton()).toHaveTextContent("light")
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
