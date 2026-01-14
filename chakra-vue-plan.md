# Chakra UI Vue Implementation Plan

## Executive Summary

This document outlines the implementation plan for creating a `@chakra-ui/vue`
package that brings Chakra UI's design system to Vue 3 applications. The
implementation will leverage `@ark-ui/vue` for headless component logic while
maintaining full compatibility with the existing Chakra UI theming system.

## Architecture Overview

### Core Principles

1. **Framework Parity**: Match the React implementation's API surface and
   component behavior
2. **Shared Foundation**: Extract framework-agnostic logic into
   `@chakra-ui/system-core` that both React and Vue extend
3. **Single Source of Truth**: Share the theming configuration between React and
   Vue packages
4. **Headless UI Foundation**: Leverage Ark UI's battle-tested component logic
5. **Type Safety**: Full TypeScript support with proper type inference
6. **Modularity**: Each component as a separate package (optional optimization)

### Benefits of Shared Core Architecture

Instead of porting React code to Vue (duplication), we extract the
framework-agnostic parts into a shared base:

**`@chakra-ui/system-core`** (new)

- Framework-agnostic style resolution
- Style config merging logic
- Prop utilities and type definitions
- Zero framework dependencies

**`@chakra-ui/system`** (refactored)

- React-specific: hooks, Emotion integration, providers
- Uses `system-core` for style logic
- No breaking changes for users

**`@chakra-ui/vue-system`** (new)

- Vue-specific: composables, style injection, provide/inject
- Uses same `system-core` as React
- API mirrors React system

**Advantages**:

- ✅ **Perfect Parity**: Both frameworks use identical style resolution logic
- ✅ **No Duplication**: Core logic written once, used twice
- ✅ **Easier Maintenance**: Bugs fixed in one place benefit both frameworks
- ✅ **Smaller Diffs**: Changes to style logic only touch `system-core`
- ✅ **Clear Separation**: Framework code vs. universal logic is explicit
- ✅ **Future-Proof**: Adding Solid/Svelte versions would reuse the same core

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Applications                        │
├─────────────────────────────┬───────────────────────────────────┤
│     @chakra-ui/react        │        @chakra-ui/vue             │
│  (React Component Library)  │   (Vue Component Library)         │
└──────────────┬──────────────┴──────────────┬────────────────────┘
               │                             │
       ┌───────▼────────┐            ┌──────▼────────┐
       │  React System  │            │  Vue System   │
       │  (React-only)  │            │  (Vue-only)   │
       │                │            │               │
       │ • useStyleConfig│           │ • useStyleConfig
       │ • Emotion      │            │ • Style inject│
       │ • Providers    │            │ • Providers   │
       │ • forwardRef   │            │ • defineComponent
       └───────┬────────┘            └──────┬────────┘
               │                             │
               └──────────┬──────────────────┘
                         │
                  ┌──────▼────────┐
                  │  System Core  │
                  │ (Framework-   │
                  │  agnostic)    │
                  │               │
                  │ • resolveStyles
                  │ • resolveComponentStyleConfig
                  │ • separateStyleProps
                  │ • omitThemingProps
                  └──────┬────────┘
                         │
       ┌─────────────────┼─────────────────┐
       │                 │                 │
┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
│   Styled    │  │    Theme    │  │   Theme     │
│   System    │  │  (Config)   │  │   Utils     │
│             │  │             │  │             │
│ • css()     │  │ • colors    │  │ • mode()    │
│ • toCSSVar()│  │ • components│  │ • extendTheme
└─────────────┘  └─────────────┘  └─────────────┘

Legend:
  React-specific │ Vue-specific │ Shared (Framework-agnostic)
```

### Technology Stack

- **Vue**: 3.x (Composition API)
- **Headless Logic**: @ark-ui/vue (45+ accessible components built on Zag.js
  state machines)
- **Styling**: Custom Vue port of @chakra-ui/styled-system
- **Theme**: Shared @chakra-ui/theme package (existing)
- **Build**: tsup (matching React build setup)
- **Monorepo**: pnpm workspaces + Turbo

## Implementation Guidelines

### Reference Existing React Code

When implementing Vue components and utilities, **always reference the
corresponding React implementation** to maintain consistency:

**Required References** (per component/package):

- Review React component structure in `packages/components/{component}/src/`
- Study prop definitions, default values, and TypeScript types
- Understand component composition patterns (groups, sub-components)
- Replicate file structure and naming conventions
- Match export patterns and public API surface

**Example Workflow**:

```bash
# When implementing Vue Button:
1. Read packages/components/button/src/button.tsx
2. Read packages/components/button/src/button-types.ts
3. Read packages/components/button/src/button-group.tsx
4. Identify core patterns: props, variants, composition
5. Implement Vue equivalent maintaining same API
6. Match file names: button.ts, button-types.ts, button-group.ts
```

**Conventions to Preserve**:

- ✅ Component naming (e.g., `Button`, `ButtonGroup`, not `VueButton`)
- ✅ Prop names (e.g., `colorScheme`, `variant`, `size`)
- ✅ Default values (e.g., `size="md"`, `variant="solid"`)
- ✅ Sub-component patterns (e.g., `AccordionItem`, `AccordionButton`,
  `AccordionPanel`)
- ✅ Export structure (named exports, type exports)
- ✅ File organization (one component per file, types in separate file when
  needed)
- ✅ Theme key names (e.g., `Button` not `VueButton` in theme.components)

**Adaptations for Vue**:

- ❌ Don't blindly copy - adapt for Vue idioms:
  - `children` prop → default slot
  - `onX` event props → `@x` events or `onX` emits
  - `value` + `onChange` → `v-model` support
  - `ref` prop → `ref` attribute + expose
  - React hooks → Vue composables
  - `forwardRef` → `defineComponent` + expose

### Maintain Deterministic Implementation

All implementation steps must be **deterministic and reproducible**:

**Deterministic Practices**:

1. **Explicit Dependencies**

   - Pin exact versions in package.json examples (use `workspace:*` for monorepo
     packages)
   - Document peer dependency version constraints
   - No "latest" or version ranges in critical dependencies

2. **Clear File Paths**

   - Always use absolute paths from repo root in documentation
   - Example: `/home/user/chakra-ui/packages/core/system-core/src/index.ts`
   - Not: `../core/system-core` or relative paths

3. **Step-by-Step Procedures**

   - Each task should have clear, ordered steps
   - Dependencies between tasks must be explicit
   - No ambiguous instructions like "set up as needed"

4. **Testable Outputs**

   - Each phase must have verifiable success criteria
   - Include example test commands that should pass
   - Specify expected file outputs

5. **Configuration as Code**

   - All configuration in version-controlled files
   - No manual setup steps that can't be reproduced
   - Package.json, tsconfig.json, etc. should be complete examples

6. **Avoid Non-Deterministic Patterns**

   ```typescript
   // ❌ Bad - depends on execution order
   export const components = {}
   components.Button = buttonConfig

   // ✅ Good - explicit and deterministic
   export const components = {
     Button: buttonConfig,
     Accordion: accordionConfig,
   }
   ```

7. **Document Assumptions**
   - State all assumptions explicitly
   - Example: "Assumes Node.js 18+", "Requires pnpm 8.x"
   - Example: "Assumes `packages/core/system-core` is built before
     `packages/core/vue-system`"

**Implementation Checklist** (per component):

- [ ] Reviewed corresponding React implementation
- [ ] Documented React file references in commit/PR
- [ ] Matched prop API surface
- [ ] Preserved naming conventions
- [ ] Adapted patterns for Vue idioms
- [ ] Added deterministic tests
- [ ] Verified builds in clean environment

## Git Workflow for Incremental Development

This implementation will be developed in a forked repository with incremental
PRs for feedback before submitting to the main Chakra UI repository.

### Branch Structure

```
upstream/main (chakra-ui/chakra-ui)
    ↓
