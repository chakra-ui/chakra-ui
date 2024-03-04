import {
  fireEvent,
  render,
  screen,
  testA11y,
  waitFor,
} from "@chakra-ui/test-utils"
import { useEffect, useState } from "react"
import { Editable } from "../src/components/editable"

describe("editable-textares", () => {
  test("matches snapshot", () => {
    render(
      <Editable.Root defaultValue="testing">
        <Editable.Textarea data-testid="textarea" />
      </Editable.Root>,
    )

    const textarea = screen.getByTestId("textarea")

    expect(textarea).toHaveAttribute("hidden")
  })

  test("passes a11y test", async () => {
    await testA11y(
      <Editable.Root defaultValue="testing">
        <Editable.Textarea data-testid="textarea" />
      </Editable.Root>,
    )
  })

  test("uncontrolled: handles callbacks correctly", async () => {
    const onChange = vi.fn()
    const onCancel = vi.fn()
    const onSubmit = vi.fn()
    const onEdit = vi.fn()

    const { user } = render(
      <Editable.Root
        onChange={onChange}
        onCancel={onCancel}
        onSubmit={onSubmit}
        onEdit={onEdit}
        defaultValue="Hello "
      >
        <Editable.Preview data-testid="preview" />
        <Editable.Textarea data-testid="textarea" />
      </Editable.Root>,
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
    const onChange = vi.fn()
    const onCancel = vi.fn()
    const onSubmit = vi.fn()
    const onEdit = vi.fn()

    const Component = () => {
      const [value, setValue] = useState("Hello ")
      return (
        <Editable.Root
          onChange={(val) => {
            setValue(val)
            onChange(val)
          }}
          onCancel={onCancel}
          onSubmit={onSubmit}
          onEdit={onEdit}
          value={value}
        >
          <Editable.Preview data-testid="preview" />
          <Editable.Textarea data-testid="textarea" />
        </Editable.Root>
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
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const onChange = vi.fn()
    const onKeyDown = vi.fn()

    const { user } = render(
      <Editable.Root defaultValue="Hello ">
        <Editable.Preview onFocus={onFocus} data-testid="preview" />
        <Editable.Textarea
          onBlur={onBlur}
          onChange={onChange}
          onKeyDown={onKeyDown}
          data-testid="textarea"
        />
      </Editable.Root>,
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
      <Editable.Root defaultValue="">
        <Editable.Textarea data-testid="textarea" />
      </Editable.Root>,
    )
    let textarea = screen.getByTestId("textarea")

    // preview and input do not have aria-disabled when `Editable` is not disabled
    expect(textarea).not.toHaveAttribute("aria-disabled")

    rerender(
      <Editable.Root isDisabled defaultValue="">
        <Editable.Textarea data-testid="textarea" />
      </Editable.Root>,
    )

    textarea = screen.getByTestId("textarea")

    // preview and input have aria-disabled when `Editable` is disabled
    expect(textarea).toHaveAttribute("aria-disabled", "true")
  })

  test("editable textarea can submit on blur", async () => {
    const onSubmit = vi.fn()

    const { user } = render(
      <Editable.Root submitOnBlur onSubmit={onSubmit} defaultValue="testing">
        <Editable.Preview data-testid="preview" />
        <Editable.Textarea data-testid="textarea" />
      </Editable.Root>,
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
        const [name, setName] = useState("")

        useEffect(() => {
          setName("John")
        }, [])

        return (
          <Editable.Root
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
            <Editable.Preview data-testid="preview" />
            <Editable.Textarea data-testid="input" />
          </Editable.Root>
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
})
