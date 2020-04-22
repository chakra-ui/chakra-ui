import * as React from "react"
import { render, fireEvent } from "@chakra-ui/test-utils"
import { FocusLock } from ".."

test("focuses an element on render", () => {
  const Component = () => {
    return (
      <FocusLock>
        <input data-testid="input" />
        <input />
        <input />>
      </FocusLock>
    )
  }
  const utils = render(<Component />)
  const input = utils.getByTestId("input")
  expect(input).toHaveFocus()
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
  const utils = render(<Component />)
  const input = utils.getByTestId("input")
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
  const utils = render(<Component />)
  const button = utils.getByTestId("button")

  // not focused while focus lock is displayed
  expect(button).not.toHaveFocus()

  // toggle focus lock and check that button is now focused
  fireEvent.click(button)
  expect(button).toHaveFocus()
})
