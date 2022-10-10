import * as React from "react"
import { render, testA11y, screen } from "@chakra-ui/test-utils"
import { EmailIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { Button, ButtonGroup } from "../src"

it("passes a11y test", async () => {
  await testA11y(<Button>test</Button>)
})

test("renders with icons", () => {
  const { getByText } = render(
    <ButtonGroup>
      <Button leftIcon={<EmailIcon />}>Email</Button>
      <Button rightIcon={<ArrowForwardIcon />}>Arrow Forward</Button>
    </ButtonGroup>,
  )
  expect(getByText("Email")).toBeTruthy()
  expect(getByText("Arrow Forward")).toBeTruthy()
})

test("shows spinner if isLoading", () => {
  const { getByTestId } = render(
    <Button data-testid="btn" isLoading>
      Email
    </Button>,
  )
  expect(getByTestId("btn")).toHaveAttribute("data-loading")

  // children text is hidden
  expect(screen.getByText("Email")).not.toBeVisible()

  // "Loading..." visually hidden label shown
  screen.getByText("Loading...")
})

test("shows spinner and loading text if isLoading and loadingText", () => {
  const { rerender } = render(
    <Button isLoading loadingText="Submitting" spinner={<>Spinner at start</>}>
      Submit
    </Button>,
  )

  // children text is replaced by `loadingText`
  screen.getByText("Submitting")
  expect(screen.queryByText("Submit")).toBeNull()

  // Confirm spinner position
  expect(screen.getByText(/Spinner at start/i)).toHaveClass(
    "chakra-button__spinner--start",
  )

  rerender(
    <Button
      isLoading
      spinnerPlacement="end"
      loadingText="Test if spinner placement"
      spinner={<>Spinner at end</>}
    >
      Submit
    </Button>,
  )

  expect(screen.getByText(/Spinner at end/i)).toHaveClass(
    "chakra-button__spinner--end",
  )
  // expect(screen.queryByTestId("placement-end")).toBeInTheDocument()
  // expect(screen.queryByTestId("placement-start")).not.toBeInTheDocument()

  // Should be able to use a custom spinner
  rerender(
    <Button
      isLoading
      spinnerPlacement="end"
      loadingText="Test if spinner placement"
      spinner={<>FakeSpinner</>}
    >
      Submit
    </Button>,
  )
  expect(screen.queryByText(/FakeSpinner/i)).toBeInTheDocument()
})

test("has the proper aria attributes", () => {
  const { rerender } = render(<Button>Hello</Button>)

  // button has role="button"
  let button = screen.getByRole("button")
  expect(button).not.toHaveAttribute("aria-disabled")

  // isLoading sets aria-disabled="true"
  rerender(<Button isLoading>Hello</Button>)
  button = screen.getByRole("button")
  expect(button).toHaveAttribute("data-loading", "")

  // isDisabled sets aria-disabled="true"
  rerender(<Button isDisabled>Hello</Button>)
  button = screen.getByRole("button")
  expect(button).toHaveAttribute("disabled", "")
})

test("Has the proper type attribute", () => {
  const { getByTestId, rerender } = render(
    <Button data-testid="btn">Email</Button>,
  )
  expect(getByTestId("btn")).toHaveAttribute("type", "button")

  rerender(
    <Button data-testid="btn" type="submit">
      Email
    </Button>,
  )
  expect(getByTestId("btn")).toHaveAttribute("type", "submit")

  rerender(
    <Button data-testid="btn" as="button">
      Email
    </Button>,
  )
  expect(getByTestId("btn")).toHaveAttribute("type")

  rerender(
    <Button data-testid="btn" as="span">
      Email
    </Button>,
  )
  expect(getByTestId("btn")).not.toHaveAttribute("type")
})

test("Should be disabled", () => {
  const { getByTestId, getByRole, rerender } = render(
    <Button isDisabled data-testid="btn">
      I'm a invalid button
    </Button>,
  )
  const button = getByRole("button")
  expect(button).toBeDisabled()

  // This case was introduced to check against regression of #6700
  rerender(
    <Button as="div" isDisabled data-testid="btn">
      I'm a invalid button
    </Button>,
  )

  const buttonAsDiv = getByTestId("btn")
  expect(buttonAsDiv).toHaveAttribute("disabled")
})
