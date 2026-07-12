import { axe } from "vitest-axe"
import { render } from "../../../../__tests__/core/render"
import { AvatarFallback, AvatarGroup, AvatarImage, AvatarRoot } from "../avatar"

describe("Avatar", () => {
  describe("Rendering", () => {
    it("should render correctly with image", () => {
      const { container } = render(
        <AvatarRoot>
          <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </AvatarRoot>,
      )
      expect(container.querySelector("img")).toBeInTheDocument()
    })

    it("should render fallback when no image", () => {
      const { getByText } = render(
        <AvatarRoot>
          <AvatarFallback>JD</AvatarFallback>
        </AvatarRoot>,
      )
      expect(getByText("JD")).toBeInTheDocument()
    })

    it("should derive initials from name", () => {
      const { getByText } = render(
        <AvatarRoot>
          <AvatarFallback name="John Doe" />
        </AvatarRoot>,
      )
      expect(getByText("JD")).toBeInTheDocument()
    })

    it("should handle single name", () => {
      const { getByText } = render(
        <AvatarRoot>
          <AvatarFallback name="John" />
        </AvatarRoot>,
      )
      expect(getByText("J")).toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("should have no accessibility violations with image", async () => {
      const { container } = render(
        <AvatarRoot>
          <AvatarImage src="https://example.com/avatar.jpg" alt="John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </AvatarRoot>,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations with fallback", async () => {
      const { container } = render(
        <AvatarRoot>
          <AvatarFallback name="John Doe" />
        </AvatarRoot>,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should require alt text for images", () => {
      const { container } = render(
        <AvatarRoot>
          <AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </AvatarRoot>,
      )
      const img = container.querySelector("img")
      expect(img).toHaveAttribute("alt", "User avatar")
    })
  })

  describe("Props", () => {
    it("should handle different sizes", () => {
      const { container } = render(
        <AvatarRoot size="lg">
          <AvatarFallback>JD</AvatarFallback>
        </AvatarRoot>,
      )
      expect(container.firstChild).toBeInTheDocument()
    })

    it("should apply custom className", () => {
      const { container } = render(
        <AvatarRoot className="custom-avatar">
          <AvatarFallback>JD</AvatarFallback>
        </AvatarRoot>,
      )
      expect(container.firstChild).toHaveClass("custom-avatar")
    })
  })

  describe("Image Loading", () => {
    it("should show fallback on image error", async () => {
      const { getByText } = render(
        <AvatarRoot>
          <AvatarImage src="invalid-url.jpg" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </AvatarRoot>,
      )

      // Fallback should be visible when image fails
      expect(getByText("JD")).toBeInTheDocument()
    })
  })

  describe("AvatarGroup", () => {
    it("should render multiple avatars in group", () => {
      const { getAllByText } = render(
        <AvatarGroup>
          <AvatarRoot>
            <AvatarFallback name="John Doe" />
          </AvatarRoot>
          <AvatarRoot>
            <AvatarFallback name="Jane Smith" />
          </AvatarRoot>
          <AvatarRoot>
            <AvatarFallback name="Bob Johnson" />
          </AvatarRoot>
        </AvatarGroup>,
      )

      expect(getAllByText(/[A-Z]{1,2}/)).toHaveLength(3)
    })

    it("should have no accessibility violations in group", async () => {
      const { container } = render(
        <AvatarGroup>
          <AvatarRoot>
            <AvatarFallback name="John Doe" />
          </AvatarRoot>
          <AvatarRoot>
            <AvatarFallback name="Jane Smith" />
          </AvatarRoot>
        </AvatarGroup>,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe("Fallback Behavior", () => {
    it("should show icon when no name provided", () => {
      const { container } = render(
        <AvatarRoot>
          <AvatarFallback />
        </AvatarRoot>,
      )

      const svg = container.querySelector("svg")
      expect(svg).toBeInTheDocument()
    })

    it("should handle empty name", () => {
      const { container } = render(
        <AvatarRoot>
          <AvatarFallback name="" />
        </AvatarRoot>,
      )

      const svg = container.querySelector("svg")
      expect(svg).toBeInTheDocument()
    })

    it("should handle custom fallback content", () => {
      const { getByText } = render(
        <AvatarRoot>
          <AvatarFallback>
            <span>Custom</span>
          </AvatarFallback>
        </AvatarRoot>,
      )

      expect(getByText("Custom")).toBeInTheDocument()
    })
  })

  describe("Edge Cases", () => {
    it("should handle very long names", () => {
      const { getByText } = render(
        <AvatarRoot>
          <AvatarFallback name="Very Long First Name Very Long Last Name" />
        </AvatarRoot>,
      )

      // Should still extract first and last initials
      expect(getByText("VN")).toBeInTheDocument()
    })

    it("should handle names with special characters", () => {
      const { getByText } = render(
        <AvatarRoot>
          <AvatarFallback name="Ñoño O'Brien" />
        </AvatarRoot>,
      )

      expect(getByText("ÑO")).toBeInTheDocument()
    })

    it("should trim whitespace from names", () => {
      const { getByText } = render(
        <AvatarRoot>
          <AvatarFallback name="  John   Doe  " />
        </AvatarRoot>,
      )

      expect(getByText("JD")).toBeInTheDocument()
    })
  })
})
