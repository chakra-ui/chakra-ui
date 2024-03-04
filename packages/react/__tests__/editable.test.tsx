import {
  fireEvent,
  render,
  screen,
  testA11y,
  waitFor,
} from "@chakra-ui/test-utils"
import { useEffect, useRef, useState } from "react"
import { Editable } from "../src/components/editable"

describe("editable", () => {
  test("matches snapshot", () => {
    render(
      <Editable.Root defaultValue="testing">
        <Editable.Preview data-testid="preview" />
        <Editable.Input data-testid="input" />
      </Editable.Root>,
    )

    const preview = screen.getByTestId("preview")
    const input = screen.getByTestId("input")

    expect(input).toHaveAttribute("hidden")
    expect(preview).toHaveTextContent("testing")
  })

  test("passes a11y test", async () => {
    await testA11y(
      <Editable.Root defaultValue="testing">
        <Editable.Preview data-testid="preview" />
        <Editable.Input data-testid="input" />
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
        <Editable.Input data-testid="input" />
      </Editable.Root>,
    )
    const preview = screen.getByTestId("preview")
    const input = screen.getByTestId("input")

    // calls `onEdit` when preview is focused
    fireEvent.focus(preview)
    expect(onEdit).toHaveBeenCalled()

    // calls `onChange` with input on change
    await user.type(input, "World")
    await waitFor(() => expect(onChange).toHaveBeenCalled())

    // calls `onCancel` with previous value when "esc" pressed
    fireEvent.keyDown(input, { key: "Escape" })
    expect(onCancel).toHaveBeenCalled()

    fireEvent.focus(preview)

    // calls `onChange` with input on change
    await user.type(input, "World")
    expect(onChange).toHaveBeenCalled()

    // calls `onSubmit` with previous value when "enter" pressed after cancelling
    fireEvent.keyDown(input, { key: "Enter" })
    expect(onSubmit).toHaveBeenCalled()
  })

  test("controlled: handles callbacks correctly", async () => {
    const onChange = vi.fn()
    const onCancel = vi.fn()
    const onSubmit = vi.fn()
    const onEdit = vi.fn()
    const onBlur = vi.fn()

    const Component = () => {
      const [value, setValue] = useState("")
      return (
        <Editable.Root
          onChange={(val) => {
            setValue(val)
            onChange(val)
          }}
          onBlur={onBlur}
          onCancel={onCancel}
          onSubmit={onSubmit}
          onEdit={onEdit}
          value={value}
        >
          <Editable.Preview data-testid="preview" />
          <Editable.Input data-testid="input" />
        </Editable.Root>
      )
    }

    const { user } = render(<Component />)
    const preview = screen.getByTestId("preview")
    const input = screen.getByTestId("input")

    // calls `onEdit` when preview is focused
    fireEvent.focus(preview)
    expect(onEdit).toHaveBeenCalled()

    // calls `onChange` with new input on change
    // since we called `focus(..)` first, editable will focus and select the text
    // typing will clear the values in input and add the next text.
    await user.type(input, "World")
    await waitFor(() => expect(onChange).toHaveBeenCalledWith("World"))

    // calls `onSubmit` with `value`
    fireEvent.keyDown(input, { key: "Enter" })
    expect(onSubmit).toHaveBeenCalledWith("World")

    expect(input).not.toBeVisible()
    fireEvent.focus(preview)

    // update the input value
    await user.type(input, "Rasengan")

    // press `Escape`
    fireEvent.keyDown(input, { key: "Escape" })

    // calls `onSubmit` with previous `value`
    expect(onSubmit).toHaveBeenCalledWith("World")

    // calls `onBlur` with previous value
    expect(onBlur).toHaveBeenCalledWith("World")
  })

  test("handles preview and input callbacks", async () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const onChange = vi.fn()
    const onKeyDown = vi.fn()

    const { user } = render(
      <Editable.Root defaultValue="Hello ">
        <Editable.Preview onFocus={onFocus} data-testid="preview" />
        <Editable.Input
          onBlur={onBlur}
          onChange={onChange}
          onKeyDown={onKeyDown}
          data-testid="input"
        />
      </Editable.Root>,
    )
    const preview = screen.getByTestId("preview")
    const input = screen.getByTestId("input")

    // calls `onFocus` when preview is focused
    fireEvent.focus(preview)
    expect(onFocus).toHaveBeenCalled()

    // calls `onChange` when input is changed
    await user.type(input, "World")
    await waitFor(() => expect(onChange).toHaveBeenCalled())

    // calls `onKeyDown` when key is pressed in input
    fireEvent.keyDown(input, { key: "Escape" })
    expect(onKeyDown).toHaveBeenCalled()

    expect(input).not.toBeVisible()
  })

  test("has the proper aria attributes", () => {
    const { rerender } = render(
      <Editable.Root defaultValue="">
        <Editable.Preview data-testid="preview" />
        <Editable.Input data-testid="input" />
      </Editable.Root>,
    )
    let preview = screen.getByTestId("preview")
    let input = screen.getByTestId("input")

    // preview and input do not have aria-disabled when `Editable` is not disabled
    expect(preview).not.toHaveAttribute("aria-disabled")
    expect(input).not.toHaveAttribute("aria-disabled")

    rerender(
      <Editable.Root isDisabled defaultValue="">
        <Editable.Preview data-testid="preview" />
        <Editable.Input data-testid="input" />
      </Editable.Root>,
    )

    preview = screen.getByTestId("preview")
    input = screen.getByTestId("input")

    // preview and input have aria-disabled when `Editable` is disabled
    expect(preview).toHaveAttribute("aria-disabled", "true")
    expect(input).toHaveAttribute("aria-disabled", "true")
  })

  test("can submit on blur", async () => {
    const onSubmit = vi.fn()

    const { user } = render(
      <Editable.Root submitOnBlur onSubmit={onSubmit} defaultValue="testing">
        <Editable.Preview data-testid="preview" />
        <Editable.Input data-testid="input" />
      </Editable.Root>,
    )

    const preview = screen.getByTestId("preview")
    const input = screen.getByTestId("input")

    await user.click(preview)
    fireEvent.blur(input)
    expect(onSubmit).toHaveBeenCalledWith("testing")
  })

  test("startWithEditView when true focuses on the input ", () => {
    render(
      <Editable.Root startWithEditView defaultValue="Chakra testing">
        <Editable.Preview />
        <Editable.Input data-testid="input" />
      </Editable.Root>,
    )

    const input = screen.getByTestId("input")

    expect(document.activeElement === input).toBe(true)
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
            <Editable.Input data-testid="input" />
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

  test("should not be interactive when disabled", async () => {
    const { user } = render(
      <Editable.Root defaultValue="editable" isDisabled>
        <Editable.Preview data-testid="preview" />
        <Editable.Input data-testid="input" />
      </Editable.Root>,
    )

    await user.click(screen.getByText(/editable/))
    expect(screen.getByTestId("input")).not.toBeVisible()
  })

  test("should return focus to button when closed", async () => {
    const Component = () => {
      const buttonRef = useRef(null)
      return (
        <>
          <button type="button" ref={buttonRef} data-testid="button">
            Open
          </button>
          <Editable.Root finalFocusRef={buttonRef} defaultValue="editable">
            <Editable.Preview data-testid="preview" />
            <Editable.Input data-testid="input" />
          </Editable.Root>
          ,
        </>
      )
    }

    const screen = render(<Component />)

    const preview = screen.getByTestId("preview")
    const input = screen.getByTestId("input")
    const button = screen.getByTestId("button")

    await screen.user.click(preview)

    // make sure button isn't focused at the start
    expect(button).not.toHaveFocus()
    expect(input).toHaveFocus()

    // blur the input
    fireEvent.blur(input)

    // wait for button to be focused
    await waitFor(() => expect(button).toHaveFocus())
  })
})
