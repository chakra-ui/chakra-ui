# @chakra-ui/menu

An accessible dropdown menu for the common dropdown menu button design pattern.
Menu uses roving tabIndex for focus management.

## Installation

```sh
yarn add @chakra-ui/menu

# or

npm i @chakra-ui/menu
```

## Import components

```js
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react"
```

## Usage

```jsx
<Menu>
  <MenuButton>Actions</MenuButton>
  <MenuList>
    <MenuItem>Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem as="a" href="#">
      Attend a Workshop
    </MenuItem>
  </MenuList>
</Menu>
```

### Accessing the internal state

To access the internal state of the Menu, use a function as a `children`
(commonly known as a render prop). You'll get access to the internal state
`isOpen` and method `onClose`.

```jsx
<Menu>
  {({ isOpen }) => (
    <React.Fragment>
      <MenuButton>{isOpen ? "Close" : "Open"}</MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem onClick={() => alert("Kagebunshin")}>Create a Copy</MenuItem>
      </MenuList>
    </React.Fragment>
  )}
</Menu>
```

### Letter Navigation

When focus is on the `MenuButton` or within the `MenuList` and you type a letter
key, a search begins. Focus will move to the first `MenuItem` that starts with
the letter you typed.

> Open the menu, try and type any letter, say "S" to see the focus movement.

```jsx
<Menu>
  <MenuButton
    px={4}
    py={2}
    transition="all 0.2s"
    borderRadius="md"
    borderWidth="1px"
    _hover={{ bg: "gray.100" }}
    _expanded={{ bg: "red.200" }}
    _focus={{ outline: 0, boxShadow: "outline" }}
  >
    File <ChevronDownIcon />
  </MenuButton>
  <MenuList>
    <MenuItem>New File</MenuItem>
    <MenuItem>New Window</MenuItem>
    <MenuDivider />
    <MenuItem>Open...</MenuItem>
    <MenuItem>Save File</MenuItem>
  </MenuList>
</Menu>
```

### Just another example.

```jsx
<Menu>
  <MenuButton>Your Cats</MenuButton>
  <MenuList>
    <MenuItem minH="48px">
      <Image
        size="2rem"
        borderRadius="full"
        src="https://placekitten.com/100/100"
        alt="Fluffybuns the destroyer"
        mr="12px"
      />
      <span>Fluffybuns the Destroyer</span>
    </MenuItem>
    <MenuItem minH="40px">
      <Image
        size="2rem"
        borderRadius="full"
        src="https://placekitten.com/120/120"
        alt="Simon the pensive"
        mr="12px"
      />
      <span>Simon the pensive</span>
    </MenuItem>
  </MenuList>
</Menu>
```

### MenuGroup

To group related `MenuItems`, use the `MenuGroup` component and pass it a label
for the group name.

```jsx
<Menu>
  <MenuButton>Profile</MenuButton>
  <MenuList>
    <MenuGroup title="Profile">
      <MenuItem>My Account</MenuItem>
      <MenuItem>Payments </MenuItem>
    </MenuGroup>
    <MenuDivider />
    <MenuGroup title="Help">
      <MenuItem>Docs</MenuItem>
      <MenuItem>FAQ</MenuItem>
    </MenuGroup>
  </MenuList>
</Menu>
```

## Menu option groups

You can compose a menu for table headers to help with sorting and filtering
options. Use the `MenuOptionGroup` and `MenuItemOption` components.

```jsx
<Menu closeOnSelect={false}>
  <MenuButton>MenuItem</MenuButton>
  <MenuList minWidth="240px">
    <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
      <MenuItemOption value="asc">Ascending</MenuItemOption>
      <MenuItemOption value="desc">Descending</MenuItemOption>
    </MenuOptionGroup>
    <MenuDivider />
    <MenuOptionGroup title="Country" type="checkbox">
      <MenuItemOption value="email">Email</MenuItemOption>
      <MenuItemOption value="phone">Phone</MenuItemOption>
      <MenuItemOption value="country">Country</MenuItemOption>
    </MenuOptionGroup>
  </MenuList>
</Menu>
```

## `closeOnSelect`

`MenuItem` and `MenuItemOption` can use the `closeOnSelect` prop to override
their parent `Menu`'s behavior.

```jsx
<Menu>
  <MenuButton>Open Menu</MenuButton>
  <MenuList>
    <MenuGroup title="Profile">
      {/* Clicking on those items will close the menu (default behavior) */}
      <MenuItem>My Account</MenuItem>
      <MenuItem>Payments</MenuItem>
    </MenuGroup>
    <MenuDivider />
    <MenuOptionGroup title="Country" type="checkbox">
      {/* Clicking on those items will keep the menu open */}
      <MenuItemOption value="email" closeOnSelect={false}>
        Email
      </MenuItemOption>
      <MenuItemOption value="phone" closeOnSelect={false}>
        Phone
      </MenuItemOption>
      <MenuItemOption value="country" closeOnSelect={false}>
        Country
      </MenuItemOption>
    </MenuOptionGroup>
  </MenuList>
</Menu>
```
