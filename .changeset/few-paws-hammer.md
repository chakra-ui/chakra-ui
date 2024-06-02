---
"@chakra-ui/react": patch
---

- Fix regression in `mergeConfigs`

- Decompose `Field` components into smaller components, which can be optionally
  used with `Field`

  - `Label` which is a generic label component
  - `ErrorMessage` which is a generic error message component
  - `HelpText` which is a generic help text component

- **Refactor components to use Ark UI:** Avatar, Progress, CircularProgress,
  PinInput
