import { chakra, PropsOf } from "@chakra-ui/system"
import { fireEvent, render } from "@chakra-ui/test-utils"
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
} from ".."

type OmittedTypes = "disabled" | "required" | "readOnly"
type InputProps = Omit<PropsOf<typeof StyledInput>, OmittedTypes> &
  FormControlOptions

// Create an input that consumes useFormControl
type InputOptions = { focusBorderColor?: string; errorBorderColor?: string }
const StyledInput = chakra<"input", InputOptions>("input", {
  themeKey: "Input",
})

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const inputProps = useFormControl<HTMLInputElement>(props)
  return <StyledInput ref={ref} {...inputProps} />
})

test("FormControl renders correctly in default state", () => {
  const tools = render(
    <FormControl id="name">
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorMessage>Your name is invalid</FormErrorMessage>
    </FormControl>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("FormControl renders correctly when required", () => {
  const tools = render(
    <FormControl id="name" isRequired>
      <FormLabel>Name</FormLabel>
      <RequiredIndicator />
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorMessage>Your name is invalid</FormErrorMessage>
    </FormControl>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("FormControl renders correctly when invalid", () => {
  const tools = render(
    <FormControl id="name" isInvalid>
      <FormLabel>Name</FormLabel>
      <RequiredIndicator />
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorIcon />
      <FormErrorMessage>Your name is invalid</FormErrorMessage>
    </FormControl>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("useFormControl calls provided input callbacks", () => {
  const onFocus = jest.fn()
  const onBlur = jest.fn()

  const utils = render(
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
  const input = utils.getByTestId("input")

  fireEvent.focus(input)
  fireEvent.blur(input)
  expect(onFocus).toHaveBeenCalled()
  expect(onBlur).toHaveBeenCalled()
})

test("has the proper aria attributes", async () => {
  const utils = render(
    <FormControl id="name">
      <FormLabel>Name</FormLabel>
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
    </FormControl>,
  )
  let input = utils.getByLabelText("Name")

  expect(input).toHaveAttribute("aria-describedby", "name-helptext")
  expect(input).not.toHaveAttribute("aria-invalid")
  expect(input).not.toHaveAttribute("aria-required")
  expect(input).not.toHaveAttribute("aria-readonly")

  utils.rerender(
    <FormControl id="name" isRequired isInvalid isReadOnly>
      <FormLabel>Name</FormLabel>
      <RequiredIndicator data-testid="indicator" />
      <Input placeholder="Name" />
      <FormHelperText>Enter your name please!</FormHelperText>
      <FormErrorMessage data-testid="error">
        Your name is invalid
      </FormErrorMessage>
    </FormControl>,
  )
  input = utils.getByLabelText("Name")
  const indicator = utils.getByTestId("indicator")
  const errorMessage = utils.getByTestId("error")

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
  const utils = render(
    <FormControl data-testid="control" id="name" isRequired>
      <FormLabel>Name</FormLabel>
      <RequiredIndicator data-testid="indicator" />
      <Input placeholder="Name" />
    </FormControl>,
  )
  const control = utils.getByTestId("control")
  const indicator = utils.getByTestId("indicator")

  expect(utils.getByRole("presentation", { hidden: true })).toEqual(indicator)
  expect(utils.getByRole("group")).toEqual(control)
})

test("has the correct data attributes", () => {
  const utils = render(
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
  const label = utils.getByTestId("label")

  fireEvent.focus(utils.getByLabelText("Name"))

  expect(label).toHaveAttribute("data-focus")
  expect(label).toHaveAttribute("data-invalid")

  expect(label).toHaveAttribute("data-loading")
  expect(label).toHaveAttribute("data-readonly")
})
