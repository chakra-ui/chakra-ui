# Claude's Learning Document - Chakra UI

**Last Updated:** September 30, 2025

## Project Overview

**Chakra UI** is a comprehensive React component system for building accessible,
high-quality web applications and design systems. It emphasizes speed,
accessibility, and works seamlessly with modern frameworks like Next.js
(including RSC support).

- **Repository:** https://github.com/chakra-ui/chakra-ui
- **Author:** Segun Adebayo
- **License:** MIT
- **Version:** 2.0.0
- **Package Manager:** pnpm 10.15.0
- **Node Version:** >=20.x

## Project Structure

### Root Directory

```
chakra-ui/
├── packages/           # Core packages
├── apps/              # Applications (www docs, mcp server)
├── sandbox/           # Testing environments
├── scripts/           # Build and utility scripts
├── .changeset/        # Changesets for versioning
└── package.json       # Root package configuration
```

### Key Packages

1. **`packages/react`** - Main React component library
   - Core system implementation
   - Styled-system utilities
   - Component recipes
   - Type definitions

2. **`packages/cli`** - CLI tools for Chakra UI
   - Type generation
   - Token management

3. **`packages/charts`** - Chart components

4. **`packages/panda-preset`** - Panda CSS preset for Chakra

### Apps

1. **`apps/www`** - Documentation website (https://chakra-ui.com)
2. **`apps/mcp`** - MCP server for AI integrations
3. **`apps/compositions`** - Component compositions examples

### Sandbox Environments

Multiple sandbox projects for testing in different environments:

- `next-app/`, `next-pages/` - Next.js testing
- `vite-ts/`, `vite-jsx/` - Vite testing
- `remix-ts/` - Remix testing
- `react-router/` - React Router testing
- `storybook-ts/` - Storybook testing
- `shadow-dom/` - Shadow DOM testing

## Styled System Architecture

The styled-system is the heart of Chakra UI's styling engine. Located in
`packages/react/src/styled-system/`:

### Core Files

1. **`system.ts`** - Main system creation and configuration
   - Creates the Chakra system instance
   - Integrates tokens, breakpoints, conditions, and utilities
   - Provides CSS-in-JS functionality

2. **`cva.ts`** (Class Variance Authority) - Recipe creation
   - Handles variant-based styling
   - Processes base styles, variants, and compound variants
   - **Recent Fix:** Now properly handles bracket syntax for responsive styles
     in recipes

3. **`sva.ts`** (Slot Variance Authority) - Multi-slot recipe creation
   - For components with multiple parts (slots)
   - Each slot can have its own variants

4. **`token-dictionary.ts`** - Token management
   - Token resolution and transformation
   - Semantic token handling
   - Color palette expansion

5. **`breakpoints.ts`** - Responsive breakpoint system
   - Converts breakpoint names to media queries
   - Handles array syntax for responsive values

6. **`conditions.ts`** - Conditional styling
   - Pseudo-selectors (:hover, :focus, etc.)
   - Data attributes
   - Media queries

7. **`utility.ts`** - Utility function management
   - Property transformations
   - CSS property mappings

8. **`calc.ts`** - CSS calc() utilities
   - Mathematical operations in CSS

### Style Resolution Flow

1. User defines styles (tokens, recipes, variants)
2. `normalize()` processes raw style objects
3. Breakpoint arrays `[value1, value2]` → responsive object
   `{base: value1, sm: value2}`
4. Tokens get resolved from token dictionary
5. Conditions get applied (media queries, pseudo-selectors)
6. CSS output is generated with proper layering

## Recent Work: Recipe Bracket Syntax Fix

### Problem

Array/bracket syntax for responsive styles wasn't working correctly in recipe
variants:

```typescript
const recipe = system.cva({
  variants: {
    variant: {
      primary: {
        color: ["red", "green"], // ❌ Wasn't converting to breakpoints
      },
    },
  },
})
```

### Solution

Enhanced the normalization process in the recipe system to handle bracket syntax
properly. The fix ensures that:

1. Base styles support bracket syntax
2. Variant styles support bracket syntax
3. Compound variants support bracket syntax
4. Mixed bracket and object syntax works correctly

### Modified Files

- `packages/react/src/styled-system/breakpoints.ts`
- `packages/react/src/styled-system/calc.ts`
- `packages/react/src/styled-system/conditions.ts`
- `packages/react/src/styled-system/cva.ts`
- `packages/react/src/styled-system/sva.ts`
- `packages/react/src/styled-system/system.ts`
- `packages/react/src/styled-system/token-dictionary.ts`
- `packages/react/src/styled-system/utility.ts`
- `packages/react/src/utils/entries.ts`

### Test Coverage

Created comprehensive tests in `packages/react/__tests__/recipe.test.ts`:

1. ✅ Bracket syntax in recipe variants (original issue)
2. ✅ Bracket syntax in base styles
3. ✅ Object syntax as control test
4. ✅ Multiple properties with bracket syntax
5. ✅ Multiple breakpoints (3+ values)
6. ✅ Compound variants with bracket syntax
7. ✅ Mixed bracket and object syntax
8. ✅ Partial breakpoint values
9. ✅ Multiple variant options with bracket syntax

### Changeset

Created `.changeset/fix-recipe-bracket-syntax.md` documenting the fix for
release notes.

## Build Scripts

### Core Commands

```bash
pnpm build              # Build all packages
pnpm build:fast         # Fast build (no type checking)
pnpm dev                # Watch mode for all packages
pnpm test               # Run Vitest tests
pnpm typecheck          # TypeScript type checking
```

### Token Generation

```bash
pnpm build:tokens       # Generate TypeScript types from tokens
pnpm build:tokens-dev   # Generate tokens locally
```

### Package Management

```bash
pnpm react              # Run commands in @chakra-ui/react
pnpm www                # Run commands in docs site
pnpm mcp                # Run commands in MCP server
```

### Quality Assurance

```bash
pnpm lint               # ESLint
pnpm format:check       # Prettier check
pnpm format:write       # Prettier format
```

### Release Management

```bash
pnpm version            # Create version with changesets
pnpm release            # Publish to npm
pnpm version:dev        # Create dev snapshot version
pnpm release:dev        # Publish dev version
```

## Key Technologies

- **React 19.1.1** with Server Components support
- **TypeScript 5.8.3** for type safety
- **Vite 7.0.0** for bundling and dev server
- **Vitest 3.2.4** for testing
- **Panda CSS** preset for styling
- **Changesets** for version management
- **Rollup** for package bundling
- **Storybook 9.1.8** for component development

## Testing Philosophy

- **Unit tests** with Vitest
- **Accessibility tests** with vitest-axe
- **Component tests** with @testing-library/react
- **Integration tests** in sandbox environments
- **Storybook** for visual testing

## Key Design Principles

1. **Accessibility First** - WCAG compliant components
2. **Type Safety** - Full TypeScript support
3. **Performance** - Optimized style resolution
4. **Developer Experience** - Intuitive APIs
5. **Composability** - Build complex UIs from simple primitives
6. **Responsive** - Mobile-first design patterns
7. **Themeable** - Customizable design tokens

## Current Git Status

### Staged Files (Recent Work)

- `.changeset/fix-recipe-bracket-syntax.md` - Changeset for recipe fix
- `packages/react/__tests__/recipe.test.ts` - New test suite
- Multiple styled-system files (modified for bracket syntax support)

### Recent Commits

- `96edd4393` - docs: password input example
- `5b2bc851f` - fix(www): update showcase navigation
- `c58b20530` - docs: ai rules
- `e59f66e19` - docs: update focus ring
- `451209e75` - fix(table): ensure stickyHeader works with outline variant

## Learning Insights

### Responsive Style Patterns

**Bracket Syntax (Array)**

```typescript
color: ["red", "green", "blue"]
// Maps to: base=red, sm=green, md=blue
```

**Object Syntax**

```typescript
color: { base: 'red', sm: 'green', md: 'blue' }
```

Both are equivalent and should work interchangeably throughout the system.

### Recipe System

**CVA (Class Variance Authority)** - Single component styling

```typescript
const button = system.cva({
  base: {
    /* base styles */
  },
  variants: {
    /* variants */
  },
  compoundVariants: [
    /* combinations */
  ],
  defaultVariants: {
    /* defaults */
  },
})
```

**SVA (Slot Variance Authority)** - Multi-part component styling

```typescript
const card = system.sva({
  slots: ["root", "header", "body", "footer"],
  base: {
    /* styles per slot */
  },
  variants: {
    /* variants per slot */
  },
})
```

### Token System

- Semantic tokens reference base tokens
- Color palettes auto-expand (50-950 scales)
- Tokens can use CSS variables
- Token dictionary handles resolution and transformation

## Next Steps / Areas to Explore

1. Understanding the component architecture in `packages/react/src/components/`
2. Deep dive into the Panda CSS integration
3. MCP server capabilities for AI integrations
4. Documentation generation system
5. CLI tooling for scaffolding and code generation
6. Performance optimization strategies
7. Build pipeline and bundle optimization

---

_This document serves as a living knowledge base for Claude to maintain context
about the Chakra UI project structure, recent changes, and architectural
decisions._
