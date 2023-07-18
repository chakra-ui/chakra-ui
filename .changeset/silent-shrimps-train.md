---
"@chakra-ui/button": minor
---

add toggle button component Introduce new `ToggleButtonGroup` component to wrap
`Button` components and toggle their values.

```jsx live=false
<ToggleButtonGroup
  onChange={(v) => console.log(v)}
  variant={"outline"}
  exclusive={false}
>
  <Button>Option 1</Button>
  <Button value={"opt 2"}>Option 2</Button>
  <Button>Option 3</Button>
</ToggleButtonGroup>
```
