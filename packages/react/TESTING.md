# Testing Guide for Chakra UI React Package

This document outlines the testing strategy and practices for the
`@chakra-ui/react` package.

## Test Coverage Goals

We maintain the following coverage thresholds for the React package:

- **Statements:** 60% (target: 80%)
- **Branches:** 55% (target: 75%)
- **Functions:** 60% (target: 80%)
- **Lines:** 60% (target: 80%)

These are progressive targets. We're starting at 60% and gradually increasing as
we add more tests.

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage

# Run tests for a specific file
pnpm test button.test.tsx

# Run tests in a specific directory
pnpm test packages/react/src/components/button
```

## Coverage Reports

After running tests with coverage, you can view the report:

```bash
# View coverage in terminal
pnpm test --coverage

# Generate HTML report and open in browser
pnpm test --coverage
open coverage/index.html
```

## Test File Structure

Tests are co-located with the components they test:

```
src/components/button/
├── __tests__/
│   └── button.test.tsx
├── button.tsx
├── index.ts
└── namespace.ts
```

## Coverage Exclusions

The following files/patterns are excluded from coverage:

- Test files (`**/__tests__/**`, `**/*.test.{ts,tsx}`)
- Benchmark files (`**/*.bench.{ts,tsx}`)
- Type definition files (`**/*.d.ts`)
- Index/namespace files (`**/index.ts`, `**/namespace.ts`)
- Theme configuration (`**/theme/**`)
- Preset files (`**/preset*.ts`)
- Anatomy files (`**/anatomy.ts`)

## Writing Tests

### Test Categories

Every component should have tests in these categories:

1. **Rendering** - Basic rendering and display name
2. **Accessibility** - WCAG compliance and keyboard navigation
3. **Interactions** - User interactions and event handlers
4. **Props** - Prop validation and behavior
5. **Edge Cases** - Error states, empty values, etc.

### Example Test Structure

```typescript
import { render } from "../../../../__tests__/core/render"
import { axe } from "vitest-axe"
import { Button } from "../button"

describe("Button", () => {
  describe("Rendering", () => {
    it("should render correctly", () => {
      const { getByRole } = render(<Button>Click me</Button>)
      expect(getByRole("button")).toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(<Button>Click me</Button>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe("Interactions", () => {
    it("should handle clicks", async () => {
      const handleClick = vi.fn()
      const { getByRole, user } = render(
        <Button onClick={handleClick}>Click me</Button>
      )
      await user.click(getByRole("button"))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe("Props", () => {
    it("should handle disabled state", () => {
      const { getByRole } = render(<Button disabled>Click me</Button>)
      expect(getByRole("button")).toBeDisabled()
    })
  })

  describe("Edge Cases", () => {
    it("should handle empty children", () => {
      const { getByRole } = render(<Button />)
      expect(getByRole("button")).toBeInTheDocument()
    })
  })
})
```

## Continuous Integration

Coverage is automatically checked in CI:

- Coverage reports are uploaded to Codecov
- Coverage trends are tracked over time
- PRs show coverage diff

## Best Practices

### ✅ DO

- Write tests for all new components
- Test accessibility with vitest-axe
- Test keyboard navigation
- Test error states
- Use Testing Library queries (getByRole, getByText)
- Use user-event for interactions
- Keep tests focused and isolated

### ❌ DON'T

- Don't test implementation details
- Don't snapshot test (they're brittle)
- Don't test third-party libraries
- Don't test styles directly (unless critical)
- Don't skip accessibility tests

## Component Test Checklist

When adding a new component, ensure:

- [ ] Basic rendering test
- [ ] Display name test
- [ ] Accessibility test with axe
- [ ] Keyboard navigation test
- [ ] User interaction tests
- [ ] Prop validation tests
- [ ] Disabled state test
- [ ] Edge case tests
- [ ] Forward ref test (if applicable)

## Coverage by Component Type

Different component types have different coverage expectations:

### Interactive Components (Button, Input, Checkbox)

- Target: 80%+ coverage
- Must include keyboard and mouse interactions
- Must test disabled/readonly states
- Must test form integration

### Layout Components (Box, Stack, Flex)

- Target: 70%+ coverage
- Focus on prop combinations
- Test responsive behavior
- Test composition patterns

### Display Components (Badge, Tag, Text)

- Target: 75%+ coverage
- Test variants and sizes
- Test content rendering
- Test accessibility attributes

### Compound Components (Menu, Modal, Accordion)

- Target: 75%+ coverage
- Test component communication
- Test open/close behavior
- Test focus management

## Troubleshooting

### Tests Not Running

```bash
# Clear cache and retry
rm -rf node_modules/.vitest
pnpm test
```

### Coverage Not Generated

```bash
# Ensure @vitest/coverage-v8 is installed
pnpm install -D @vitest/coverage-v8
```

### Type Errors in Tests

```bash
# Regenerate types
pnpm typecheck
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/)
- [vitest-axe](https://github.com/chaance/vitest-axe)
- [Test Utilities README](../../__tests__/README.md)

## Contributing

When contributing tests:

1. Follow the existing test structure
2. Ensure all tests pass: `pnpm test`
3. Check coverage: `pnpm test --coverage`
4. Add tests for new features
5. Update this document if adding new patterns
