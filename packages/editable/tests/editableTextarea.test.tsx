import {
  fireEvent,
  render,
  screen,
  testA11y,
  userEvent,
} from "@chakra-ui/test-utils"
import * as React from "react"
import { Editable, EditablePreview, EditableTextarea } from "../src"

test("matches snapshot", () => {
  render(
    <Editable defaultValue="testing">
      <EditableTextarea data-testid="textarea" />
    </Editable>,
  )

  const textarea = screen.getByTestId("textarea")

  expect(textarea).toHaveAttribute("hidden")
})

it("passes a11y test", async () => {
  await testA11y(
    <Editable defaultValue="testing">
      <EditableTextarea data-testid="textarea" />
    </Editable>,
  )
})

test("uncontrolled: handles callbacks correctly", async () => {
  const onChange = jest.fn()
  const onCancel = jest.fn()
  const onSubmit = jest.fn()
  const onEdit = jest.fn()

  render(
    <Editable
      onChange={onChange}
      onCancel={onCancel}
      onSubmit={onSubmit}
      onEdit={onEdit}
      defaultValue="Hello "
    >
      <EditablePreview data-testid="preview" />
      <EditableTextarea data-testid="textarea" />
    </Editable>,
  )
  const preview = screen.getByTestId("preview")
  const textarea = screen.getByTestId("textarea")

  // calls `onEdit` when preview is focused
  fireEvent.focus(preview)
  expect(onEdit).toHaveBeenCalled()

  // calls `onChange` with input on change
  userEvent.type(textarea, "World")
  expect(onChange).toHaveBeenCalledWith("Hello World")

  // get new line on user press "Enter"
  userEvent.type(
    textarea,
    `
  textarea`,
  )
  expect(onChange).toHaveBeenLastCalledWith(`Hello World
  textarea`)

  // calls `onCancel` with previous value when "esc" pressed
  fireEvent.keyDown(textarea, { key: "Escape" })
  expect(onCancel).toHaveBeenCalledWith("Hello ")

  fireEvent.focus(preview)

  // do not calls `onSubmit` with previous value when "enter" pressed after cancelling
  fireEvent.keyDown(textarea, { key: "Enter" })
  expect(onSubmit).not.toHaveBeenCalled()
})

test("controlled: handles callbacks correctly", () => {
  const onChange = jest.fn()
  const onCancel = jest.fn()
  const onSubmit = jest.fn()
  const onEdit = jest.fn()

  const Component = () => {
    const [value, setValue] = React.useState("Hello ")
    return (
      <Editable
        onChange={(val) => {
          setValue(val)
          onChange(val)
        }}
        onCancel={onCancel}
        onSubmit={onSubmit}
        onEdit={onEdit}
        value={value}
      >
        <EditablePreview data-testid="preview" />
        <EditableTextarea data-testid="textarea" />
      </Editable>
    )
  }

  render(<Component />)
  const preview = screen.getByTestId("preview")
  const textarea = screen.getByTestId("textarea")

  // calls `onEdit` when preview is focused
  fireEvent.focus(preview)
  expect(onEdit).toHaveBeenCalled()

  // calls `onChange` with input on change
  userEvent.type(textarea, "World")
  expect(onChange).toHaveBeenCalledWith("Hello World")

  // do not calls `onSubmit`
  fireEvent.keyDown(textarea, { key: "Enter" })
  expect(onSubmit).not.toHaveBeenCalledWith("World")

  expect(textarea).toBeVisible()

  // update the input value with new line
  userEvent.type(
    textarea,
    `
  textarea`,
  )
  expect(onChange).toHaveBeenCalledWith(`Hello World
  textarea`)

  // press `Escape`
  fireEvent.keyDown(textarea, { key: "Escape" })

  // calls `onCancel` with previous `value`
  expect(onCancel).toHaveBeenCalledWith(`Hello `)
})

test("handles preview and textarea callbacks", () => {
  const onFocus = jest.fn()
  const onBlur = jest.fn()
  const onChange = jest.fn()
  const onKeyDown = jest.fn()

  render(
    <Editable defaultValue="Hello ">
      <EditablePreview onFocus={onFocus} data-testid="preview" />
      <EditableTextarea
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        data-testid="textarea"
      />
    </Editable>,
  )
  const preview = screen.getByTestId("preview")
  const textarea = screen.getByTestId("textarea")

  // calls `onFocus` when preview is focused
  fireEvent.focus(preview)
  expect(onFocus).toHaveBeenCalled()

  // calls `onChange` when input is changed
  userEvent.type(textarea, "World")
  expect(onChange).toHaveBeenCalled()

  // calls `onKeyDown` when key is pressed in input
  fireEvent.keyDown(textarea, { key: "Escape" })
  expect(onKeyDown).toHaveBeenCalled()

  expect(textarea).not.toBeVisible()
})

test("has the proper aria attributes", () => {
  const { rerender } = render(
    <Editable defaultValue="">
      <EditableTextarea data-testid="textarea" />
    </Editable>,
  )
  let textarea = screen.getByTestId("textarea")

  // preview and input do not have aria-disabled when `Editable` is not disabled
  expect(textarea).not.toHaveAttribute("aria-disabled")

  rerender(
    <Editable isDisabled defaultValue="">
      <EditableTextarea data-testid="textarea" />
    </Editable>,
  )

  textarea = screen.getByTestId("textarea")

  // preview and input have aria-disabled when `Editable` is disabled
  expect(textarea).toHaveAttribute("aria-disabled", "true")
})

test("editable textarea can submit on blur", () => {
  const onSubmit = jest.fn()

  render(
    <Editable submitOnBlur onSubmit={onSubmit} defaultValue="testing">
      <EditablePreview data-testid="preview" />
      <EditableTextarea data-testid="textarea" />
    </Editable>,
  )

  const textarea = screen.getByTestId("textarea")

  fireEvent.blur(textarea)
  expect(onSubmit).toHaveBeenCalledWith("testing")
})
