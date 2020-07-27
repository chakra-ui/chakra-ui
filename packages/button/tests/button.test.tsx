import React from "react"
import { render, testA11Y } from "@chakra-ui/test-utils"
import { EmailIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { Button, ButtonGroup } from "../src"

describe("<Button />", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<Button>hi there</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test("passes a11y test", async () => {
    await testA11Y(<Button>hi there</Button>)
  })

  test("renders with icons", () => {
    const { asFragment } = render(
      <ButtonGroup>
        <Button leftIcon={<EmailIcon />}>Email</Button>
        <Button rightIcon={<ArrowForwardIcon />}>Arrow Forward</Button>
      </ButtonGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test("shows spinner if isLoading", () => {
    const { asFragment, getByText } = render(<Button isLoading>Email</Button>)
    expect(asFragment()).toMatchSnapshot()

    // children text is hidden
    expect(getByText("Email")).not.toBeVisible()

    // "Loading..." visually hidden label shown
    getByText("Loading...")
  })

  test("shows spinner and loading text if isLoading and loadingText", () => {
    const { asFragment, queryByText, getByText } = render(
      <Button isLoading loadingText="Submitting">
        Submit
      </Button>,
    )
    expect(asFragment()).toMatchSnapshot()

    // children text is replaced by `loadingText`
    getByText("Submitting")
    expect(queryByText("Submit")).toBeNull()
  })

  test("has the proper aria attributes", () => {
    const { rerender, getByRole } = render(<Button>Hello</Button>)

    // button has role="button"
    const button = getByRole("button")
    expect(button).not.toHaveAttribute("aria-disabled")

    // isLoading sets aria-disabled="true"
    rerender(<Button isLoading>Hello</Button>)
    expect(button).toHaveAttribute("data-loading", "")

    // isDisabled sets aria-disabled="true"
    rerender(<Button isDisabled>Hello</Button>)
    expect(button).toHaveAttribute("disabled", "")
  })
})
