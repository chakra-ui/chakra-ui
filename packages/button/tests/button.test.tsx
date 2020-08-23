import * as React from "react"
import { render, testA11y, screen } from "@chakra-ui/test-utils"
import { EmailIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { Button, ButtonGroup } from "../src"

describe("<Button />", () => {
  test("matches snapshot", () => {
    const { asFragment } = render(<Button>test</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  it("passes a11y test", async () => {
    await testA11y(<Button>test</Button>)
  })

  test("matches snapshot with icons", () => {
    const { asFragment } = render(
      <ButtonGroup>
        <Button leftIcon={<EmailIcon />}>Email</Button>
        <Button rightIcon={<ArrowForwardIcon />}>Arrow Forward</Button>
      </ButtonGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test("shows spinner if isLoading", () => {
    const { asFragment } = render(<Button isLoading>Email</Button>)
    expect(asFragment()).toMatchSnapshot()

    // children text is hidden
    expect(screen.getByText("Email")).not.toBeVisible()

    // "Loading..." visually hidden label shown
    screen.getByText("Loading...")
  })

  test("shows spinner and loading text if isLoading and loadingText", () => {
    const { asFragment } = render(
      <Button isLoading loadingText="Submitting">
        Submit
      </Button>,
    )
    expect(asFragment()).toMatchSnapshot()

    // children text is replaced by `loadingText`
    screen.getByText("Submitting")
    expect(screen.queryByText("Submit")).toBeNull()
  })

  test("has the proper aria attributes", () => {
    const { rerender } = render(<Button>Hello</Button>)

    // button has role="button"
    const button = screen.getByRole("button")
    expect(button).not.toHaveAttribute("aria-disabled")

    // isLoading sets aria-disabled="true"
    rerender(<Button isLoading>Hello</Button>)
    expect(button).toHaveAttribute("data-loading", "")

    // isDisabled sets aria-disabled="true"
    rerender(<Button isDisabled>Hello</Button>)
    expect(button).toHaveAttribute("disabled", "")
  })
})
