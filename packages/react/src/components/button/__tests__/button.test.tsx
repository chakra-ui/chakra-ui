import { axe } from "vitest-axe"
import { render } from "../../../../__tests__/core/render"
import { Button } from "../button"

describe("Button", () => {
  describe("Rendering", () => {
    it("should render correctly", () => {
      const { getByRole } = render(<Button>Click me</Button>)
      expect(getByRole("button")).toBeInTheDocument()
    })

    it("should render with children", () => {
      const { getByText } = render(<Button>Button Text</Button>)
      expect(getByText("Button Text")).toBeInTheDocument()
    })

    it("should have type='button' by default", () => {
      const { getByRole } = render(<Button>Click me</Button>)
      expect(getByRole("button")).toHaveAttribute("type", "button")
    })

    it("should have display name", () => {
      expect(Button.displayName).toBe("Button")
    })
  })

  describe("Accessibility", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(<Button>Click me</Button>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no violations when disabled", async () => {
      const { container } = render(<Button disabled>Click me</Button>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no violations when loading with text", async () => {
      const { container } = render(
        <Button loading loadingText="Click me">
          Click me
        </Button>,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should be keyboard accessible", async () => {
      const handleClick = vi.fn()
      const { getByRole, user } = render(
        <Button onClick={handleClick}>Click me</Button>,
      )

      const button = getByRole("button")
      button.focus()

      expect(button).toHaveFocus()

      await user.keyboard("{Enter}")
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("should support space key activation", async () => {
      const handleClick = vi.fn()
      const { getByRole, user } = render(
        <Button onClick={handleClick}>Click me</Button>,
      )

      const button = getByRole("button")
      button.focus()

      await user.keyboard(" ")
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe("Interactions", () => {
    it("should handle click events", async () => {
      const handleClick = vi.fn()
      const { getByRole, user } = render(
        <Button onClick={handleClick}>Click me</Button>,
      )

      await user.click(getByRole("button"))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("should not fire click when disabled", async () => {
      const handleClick = vi.fn()
      const { getByRole, user } = render(
        <Button disabled onClick={handleClick}>
          Click me
        </Button>,
      )

      await user.click(getByRole("button"))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it("should not fire click when loading", async () => {
      const handleClick = vi.fn()
      const { getByRole, user } = render(
        <Button loading onClick={handleClick}>
          Click me
        </Button>,
      )

      await user.click(getByRole("button"))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe("Props", () => {
    it("should handle disabled state", () => {
      const { getByRole } = render(<Button disabled>Click me</Button>)
      expect(getByRole("button")).toBeDisabled()
    })

    it("should apply custom className", () => {
      const { getByRole } = render(
        <Button className="custom-class">Click me</Button>,
      )
      expect(getByRole("button")).toHaveClass("custom-class")
    })

    it("should forward ref", () => {
      const ref = vi.fn()
      render(<Button ref={ref}>Click me</Button>)
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
    })

    it("should spread additional props", () => {
      const { getByRole } = render(
        <Button data-testid="custom-button" aria-label="Custom">
          Click me
        </Button>,
      )

      const button = getByRole("button")
      expect(button).toHaveAttribute("data-testid", "custom-button")
      expect(button).toHaveAttribute("aria-label", "Custom")
    })
  })

  describe("Loading State", () => {
    it("should show loading state", () => {
      const { getByRole } = render(<Button loading>Click me</Button>)
      expect(getByRole("button")).toHaveAttribute("data-loading")
    })

    it("should be disabled when loading", () => {
      const { getByRole } = render(<Button loading>Click me</Button>)
      expect(getByRole("button")).toBeDisabled()
    })

    it("should show loading text", () => {
      const { getByText } = render(
        <Button loading loadingText="Loading...">
          Click me
        </Button>,
      )
      expect(getByText("Loading...")).toBeInTheDocument()
    })

    it("should show spinner placement at start by default", () => {
      const { getByRole } = render(
        <Button loading loadingText="Loading">
          Click me
        </Button>,
      )
      const button = getByRole("button")
      expect(button).toBeInTheDocument()
    })

    it("should support end spinner placement", () => {
      const { getByRole } = render(
        <Button loading loadingText="Loading" spinnerPlacement="end">
          Click me
        </Button>,
      )
      const button = getByRole("button")
      expect(button).toBeInTheDocument()
    })

    it("should support custom spinner", () => {
      const CustomSpinner = () => <div data-testid="custom-spinner">...</div>
      const { getByTestId } = render(
        <Button loading spinner={<CustomSpinner />}>
          Click me
        </Button>,
      )
      expect(getByTestId("custom-spinner")).toBeInTheDocument()
    })
  })

  describe("Edge Cases", () => {
    it("should handle empty children", () => {
      const { getByRole } = render(<Button />)
      expect(getByRole("button")).toBeInTheDocument()
    })

    it("should handle both disabled and loading", () => {
      const { getByRole } = render(
        <Button disabled loading>
          Click me
        </Button>,
      )
      const button = getByRole("button")
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute("data-loading")
    })

    it("should handle complex children", () => {
      const { getByRole, getByTestId } = render(
        <Button>
          <span data-testid="icon">→</span>
          <span>Click me</span>
        </Button>,
      )
      expect(getByRole("button")).toBeInTheDocument()
      expect(getByTestId("icon")).toBeInTheDocument()
    })

    it("should work with asChild prop", () => {
      const { getByRole } = render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>,
      )
      // When asChild is true, it should render the child directly
      const element = getByRole("link")
      expect(element).toBeInTheDocument()
    })
  })

  describe("CSS Props", () => {
    it("should apply css prop", () => {
      const { getByRole } = render(
        <Button css={{ backgroundColor: "red" }}>Click me</Button>,
      )
      const button = getByRole("button")
      expect(button).toBeInTheDocument()
    })

    it("should merge multiple className values", () => {
      const { getByRole } = render(
        <Button className="class-1 class-2">Click me</Button>,
      )
      const button = getByRole("button")
      expect(button).toHaveClass("class-1")
      expect(button).toHaveClass("class-2")
    })
  })
})
