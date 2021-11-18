---
"@chakra-ui/toast": minor
---

The `toast` function now exposes a `containerStyle` property you can use to
override the default styles for the toast container.
```jsx live=false
function Example() {
  // Via instantiation
  const toast = useToast({
    position: "top",
    title: "Container style is customizable",
    containerStyle: {
      maxWidth: "100%",
    },
  })

  // Or via trigger
  return (
    <Button
      onClick={() => {
        toast({
          containerStyle: {
            maxWidth: '100%',
          },
        })
      }}
    >
      Click me to show toast with custom container style.
    </Button>
  )
}
