---
"@chakra-ui/theme": patch
---

**Popover**

- Moved `maxW` from popover's `popper` to `content` to allow for better control
  of the popover's width.
- Use `width` instead of `maxW` to allow users more control of popover's width
- Use `--popover-bg` css property to control popover and arrow background.

```jsx live=false
<PopoverContent style={{ "--popover-bg": "purple" }}>
  <PopoverArrow />
</PopoverContent>
```

- Add popover arrow shadow color
