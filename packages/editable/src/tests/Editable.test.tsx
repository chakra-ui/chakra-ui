import * as React from "react"
import { render, userEvent, fireEvent } from "@chakra-ui/test-utils"
import { Editable, EditableInput, EditablePreview } from ".."

test("should match snapshot", () => {
  const utils = render(
    <Editable defaultValue="testing">
      <EditablePreview data-testid="preview" />
      <EditableInput data-testid="input" />
    </Editable>,
  )

  expect(utils.asFragment()).toMatchSnapshot()
})

test("should render properly", () => {
  const utils = render(
    <Editable defaultValue="testing">
      <EditablePreview data-testid="preview" />
      <EditableInput data-testid="input" />
    </Editable>,
  )

  const preview = utils.getByTestId("preview")
  const input = utils.getByTestId("input")

  expect(input).toHaveAttribute("hidden")
  expect(preview).toHaveTextContent("testing")
})

test("uncontrolled: handles callbacks correctly", async () => {
  const onChange = jest.fn()
  const onCancel = jest.fn()
  const onSubmit = jest.fn()
  const onEdit = jest.fn()

  const utils = render(
    <Editable
      onChange={onChange}
      onCancel={onCancel}
      onSubmit={onSubmit}
      onEdit={onEdit}
      defaultValue="Hello "
    >
      <EditablePreview data-testid="preview" />
      <EditableInput data-testid="input" />
    </Editable>,
  )
  const preview = utils.getByTestId("preview")
  const input = utils.getByTestId("input")

  // calls `onEdit` when preview is focused
  fireEvent.focus(preview)
  expect(onEdit).toHaveBeenCalled()

  // calls `onChange` with input on change
  userEvent.type(input, "World")
  expect(onChange).toHaveBeenCalledWith("Hello World")

  // calls `onCancel` with previous value when "esc" pressed
  fireEvent.keyDown(input, { key: "Escape" })
  expect(onCancel).toHaveBeenCalledWith("Hello ")

  // calls `onSubmit` with previous value when "enter" pressed after cancelling
  fireEvent.keyDown(input, { key: "Enter" })
  expect(onSubmit).toHaveBeenCalledWith("Hello ")

  // returns new value when submitting without cancelling
  userEvent.type(input, "World")
  fireEvent.keyDown(input, { key: "Enter" })
  expect(onSubmit).toHaveBeenCalledWith("Hello World")

  // cancelling now returns new value
  fireEvent.keyDown(input, { key: "Escape" })
  expect(onCancel).toHaveBeenCalledWith("Hello World")
})

test("controlled: handles callbacks correctly", () => {
  const onChange = jest.fn()
  const onCancel = jest.fn()
  const onSubmit = jest.fn()
  const onEdit = jest.fn()

  const utils = render(
    <Editable
      onChange={onChange}
      onCancel={onCancel}
      onSubmit={onSubmit}
      onEdit={onEdit}
      value="Hello "
    >
      <EditablePreview data-testid="preview" />
      <EditableInput data-testid="input" />
    </Editable>,
  )
  const preview = utils.getByTestId("preview")
  const input = utils.getByTestId("input")

  // calls `onEdit` when preview is focused
  fireEvent.focus(preview)
  expect(onEdit).toHaveBeenCalled()

  // calls `onChange` with new input on change
  userEvent.type(input, "World")
  expect(onChange).toHaveBeenCalledWith("Hello World")

  // calls `onSubmit` with `value`
  fireEvent.keyDown(input, { key: "Enter" })
  expect(onSubmit).toHaveBeenCalledWith("Hello ")

  // calls `onCancel` with `value`
  fireEvent.keyDown(input, { key: "Escape" })
  expect(onSubmit).toHaveBeenCalledWith("Hello ")
})

test("handles preview and input callbacks", () => {
  const onFocus = jest.fn()
  const onBlur = jest.fn()
  const onChange = jest.fn()
  const onKeyDown = jest.fn()

  const utils = render(
    <Editable defaultValue="Hello ">
      <EditablePreview onFocus={onFocus} data-testid="preview" />
      <EditableInput
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        data-testid="input"
      />
    </Editable>,
  )
  const preview = utils.getByTestId("preview")
  const input = utils.getByTestId("input")

  // calls `onFocus` when preview is focused
  fireEvent.focus(preview)
  expect(onFocus).toHaveBeenCalled()

  // calls `onChange` when input is changed
  userEvent.type(input, "World")
  expect(onChange).toHaveBeenCalled()

  // calls `onKeyDown` when key is pressed in input
  fireEvent.keyDown(input, { key: "Escape" })
  expect(onKeyDown).toHaveBeenCalled()

  // calls `onBlur` when focus leaves input
  fireEvent.focus(preview)
  expect(onBlur).toHaveBeenCalled()
})

test("has the proper aria attributes", () => {
  const utils = render(
    <Editable defaultValue="">
      <EditablePreview data-testid="preview" />
      <EditableInput data-testid="input" />
    </Editable>,
  )
  const preview = utils.getByTestId("preview")
  const input = utils.getByTestId("input")

  // preview and input do not have aria-disabled when `Editable` is not disabled
  expect(preview).not.toHaveAttribute("aria-disabled")
  expect(input).not.toHaveAttribute("aria-disabled")

  utils.rerender(
    <Editable isDisabled defaultValue="">
      <EditablePreview data-testid="preview" />
      <EditableInput data-testid="input" />
    </Editable>,
  )

  // preview and input have aria-disabled when `Editable` is disabled
  expect(preview).toHaveAttribute("aria-disabled", "true")
  expect(input).toHaveAttribute("aria-disabled", "true")
})

test("can submit on blur", () => {
  const onSubmit = jest.fn()
  const utils = render(
    <Editable submitOnBlur onSubmit={onSubmit} defaultValue="testing">
      <EditablePreview data-testid="preview" />
      <EditableInput data-testid="input" />
    </Editable>,
  )
  const input = utils.getByTestId("input")

  fireEvent.blur(input)
  expect(onSubmit).toHaveBeenCalledWith("testing")
})
