# Chakra UI Testing Guide

This directory contains test utilities and examples for testing Chakra UI
components.

## Directory Structure

```
__tests__/
├── core/
│   └── render.tsx          # Custom render utility with ChakraProvider
├── templates/
│   └── component-test.template.tsx  # Test template for new components
└── *.test.ts(x)            # Test files for utilities and infrastructure
```

Component-specific tests should be co-located with components:

```
src/components/button/
├── __tests__/
│   └── button.test.tsx     # Component tests
├── button.tsx
└── index.ts
```

## Quick Start

### 1. Create a New Component Test

```bash
# Copy the template
cp packages/react/__tests__/templates/component-test.template.tsx \
   packages/react/src/components/your-component/__tests__/your-component.test.tsx

# Edit the file and replace placeholders with your component
```

### 2. Run Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests for specific file
pnpm test button.test.tsx

# Run tests with coverage
pnpm test --coverage
```

## Testing Patterns

### Basic Rendering Test

```typescript
import { render } from "@tests/core/render"
import { Button } from "../button"

describe("Button", () => {
  it("should render correctly", () => {
    const { getByRole } = render(<Button>Click me</Button>)
    expect(getByRole("button")).toBeInTheDocument()
  })
})
```

### Accessibility Testing

```typescript
import { axe } from "vitest-axe"

it("should have no accessibility violations", async () => {
  const { container } = render(<Button>Click me</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### User Interaction Testing

```typescript
it("should handle clicks", async () => {
  const handleClick = vi.fn()
  const { getByRole, user } = render(
    <Button onClick={handleClick}>Click me</Button>
  )

  await user.click(getByRole("button"))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

### Testing Variants

```typescript
it("should apply variant styles", () => {
  const { getByRole } = render(
    <Button variant="solid" colorPalette="blue">
      Click me
    </Button>
  )

  const button = getByRole("button")
  expect(button).toHaveAttribute("data-variant", "solid")
})
```

### Testing Props

```typescript
it("should handle disabled state", () => {
  const { getByRole } = render(<Button disabled>Click me</Button>)
  expect(getByRole("button")).toBeDisabled()
})
```

### Testing Loading State

```typescript
it("should show loader when loading", () => {
  const { getByRole } = render(
    <Button loading loadingText="Loading...">
      Click me
    </Button>
  )

  expect(getByRole("button")).toBeDisabled()
  expect(getByRole("button")).toHaveAttribute("data-loading", "true")
})
```

### Keyboard Navigation Testing

```typescript
it("should be keyboard accessible", async () => {
  const handleClick = vi.fn()
  const { getByRole, user } = render(
    <Button onClick={handleClick}>Click me</Button>
  )

  const button = getByRole("button")
  button.focus()

  expect(button).toHaveFocus()

  await user.keyboard("{Enter}")
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

## Testing Guidelines

### What to Test

✅ **DO test:**

- Component renders without crashing
- Props are applied correctly
- User interactions work as expected
- Accessibility requirements are met
- Edge cases (empty states, null values)
- Error states and validation
- Keyboard navigation
- ARIA attributes

❌ **DON'T test:**

- Implementation details (internal state)
- Third-party library functionality
- Styles (unless critical to functionality)
- Snapshot tests (they're brittle)

### Accessibility Requirements

Every interactive component should test:

1. ✅ No axe violations
2. ✅ Proper semantic HTML elements
3. ✅ ARIA attributes when needed
4. ✅ Keyboard navigation
5. ✅ Focus management
6. ✅ Screen reader support

### Coverage Goals

- **Statements:** 80%
- **Branches:** 75%
- **Functions:** 80%
- **Lines:** 80%

## Common Patterns

### Testing Compound Components

```typescript
describe("Avatar", () => {
  it("should render all parts", () => {
    const { getByTestId } = render(
      <Avatar.Root data-testid="avatar">
        <Avatar.Image src="avatar.jpg" />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar.Root>
    )

    expect(getByTestId("avatar")).toBeInTheDocument()
  })
})
```

### Testing Controlled Components

```typescript
it("should work as controlled component", async () => {
  const handleChange = vi.fn()
  const { getByRole, user, rerender } = render(
    <Input value="test" onChange={handleChange} />
  )

  const input = getByRole("textbox")
  expect(input).toHaveValue("test")

  await user.clear(input)
  await user.type(input, "new value")

  expect(handleChange).toHaveBeenCalled()
})
```

### Testing Context Providers

```typescript
it("should consume context values", () => {
  const { getByRole } = render(
    <ButtonPropsProvider value={{ size: "lg" }}>
      <Button>Large Button</Button>
    </ButtonPropsProvider>
  )

  expect(getByRole("button")).toBeInTheDocument()
})
```

## Utilities

### Custom Render

Use the custom `render` function from `__tests__/core/render.tsx` which:

- Wraps components in ChakraProvider automatically
- Includes user-event utilities
- Provides access to `user` for interactions

### Vitest Axe

Test accessibility with `vitest-axe`:

```typescript
import { axe } from "vitest-axe"

const results = await axe(container)
expect(results).toHaveNoViolations()
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [vitest-axe](https://github.com/chaance/vitest-axe)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)

## Troubleshooting

### Test Fails with "Not wrapped in ChakraProvider"

Use the custom `render` from `__tests__/core/render.tsx`:

```typescript
import { render } from "../../__tests__/core/render"
```

### Async Test Timeouts

Increase timeout for slow tests:

```typescript
it("should load data", async () => {
  // test code
}, 10000) // 10 second timeout
```

### Mock External Dependencies

```typescript
vi.mock("some-library", () => ({
  someFunction: vi.fn(() => "mocked value"),
}))
```

## Contributing

When adding new components:

1. Create a `__tests__` directory in the component folder
2. Add comprehensive tests covering rendering, accessibility, and interactions
3. Ensure tests pass before submitting PR
4. Aim for >80% coverage for new code
