import * as React from "react"
import { render, fireEvent, screen, testA11y } from "@chakra-ui/test-utils"
import { FocusLock } from "../src"

test("focuses an element on render", () => {
  const Component = () => {
    return (
      <FocusLock>
        <input data-testid="input" />
        <input />
        <input />
      </FocusLock>
    )
  }
  render(<Component />)
  const input = screen.getByTestId("input")
  expect(input).toHaveFocus()
})

// placeholder test until we figure out how to deal with react-focus-lock
// being
it("passes a11y test", async () => {
  await testA11y(
    <FocusLock>
      <button type="button">button 1</button>
      <button type="button">button 2</button>
      <button type="button">button 3</button>
    </FocusLock>,
    {
      axeOptions: {
        rules: {
          // react-focus-lock is not compliant here or rather,
          // it is a valid use case of tabindex
          tabindex: { enabled: false },
        },
      },
    },
  )
})

test("focuses initialFocusRef on render", () => {
  const Component = () => {
    const ref = React.useRef<HTMLInputElement>(null)
    return (
      <FocusLock initialFocusRef={ref}>
        <input />
        <input />
        <input data-testid="input" ref={ref} />
      </FocusLock>
    )
  }
  render(<Component />)
  const input = screen.getByTestId("input")
  expect(input).toHaveFocus()
})

test("focuses finalFocusRef on unmount", () => {
  const Component = () => {
    const [show, setShow] = React.useState(true)
    const ref = React.useRef<HTMLButtonElement>(null)
    return (
      <div>
        <button ref={ref} data-testid="button" onClick={() => setShow(false)}>
          Click
        </button>
        {show && (
          <FocusLock finalFocusRef={ref}>
            <input />
          </FocusLock>
        )}
      </div>
    )
  }
  render(<Component />)
  const button = screen.getByTestId("button")

  // not focused while focus lock is displayed
  expect(button).not.toHaveFocus()

  // toggle focus lock and check that button is now focused
  fireEvent.click(button)
  expect(button).toHaveFocus()
})
