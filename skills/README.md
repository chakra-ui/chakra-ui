# Chakra UI Skills

Claude Code skills for working with Chakra UI v3. Each skill activates
automatically based on what you ask, so you don't need to name them explicitly.

## Skills

### `chakra-ui-builder`

The primary skill. Covers building UI components, project setup, theming, and
charts.

**Triggers on:**

- Building components, pages, forms, dashboards, navbars, cards, layouts
- Installing or configuring Chakra UI in a new or existing project
- Setting up ChakraProvider, running CLI snippets, fixing provider issues
- Theming: brand colors, design tokens, semantic tokens, dark mode, recipes,
  slot recipes, typegen
- Charts: bar charts, area charts, line charts, pie/donut, `BarList`,
  `BarSegment`

**Examples:** _"make me a login form"_, _"build a stats dashboard"_, _"add
Chakra to my Next.js app"_, _"add my brand colors"_, _"show me a line chart"_

**Reference files** (loaded on demand): | File | Contents | |------|----------|
| `references/theming.md` | `defineConfig`, `createSystem`, tokens, semantic
tokens, recipes, slot recipes, typegen, eject | | `references/charts.md` |
`useChart`, `BarList`, `BarSegment`, `Chart.Root` + Recharts, tooltips, legends,
gradients | | `references/component-decision-tree.md` | When to use each
component, covering all ~114 Chakra components with head-to-head comparisons |

---

### `chakra-ui-refactor`

Reviews existing code for issues and/or converts, improves it using Chakra UI v3
patterns.

**Triggers on:**

- Reviewing code: "is this correct", "what's wrong with this", "review my
  component"
- Refactoring or converting: "refactor this", "convert from Tailwind", "clean
  this up", "chakra-ify this"
- Checking for v2 patterns, wrong prop names, accessibility issues, hardcoded
  colors

**Examples:** _"review my card component"_, _"convert this Tailwind layout to
Chakra"_, _"what's wrong with this form?", "clean up this component"_

**Output modes:**

- **Review only** → structured critique: Critical issues / Improvements /
  Optional suggestions
- **Refactor** → rewritten code + what changed + suggestions
- **Both** → critique first, then rewritten code

---

### `chakra-ui-migrate`

Guides migration from Chakra UI v2 to v3.

**Triggers on:**

- Upgrading Chakra UI versions
- Breaking changes after an upgrade
- Converting v2 patterns (`extendTheme`, `ColorModeScript`, `useColorModeValue`,
  `styleConfig`, `isDisabled`, `colorScheme`)
- Fixing compound components (`Modal→Dialog`, `FormControl→Field`,
  `Select→NativeSelect`)

**Examples:** _"migrate my project to Chakra v3"_, _"isDisabled isn't working"_,
_"update my extendTheme config"_, _"what changed from v2?"_

---

## Structure

```
skills/
├── README.md
├── chakra-ui-builder/
│   ├── SKILL.md
│   └── references/
│       ├── theming.md
│       ├── charts.md
│       └── component-decision-tree.md
├── chakra-ui-migrate/
│   └── SKILL.md
└── chakra-ui-refactor/
    └── SKILL.md
```
