import {
  fireEvent,
  render,
  screen,
  testA11y,
  waitFor,
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

  const { user } = render(
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
  await user.type(textarea, "World")
  await waitFor(() => {
    expect(onChange).toHaveBeenCalledWith("Hello World")
  })

  // get new line on user press "Enter"
  await user.type(
    textarea,
    `
  textarea`,
  )

  await waitFor(() => {
    expect(onChange).toHaveBeenLastCalledWith(`Hello World
  textarea`)
  })

  // calls `onCancel` with previous value when "esc" pressed
  fireEvent.keyDown(textarea, { key: "Escape" })
  expect(onCancel).toHaveBeenCalledWith("Hello ")

  fireEvent.focus(preview)

  // do not calls `onSubmit` with previous value when "enter" pressed after cancelling
  fireEvent.keyDown(textarea, { key: "Enter" })
  expect(onSubmit).not.toHaveBeenCalled()
})

test("controlled: handles callbacks correctly", async () => {
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

  const { user } = render(<Component />)
  const preview = screen.getByTestId("preview")
  const textarea = screen.getByTestId("textarea")

  // calls `onEdit` when preview is focused
  fireEvent.focus(preview)
  expect(onEdit).toHaveBeenCalled()

  // calls `onChange` with input on change
  await user.type(textarea, "World")
  await waitFor(() => {
    expect(onChange).toHaveBeenCalledWith("Hello World")
  })

  // do not calls `onSubmit`
  fireEvent.keyDown(textarea, { key: "Enter" })
  expect(onSubmit).not.toHaveBeenCalledWith("World")

  expect(textarea).toBeVisible()

  // update the input value with new line
  await user.type(
    textarea,
    `
  textarea`,
  )

  await waitFor(() => {
    expect(onChange).toHaveBeenCalledWith(`Hello World
  textarea`)
  })

  // press `Escape`
  await user.keyboard("[Escape]")

  // calls `onCancel` with previous `value`
  expect(onCancel).toHaveBeenCalledWith(`Hello `)
})

test("handles preview and textarea callbacks", async () => {
  const onFocus = jest.fn()
  const onBlur = jest.fn()
  const onChange = jest.fn()
  const onKeyDown = jest.fn()

  const { user } = render(
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
  await user.type(textarea, "World")
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

test("editable textarea can submit on blur", async () => {
  const onSubmit = jest.fn()

  const { user } = render(
    <Editable submitOnBlur onSubmit={onSubmit} defaultValue="testing">
      <EditablePreview data-testid="preview" />
      <EditableTextarea data-testid="textarea" />
    </Editable>,
  )

  const preview = screen.getByTestId("preview")
  const textarea = screen.getByTestId("textarea")

  await user.click(preview)
  fireEvent.blur(textarea)
  expect(onSubmit).toHaveBeenCalledWith("testing")
})
test.each([
  { startWithEditView: true, text: undefined },
  { startWithEditView: false, text: undefined },
  { startWithEditView: true, text: "Bob" },
  { startWithEditView: false, text: "Bob" },
])(
  "controlled: sets value toPrevValue onCancel, startWithEditView: $startWithEditView",
  async ({ startWithEditView, text }) => {
    const Component = () => {
      const [name, setName] = React.useState("")

      React.useEffect(() => {
        setName("John")
      }, [])

      return (
        <Editable
          value={name}
          startWithEditView={startWithEditView}
          onChange={(value) => {
            setName(value)
          }}
          onSubmit={(value) => {
            setName(value)
          }}
          onCancel={(value) => {
            setName(value)
          }}
          placeholder="Enter your name"
        >
          <EditablePreview data-testid="preview" />
          <EditableTextarea data-testid="input" />
        </Editable>
      )
    }

    const { user } = render(<Component />)
    const input = screen.getByTestId("input")
    const preview = screen.getByTestId("preview")
    if (!startWithEditView) {
      fireEvent.focus(preview)
    } else {
      fireEvent.focus(input)
    }
    if (text) {
      await user.type(input, text)
    }
    fireEvent.keyDown(input, { key: "Escape" })

    expect(preview).toHaveTextContent("John")
  },
)
