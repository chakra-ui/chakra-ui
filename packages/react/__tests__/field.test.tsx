import { fireEvent, render, screen, testA11y } from "@chakra-ui/test-utils"
import { Field, RequiredIndicator, useField } from "../src/components/field"
import { chakra, forwardRef } from "../src/styled-system"

const Input = forwardRef((props: any, ref) => {
  // @ts-ignore
  const { invalid: _, ...inputProps } = useField<HTMLInputElement>(props)
  return <chakra.input ref={ref} {...inputProps} />
})

test("passes a11y test in default state", async () => {
  await testA11y(
    <Field.Root id="name">
      <Field.Label>Name</Field.Label>
      <Input placeholder="Name" />
      <Field.HelpText>Enter your name please!</Field.HelpText>
      <Field.ErrorMessage>Your name is invalid</Field.ErrorMessage>
    </Field.Root>,
  )
})

test("passes a11y test in when required", async () => {
  await testA11y(
    <Field.Root id="name" isRequired>
      <Field.Label>Name</Field.Label>
      <Input placeholder="Name" />
      <Field.HelpText>Enter your name please!</Field.HelpText>
      <Field.ErrorMessage>Your name is invalid</Field.ErrorMessage>
    </Field.Root>,
  )
})

test("passes a11y test in when invalid", async () => {
  await testA11y(
    <Field.Root id="name" isInvalid>
      <Field.Label>Name</Field.Label>
      <Input placeholder="Name" />
      <Field.HelpText>Enter your name please!</Field.HelpText>
      <Field.ErrorMessage>Your name is invalid</Field.ErrorMessage>
    </Field.Root>,
  )
})

test("only displays error icon and message when invalid", () => {
  const { rerender } = render(
    <Field.Root id="name" isInvalid>
      <Field.Label>Name</Field.Label>
      <RequiredIndicator />
      <Input placeholder="Name" />
      <Field.HelpText>Enter your name please!</Field.HelpText>
      <Field.ErrorMessage data-testid="message">
        <Field.ErrorIcon data-testid="icon" />
        Your name is invalid
      </Field.ErrorMessage>
    </Field.Root>,
  )

  expect(screen.getByTestId("icon")).toBeVisible()
  expect(screen.getByTestId("message")).toBeVisible()

  rerender(
    <Field.Root id="name">
      <Field.Label>Name</Field.Label>
      <RequiredIndicator />
      <Input placeholder="Name" />
      <Field.HelpText>Enter your name please!</Field.HelpText>
      <Field.ErrorMessage data-testid="message">
        <Field.ErrorIcon data-testid="icon" />
        Your name is invalid
      </Field.ErrorMessage>
    </Field.Root>,
  )

  expect(screen.queryByTestId("icon")).not.toBeInTheDocument()
  expect(screen.queryByTestId("message")).not.toBeInTheDocument()
})

test("only displays required indicator when required", () => {
  const { rerender } = render(
    <Field.Root id="name" isRequired>
      <Field.Label>Name</Field.Label>
      <Input placeholder="Name" />
      <Field.HelpText>Enter your name please!</Field.HelpText>
      <Field.ErrorMessage>Your name is invalid</Field.ErrorMessage>
    </Field.Root>,
  )

  const indicator = screen.getByRole("presentation", { hidden: true })

  expect(indicator).toBeVisible()
  expect(indicator).toHaveTextContent("*")

  rerender(
    <Field.Root id="name">
      <Field.Label>Name</Field.Label>
      <Input placeholder="Name" />
      <Field.HelpText>Enter your name please!</Field.HelpText>
      <Field.ErrorMessage>Your name is invalid</Field.ErrorMessage>
    </Field.Root>,
  )

  expect(screen.queryByRole("presentation")).not.toBeInTheDocument()
})

