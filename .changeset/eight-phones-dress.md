---
"@chakra-ui/react": minor
---

- **Splitter [NEW]**: Introduce new resizable splitter component

```tsx
<Splitter.Root panels={[{ id: "a" }, { id: "b" }]}>
  <Splitter.Panel id="a">Panel A</Splitter.Panel>
  <Splitter.ResizeTrigger id="a:b" />
  <Splitter.Panel id="b">Panel B</Splitter.Panel>
</Splitter.Root>
```
