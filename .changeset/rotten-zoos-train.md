---
"@chakra-ui/toast": minor
---

Added support for custom icons in a toast:

```tsx
const toast = useToast()
return (
  <Button
    onClick={() => {
      toast({
        title: "Message me",
        icon: "💬",
      })
    }}
  >
    Show Toast with custom icon
  </Button>
)
```
