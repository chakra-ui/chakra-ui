import { axe } from "vitest-axe"
import { render } from "../../../../__tests__/core/render"
import { Field } from "../../field"
import { Input } from "../input"

describe("Input", () => {
  describe("Rendering", () => {
    it("should render correctly", () => {
      const { getByRole } = render(<Input />)
      expect(getByRole("textbox")).toBeInTheDocument()
    })

    it("should render with placeholder", () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Enter text" />,
      )
      expect(getByPlaceholderText("Enter text")).toBeInTheDocument()
    })

    it("should render with value", () => {
      const { getByRole } = render(<Input value="test" readOnly />)
      expect(getByRole("textbox")).toHaveValue("test")
    })
  })

  describe("Accessibility", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(
        <Field.Root>
          <Field.Label>Username</Field.Label>
          <Input placeholder="Enter username" />
        </Field.Root>,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no violations with disabled state", async () => {
      const { container } = render(
        <Field.Root>
          <Field.Label>Username</Field.Label>
          <Input disabled placeholder="Enter username" />
        </Field.Root>,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no violations with required field", async () => {
      const { container } = render(
        <Field.Root>
          <Field.Label>Username</Field.Label>
          <Input required placeholder="Enter username" />
          <Field.HelperText>This field is required</Field.HelperText>
        </Field.Root>,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no violations with error state", async () => {
      const { container } = render(
        <Field.Root invalid>
          <Field.Label>Username</Field.Label>
          <Input placeholder="Enter username" />
          <Field.ErrorText>This field has an error</Field.ErrorText>
        </Field.Root>,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should support keyboard navigation", () => {
      const { getByRole } = render(<Input />)
      const input = getByRole("textbox")

      input.focus()
      expect(input).toHaveFocus()
    })
  })

  describe("Interactions", () => {
    it("should handle input changes", async () => {
      const handleChange = vi.fn()
      const { getByRole, user } = render(<Input onChange={handleChange} />)

      const input = getByRole("textbox")
      await user.type(input, "test")

      expect(handleChange).toHaveBeenCalled()
    })

    it("should not fire change when disabled", async () => {
      const handleChange = vi.fn()
      const { getByRole, user } = render(
        <Input disabled onChange={handleChange} />,
      )

      const input = getByRole("textbox")
      await user.type(input, "test")

      expect(handleChange).not.toHaveBeenCalled()
    })

    it("should not fire change when readOnly", async () => {
      const handleChange = vi.fn()
      const { getByRole, user } = render(
        <Input readOnly onChange={handleChange} />,
      )

      const input = getByRole("textbox")
      await user.type(input, "test")

      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe("Props", () => {
    it("should handle disabled state", () => {
      const { getByRole } = render(<Input disabled />)
      expect(getByRole("textbox")).toBeDisabled()
    })

    it("should handle readOnly state", () => {
      const { getByRole } = render(<Input readOnly />)
      expect(getByRole("textbox")).toHaveAttribute("readonly")
    })

    it("should handle required attribute", () => {
      const { getByRole } = render(<Input required />)
      expect(getByRole("textbox")).toBeRequired()
    })

    it("should apply type attribute", () => {
      const { getByPlaceholderText } = render(
        <Input type="email" placeholder="email" />,
      )
      expect(getByPlaceholderText("email")).toHaveAttribute("type", "email")
    })

    it("should forward ref", () => {
      const ref = vi.fn()
      render(<Input ref={ref} />)
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
    })
  })

  describe("Input Types", () => {
    it("should render email input", () => {
      const { getByRole } = render(<Input type="email" />)
      expect(getByRole("textbox")).toHaveAttribute("type", "email")
    })

    it("should render password input", () => {
      const { getByPlaceholderText } = render(
        <Input type="password" placeholder="password" />,
      )
      expect(getByPlaceholderText("password")).toHaveAttribute(
        "type",
        "password",
      )
    })

    it("should render number input", () => {
      const { getByRole } = render(<Input type="number" />)
      expect(getByRole("spinbutton")).toBeInTheDocument()
    })
  })

  describe("Edge Cases", () => {
    it("should handle empty value", () => {
      const { getByRole } = render(<Input value="" readOnly />)
      expect(getByRole("textbox")).toHaveValue("")
    })

    it("should handle controlled input", async () => {
      const handleChange = vi.fn()
      const { getByRole, rerender } = render(
        <Input value="initial" onChange={handleChange} />,
      )

      const input = getByRole("textbox")
      expect(input).toHaveValue("initial")

      rerender(<Input value="updated" onChange={handleChange} />)
      expect(input).toHaveValue("updated")
    })
  })
})
