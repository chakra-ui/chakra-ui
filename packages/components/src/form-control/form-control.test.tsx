import { fireEvent, render, screen, testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import { Form, FormControlOptions, RequiredIndicator, useFormControl } from "."
import { chakra, forwardRef, PropsOf } from "../system"
import { splitFormControlProps } from "./form-control-props"

type OmittedTypes = "disabled" | "required" | "readOnly"

type InputProps = Omit<PropsOf<typeof chakra.input>, OmittedTypes> &
  FormControlOptions

const Input: React.FC<InputProps> = forwardRef<InputProps, "input">(
  (props, ref) => {
    const [controlProps, restProps] = splitFormControlProps(props)
    const inputProps = useFormControl<HTMLInputElement>(controlProps)
    return <chakra.input ref={ref} {...inputProps} {...restProps} />
  },
)

test("passes a11y test in default state", async () => {
  await testA11y(
    <Form.Control id="name">
      <Form.Label>Name</Form.Label>
      <Input placeholder="Name" />
      <Form.HelperText>Enter your name please!</Form.HelperText>
      <Form.ErrorMessage>Your name is invalid</Form.ErrorMessage>
    </Form.Control>,
  )
})

test("passes a11y test in when required", async () => {
  await testA11y(
    <Form.Control id="name" isRequired>
      <Form.Label>Name</Form.Label>
      <Input placeholder="Name" />
      <Form.HelperText>Enter your name please!</Form.HelperText>
      <Form.ErrorMessage>Your name is invalid</Form.ErrorMessage>
    </Form.Control>,
  )
})

test("passes a11y test in when invalid", async () => {
  await testA11y(
    <Form.Control id="name" isInvalid>
      <Form.Label>Name</Form.Label>
      <Input placeholder="Name" />
      <Form.HelperText>Enter your name please!</Form.HelperText>
      <Form.ErrorMessage>Your name is invalid</Form.ErrorMessage>
    </Form.Control>,
  )
})

test("only displays error icon and message when invalid", () => {
  const { rerender } = render(
    <Form.Control id="name" isInvalid>
      <Form.Label>Name</Form.Label>
      <RequiredIndicator />
      <Input placeholder="Name" />
      <Form.HelperText>Enter your name please!</Form.HelperText>
      <Form.ErrorMessage data-testid="message">
        <Form.ErrorIcon data-testid="icon" />
        Your name is invalid
      </Form.ErrorMessage>
    </Form.Control>,
  )

  expect(screen.getByTestId("icon")).toBeVisible()
  expect(screen.getByTestId("message")).toBeVisible()

  rerender(
    <Form.Control id="name">
      <Form.Label>Name</Form.Label>
      <RequiredIndicator />
      <Input placeholder="Name" />
      <Form.HelperText>Enter your name please!</Form.HelperText>
      <Form.ErrorMessage data-testid="message">
        <Form.ErrorIcon data-testid="icon" />
        Your name is invalid
      </Form.ErrorMessage>
    </Form.Control>,
  )

  expect(screen.queryByTestId("icon")).not.toBeInTheDocument()
  expect(screen.queryByTestId("message")).not.toBeInTheDocument()
})

test("only displays required indicator when required", () => {
  const { rerender } = render(
    <Form.Control id="name" isRequired>
      <Form.Label>Name</Form.Label>
      <Input placeholder="Name" />
      <Form.HelperText>Enter your name please!</Form.HelperText>
      <Form.ErrorMessage>Your name is invalid</Form.ErrorMessage>
    </Form.Control>,
  )

  const indicator = screen.getByRole("presentation", { hidden: true })

  expect(indicator).toBeVisible()
  expect(indicator).toHaveTextContent("*")

  rerender(
    <Form.Control id="name">
      <Form.Label>Name</Form.Label>
      <Input placeholder="Name" />
      <Form.HelperText>Enter your name please!</Form.HelperText>
      <Form.ErrorMessage>Your name is invalid</Form.ErrorMessage>
    </Form.Control>,
  )

  expect(screen.queryByRole("presentation")).not.toBeInTheDocument()
})

test("useForm.Control calls provided input callbacks", () => {
  const onFocus = vi.fn()
  const onBlur = vi.fn()

  render(
    <Form.Control id="name">
      <Form.Label>Name</Form.Label>
      <Input
        data-testid="input"
        placeholder="Name"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </Form.Control>,
  )
  const input = screen.getByTestId("input")

  fireEvent.focus(input)
  fireEvent.blur(input)
  expect(onFocus).toHaveBeenCalled()
  expect(onBlur).toHaveBeenCalled()
})

test("has the proper aria attributes", async () => {
  const { rerender } = render(
    <Form.Control id="name">
      <Form.Label>Name</Form.Label>
      <Input placeholder="Name" />
      <Form.HelperText>Enter your name please!</Form.HelperText>
    </Form.Control>,
  )
  let input = screen.getByLabelText(/Name/)

  expect(input).toHaveAttribute("aria-describedby", "name-helptext")
  expect(input).not.toHaveAttribute("aria-invalid")
  expect(input).not.toHaveAttribute("aria-required")
  expect(input).not.toHaveAttribute("aria-readonly")

  rerender(
    <Form.Control id="name" isRequired isInvalid isReadOnly>
      <Form.Label>Name</Form.Label>
      <Input placeholder="Name" />
      <Form.HelperText>Enter your name please!</Form.HelperText>
      <Form.ErrorMessage data-testid="error">
        Your name is invalid
      </Form.ErrorMessage>
    </Form.Control>,
  )
  input = screen.getByLabelText(/Name/)
  const indicator = screen.getByRole("presentation", { hidden: true })
  const errorMessage = screen.getByTestId("error")

  expect(input).toHaveAttribute("aria-invalid", "true")
  expect(input).toHaveAttribute("aria-required", "true")
  expect(input).toHaveAttribute("aria-readonly", "true")
  expect(input).toHaveAttribute(
    "aria-describedby",
    "name-feedback name-helptext",
  )
  expect(indicator).toHaveAttribute("aria-hidden")
  expect(errorMessage).toHaveAttribute("aria-live", "polite")
})

test("has the correct role attributes", () => {
  render(
    <Form.Control data-testid="control" id="name" isRequired>
      <Form.Label>Name</Form.Label>
      <Input placeholder="Name" />
    </Form.Control>,
  )
  const control = screen.getByTestId("control")

  expect(screen.getByRole("presentation", { hidden: true })).toBeInTheDocument()
  expect(screen.getByRole("group")).toEqual(control)
})

test("has the correct data attributes", async () => {
  render(
    <Form.Control
      data-testid="control"
      id="name"
      isRequired
      isInvalid
      isDisabled
      isReadOnly
    >
      <Form.Label data-testid="label">Name</Form.Label>
      <RequiredIndicator data-testid="indicator" />
      <Input placeholder="Name" />
      <Form.HelperText data-testid="helper-text">
        Please enter your name!
      </Form.HelperText>
      <Form.ErrorMessage data-testid="error-message">
        Your name is invalid.
      </Form.ErrorMessage>
    </Form.Control>,
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
  const screen = render(
    <Input data-testid="input" aria-describedby="reference" />,
  )

  screen.debug()

  expect(screen.getByRole("textbox")).toHaveAttribute(
    "aria-describedby",
    "reference",
  )
})

test("should respect form control aria-describedby", () => {
  const screen = render(
    <Form.Control id="name">
      <Input aria-describedby="name-expanded-helptext" />
      <Form.HelperText>Please enter your name!</Form.HelperText>
      <p id="name-expanded-helptext">
        Sometimes it can be really helpful to enter a name, trust me.
      </p>
    </Form.Control>,
  )

  screen.debug()

  expect(screen.getByRole("textbox")).toHaveAttribute(
    "aria-describedby",
    "name-expanded-helptext name-helptext",
  )
})

test("it renders the optionalIndicator in Form.Label if it is provided", () => {
  render(
    <Form.Control isRequired={false}>
      <Form.Label optionalIndicator=" (optional)">Test</Form.Label>
      <Input />
    </Form.Control>,
  )

  expect(screen.getByText("Test (optional)")).toBeInTheDocument()
})
