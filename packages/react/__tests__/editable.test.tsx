import { act, fireEvent, render, screen, testA11y } from "@chakra-ui/test-utils"
import { useEffect, useRef, useState } from "react"
import { Editable } from "../src"

const DemoEditable = (props: Editable.RootProps) => {
  return (
    <Editable.Root defaultValue="testing" {...props}>
      <Editable.Preview data-testid="preview" />
      <Editable.Input data-testid="input" />
    </Editable.Root>
  )
}

const input = () => screen.getByTestId("input")
const preview = () => screen.getByTestId("preview")
const button = () => screen.getByTestId("button")

describe("Editable", () => {
  test("matches snapshot", () => {
    render(<DemoEditable />)
    expect(input()).not.toBeVisible()
    expect(preview()).toHaveTextContent("testing")
  })

  test("passes a11y test", async () => {
    await testA11y(<DemoEditable />)
  })

  test("uncontrolled: handles callbacks correctly", async () => {
    const onChange = vi.fn()
    const onCancel = vi.fn()
    const onSubmit = vi.fn()
    const onEdit = vi.fn()

    const { user } = render(
      <DemoEditable
        onChange={onChange}
        onCancel={onCancel}
        onSubmit={onSubmit}
        onEdit={onEdit}
        defaultValue="Hello "
      />,
    )

    // calls `onEdit` when preview is focused
    await act(() => fireEvent.focus(preview()))
    expect(onEdit).toHaveBeenCalled()

    // calls `onChange` with input on change
    await act(() => user.type(input(), "World"))
    expect(onChange).toHaveBeenCalled()

    // calls `onCancel` with previous value when "esc" pressed
    fireEvent.keyDown(input(), { key: "Escape" })
    expect(onCancel).toHaveBeenCalled()

    fireEvent.focus(preview())

    // calls `onChange` with input on change
    await act(() => user.type(input(), "World"))
    expect(onChange).toHaveBeenCalled()

    // calls `onSubmit` with previous value when "enter" pressed after cancelling
    fireEvent.keyDown(input(), { key: "Enter" })
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
        <DemoEditable
          onChange={(val) => {
            setValue(val)
            onChange(val)
          }}
          onBlur={onBlur}
          onCancel={onCancel}
          onSubmit={onSubmit}
          onEdit={onEdit}
          value={value}
        />
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
    await act(() => user.type(input, "World"))
    expect(onChange).toHaveBeenCalledWith("World")

    // calls `onSubmit` with `value`
    fireEvent.keyDown(input, { key: "Enter" })
    expect(onSubmit).toHaveBeenCalledWith("World")

    expect(input).not.toBeVisible()
    fireEvent.focus(preview)

    // update the input value
    await act(() => user.type(input, "Rasengan"))

    // press `Escape`
    fireEvent.keyDown(input, { key: "Escape" })

    // calls `onSubmit` with previous `value`
    expect(onSubmit).toHaveBeenCalledWith("World")

    // calls `onBlur` with previous value
    expect(onBlur).toHaveBeenCalledWith("World")
  })

  test("can submit on blur", async () => {
    const onSubmit = vi.fn()

    const { user } = render(
      <DemoEditable submitOnBlur onSubmit={onSubmit} defaultValue="testing" />,
    )

    await act(() => user.click(preview()))
    fireEvent.blur(input())
    expect(onSubmit).toHaveBeenCalledWith("testing")
  })

  test("startWithEditView when true focuses on the input ", () => {
    render(<DemoEditable startWithEditView defaultValue="Chakra testing" />)
    expect(input()).toHaveFocus()
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
          <DemoEditable
            value={name}
            startWithEditView={startWithEditView}
            onChange={(value) => setName(value)}
            onSubmit={(value) => setName(value)}
            onCancel={(value) => setName(value)}
            placeholder="Enter your name"
          />
        )
      }

      const { user } = render(<Component />)

      fireEvent.focus(!startWithEditView ? preview() : input())

      if (text) {
        await act(() => user.type(input(), text))
      }

      fireEvent.keyDown(input(), { key: "Escape" })

      expect(preview()).toHaveTextContent("John")
    },
  )

  test("should not be interactive when disabled", async () => {
    const { user } = render(<DemoEditable disabled />)
    await act(() => user.click(preview()))
    expect(input()).not.toBeVisible()
  })

  test("should return focus to button when closed", async () => {
    const Component = () => {
      const ref = useRef(null)
      return (
        <>
          <button type="button" ref={ref} data-testid="button">
            Open
          </button>
          <DemoEditable finalFocusRef={ref} defaultValue="editable" />
        </>
      )
    }

    const { user } = render(<Component />)

    await act(() => user.click(preview()))
    expect(button()).not.toHaveFocus()
    expect(input()).toHaveFocus()

    await act(() => fireEvent.blur(input()))
    expect(button()).toHaveFocus()
  })
})
