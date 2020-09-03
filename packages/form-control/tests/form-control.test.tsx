import { chakra, PropsOf, forwardRef } from "@chakra-ui/system"
import { fireEvent, render, screen, testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import {
  FormControlOptions,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  RequiredIndicator,
  useFormControl,
} from "../src"

type OmittedTypes = "disabled" | "required" | "readOnly"
type InputProps = Omit<PropsOf<typeof chakra.input>, OmittedTypes> &
  FormControlOptions

const Input: React.FC<InputProps> = forwardRef<InputProps, "input">(
  (props, ref) => {
    const inputProps = useFormControl<HTMLInputElement>(props)
    return <chakra.input ref={ref} {...inputProps} />
  },
)

test("renders correctly in default state", () => {
  const { asFragment } = render(
    <FormControl id="name">
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorMessage>Your name is invalid</FormErrorMessage>
    </FormControl>,
  )
  expect(asFragment()).toMatchSnapshot()
})

it("passes a11y test in default state", async () => {
  await testA11y(
    <FormControl id="name">
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorMessage>Your name is invalid</FormErrorMessage>
    </FormControl>,
  )
})

test("renders correctly when required", () => {
  const { asFragment } = render(
    <FormControl id="name" isRequired>
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorMessage>Your name is invalid</FormErrorMessage>
    </FormControl>,
  )
  expect(asFragment()).toMatchSnapshot()
})

it("passes a11y test in when required", async () => {
  await testA11y(
    <FormControl id="name" isRequired>
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorMessage>Your name is invalid</FormErrorMessage>
    </FormControl>,
  )
})

test("renders correctly when invalid", () => {
  const { asFragment } = render(
    <FormControl id="name" isInvalid>
      <FormLabel>Name</FormLabel>
      <RequiredIndicator />
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorIcon />
      <FormErrorMessage>Your name is invalid</FormErrorMessage>
    </FormControl>,
  )
  expect(asFragment()).toMatchSnapshot()
})

it("passes a11y test in when invalid", async () => {
  await testA11y(
    <FormControl id="name" isInvalid>
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorMessage>Your name is invalid</FormErrorMessage>
    </FormControl>,
  )
})

test("useFormControl calls provided input callbacks", () => {
  const onFocus = jest.fn()
  const onBlur = jest.fn()

  render(
    <FormControl id="name">
      <FormLabel>Name</FormLabel>
      <Input
        data-testid="input"
        placeholder="Name"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </FormControl>,
  )
  const input = screen.getByTestId("input")

  fireEvent.focus(input)
  fireEvent.blur(input)
  expect(onFocus).toHaveBeenCalled()
  expect(onBlur).toHaveBeenCalled()
})

test("has the proper aria attributes", async () => {
  const { rerender } = render(
    <FormControl id="name">
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
    </FormControl>,
  )
  let input = screen.getByLabelText(/Name/)

  expect(input).toHaveAttribute("aria-describedby", "name-helptext")
  expect(input).not.toHaveAttribute("aria-invalid")
  expect(input).not.toHaveAttribute("aria-required")
  expect(input).not.toHaveAttribute("aria-readonly")

  rerender(
    <FormControl id="name" isRequired isInvalid isReadOnly>
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorMessage data-testid="error">
        Your name is invalid
      </FormErrorMessage>
    </FormControl>,
  )
  input = screen.getByLabelText(/Name/)
  const indicator = screen.getByRole("presentation", { hidden: true })
  const errorMessage = screen.getByTestId("error")

  expect(input).toHaveAttribute("aria-invalid", "true")
  expect(input).toHaveAttribute("aria-required", "true")
  expect(input).toHaveAttribute("aria-readonly", "true")
  expect(input).toHaveAttribute("aria-describedby", "name-feedback")
  expect(indicator).toHaveAttribute("aria-hidden")
  expect(errorMessage).toHaveAttribute("aria-live", "polite")
})

test("has the correct role attributes", () => {
  render(
    <FormControl data-testid="control" id="name" isRequired>
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
    </FormControl>,
  )
  const control = screen.getByTestId("control")

  expect(screen.getByRole("presentation", { hidden: true })).toBeInTheDocument()
  expect(screen.getByRole("group")).toEqual(control)
})

test("has the correct data attributes", () => {
  render(
    <FormControl
      data-testid="control"
      id="name"
      isRequired
      isInvalid
      isDisabled
      isLoading
      isReadOnly
    >
      <FormLabel data-testid="label">Name</FormLabel>
      <RequiredIndicator data-testid="indicator" />
      <Input placeholder="Name" />
      <FormHelperText data-testid="helper-text">
        Please enter your name!
      </FormHelperText>
      <FormErrorMessage data-testid="error-message">
        Your name is invalid.
      </FormErrorMessage>
    </FormControl>,
  )
  const label = screen.getByTestId("label")

  fireEvent.focus(screen.getByLabelText(/Name/))

  expect(label).toHaveAttribute("data-focus")
  expect(label).toHaveAttribute("data-invalid")

  expect(label).toHaveAttribute("data-loading")
  expect(label).toHaveAttribute("data-readonly")
})