origin/main (your fork)
    ↓
feature/chakra-ui-vue (main feature branch)
    ↓ ↓ ↓ ↓ ↓ ↓
    │ │ │ │ │ └─→ feature/vue-tier-3-4-components
    │ │ │ │ └───→ feature/vue-tier-2-components
    │ │ │ └─────→ feature/vue-tier-1-components
    │ │ └───────→ feature/vue-ark-ui-integration
    │ └─────────→ feature/vue-system
    └───────────→ feature/system-core
```

### Workflow Steps

**1. Initial Setup** (one-time)

```bash
# Create main feature branch from current planning branch
git checkout claude/chakra-ui-vue-plan-LFsnj
git checkout -b feature/chakra-ui-vue
git push -u origin feature/chakra-ui-vue
```

**1b. Enable GitHub Actions in Fork** (one-time)

GitHub Actions are disabled by default in forks. You must enable them:

1. Go to your fork: `https://github.com/<your-username>/chakra-ui`
2. Click **Actions** tab
3. Click **"I understand my workflows, go ahead and enable them"**

**CI Checks That Will Run on PRs:**

- ✅ Build (`pnpm build`)
- ✅ Tests (`pnpm test`)
- ✅ ESLint (`pnpm lint`)
- ✅ TypeScript (`pnpm typecheck`)
- ✅ Prettier (`pnpm format:check`)

The repository now includes `.github/workflows/feature-quality.yml` which
triggers these checks on PRs to `feature/**` branches.

**2. For Each Implementation Phase** (repeat for each PR)

```bash
# Start from feature branch
git checkout feature/chakra-ui-vue
git pull origin feature/chakra-ui-vue

# Create step branch
git checkout -b feature/<step-name>

# ... implement changes, write tests ...

# Commit and push
git add .
git commit -m "feat: <description>"
git push -u origin feature/<step-name>

# Create PR within fork
gh pr create \
  --repo <your-username>/chakra-ui \
  --base feature/chakra-ui-vue \
  --head feature/<step-name> \
  --title "feat: <step description>" \
  --body "Implements Phase X.Y of Vue implementation plan..."
```

**3. Review and Merge**

```bash
# After PR approval, merge to feature branch
gh pr merge <pr-number> --merge

# Update local feature branch
git checkout feature/chakra-ui-vue
git pull origin feature/chakra-ui-vue

# Proceed to next step
```

**4. Final PR to Upstream** (when all steps complete)

```bash
# Push complete feature branch
git checkout feature/chakra-ui-vue
git push origin feature/chakra-ui-vue

# Create PR to main Chakra UI repo
gh pr create \
  --repo chakra-ui/chakra-ui \
  --base main \
  --head <your-username>:feature/chakra-ui-vue \
  --title "feat: add Vue 3 support with @chakra-ui/vue package" \
  --body "Complete implementation of Chakra UI for Vue 3..."
```

### Suggested PR Breakdown

**PR 1: System Core Infrastructure** Branch: `feature/system-core` Scope: Phase
1.1 - Extract `@chakra-ui/system-core`

- Framework-agnostic style resolution
- Core utilities and types
- Unit tests with >80% coverage

**PR 2: React System Refactor** Branch: `feature/react-system-refactor` Scope:
Phase 1.2 - Refactor React to use system-core

- Update React system to use shared core
- Ensure no breaking changes
- All existing tests pass

**PR 3: Vue System Foundation** Branch: `feature/vue-system` Scope: Phase
1.3-1.5 - Create `@chakra-ui/vue-system`

- Vue composables and providers
- `useStyleConfig`, `chakra.*` factory
- Unit and integration tests

**PR 4: Ark UI Integration** Branch: `feature/vue-ark-ui-integration` Scope:
Phase 2 - Ark UI prototypes

- Button, Accordion, Menu prototypes
- Integration pattern documented
- Accessibility validation

**PR 5: Tier 1 Components** Branch: `feature/vue-tier-1-components` Scope: Phase
3.1 Tier 1

- Box, Flex, Grid, Stack, Text, Heading
- Button, IconButton
- Input, Textarea, Checkbox, Radio, Switch
- Tests mirroring React tests

**PR 6: Tier 2 Components** Branch: `feature/vue-tier-2-components` Scope: Phase
3.1 Tier 2

- Modal, Drawer, Dialog
- Menu, Popover, Tooltip
- Tabs, Accordion, Select
- Form components

**PR 7: Tier 3 & 4 Components** Branch: `feature/vue-tier-3-4-components` Scope:
Phase 3.1 Tier 3 & 4

- Remaining components
- Full test coverage

**PR 8: Main Package & Documentation** Branch: `feature/vue-main-package` Scope:
Phase 4 & 5

- `@chakra-ui/vue` barrel package
- Documentation and examples
- Migration guide

### Benefits of This Approach

1. **Incremental Feedback**: Get feedback after each phase before proceeding
2. **Smaller PRs**: Easier to review, less overwhelming
3. **Clear Progress**: Each PR represents a milestone
4. **Easier Rollback**: Can revert individual steps if needed
5. **Testing Gates**: Each PR must pass tests before merge
6. **Documentation**: Each PR documents one logical chunk

### Monorepo Considerations

Since Chakra UI uses pnpm workspaces + Turbo:

```bash
# Run tests for specific packages in PR
pnpm --filter @chakra-ui/system-core test
pnpm --filter @chakra-ui/vue-system test

# Build only affected packages
pnpm --filter @chakra-ui/system-core build

# Run all tests before committing
pnpm test
```

### Git Commit Message Conventions

Follow existing Chakra UI conventions:

- `feat(package-name): description` - New features
- `fix(package-name): description` - Bug fixes
- `refactor(package-name): description` - Refactoring
- `test(package-name): description` - Test additions
- `docs(package-name): description` - Documentation

Examples:

```bash
git commit -m "feat(system-core): add framework-agnostic style resolution"
git commit -m "feat(vue-system): implement useStyleConfig composable"
git commit -m "test(vue-button): add tests mirroring React Button tests"
```

## Package Structure

### Directory Layout

```
packages/
├── components/
│   ├── vue/                          # NEW: Main @chakra-ui/vue entry point
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── index.ts              # Barrel exports
│   │   │   ├── chakra-provider.ts    # Vue provider component
│   │   │   └── use-chakra.ts         # Vue composition API utilities
│   │   └── README.md
│   │
│   ├── vue-button/                   # NEW: Example Vue component
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── button.ts             # Vue component using Ark UI
│   │   │   ├── button-group.ts
│   │   │   └── button-types.ts
│   │   └── README.md
│   │
│   ├── theme/                        # EXISTING: Shared theme (verified framework-agnostic)
│   │   ├── src/
│   │   │   ├── index.ts              # Framework-agnostic exports
│   │   │   ├── foundations/          # Design tokens
│   │   │   ├── components/           # Component styles
│   │   │   └── semantic-tokens/      # Mode-aware tokens
│   │
│   └── react/                        # EXISTING: React implementation (will be refactored)
│
├── core/
│   ├── system-core/                  # NEW: Framework-agnostic system base
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── resolve-styles.ts     # Core style resolution
│   │   │   ├── resolve-config.ts     # Style config resolution
│   │   │   ├── prop-utils.ts         # Style prop utilities
│   │   │   └── types.ts              # Shared type definitions
│   │   └── README.md
│   │
│   ├── vue-system/                   # NEW: Vue system (uses system-core)
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── chakra.ts             # Vue styled factory (h() wrapper)
│   │   │   ├── providers.ts          # Theme provider
│   │   │   ├── use-style-config.ts   # Theme consumption composable
│   │   │   └── use-chakra.ts         # Vue Chakra context hook
│   │   └── README.md
│   │
│   ├── styled-system/                # EXISTING: Framework-agnostic CSS-in-JS
│   │
│   └── system/                       # EXISTING: React system (will be refactored to use system-core)
│
└── utilities/
    ├── vue-utils/                    # NEW: Vue-specific utilities
    │   ├── src/
    │   │   ├── index.ts
    │   │   ├── component-utils.ts    # Component helpers
    │   │   ├── props-utils.ts        # Prop utilities
    │   │   └── dom-utils.ts          # DOM utilities for Vue
    │
    └── shared-utils/                 # EXISTING: Framework-agnostic
```