test("should invoke input callbacks", () => {
  const onFocus = vi.fn()
  const onBlur = vi.fn()

  render(
    <Field.Root id="name">
      <Field.Label>Name</Field.Label>
      <Input
        data-testid="input"
        placeholder="Name"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </Field.Root>,
  )
  const input = screen.getByTestId("input")

  fireEvent.focus(input)
  fireEvent.blur(input)
  expect(onFocus).toHaveBeenCalled()
  expect(onBlur).toHaveBeenCalled()
})

test("has the proper aria attributes", async () => {
  render(
    <Field.Root id="name">
      <Field.Label>Name</Field.Label>
      <Input placeholder="Name" />
      <Field.HelpText>Enter your name please!</Field.HelpText>
    </Field.Root>,
  )

  const inputEl = screen.getByRole("textbox")
  expect(inputEl).toHaveAttribute("aria-describedby", "name-helptext")
  expect(inputEl).not.toHaveAttribute("aria-invalid")
  expect(inputEl).not.toHaveAttribute("aria-required")
  expect(inputEl).not.toHaveAttribute("aria-readonly")
})

test("inherit required attribute", async () => {
  render(
    <Field.Root id="name" isRequired>
      <Field.Label>Name</Field.Label>
      <Input placeholder="Name" />
      <Field.HelpText>Enter your name please!</Field.HelpText>
    </Field.Root>,
  )

  const inputEl = screen.getByRole("textbox")
  expect(inputEl).toHaveAttribute("required")
})

test("has the correct role attributes", () => {
  render(
    <Field.Root data-testid="control" id="name" isRequired>
      <Field.Label>Name</Field.Label>
      <Input placeholder="Name" />
    </Field.Root>,
  )
  const control = screen.getByTestId("control")

  expect(screen.getByRole("presentation", { hidden: true })).toBeInTheDocument()
  expect(screen.getByRole("group")).toEqual(control)
})

test("has the correct data attributes", async () => {
  render(
    <Field.Root
      data-testid="control"
      id="name"
      isRequired
      isInvalid
      isDisabled
      isReadOnly
    >
      <Field.Label data-testid="label">Name</Field.Label>
      <RequiredIndicator data-testid="indicator" />
      <Input placeholder="Name" />
      <Field.HelpText data-testid="helper-text">
        Please enter your name!
      </Field.HelpText>
      <Field.ErrorMessage data-testid="error-message">
        Your name is invalid.
      </Field.ErrorMessage>
    </Field.Root>,
  )

  fireEvent.focus(screen.getByPlaceholderText("Name"))

  const control = screen.getByTestId("control")
  expect(control).toHaveAttribute("data-focus")
  expect(control).toHaveAttribute("data-disabled")
  expect(control).toHaveAttribute("data-invalid")
  expect(control).toHaveAttribute("data-readonly")

  const label = screen.getByTestId("label")
  expect(label).toHaveAttribute("data-focus")
  expect(label).toHaveAttribute("data-invalid")
  expect(label).toHaveAttribute("data-readonly")
})

test("can provide a custom aria-describedby reference", () => {
  render(<Input data-testid="input" aria-describedby="reference" />)

  expect(screen.getByRole("textbox")).toHaveAttribute(
    "aria-describedby",
    "reference",
  )
})

test("should respect form control aria-describedby", () => {
  render(
    <Field.Root id="name">
      <Input aria-describedby="name-expanded-helptext" />
      <Field.HelpText>Please enter your name!</Field.HelpText>
      <p id="name-expanded-helptext">
        Sometimes it can be really helpful to enter a name, trust me.
      </p>
    </Field.Root>,
  )

  expect(screen.getByRole("textbox")).toHaveAttribute(
    "aria-describedby",
    "name-expanded-helptext name-helptext",
  )
})

test("it renders the optionalIndicator in Form.Label if it is provided", () => {
  render(
    <Field.Root isRequired={false}>
      <Field.Label optionalIndicator=" (optional)">Test</Field.Label>
      <Input />
    </Field.Root>,
  )

  expect(screen.getByText("Test (optional)")).toBeInTheDocument()
})
