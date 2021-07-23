---
"@chakra-ui/editable": minor
---

Add textarea element to handle multi line text input with editable context.

1. Use union type

```typescript
// editable/src/use-editable.ts
  ...
  const [value, setValue] = useControllableState({
    defaultValue: defaultValue || "",
    value: valueProp,
    onChange: onChangeProp,
  })
  ...
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
```

Because the editable context has one controllable state as default, use union
type for input to make compatibility with the above condition.

1. split test suite for editable textarea

Despite of the similarity of `editable.test.tsx` and
`editableTextarea.test.tsx`, which is the test file in `editable pakage`, I
choose to split test suite to minimize lines of suite.
