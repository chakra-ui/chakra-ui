---
"@chakra-ui/charts": patch
---

- **Upgrade recharts** to 3.7.0
- **Prefer responsive prop** over `ResponsiveContainer` when using `Chart.Root`.
  The `responsive` prop avoids React 19 compatibility issues that
  `ResponsiveContainer` can trigger.
- **React 19 + immer fix**: If you see "lanes" is read-only errors, add
  `immer: ">=11.0.1"` to your package manager's overrides.
