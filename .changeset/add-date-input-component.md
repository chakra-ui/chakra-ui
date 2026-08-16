---
"@chakra-ui/react": minor
---

**[New] DateInput**: Add a segmented date field for typing dates without a
calendar.

```tsx
import { DateInput } from "@chakra-ui/react"
```

```tsx
<DateInput.Root>
  <DateInput.Label />
  <DateInput.Control>
    <DateInput.Segments />
  </DateInput.Control>
  <DateInput.HiddenInput />
</DateInput.Root>
```

Each part of the date is its own keyboard-navigable segment, ordered and
formatted by `locale`. Supports `selectionMode="range"`, `min`/`max`, and
`granularity` with `formatter` for time-only input.
