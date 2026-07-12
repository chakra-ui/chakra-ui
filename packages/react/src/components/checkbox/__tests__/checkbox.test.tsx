import { axe } from "vitest-axe"
import { render } from "../../../../__tests__/core/render"
import {
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxLabel,
  CheckboxRoot,
} from "../checkbox"

describe("Checkbox", () => {
  describe("Rendering", () => {
    it("should render correctly", () => {
      const { container } = render(
        <CheckboxRoot>
          <CheckboxHiddenInput />
          <CheckboxControl />
          <CheckboxLabel>Accept terms</CheckboxLabel>
        </CheckboxRoot>,
      )
      expect(
        container.querySelector('[data-scope="checkbox"]'),
      ).toBeInTheDocument()
    })

    it("should render with label", () => {
      const { getByText } = render(
        <CheckboxRoot>
          <CheckboxHiddenInput />
          <CheckboxControl />
          <CheckboxLabel>Accept terms</CheckboxLabel>
        </CheckboxRoot>,
      )
      expect(getByText("Accept terms")).toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(
        <CheckboxRoot>
          <CheckboxHiddenInput />
          <CheckboxControl />
          <CheckboxLabel>Accept terms</CheckboxLabel>
        </CheckboxRoot>,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no violations when checked", async () => {
      const { container } = render(
        <CheckboxRoot checked>
          <CheckboxHiddenInput />
          <CheckboxControl />
          <CheckboxLabel>Accept terms</CheckboxLabel>
        </CheckboxRoot>,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no violations when disabled", async () => {
      const { container } = render(
        <CheckboxRoot disabled>
          <CheckboxHiddenInput />
          <CheckboxControl />
          <CheckboxLabel>Accept terms</CheckboxLabel>
        </CheckboxRoot>,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no violations when indeterminate", async () => {
      const { container } = render(
        <CheckboxRoot checked="indeterminate">
          <CheckboxHiddenInput />
          <CheckboxControl />
          <CheckboxLabel>Select all</CheckboxLabel>
        </CheckboxRoot>,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should be keyboard accessible", async () => {
      const { container, user } = render(
        <CheckboxRoot>
          <CheckboxHiddenInput />
          <CheckboxControl />
          <CheckboxLabel>Accept terms</CheckboxLabel>
        </CheckboxRoot>,
      )

      const checkbox = container.querySelector(
        'input[type="checkbox"]',
      ) as HTMLInputElement
      checkbox.focus()

      expect(checkbox).toHaveFocus()

      await user.keyboard(" ")
      expect(checkbox).toBeChecked()

      await user.keyboard(" ")
      expect(checkbox).not.toBeChecked()
    })

    it("should support ARIA attributes", () => {
      const { container } = render(
        <CheckboxRoot aria-label="Custom label">
          <CheckboxHiddenInput />
          <CheckboxControl />
        </CheckboxRoot>,
      )

      const label = container.querySelector(
        '[data-scope="checkbox"][data-part="root"]',
      )
      expect(label).toHaveAttribute("aria-label", "Custom label")
    })
  })

  describe("Interactions", () => {
    it("should handle check/uncheck", async () => {
      const { container, user } = render(
        <CheckboxRoot>
          <CheckboxHiddenInput />
          <CheckboxControl />
          <CheckboxLabel>Accept terms</CheckboxLabel>
        </CheckboxRoot>,
      )

      const checkbox = container.querySelector(
        'input[type="checkbox"]',
      ) as HTMLInputElement
      expect(checkbox).not.toBeChecked()

      await user.click(checkbox)
      expect(checkbox).toBeChecked()

      await user.click(checkbox)
      expect(checkbox).not.toBeChecked()
    })

    it("should handle onChange callback", async () => {
      const handleChange = vi.fn()
      const { container, user } = render(
        <CheckboxRoot onCheckedChange={handleChange}>
          <CheckboxHiddenInput />
          <CheckboxControl />
          <CheckboxLabel>Accept terms</CheckboxLabel>
        </CheckboxRoot>,
      )

      const checkbox = container.querySelector(
        'input[type="checkbox"]',
      ) as HTMLInputElement
      await user.click(checkbox)
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ checked: true }),
      )
    })

    it("should not fire change when disabled", async () => {
      const handleChange = vi.fn()
      const { container, user } = render(
        <CheckboxRoot disabled onCheckedChange={handleChange}>
          <CheckboxHiddenInput />
          <CheckboxControl />
          <CheckboxLabel>Accept terms</CheckboxLabel>
        </CheckboxRoot>,
      )

      const checkbox = container.querySelector(
        'input[type="checkbox"]',
      ) as HTMLInputElement
      await user.click(checkbox)
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe("Props", () => {
    it("should handle disabled state", () => {
      const { container } = render(
        <CheckboxRoot disabled>
          <CheckboxHiddenInput />
          <CheckboxControl />
          <CheckboxLabel>Accept terms</CheckboxLabel>
        </CheckboxRoot>,
      )
      const checkbox = container.querySelector(
        'input[type="checkbox"]',
      ) as HTMLInputElement
      expect(checkbox).toBeDisabled()
    })

    it("should handle checked state", () => {
      const { container } = render(
        <CheckboxRoot checked>
          <CheckboxHiddenInput />
          <CheckboxControl />
          <CheckboxLabel>Accept terms</CheckboxLabel>
        </CheckboxRoot>,
      )
      const checkbox = container.querySelector(
        'input[type="checkbox"]',
      ) as HTMLInputElement
      expect(checkbox).toBeChecked()
    })

    it("should handle indeterminate state", () => {
      const { container } = render(
        <CheckboxRoot checked="indeterminate">
          <CheckboxHiddenInput />
          <CheckboxControl />
          <CheckboxLabel>Select all</CheckboxLabel>
        </CheckboxRoot>,
      )
      const root = container.querySelector(
        '[data-scope="checkbox"][data-part="root"]',
      )
      expect(root).toHaveAttribute("data-state", "indeterminate")
    })

    it("should handle required attribute", () => {
      const { container } = render(
        <CheckboxRoot required>
          <CheckboxHiddenInput />
          <CheckboxControl />
          <CheckboxLabel>Accept terms</CheckboxLabel>
        </CheckboxRoot>,
      )
      const checkbox = container.querySelector(
        'input[type="checkbox"]',
      ) as HTMLInputElement
      expect(checkbox).toBeRequired()
    })
  })

  describe("CheckboxGroup", () => {
    it("should render checkbox group", () => {
      const { container } = render(
        <CheckboxGroup>
          <CheckboxRoot value="1">
            <CheckboxHiddenInput />
            <CheckboxControl />
            <CheckboxLabel>Option 1</CheckboxLabel>
          </CheckboxRoot>
          <CheckboxRoot value="2">
            <CheckboxHiddenInput />
            <CheckboxControl />
            <CheckboxLabel>Option 2</CheckboxLabel>
          </CheckboxRoot>
        </CheckboxGroup>,
      )

      const checkboxes = container.querySelectorAll('input[type="checkbox"]')
      expect(checkboxes).toHaveLength(2)
    })

    it("should have no accessibility violations in group", async () => {
      const { container } = render(
        <CheckboxGroup>
          <CheckboxRoot value="1">
            <CheckboxHiddenInput />
            <CheckboxControl />
            <CheckboxLabel>Option 1</CheckboxLabel>
          </CheckboxRoot>
          <CheckboxRoot value="2">
            <CheckboxHiddenInput />
            <CheckboxControl />
            <CheckboxLabel>Option 2</CheckboxLabel>
          </CheckboxRoot>
        </CheckboxGroup>,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe("Edge Cases", () => {
    it("should handle controlled checkbox", async () => {
      const { container, rerender } = render(
        <CheckboxRoot checked={false}>
          <CheckboxHiddenInput />
          <CheckboxControl />
          <CheckboxLabel>Accept terms</CheckboxLabel>
        </CheckboxRoot>,
      )

      const checkbox = container.querySelector(
        'input[type="checkbox"]',
      ) as HTMLInputElement
      expect(checkbox).not.toBeChecked()

      rerender(
        <CheckboxRoot checked={true}>
          <CheckboxHiddenInput />
          <CheckboxControl />
          <CheckboxLabel>Accept terms</CheckboxLabel>
        </CheckboxRoot>,
      )

      expect(checkbox).toBeChecked()
    })

    it("should work without label", () => {
      const { container } = render(
        <CheckboxRoot aria-label="checkbox">
          <CheckboxHiddenInput />
          <CheckboxControl />
        </CheckboxRoot>,
      )
      expect(
        container.querySelector('[data-scope="checkbox"]'),
      ).toBeInTheDocument()
    })
  })
})