## Implementation Phases

### Testing Philosophy

**⚠️ CRITICAL REQUIREMENT**: Testing runs **parallel** to implementation, not as
a separate phase.

**Test-Driven Workflow**:

1. Implement feature/component
2. Write tests for that feature immediately
3. Verify tests pass
4. **ONLY THEN** proceed to next feature

**Validation Gates**:

- Each phase has a "Testing" section with required tests
- Each phase has "Success Criteria" with commands to verify
- **Cannot proceed to next phase until all tests pass**
- All success criteria commands must execute without errors

**Test Coverage Requirements**:

- Unit tests: > 80% coverage
- Integration tests: Critical user flows
- Type checking: Zero errors
- Build: Clean compilation

**Test Execution**:

```bash
# Run tests in watch mode during development
pnpm --filter <package> test --watch

# Run all tests before committing
pnpm test

# Run tests for specific package
pnpm --filter @chakra-ui/vue-system test
```

**When Tests Fail**:

- ❌ Do NOT skip failing tests
- ❌ Do NOT comment out tests
- ❌ Do NOT proceed to next phase
- ✅ Fix the code or fix the test
- ✅ Ensure 100% of tests pass before moving on

**Mirror React Tests**:

- **⚠️ CRITICAL**: Vue component tests should mirror existing React component
  tests
- For each component, review React tests at
  `packages/components/{component}/tests/` or `__tests__/`
- Port test cases from React to Vue (same scenarios, adapted syntax)
- Match test coverage and edge cases from React version
- Do NOT invent new tests unless addressing Vue-specific behavior
- Goal: If React Button has 15 test cases, Vue Button should have the same 15
  (adapted)

**Example**:

```typescript
// React test (packages/components/button/tests/button.test.tsx)
it('renders with loading state', () => {
  const { getByText } = render(<Button isLoading>Submit</Button>)
  expect(getByText('Submit')).toBeDisabled()
})

// Vue test (packages/components/vue-button/tests/button.test.ts)
it('renders with loading state', () => {
  const wrapper = mount(Button, { props: { isLoading: true } })
  expect(wrapper.find('button').element.disabled).toBe(true)
})
```

### Phase 1: Core Infrastructure (Week 1-2)

#### 1.1 Extract Framework-Agnostic System Core (`@chakra-ui/system-core`)

**Goal**: Create shared base package that both React and Vue can use

**Rationale**: Instead of porting React code to Vue, extract the
framework-agnostic logic into a shared package. This ensures perfect parity,
reduces duplication, and simplifies maintenance.

**Reference Files** (extract logic from these React files):

- `/home/user/chakra-ui/packages/core/system/src/use-style-config.ts` - Style
  config resolution
- `/home/user/chakra-ui/packages/core/system/src/system.ts` - Style merging
  logic (`toCSSObject`)
- `/home/user/chakra-ui/packages/core/styled-system/src/style-config.ts` - Style
  config types and utilities
- `/home/user/chakra-ui/packages/core/styled-system/src/system.ts` - Style prop
  detection

**Tasks**:

- [ ] Create `packages/core/system-core` package
- [ ] Extract core style resolution logic from React system

  ```typescript
  // Framework-agnostic style resolution
  export interface StyleResolverOptions {
    baseStyle?: SystemStyleObject | ((props: any) => SystemStyleObject)
    __css?: SystemStyleObject
    sx?: SystemStyleObject
    styleProps?: Record<string, any>
    theme: any
  }

  export function resolveStyles(options: StyleResolverOptions): CSSObject {
    const { baseStyle, __css, styleProps, sx, theme } = options
    const finalBaseStyle = runIfFn(baseStyle, { theme })
    const finalStyles = assignAfter(
      {},
      __css,
      finalBaseStyle,
      filterUndefined(styleProps),
      sx,
    )
    return css(finalStyles)(theme)
  }
  ```

- [ ] Extract style config resolution logic

  ```typescript
  export interface ResolveStyleConfigOptions {
    themeKey: string | null
    theme: any
    colorMode: string
    props: ThemingProps & Dict
    styleConfig?: any
  }

  export function resolveComponentStyleConfig(
    options: ResolveStyleConfigOptions,
  ): SystemStyleObject | Record<string, SystemStyleObject> {
    const {
      themeKey,
      theme,
      colorMode,
      props,
      styleConfig: styleConfigProp,
    } = options

    const themeStyleConfig = themeKey
      ? get(theme, `components.${themeKey}`)
      : undefined

    const styleConfig = styleConfigProp || themeStyleConfig

    const mergedProps = mergeWith(
      { theme, colorMode },
      styleConfig?.defaultProps ?? {},
      filterUndefined(omit(props, ["children"])),
    )

    if (styleConfig) {
      const getStyles = resolveStyleConfig(styleConfig)
      return getStyles(mergedProps)
    }

    return {}
  }
  ```

- [ ] Extract prop utilities

  ```typescript
  export function separateStyleProps(props: Dict) {
    const styleProps = objectFilter(props, (_, prop) => isStyleProp(prop))
    const componentProps = objectFilter(props, (_, prop) => !isStyleProp(prop))
    return { styleProps, componentProps }
  }

  export function omitThemingProps<T extends ThemingProps>(props: T) {
    return omit(props, ["variant", "size", "colorScheme", "styleConfig"])
  }
  ```

- [ ] Create framework-agnostic type definitions

  ```typescript
  export interface BaseChakraProps {
    sx?: SystemStyleObject
    __css?: SystemStyleObject
  }

  export interface StyleConfigContext {
    theme: any
    colorMode: "light" | "dark"
  }
  ```

**Dependencies**:

- `@chakra-ui/styled-system`: workspace:\*
- `@chakra-ui/theme-utils`: workspace:\*
- `@chakra-ui/shared-utils`: workspace:\*
- `@chakra-ui/object-utils`: workspace:\*

**Output**:

- Framework-agnostic style resolution functions
- Shared utilities for both React and Vue
- Type definitions that both frameworks extend

**Testing** (must pass before proceeding):

- [ ] Unit tests for `resolveStyles()` with various prop combinations
- [ ] Unit tests for `resolveComponentStyleConfig()` with theme fixtures
- [ ] Unit tests for `separateStyleProps()` and `omitThemingProps()`
- [ ] Type checking passes: `pnpm typecheck`
- [ ] Build succeeds: `pnpm --filter @chakra-ui/system-core build`

**Success Criteria**:

```bash
# All tests pass
pnpm --filter @chakra-ui/system-core test
# Coverage > 80%
pnpm --filter @chakra-ui/system-core test --coverage
# No type errors
pnpm --filter @chakra-ui/system-core typecheck
# Clean build
pnpm --filter @chakra-ui/system-core build
```

#### 1.2 Refactor React System (`@chakra-ui/react-system`)

**Goal**: Refactor existing React system to use shared core

**Tasks**:

- [ ] Rename `@chakra-ui/system` to `@chakra-ui/react-system` (or keep name,
      update imports)
- [ ] Update `useStyleConfig` to use `resolveComponentStyleConfig` from core

  ```typescript
  import { resolveComponentStyleConfig } from "@chakra-ui/system-core"

  export function useStyleConfig(themeKey: string, props: Dict = {}) {
    const { theme, colorMode } = useChakra()
    const stylesRef = useRef({})

    const styles = resolveComponentStyleConfig({
      themeKey,
      theme,
      colorMode,
      props,
    })

    // Memoization logic
    if (!isEqual(stylesRef.current, styles)) {
      stylesRef.current = styles
    }

    return stylesRef.current as SystemStyleObject
  }
  ```

