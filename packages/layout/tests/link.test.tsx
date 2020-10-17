import * as React from "react"
import { testA11y, render, screen, fireEvent } from "@chakra-ui/test-utils"

import { Link } from "../src"

describe("<Link />", () => {
  it("renders link text correctly", () => {
    render(<Link href="http://example.com">Click me</Link>)
    const link = screen.getByRole("link")
    expect(link).toHaveTextContent("Click me")
  })

  describe("a11y tests", () => {
    it("passes a11y test", async () => {
      await testA11y(
        <Link href="http://example.com" isDisabled>
          This is a link
        </Link>,
      )
    })

    it("sets the `aria-disabled` attribute to `true` when `isDisabled` prop is `true`", () => {
      render(<Link isDisabled>Click me</Link>)
      const link = screen.getByRole("link")
      expect(link).toHaveAttribute("aria-disabled", "true")
    })

    it("sets the `aria-disabled` attribute to `false` when `isDisabled` prop is `false`", () => {
      render(<Link>Click me</Link>)
      const link = screen.getByRole("link")
      expect(link).toHaveAttribute("aria-disabled", "false")
    })
  })

  it("sets `target` attribute to `_blank` when `isExternal` prop is `true`", () => {
    render(<Link isExternal>Click me</Link>)

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("target", "_blank")
  })

  it("replaces the `href` attribute with a hashtag when `isDisabled` prop is `true`", () => {
    render(
      <Link isExternal isDisabled href="http://example.com">
        Click me
      </Link>,
    )

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "#")
  })

  it("calls `onClick` when the link is clicked", () => {
    const handleClick = jest.fn()
    render(<Link onClick={handleClick}>Click me</Link>)

    const link = screen.getByRole("link")
    fireEvent.click(link)
    expect(handleClick).toHaveBeenCalled()
  })

  it("cancels the `onClick` event when `isDisabled` prop is `true`", () => {
    const handleClick = jest.fn()
    render(
      <Link isDisabled onClick={handleClick}>
        Click me
      </Link>,
    )

    const link = screen.getByRole("link")
    fireEvent.click(link)
    expect(handleClick).not.toHaveBeenCalled()
  })
})
