import { axe } from "vitest-axe"
import { render } from "../../../../__tests__/core/render"
import { Box } from "../index"

describe("Box", () => {
  describe("Rendering", () => {
    it("should render correctly", () => {
      const { container } = render(<Box>Content</Box>)
      expect(container.firstChild).toBeInTheDocument()
    })

    it("should render with children", () => {
      const { getByText } = render(<Box>Hello World</Box>)
      expect(getByText("Hello World")).toBeInTheDocument()
    })

    it("should render as div by default", () => {
      const { container } = render(<Box>Content</Box>)
      expect(container.firstChild?.nodeName).toBe("DIV")
    })

    it("should have display name", () => {
      expect(Box.displayName).toBe("Box")
    })
  })

  describe("Accessibility", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(<Box>Content</Box>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should support ARIA attributes", () => {
      const { getByRole } = render(
        <Box role="region" aria-label="Main content">
          Content
        </Box>,
      )

      expect(getByRole("region")).toHaveAttribute("aria-label", "Main content")
    })

    it("should support semantic HTML via asChild", () => {
      const { getByRole } = render(
        <Box asChild>
          <main>Main content</main>
        </Box>,
      )

      expect(getByRole("main")).toBeInTheDocument()
    })
  })

  describe("Styling Props", () => {
    it("should apply padding", () => {
      const { getByTestId } = render(
        <Box data-testid="box" padding="4">
          Content
        </Box>,
      )

      expect(getByTestId("box")).toBeInTheDocument()
    })

    it("should apply margin", () => {
      const { getByTestId } = render(
        <Box data-testid="box" margin="4">
          Content
        </Box>,
      )

      expect(getByTestId("box")).toBeInTheDocument()
    })

    it("should apply color", () => {
      const { getByTestId } = render(
        <Box data-testid="box" color="red.500">
          Content
        </Box>,
      )

      expect(getByTestId("box")).toBeInTheDocument()
    })

    it("should apply background", () => {
      const { getByTestId } = render(
        <Box data-testid="box" bg="blue.500">
          Content
        </Box>,
      )

      expect(getByTestId("box")).toBeInTheDocument()
    })

    it("should apply width and height", () => {
      const { getByTestId } = render(
        <Box data-testid="box" width="100px" height="100px">
          Content
        </Box>,
      )

      expect(getByTestId("box")).toBeInTheDocument()
    })
  })

  describe("CSS Props", () => {
    it("should apply css prop", () => {
      const { getByTestId } = render(
        <Box data-testid="box" css={{ fontSize: "20px" }}>
          Content
        </Box>,
      )

      expect(getByTestId("box")).toBeInTheDocument()
    })

    it("should apply className", () => {
      const { getByTestId } = render(
        <Box data-testid="box" className="custom-class">
          Content
        </Box>,
      )

      expect(getByTestId("box")).toHaveClass("custom-class")
    })
  })

  describe("Responsive Props", () => {
    it("should support responsive arrays", () => {
      const { getByTestId } = render(
        <Box data-testid="box" padding={["2", "4", "6"]}>
          Content
        </Box>,
      )

      expect(getByTestId("box")).toBeInTheDocument()
    })

    it("should support responsive objects", () => {
      const { getByTestId } = render(
        <Box data-testid="box" padding={{ base: "2", md: "4", lg: "6" }}>
          Content
        </Box>,
      )

      expect(getByTestId("box")).toBeInTheDocument()
    })
  })

  describe("Composition", () => {
    it("should compose with other boxes", () => {
      const { getByText } = render(
        <Box>
          <Box>Nested 1</Box>
          <Box>Nested 2</Box>
        </Box>,
      )

      expect(getByText("Nested 1")).toBeInTheDocument()
      expect(getByText("Nested 2")).toBeInTheDocument()
    })

    it("should work as a layout container", () => {
      const { getByTestId } = render(
        <Box
          data-testid="container"
          display="flex"
          flexDirection="column"
          gap="4"
        >
          <Box>Item 1</Box>
          <Box>Item 2</Box>
        </Box>,
      )

      expect(getByTestId("container")).toBeInTheDocument()
    })
  })

  describe("Edge Cases", () => {
    it("should handle empty box", () => {
      const { container } = render(<Box />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it("should handle complex children", () => {
      const { getByTestId } = render(
        <Box>
          <div data-testid="child">
            <span>Complex</span>
            <span>Children</span>
          </div>
        </Box>,
      )

      expect(getByTestId("child")).toBeInTheDocument()
    })

    it("should forward ref", () => {
      const ref = vi.fn()
      render(<Box ref={ref}>Content</Box>)
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
    })

    it("should spread HTML attributes", () => {
      const { getByTestId } = render(
        <Box data-testid="box" data-custom="value" id="custom-id">
          Content
        </Box>,
      )

      const box = getByTestId("box")
      expect(box).toHaveAttribute("data-custom", "value")
      expect(box).toHaveAttribute("id", "custom-id")
    })
  })

  describe("As Prop", () => {
    it("should render as custom element with asChild", () => {
      const { getByRole } = render(
        <Box asChild>
          <button>Click me</button>
        </Box>,
      )

      expect(getByRole("button")).toBeInTheDocument()
    })

    it("should preserve props when using asChild", () => {
      const { getByRole } = render(
        <Box asChild className="custom">
          <button>Click me</button>
        </Box>,
      )

      const button = getByRole("button")
      expect(button).toBeInTheDocument()
    })
  })
})