- [ ] Update `styled` factory to use `resolveStyles` from core
- [ ] Update exports to include core utilities
- [ ] Add integration tests to ensure no regressions

**Dependencies**:

- `@chakra-ui/system-core`: workspace:\* (NEW)
- All existing dependencies

**Output**:

- Refactored React system using shared core
- No breaking changes for users
- Clearer separation of concerns

**Testing** (must pass before proceeding):

- [ ] All existing React system tests still pass (no regressions)
- [ ] Integration tests verify `useStyleConfig` works with shared core
- [ ] End-to-end test: React component renders with theme correctly
- [ ] Type checking passes for all React components
- [ ] Build succeeds without errors

**Success Criteria**:

```bash
# Existing tests pass (no breaking changes)
pnpm --filter @chakra-ui/system test
pnpm --filter @chakra-ui/react test
# Type checking passes
pnpm --filter @chakra-ui/system typecheck
# Build succeeds
pnpm --filter @chakra-ui/system build
# Verify example React app still works
cd examples/create-react-app && pnpm dev
```

**⚠️ CRITICAL**: Do not proceed to Vue implementation until React refactor is
validated!

#### 1.3 Create Vue Styling System (`@chakra-ui/vue-system`)

**Goal**: Create Vue system that uses shared core

**Tasks**:

- [ ] Create `packages/core/vue-system` package
- [ ] Implement `useStyleConfig` composable using shared core

  ```typescript
  import { resolveComponentStyleConfig } from "@chakra-ui/system-core"
  import { computed, ref } from "vue"
  import { useChakra } from "./use-chakra"

  export function useStyleConfig(themeKey: string, props: any = {}) {
    const { theme, colorMode } = useChakra()
    const previousStyles = ref({})

    return computed(() => {
      const styles = resolveComponentStyleConfig({
        themeKey,
        theme: theme.value,
        colorMode: colorMode.value,
        props,
      })

      // Vue's reactivity handles memoization
      // but we can still cache for deep equality
      if (!isEqual(previousStyles.value, styles)) {
        previousStyles.value = styles
      }

      return previousStyles.value as SystemStyleObject
    })
  }
  ```

- [ ] Implement `chakra` factory for Vue

  ```typescript
  import { resolveStyles, separateStyleProps } from "@chakra-ui/system-core"
  import { computed, defineComponent, h } from "vue"
  import { useColorMode, useTheme } from "./providers"

  export const chakra = new Proxy({} as any, {
    get(_, element: string) {
      return defineComponent({
        name: `chakra.${element}`,
        inheritAttrs: false,
        setup(props, { slots, attrs }) {
          const theme = useTheme()
          const { colorMode } = useColorMode()

          const styles = computed(() => {
            const { styleProps, componentProps } = separateStyleProps(props)

            return resolveStyles({
              baseStyle: props.baseStyle,
              __css: props.__css,
              sx: props.sx,
              styleProps,
              theme: theme.value,
            })
          })

          return () =>
            h(
              element,
              {
                ...attrs,
                style: styles.value,
              },
              slots.default?.(),
            )
        },
      })
    },
  })
  ```

- [ ] Create Vue providers using provide/inject

  ```typescript
  import { InjectionKey, inject, provide } from "vue"

  const ThemeSymbol: InjectionKey<any> = Symbol("chakra-theme")
  const ColorModeSymbol: InjectionKey<any> = Symbol("chakra-color-mode")

  export const ChakraProvider = defineComponent({
    props: {
      theme: { type: Object, required: true },
      colorModeManager: Object,
      resetCSS: { type: Boolean, default: true },
    },
    setup(props, { slots }) {
      const processedTheme = computed(() => toCSSVar(props.theme))
      provide(ThemeSymbol, processedTheme)

      const colorMode = ref("light")
      const setColorMode = (mode: "light" | "dark") => {
        colorMode.value = mode
      }
      provide(ColorModeSymbol, { colorMode, setColorMode })

      return () => slots.default?.()
    },
  })

  export function useTheme() {
    const theme = inject(ThemeSymbol)
    if (!theme) throw new Error("useTheme must be used within ChakraProvider")
    return theme
  }

  export function useColorMode() {
    const context = inject(ColorModeSymbol)
    if (!context)
      throw new Error("useColorMode must be used within ChakraProvider")
    return context
  }
  ```

**Dependencies**:

- `vue`: ^3.3.0
- `@chakra-ui/system-core`: workspace:\* (shared base)
- `@chakra-ui/styled-system`: workspace:\*
- `@chakra-ui/theme`: workspace:\*
- `@chakra-ui/theme-utils`: workspace:\*

**Output**:

- Vue system that mirrors React system API
- Uses shared core for consistency
- `ChakraProvider`, `chakra.*` factory, composables

**Testing** (must pass before proceeding):

_Setup Test Environment_:

```bash
# Install test dependencies
pnpm add -D @vue/test-utils @testing-library/vue vitest
```

_Unit Tests_ (Jest/Vitest + @testing-library/vue):

- [ ] `useStyleConfig` composable returns correct styles from theme
- [ ] `useTheme` and `useColorMode` work with provide/inject
- [ ] `chakra.*` factory creates components with correct styling
- [ ] Theme provider injects theme correctly
- [ ] CSS variable conversion works (`toCSSVar`)

_Integration Tests_:

- [ ] Full flow: Provider → `useStyleConfig` → Component styling
- [ ] Color mode changes trigger style updates
- [ ] Multiple components share theme context correctly

**Success Criteria**:

```bash
# All tests pass
pnpm --filter @chakra-ui/vue-system test
# Coverage > 80%
pnpm --filter @chakra-ui/vue-system test --coverage
# Type checking passes
pnpm --filter @chakra-ui/vue-system typecheck
# Build succeeds
pnpm --filter @chakra-ui/vue-system build
# Create minimal Vue app to verify
mkdir -p test-apps/vue-system-test
cd test-apps/vue-system-test
# Test that ChakraProvider + chakra.div renders
```

**Example Test**:

```typescript
// packages/core/vue-system/tests/use-style-config.test.ts
import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import { defineComponent, h } from "vue"
import { ChakraProvider, useStyleConfig } from "../src"

describe("useStyleConfig", () => {
  it("resolves button styles from theme", () => {
    const TestComponent = defineComponent({
      setup() {
        const styles = useStyleConfig("Button", {
          variant: "solid",
          size: "md",
        })
        return () => h("button", { style: styles.value }, "Click me")
      },
    })

    const wrapper = mount(ChakraProvider, {
      props: { theme: defaultTheme },
      slots: { default: TestComponent },
    })

    const button = wrapper.find("button")
    expect(button.element.style.fontSize).toBe("16px")
    expect(button.element.style.padding).toBeTruthy()
  })
})
```

#### 1.4 Theme Package Enhancement

**Goal**: Make theme truly framework-agnostic

**Tasks**:

- [ ] Audit `@chakra-ui/theme` for React-specific code
- [ ] Move any React-specific utilities to `@chakra-ui/react-utils`
- [ ] Ensure all theme exports are pure JavaScript objects
- [ ] Add JSDoc comments for better IDE support
- [ ] Verify color mode tokens work with Vue

**Changes Required**:

- Theme should export plain objects and utility functions only
- No JSX or React-specific helpers
- Color mode should be representable as simple string value

#### 1.5 Vue Utilities Package (`@chakra-ui/vue-utils`)

**Goal**: Framework-specific utilities for Vue

**Tasks**:

- [ ] Create `packages/utilities/vue-utils` package
- [ ] Port essential utilities:
  - `vueForwardRef` (equivalent to React forwardRef)
  - `mergeRefs` for Vue refs
  - `useComposedRefs` composable
- [ ] Create Vue-specific prop utilities
- [ ] Create component definition helpers

