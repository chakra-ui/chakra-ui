# Migration Notes

## New Features ⚡️

Added support for nested menus or submenus

```jsx
const PreferencesMenu = forwardRef((props, ref) => {
  return (
    <Menu>
      <MenuButton ref={ref} {...props}>
        Preferences
      </MenuButton>
      <MenuList>
        <MenuItem>Settings</MenuItem>
        <MenuItem isDisabled>Extensions</MenuItem>
        <MenuSeparator />
        <MenuItem>Keyboard shortcuts</MenuItem>
      </MenuList>
    </Menu>
  )
})

function Example() {
  return (
    <Menu>
      <MenuButton>Code</MenuButton>
      <MenuList>
        <MenuItem>About Visual Studio Code</MenuItem>
        <MenuItem>Check for Updates...</MenuItem>
        <MenuSeparator />
        <MenuItem as={PreferencesMenu} />
      </MenuList>
    </Menu>
  )
}
```

Support for menu icons and commands (or hotkeys

```jsx
<Menu>
  <MenuButton size="sm" colorScheme="teal">
    Open menu
  </MenuButton>
  <MenuList>
    <MenuItem command="⌘T">New Tab</MenuItem>
    <MenuItem command="⌘N">New Window</MenuItem>
    <MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
    <MenuItem command="⌘O">Open File...</MenuItem>
  </MenuList>
</Menu>
```

Support for menu transitions and animations

> It's important to use the `css` or `__css` prop for the transitions to work
> properly. For some reason, it doesn't work with the `style` native prop

```jsx
<Menu>
  <MenuButton size="sm" colorScheme="teal">
    Open menu
  </MenuButton>
  <MenuTransition>
    {(styles) => (
      <MenuList css={styles}>
        <MenuItem command="⌘T">New Tab</MenuItem>
        <MenuItem command="⌘N">New Window</MenuItem>
        <MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
        <MenuItem command="⌘O">Open File...</MenuItem>
      </MenuList>
    )}
  </MenuTransition>
</Menu>
```

Added support for Portals. Just wrap the `MenuList` in the `Portal` component
and you're good to go!

```jsx
<Menu>
  <MenuButton size="sm" colorScheme="teal">
    Open menu
  </MenuButton>
  <Portal>
    <MenuList>
      <MenuItem>Menu 1</MenuItem>
      <MenuItem>New Window</MenuItem>
      <MenuItem>Open Closed Tab</MenuItem>
      <MenuItem>Open File</MenuItem>
    </MenuList>
  </Portal>
</Menu>
```

Moved to Popper V2 🥳

## Bug Fixes

- Fixed issue with `as` prop for `MenuItem`

- Fixed issue with Link not navigating to the specified `href` value

- Fixed issue where menu popper gets cut off when component is far right

- Fixed issue where Menu throws if no `MenuItem` exist

- Fixed issue where `closeOnSelect` doesn't work on navigation with when using
  `MenuItem` as link
