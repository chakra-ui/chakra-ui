import { fireEvent, screen } from "@testing-library/react"
import { forwardRef } from "react"
import {
  ErrorIcon,
  ErrorMessage,
  Field,
  HelpText,
  Label,
  RequiredIndicator,
  chakra,
  useFieldProps,
} from "../src"
import { render, testA11y } from "./core"

const Input = forwardRef<HTMLInputElement, any>(function Input(props, ref) {
  const { invalid: _, ...inputProps } = useFieldProps<HTMLInputElement>(props)
  return <chakra.input ref={ref} {...inputProps} />
})

describe("Field", () => {
  test("passes a11y test in default state", async () => {
    await testA11y(
      <Field id="name">
        <Label>Name</Label>
        <Input placeholder="Name" />
        <HelpText>Enter your name please!</HelpText>
        <ErrorMessage>Your name is invalid</ErrorMessage>
      </Field>,
    )
  })

  test("passes a11y test in when required", async () => {
    await testA11y(
      <Field id="name" required>
        <Label>Name</Label>
        <Input placeholder="Name" />
        <HelpText>Enter your name please!</HelpText>
        <ErrorMessage>Your name is invalid</ErrorMessage>
      </Field>,
    )
  })

  test("passes a11y test in when invalid", async () => {
    await testA11y(
      <Field id="name" invalid>
        <Label>Name</Label>
        <Input placeholder="Name" />
        <HelpText>Enter your name please!</HelpText>
        <ErrorMessage>Your name is invalid</ErrorMessage>
      </Field>,
    )
  })

  test("only displays error icon and message when invalid", () => {
    const { rerender } = render(
      <Field id="name" invalid>
        <Label>Name</Label>
        <RequiredIndicator />
        <Input placeholder="Name" />
        <HelpText>Enter your name please!</HelpText>
        <ErrorMessage data-testid="message">
          <ErrorIcon data-testid="icon" />
          Your name is invalid
        </ErrorMessage>
      </Field>,
    )

    expect(screen.getByTestId("icon")).toBeVisible()
    expect(screen.getByTestId("message")).toBeVisible()

    rerender(
      <Field id="name">
        <Label>Name</Label>
        <RequiredIndicator />
        <Input placeholder="Name" />
        <HelpText>Enter your name please!</HelpText>
        <ErrorMessage data-testid="message">
          <ErrorIcon data-testid="icon" />
          Your name is invalid
        </ErrorMessage>
      </Field>,
    )

    expect(screen.queryByTestId("icon")).not.toBeInTheDocument()
    expect(screen.queryByTestId("message")).not.toBeInTheDocument()
  })

  test("only displays required indicator when required", () => {
    render(
      <Field id="name" required>
        <Label>
          Name <RequiredIndicator data-testid="required" />
        </Label>
        <Input placeholder="Name" />
        <HelpText>Enter your name please!</HelpText>
        <ErrorMessage>Your name is invalid</ErrorMessage>
      </Field>,
    )

    const indicatorEl = screen.getByTestId("required")
    expect(indicatorEl).toBeVisible()
    expect(indicatorEl).toHaveTextContent("*")
  })

  test("should invoke input callbacks", () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()

    render(
      <Field id="name">
        <Label>Name</Label>
        <Input
          data-testid="input"
          placeholder="Name"
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </Field>,
    )
    const input = screen.getByTestId("input")

    fireEvent.focus(input)
    fireEvent.blur(input)
    expect(onFocus).toHaveBeenCalled()
    expect(onBlur).toHaveBeenCalled()
  })

  test("has the proper aria attributes", async () => {
    render(
      <Field id="name">
        <Label>Name</Label>
        <Input placeholder="Name" />
        <HelpText>Enter your name please!</HelpText>
      </Field>,
    )

    const inputEl = screen.getByRole("textbox")
    expect(inputEl).toHaveAttribute("aria-describedby", "name-helptext")
    expect(inputEl).not.toHaveAttribute("aria-invalid")
    expect(inputEl).not.toHaveAttribute("aria-required")
    expect(inputEl).not.toHaveAttribute("aria-readonly")
  })

  test("inherit required attribute", async () => {
    render(
      <Field id="name" required>
        <Label>Name</Label>
        <Input placeholder="Name" />
        <HelpText>Enter your name please!</HelpText>
      </Field>,
    )

    const inputEl = screen.getByRole("textbox")
    expect(inputEl).toHaveAttribute("required")
  })

  test("has the correct data attributes", async () => {
    render(
      <Field data-testid="control" id="name" required invalid disabled readOnly>
        <Label data-testid="label">Name</Label>
        <RequiredIndicator data-testid="indicator" />
        <Input placeholder="Name" />
        <HelpText data-testid="helper-text">Please enter your name!</HelpText>
        <ErrorMessage data-testid="error-message">
          Your name is invalid.
        </ErrorMessage>
      </Field>,
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
      <Field id="name">
        <Input aria-describedby="name-expanded-helptext" />
        <HelpText>Please enter your name!</HelpText>
        <p id="name-expanded-helptext">
          Sometimes it can be really helpful to enter a name, trust me.
        </p>
      </Field>,
    )

    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      "name-expanded-helptext name-helptext",
    )
  })

  test("it renders the optionalIndicator in Label if it is provided", () => {
    render(
      <Field required={false}>
        <Label>
          Test
          <RequiredIndicator fallback=" (optional)" />
        </Label>
        <Input />
      </Field>,
    )

    expect(screen.getByText("(optional)")).toBeInTheDocument()
  })
})