**Example**:

```typescript
// vueForwardRef equivalent
export function defineChakraComponent<T>(
  name: string,
  setup: (props: any, ctx: any, ref: Ref<T>) => any,
) {
  return defineComponent({
    name,
    setup(props, ctx) {
      const elementRef = ref<T>()
      ctx.expose({ $el: elementRef })
      return setup(props, ctx, elementRef)
    },
  })
}
```

### Phase 2: Ark UI Integration (Week 3-4)

#### 2.1 Research & Prototype

**Goal**: Understand Ark UI Vue API and integration patterns

**Tasks**:

- [ ] Install `@ark-ui/vue` as peer dependency
- [ ] Study Ark UI Vue documentation and API
- [ ] Create proof-of-concept with 2-3 components:
  - Simple: Button (minimal Ark UI usage)
  - Medium: Accordion (multi-part component)
  - Complex: Menu (portals, focus management)
- [ ] Document integration patterns

**Key Integration Pattern**:

```typescript
// Example: Accordion using Ark UI + Chakra styling
import { Accordion as ArkAccordion } from "@ark-ui/vue"
import { useMultiStyleConfig } from "@chakra-ui/vue-system"
import { defineComponent, h } from "vue"

export const Accordion = defineComponent({
  name: "ChakraAccordion",
  props: {
    // Ark UI props
    ...ArkAccordion.props,
    // Chakra theme props
    variant: String,
    size: String,
    colorScheme: String,
  },
  setup(props, { slots }) {
    const styles = useMultiStyleConfig("Accordion", props)

    return () =>
      h(
        ArkAccordion.Root,
        {
          ...props,
          style: styles.value.root,
        },
        {
          default: () => slots.default?.(),
        },
      )
  },
})

// Sub-components
export const AccordionItem = defineComponent({
  // Similar pattern for AccordionItem
})
```

#### 2.2 Component Mapping Strategy

**Goal**: Map Chakra components to Ark UI equivalents

**Ark UI Coverage** (45+ components):

- ✅ Direct mapping: Accordion, Avatar, Checkbox, Dialog, Menu, Popover, Radio,
  Select, Slider, Switch, Tabs, Toast, Tooltip, etc.
- ⚠️ Partial mapping: Some Chakra components may need custom implementation
- ❌ No mapping: Layout components (Box, Flex, Grid) - pure Chakra

**Component Categories**:

1. **Ark UI-based Components** (30+ components)

   - Use Ark UI for behavior/accessibility
   - Wrap with Chakra styling system
   - Examples: Accordion, Dialog, Menu, Select, Slider

2. **Pure Chakra Components** (20+ components)

   - No complex behavior needed
   - Style-only components
   - Examples: Box, Flex, Grid, Text, Heading, Badge, Card

3. **Hybrid Components** (10+ components)
   - Some Ark UI features + custom Chakra logic
   - Examples: Input (Ark UI field + Chakra addons), Form components

**Testing** (must pass before proceeding to Phase 3):

_Prototype Tests_:

- [ ] Button prototype renders and accepts theme props
- [ ] Accordion prototype opens/closes with Ark UI behavior
- [ ] Menu prototype handles keyboard navigation and focus
- [ ] All prototypes apply Chakra styles from theme
- [ ] Accessibility: ARIA attributes present (via Ark UI)

**Success Criteria**:

```bash
# Create test app with prototypes
mkdir -p test-apps/ark-ui-integration
cd test-apps/ark-ui-integration

# Test that all 3 prototypes work:
# 1. Button renders with Chakra theme
# 2. Accordion expands/collapses
# 3. Menu opens and keyboard nav works

# Run accessibility audit on prototypes
pnpm add -D @axe-core/cli
axe http://localhost:3000 --tags wcag2a,wcag2aa

# Verify integration pattern is documented
cat docs/ark-ui-integration-pattern.md
```

**Validation Checklist**:

- [ ] Ark UI components render correctly in Vue 3
- [ ] Chakra theme props (`variant`, `size`, `colorScheme`) override Ark UI
      defaults
- [ ] Multi-part components (Accordion) style all sub-components
- [ ] Accessibility features from Ark UI are preserved
- [ ] Performance is acceptable (no re-render issues)
- [ ] Integration pattern is documented and repeatable

**⚠️ CRITICAL**: Do not start Phase 3 until integration pattern is proven and
tested!

### Phase 3: Component Implementation (Week 5-12)

#### 3.1 Implementation Priority

**⚠️ TESTING REQUIREMENT**: After implementing **each component**, write and
pass tests before moving to the next component.

**Tier 1: Core Components** (Week 5-6)

- [ ] Box, Flex, Grid, Stack (layout primitives)
- [ ] Text, Heading
- [ ] Button, IconButton
- [ ] Input, Textarea
- [ ] Checkbox, Radio, Switch

**Tier 1 Testing** (must pass before moving to Tier 2):

```bash
# Test each component
pnpm --filter @chakra-ui/vue-box test
pnpm --filter @chakra-ui/vue-button test
pnpm --filter @chakra-ui/vue-input test
pnpm --filter @chakra-ui/vue-checkbox test

# Integration test: Combine components
# Create test app with all Tier 1 components
# Verify theming, variants, sizes all work
```

_Testing Workflow Per Component_:

1. **Review React tests**: Read `packages/components/{component}/tests/`
2. **Count test cases**: Note how many tests React has
3. **Port each test**: Adapt React test to Vue syntax
4. **Verify coverage**: Ensure same edge cases are covered
5. **Run tests**: All must pass before moving to next component

_Minimum Required Tests_ (adapt from React):

- [ ] Renders with default props
- [ ] Applies theme variants correctly
- [ ] Responds to size prop
- [ ] Handles disabled state
- [ ] Applies custom styles via `sx` prop
- [ ] TypeScript types are correct
- [ ] Accessibility: proper ARIA attributes
- [ ] Event handlers work (onClick, onChange, etc.)
- [ ] **All other test cases from React component**

**⚠️ GATE**: All Tier 1 components must have > 80% test coverage **and match
React test parity** before proceeding!

---

**Tier 2: Essential UI** (Week 7-8)

- [ ] Modal, Drawer, Dialog
- [ ] Menu, Popover, Tooltip
- [ ] Tabs, Accordion
- [ ] Select (using Ark UI Select)
- [ ] Form components (FormControl, FormLabel, FormError)

**Tier 2 Testing** (must pass before moving to Tier 3):

```bash
# Test each component
pnpm --filter @chakra-ui/vue-modal test
pnpm --filter @chakra-ui/vue-menu test
pnpm --filter @chakra-ui/vue-tabs test
pnpm --filter @chakra-ui/vue-form-control test

# Integration tests
# - Modal opens/closes with proper focus management
# - Menu keyboard navigation works
# - Form validation displays errors correctly
```

_Additional Tests for Complex Components_:

- [ ] Portal/Teleport works correctly
- [ ] Focus trap captures focus
- [ ] Escape key closes overlays
- [ ] Keyboard navigation (Tab, Arrow keys)
- [ ] Multi-part components style correctly
- [ ] Controlled vs uncontrolled modes work

**⚠️ GATE**: All Tier 2 components tested before proceeding!

---

**Tier 3: Advanced Components** (Week 9-10)

- [ ] Toast
- [ ] Slider, RangeSlider
- [ ] NumberInput
- [ ] PinInput
- [ ] Avatar, AvatarGroup
- [ ] Tag, Badge
- [ ] Progress, Spinner
- [ ] Table

**Tier 3 Testing** (must pass before moving to Tier 4):

```bash
pnpm --filter @chakra-ui/vue-toast test
pnpm --filter @chakra-ui/vue-slider test
pnpm --filter @chakra-ui/vue-avatar test
# ... etc

# Integration: Toast manager, Avatar group layout
```

**⚠️ GATE**: All Tier 3 components tested before proceeding!

---

