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
  render(
    <Button isLoading loadingText="Submitting">
      Submit
    </Button>,
  )

  // children text is replaced by `loadingText`
  screen.getByText("Submitting")
  expect(screen.queryByText("Submit")).toBeNull()
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
