# ControlBox

ControlBox composes `Box` component and provides props to style itself based on
a sibling `checkbox` or `radio` input.

It also uses the underscore "\_" notation just like the `PseudoBox`. All styles
support the shorthand notation of the `Box` component.

NOTE 🚨: For this component to work, you should have a sibling `input` and they
should both be wrapped in a `label`

Here's how it works:

---

Let's say you want to create a custom Checkbox, here's a popular CSS technique
to go about it

```jsx
<label>
  <VisuallyHidden as="input" type="checkbox" />
  <ControlBox
    border="1px"
    borderColor="gray.200"
    size="24px"
    _hover={{ borderColor: "green.600" }}
    _focus={{ borderColor: "green.600", boxShadow: "outline" }}
  >
    <CheckIcon size="16px" />
  </ControlBox>
</label>
```

PseudoBox can be used to create custom radio and checkboxes. It provides props
for the following selectors

| Selector                       | Prop                  | Description                                                                  |
| ------------------------------ | --------------------- | ---------------------------------------------------------------------------- |
| `[input]:hover + &`            | `_hover`              | Styles for when the sibling `input` is hovered                               |
| `[input]:focus + &`            | `_focus`              | Styles for when the sibling `input` is focused                               |
| `[input]:disabled + &`         | `_disabled`           | Styles for when the sibling `input` is disabled                              |
| `[input]:checked + &`          | `_hover`              | Styles for when the sibling `input` is checked                               |
| `[input]:checked:disabled + &` | `_checkedAndDisabled` | Styles for when the sibling `input` is checked and disabled                  |
| `[input]:checked:focus + &`    | `_checkedAndFocus`    | Styles for when the sibling `input` is checked and focused                   |
| `[input]:checked:hover + &`    | `_checkedAndHover`    | Styles for when the sibling `input` is checked and hovered                   |
| `[input] + & > *`              | `_child`              | Styles for the child of the `ControlBox`                                     |
| `[input]:checked + & > *`      | `_checkedAndChild`    | Styles for the child of the `ControlBox` when the sibling `input` is checked |