**Tier 4: Specialized Components** (Week 11-12)

- [ ] Editable
- [ ] Skeleton
- [ ] Stat
- [ ] Breadcrumb
- [ ] Card
- [ ] Alert
- [ ] Portal
- [ ] Transitions

**Tier 4 Testing** (final validation):

```bash
pnpm --filter @chakra-ui/vue-editable test
pnpm --filter @chakra-ui/vue-skeleton test
# ... etc

# Full integration test across ALL tiers
pnpm --filter @chakra-ui/vue test
# Should pass all ~200+ component tests
```

**Final Validation**:

- [ ] All component tests pass (100%)
- [ ] Overall coverage > 80%
- [ ] Build succeeds for all packages
- [ ] Example app using all components works
- [ ] No TypeScript errors across entire monorepo

#### 3.2 Component Template

**IMPORTANT**: Before implementing any component, follow the
[Implementation Guidelines](#implementation-guidelines):

1. **Reference the React implementation** at
   `packages/components/{component}/src/`
2. Match the prop API, naming conventions, and file structure
3. Adapt React patterns to Vue idioms (hooks → composables, children → slots,
   etc.)
4. Maintain deterministic implementation with clear dependencies

Each component follows this structure:

```typescript
// packages/components/vue-button/src/button.ts
import type { SystemStyleObject } from "@chakra-ui/styled-system"
import { chakra, omitThemingProps, useStyleConfig } from "@chakra-ui/vue-system"
import { computed, defineComponent, h } from "vue"

export interface ButtonProps {
  // Theming
  variant?: string
  size?: string
  colorScheme?: string

  // Component-specific
  isLoading?: boolean
  loadingText?: string

  // Accessibility
  isDisabled?: boolean

  // Events
  onClick?: (e: MouseEvent) => void
}

export const Button = defineComponent({
  name: "ChakraButton",
  props: {
    variant: String,
    size: String,
    colorScheme: String,
    isLoading: Boolean,
    loadingText: String,
    isDisabled: Boolean,
  },
  emits: ["click"],
  setup(props, { slots, attrs, emit }) {
    const styles = useStyleConfig("Button", props)
    const buttonProps = computed(() => omitThemingProps(props))

    return () =>
      h(
        chakra.button,
        {
          ...attrs,
          ...buttonProps.value,
          disabled: props.isDisabled || props.isLoading,
          __css: styles.value,
          onClick: (e: MouseEvent) => emit("click", e),
        },
        slots,
      )
  },
})
```

#### 3.3 Component Testing Guidelines

**⚠️ NOTE**: Testing is integrated into each tier (see sections above). This
section provides additional testing details.

**⚠️ CRITICAL REQUIREMENT**: Tests must mirror React component tests.

**Test Development Workflow**:

1. **Read React tests first**: `packages/components/{component}/tests/` or
   `__tests__/`
2. **List all React test cases**: Create checklist of scenarios covered
3. **Port each test to Vue**: Adapt syntax, keep same assertions
4. **Verify parity**: Ensure Vue tests cover same edge cases as React
5. **Add Vue-specific tests only if needed**: e.g., slots, v-model,
   provide/inject

**Example - Porting React Tests**:

```bash
# Step 1: Review React tests
cat packages/components/button/tests/button.test.tsx

# React test cases found:
# ✓ renders correctly
# ✓ renders with variant
# ✓ renders with size
# ✓ handles disabled state
# ✓ handles loading state
# ✓ calls onClick handler
# ✓ renders as different element (as prop)
# ✓ renders with custom icon
# ... (total: 15 test cases)

# Step 2: Port each to Vue
# Create packages/components/vue-button/tests/button.test.ts
# with same 15 test cases, adapted for Vue syntax
```

**Test Setup** (configure once for all components):

```bash
# Install test dependencies
pnpm add -D vitest @vue/test-utils @testing-library/vue @testing-library/user-event

# Add to package.json scripts
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage"
  }
}
```

**Test File Structure**:

```
packages/components/vue-button/
├── src/
│   ├── button.ts
│   └── button-types.ts
├── tests/
│   ├── button.test.ts           # Unit tests
│   ├── button-integration.test.ts  # Integration tests
│   └── fixtures/
│       └── mock-theme.ts         # Test fixtures
└── package.json
```

**Test Porting Guide** (React → Vue):

**Step 1: Identify React Test File**

```bash
# Find React tests
ls packages/components/button/tests/
# or
ls packages/components/button/__tests__/
```

**Step 2: Port Test Cases**

React → Vue syntax mapping:

| React Pattern                        | Vue Pattern                                     |
| ------------------------------------ | ----------------------------------------------- |
| `render(<Button />)`                 | `mount(Button, { props: {} })`                  |
| `<Button>text</Button>`              | `slots: { default: 'text' }`                    |
| `<Button prop={value} />`            | `props: { prop: value }`                        |
| `getByText('Submit')`                | `wrapper.text()` or `wrapper.find('button')`    |
| `fireEvent.click(button)`            | `await wrapper.find('button').trigger('click')` |
| `expect(onClick).toHaveBeenCalled()` | `expect(wrapper.emitted('click')).toBeTruthy()` |

**Example - Porting a React Test**:

```typescript
// React: packages/components/button/tests/button.test.tsx
import { render } from '@testing-library/react'
import { Button } from '../src'

describe('Button', () => {
  it('renders with loading state', () => {
    const { getByRole } = render(<Button isLoading>Submit</Button>)
    const button = getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('Submit')
  })
})

// Vue: packages/components/vue-button/tests/button.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Button } from '../src/button'

describe('Button', () => {
  it('renders with loading state', () => {
    const wrapper = mount(Button, {
      props: { isLoading: true },
      slots: { default: 'Submit' }
    })
    const button = wrapper.find('button')
    expect(button.element.disabled).toBe(true)
    expect(button.text()).toBe('Submit')
  })
})
```

**Step 3: Verify Test Parity**

```bash
# Count React test cases
grep -c "it('.*')" packages/components/button/tests/button.test.tsx
# Output: 15

# Count Vue test cases (should match)
grep -c "it('.*')" packages/components/vue-button/tests/button.test.ts
# Output: 15 ✅

# If counts don't match, identify missing tests
```

**Required Test Categories** (mirror from React):

- [ ] Rendering with default props
- [ ] All variant values
- [ ] All size values
- [ ] Disabled/enabled states
- [ ] Loading states
- [ ] Event handlers (onClick, onChange, etc.)
- [ ] Accessibility (ARIA attributes, roles)
- [ ] Custom styling (sx, \_\_css)
- [ ] Composition (groups, nested components)
- [ ] Edge cases from React tests

**Accessibility Testing**:

```bash
# Install axe-core
pnpm add -D @axe-core/cli

# Run on component demo
pnpm dev # Start dev server
axe http://localhost:3000/button --tags wcag2a,wcag2aa
```

**Visual Regression** (optional but recommended):

```bash
# Install Storybook
pnpm dlx storybook@latest init

# Add stories for each component
# packages/components/vue-button/stories/button.stories.ts

# Visual testing with Chromatic
pnpm add -D chromatic
pnpm chromatic --project-token=<token>
```

**Coverage Requirements**:

- Overall: > 80%
- Critical paths: 100% (theme integration, accessibility)
- Each component: > 75%

### Phase 4: Main Package Assembly (Week 13)

#### 4.1 Create `@chakra-ui/vue` Package

**Goal**: Aggregate all Vue components into single entry point

**Structure**:

```typescript
// packages/components/vue/src/index.ts
export * from "@chakra-ui/vue-system"
export * from "@chakra-ui/vue-button"
export * from "@chakra-ui/vue-accordion"
export * from "@chakra-ui/vue-modal"
// ... 40+ more exports
export * from "@chakra-ui/theme"
export * from "@chakra-ui/vue-utils"

// Re-export provider
export { ChakraProvider } from "./chakra-provider"
```

**package.json**:

```json
{
  "name": "@chakra-ui/vue",
  "version": "3.0.0",
  "description": "Responsive and accessible Vue UI components built with Vue 3 and Ark UI",
  "main": "src/index.ts",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "sideEffects": false,
  "dependencies": {
    "@chakra-ui/vue-system": "workspace:*",
    "@chakra-ui/vue-button": "workspace:*",
    "@chakra-ui/vue-accordion": "workspace:*",
    "@chakra-ui/theme": "workspace:*",
    "@chakra-ui/styled-system": "workspace:*",
    "@chakra-ui/theme-utils": "workspace:*"
  },
  "peerDependencies": {
    "@ark-ui/vue": "^3.0.0",
    "vue": "^3.3.0"
  },
  "scripts": {
    "build": "tsup src --dts",
    "build:fast": "tsup src",
    "dev": "pnpm build:fast -- --watch",
    "typecheck": "tsc --noEmit"
  }
}
```

### Phase 5: Documentation & Examples (Week 14-15)

#### 5.1 Documentation

**Tasks**:

- [ ] Create `packages/components/vue/README.md` with:
  - Installation instructions
  - Quick start guide
  - Basic usage examples
  - Theming guide
  - Migration from React version
- [ ] Add Vue examples to Storybook (or separate Vue Storybook)
- [ ] Document differences from React version
- [ ] Create CodeSandbox templates

**Example README**:

````markdown
# @chakra-ui/vue

Chakra UI for Vue 3 - Accessible and composable component library.

## Installation

```bash
pnpm add @chakra-ui/vue @ark-ui/vue
```
````

## Quick Start

```vue
<script setup>
import { ChakraProvider, Button } from '@chakra-ui/vue'
</script>

<template>
  <ChakraProvider>
    <Button colorScheme="blue">Click me</Button>
  </ChakraProvider>
</template>
```

## Features

- ✅ 45+ accessible components
- ✅ Dark mode support
- ✅ Fully typed with TypeScript
- ✅ Customizable theming
- ✅ Responsive design
- ✅ SSR compatible

````

#### 5.2 Example Applications

**Create example apps**:
- [ ] `examples/vue-vite` - Vite + Vue 3
- [ ] `examples/vue-nuxt` - Nuxt 3
- [ ] `examples/vue-typescript` - Full TypeScript setup

### Phase 6: Build & Release (Week 16)

#### 6.1 Build System

**Tasks**:
- [ ] Configure tsup for all Vue packages
- [ ] Update `turbo.json` with Vue package build pipeline
- [ ] Ensure proper tree-shaking
- [ ] Generate type definitions
- [ ] Test bundle sizes

#### 6.2 CI/CD

**Tasks**:
- [ ] Add Vue package to CI test matrix
- [ ] Configure Vue component tests
- [ ] Add Vue build to GitHub Actions
- [ ] Setup changesets for versioning

#### 6.3 Release

**Tasks**:
- [ ] Publish alpha versions for testing
- [ ] Gather community feedback
- [ ] Fix issues and iterate
- [ ] Publish beta version
- [ ] Final release as v3.0.0

## Theming: Single Source of Truth

### Current State

The `@chakra-ui/theme` package contains all theming configuration:
- Design tokens (colors, spacing, typography)
- Semantic tokens (light/dark mode variants)
- Component style configurations
- Global styles

### Strategy for Shared Theme

#### 1. Keep Theme Package Framework-Agnostic

**Verification checklist**:
- ✅ Theme is exported as plain JavaScript objects
- ✅ No React-specific code (JSX, hooks, components)
- ✅ Style functions receive context as parameters (not hooks)
- ✅ All utilities are pure functions

**Example of framework-agnostic style config**:
```typescript
// ✅ Good - Framework agnostic
export const buttonTheme = defineStyleConfig({
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: 'md'
  },
  variants: {
    solid: (props) => ({
      bg: `${props.colorScheme}.500`,
      color: 'white',
      _hover: {
        bg: `${props.colorScheme}.600`
      }
    })
  }
})

// ❌ Bad - React-specific
export const buttonTheme = {
  baseStyle: () => {
    const colorMode = useColorMode() // React hook!
    return { ... }
  }
}
````

#### 2. Style Resolution Pattern

Both React and Vue will use the same resolution flow:

```
1. ChakraProvider receives theme object
2. Theme is processed by toCSSVar() → CSS custom properties
3. Components call useStyleConfig(componentName, props)
4. resolveStyleConfig() merges: baseStyle → variants → sizes
5. Style functions receive { theme, colorMode, colorScheme }
6. Final styles applied to component
```

**React implementation**:

```typescript
const styles = useStyleConfig("Button", props)
```

**Vue implementation** (same API!):

```typescript
const styles = useStyleConfig("Button", props)
```

#### 3. Theme Customization

Users can customize theme for both frameworks:

```typescript
// theme.ts (shared between React and Vue)
import { extendTheme } from '@chakra-ui/theme'

export const customTheme = extendTheme({
  colors: {
    brand: {
      50: '#f5e9ff',
      // ...
      900: '#3d0066'
    }
  },
  components: {
    Button: {
      variants: {
        brand: {
          bg: 'brand.500',
          color: 'white'
        }
      }
    }
  }
})

// React app
<ChakraProvider theme={customTheme}>
  <App />
</ChakraProvider>

// Vue app
<ChakraProvider :theme="customTheme">
  <App />
</ChakraProvider>
```

#### 4. Color Mode Handling

**Current (React)**:

- Uses React Context for color mode state
- `useColorMode()` hook

**Vue Implementation**:

- Use Vue's provide/inject for color mode state
- `useColorMode()` composable (same API)
- Share color mode logic via `@chakra-ui/color-mode-utils` (new shared package)

```typescript
// @chakra-ui/color-mode-utils (framework-agnostic)
export function resolveColorModeValue<T>(
  light: T,
  dark: T,
  colorMode: 'light' | 'dark'
): T {
  return colorMode === 'light' ? light : dark
}

// React: @chakra-ui/react-color-mode
export function useColorMode() {
  const context = useContext(ColorModeContext)
  return context
}

// Vue: @chakra-ui/vue-color-mode
export function useColorMode() {
  const context = inject(ColorModeSymbol)
  return context
}
```

### Theme Package Structure (Enhanced)

```
packages/components/theme/
├── src/
│   ├── index.ts                    # Main export
│   ├── foundations/                # Design tokens
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   ├── shadows.ts
│   │   └── ...
│   ├── semantic-tokens/            # Mode-aware tokens
│   │   └── colors.ts
│   ├── components/                 # Component styles
│   │   ├── button.ts
│   │   ├── accordion.ts
│   │   ├── modal.ts
│   │   └── ... (50+ components)
│   ├── styles/                     # Global styles
│   │   └── global.ts
│   └── utils/                      # Theme utilities
│       ├── extend-theme.ts         # Theme merging
│       ├── define-style.ts         # Style helpers
│       └── resolve-config.ts       # Style resolution
```

**All files must be pure JavaScript - no framework dependencies!**

## Technical Decisions & Considerations

### 1. CSS-in-JS Solution

**Context**: A critical goal of the React package is to eventually remove the
Emotion dependency to reduce bundle size. Vue should learn from this and avoid
heavy runtime CSS-in-JS libraries from the start.

**Options**:

1. **Port Emotion to Vue** ❌

   - Emotion is React-specific
   - Adds significant bundle size
   - React is actively working to remove it

2. **Use existing Vue CSS-in-JS library** ❌

   - Vue doesn't have a dominant CSS-in-JS solution
   - Would diverge from React implementation
   - Adds unnecessary runtime overhead

3. **Zero-Runtime CSS with Custom Properties** ✅ **RECOMMENDED**
   - Leverage existing `toCSSVar` from `@chakra-ui/styled-system`
   - CSS custom properties are framework-agnostic
   - Minimal runtime overhead
   - Static CSS generation where possible
   - Use Vue's native `style` bindings for dynamic values

**Architecture Decision**: Build Vue without heavy runtime CSS-in-JS from day 1.
This avoids the migration pain React is experiencing and keeps bundle sizes
small.

**Implementation Strategy**:

```typescript
import { toCSSVar } from "@chakra-ui/styled-system"
import { computed } from "vue"

// 1. Convert theme to CSS variables (done once at app level)
export function useChakraProvider(theme: Theme) {
  const cssVars = computed(() => toCSSVar(theme))
  // Inject as <style> tag or root element styles
  return cssVars
}

// 2. Components use CSS classes + inline styles for dynamic values
export function useStyleConfig(themeKey: string, props: StyleProps) {
  const styles = resolveComponentStyleConfig({ themeKey, ...props })

  return computed(() => ({
    // Static styles as CSS classes (can be extracted at build time)
    class: generateStaticClasses(styles),
    // Dynamic values as inline styles using CSS custom properties
    style: generateDynamicStyles(styles),
  }))
}
```

**Benefits**:

- **Smaller Bundle**: No CSS-in-JS runtime library
- **Better Performance**: CSS custom properties are native browser features
- **Framework Parity**: Same `toCSSVar` logic as React
- **Future-Proof**: Easier to add compile-time CSS extraction later
- **SSR-Friendly**: CSS custom properties work seamlessly with SSR

### 2. Ark UI vs Custom Hooks

**Decision**: Use Ark UI for complex components

**Rationale**:

- ✅ Battle-tested accessibility
- ✅ Cross-framework consistency (React, Vue, Solid, Svelte)
- ✅ Built on Zag.js state machines
- ✅ Maintained by Chakra UI team
- ✅ Reduces maintenance burden
- ❌ Additional dependency

**Alternative**: Reimplement all logic

- ❌ Massive time investment
- ❌ Accessibility bugs likely
- ❌ Divergence from React version

### 3. Monorepo vs Single Package

**Decision**: Start with single package, split later if needed

**Phase 1 (MVP)**: Single `@chakra-ui/vue` package

- Faster development
- Easier to iterate
- Simpler for users

**Phase 2 (Optimization)**: Split into component packages

- Better tree-shaking
- Granular updates
- Matches React structure

### 4. TypeScript Support

**Required**:

- Full TypeScript support from day 1
- Generic props with proper inference
- Theme type augmentation
- Component prop types exported

**Example**:

```typescript
import type { SystemStyleObject } from "@chakra-ui/styled-system"
import type { ComponentPropsWithoutRef } from "vue"

export interface ChakraProps {
  sx?: SystemStyleObject
  __css?: SystemStyleObject
}

export interface ButtonProps extends ChakraProps {
  variant?: "solid" | "outline" | "ghost" | "link"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  colorScheme?: string
  isLoading?: boolean
  isDisabled?: boolean
}
```

### 5. Vue 2 vs Vue 3

**Decision**: Vue 3 only

**Rationale**:

- Vue 2 is in maintenance mode
- Composition API is essential for clean implementation
- Script setup syntax improves DX
- Better TypeScript support in Vue 3

### 6. SSR Support

**Required**: Full SSR support for Nuxt

**Considerations**:

- Color mode handling with SSR
- CSS injection on server
- Hydration mismatch prevention
- Portal/Teleport handling

## Migration Path for Users

### For Chakra UI React Users

**Similarities**:

- ✅ Same component names
- ✅ Same props API (mostly)
- ✅ Same theming system
- ✅ Same design tokens

**Differences**:

- Vue uses `v-model` instead of `value` + `onChange`
- Events use `@event` instead of `onEvent` prop
- Refs use Vue's ref system
- Slots instead of `children` prop

**Example**:

```jsx
// React
<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Enter text"
/>

// Vue
<Input
  v-model="value"
  placeholder="Enter text"
/>
```

### For Ark UI Vue Users

**Benefits**:

- ✅ Get beautiful default styling
- ✅ Pre-configured theme system
- ✅ Color mode support
- ✅ Responsive styles
- ✅ Variant system

**Migration**:

```vue
<!-- Before: Ark UI -->
<script setup>
import { Accordion } from '@ark-ui/vue'
</script>

<template>
  <Accordion.Root class="my-accordion">
    <Accordion.Item class="my-item">
      <Accordion.Trigger class="my-trigger">
        Trigger
      </Accordion.Trigger>
      <Accordion.Content class="my-content">
        Content
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</template>

<style>
.my-accordion { /* custom styles */ }
.my-item { /* custom styles */ }
/* ... */
</style>

<!-- After: Chakra UI Vue -->
<script setup>
import { Accordion, AccordionItem } from '@chakra-ui/vue'
</script>

<template>
  <Accordion>
    <AccordionItem>
      <AccordionButton>Trigger</AccordionButton>
      <AccordionPanel>Content</AccordionPanel>
    </AccordionItem>
  </Accordion>
</template>

<!-- No custom styles needed! -->
```

## Success Metrics

### Coverage

- [ ] 95%+ component parity with React version
- [ ] All 50+ components implemented
- [ ] Full theme compatibility

### Quality

- [ ] 90%+ test coverage
- [ ] All components WCAG 2.1 AA compliant
- [ ] Zero critical accessibility issues
- [ ] TypeScript strict mode passes

### Performance

- [ ] Bundle size < React version + 20%
- [ ] Initial render < 100ms for basic components
- [ ] Tree-shaking works correctly
- [ ] SSR hydration works without flicker

### Documentation

- [ ] Every component has usage examples
- [ ] Theming guide published
- [ ] Migration guide published
- [ ] 3+ example applications

### Community

- [ ] Published to npm as `@chakra-ui/vue`
- [ ] Documented in official Chakra UI docs
- [ ] Announcement blog post
- [ ] Community feedback incorporated

## Risks & Mitigations

### Risk: Ark UI API Changes

- **Impact**: Medium
- **Mitigation**: Pin Ark UI version, abstract Ark UI usage behind internal API

### Risk: Vue 3 Breaking Changes

- **Impact**: Low (Vue 3 is stable)
- **Mitigation**: Follow Vue RFCs, maintain compatibility layer

### Risk: Theme Divergence

- **Impact**: High
- **Mitigation**: Automated tests comparing React and Vue theme output

### Risk: Maintenance Burden

- **Impact**: High
- **Mitigation**: Strong test coverage, clear contribution guidelines, community
  involvement

### Risk: Bundle Size

- **Impact**: Medium
- **Mitigation**: Code splitting, tree-shaking, lazy loading components

## Next Steps

1. **Create RFC** - Share this plan with Chakra UI maintainers
2. **Get Approval** - Confirm architectural decisions
3. **Prototype** - Build proof-of-concept with 3 components
4. **Validate** - Test with real applications
5. **Iterate** - Refine based on feedback
6. **Execute** - Follow implementation phases
7. **Release** - Ship v3.0.0-alpha.1

## Resources

### Documentation

- [Ark UI Documentation](https://ark-ui.com/)
- [Ark UI Vue Docs](https://ark-ui.com/vue/docs/overview/introduction)
- [Vue 3 Documentation](https://vuejs.org/)
- [Chakra UI React Source](https://github.com/chakra-ui/chakra-ui)

### NPM Packages

- [@ark-ui/vue](https://www.npmjs.com/package/@ark-ui/vue)
- [@chakra-ui/react](https://www.npmjs.com/package/@chakra-ui/react)
- [@chakra-ui/theme](https://www.npmjs.com/package/@chakra-ui/theme)

### Community

- [Chakra UI Discord](https://chakra-ui.com/discord)
- [GitHub Discussions](https://github.com/chakra-ui/chakra-ui/discussions)

---

**Author**: Claude Code **Date**: 2026-01-09 **Version**: 1.0.0 **Status**:
Draft - Awaiting Review
