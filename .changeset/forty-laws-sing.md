---
"@chakra-ui/menu": patch
---

Add support for setting the initially focused menu programmatically

```jsx live=false
const Example = () => {
  const itemRef = useRef(null)
  return (
    <Menu initialFocusRef={item}>
      <MenuButton>Welcome</MenuButton>
      <MenuList>
        <MenuItem>Menu 1</MenuItem>
        <MenuItem ref={itemRef}>Menu 2</MenuItem>
        <MenuItem>Menu 3</MenuItem>
      </MenuList>
    </Menu>
  )
}
```
