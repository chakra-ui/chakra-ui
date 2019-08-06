# PseudoBox

PseudoBox composes `Box` component and provides props to style common CSS pseudo
selectors.

To style `&:hover`, use the `_hover` prop. We use the underscore "\_" notation
to visually separate pseudo props from regular props. All styles support the
shorthand notation of the `Box` component.

Here's how it works:

---

Let's say you want to create a Button, here's how to do so with `PseudoBox`

```jsx
<PseudoBox
  as="button"
  bg="green.500"
  height="40px"
  px="24px"
  _hover={{ bg: "green.600" }}
  _active={{ bg: "green.700" }}
  _disabled={{ bg: "green.50" }}
/>
```

It was created to help reduce the need to pass `css` prop or use `styled(...)`
function to style common pseudo states.

Let's say you want to create an Input, here's how to do so with `PseudoBox`

```jsx
<PseudoBox
  as="input"
  height="40px"
  px="24px"
  border="2px"
  borderColor="gray.200"
  _focus={{ borderColor: "green.700", boxShadow: "outline" }}
/>
```

PseudoBox can be used to style any interactive component. You can apply styles
to the following selectors. The selectors are also ARIA-friendly to help you
naturally use `aria` attributes for better accessibility.

| Selector                             | Prop           |
| ------------------------------------ | -------------- |
| `&:hover`                            | `_hover`       |
| `&:active`                           | `_active`      |
| `&:focus`                            | `_focus`       |
| `&:before`                           | `_before`      |
| `&:after`                            | `_after`       |
| `&::placeholder`                     | `_placeholder` |
| `&:first-of-type`                    | `_firstChild`  |
| `&:last-of-type`                     | `_lastChild`   |
| `&:disabled, [aria-disabled=true]`   | `_disabled`    |
| `&[readonly], &[aria-readonly=true]` | `_readonly`    |
| `&[aria-checked=true]`               | `_checked`     |
| `&[aria-selected=true]`              | `_selected`    |
| `&[aria-expanded=true]`              | `_expanded`    |
| `&[aria-invalid=true]`               | `_invalid`     |
| `&[aria-pressed=true]`               | `_pressed`     |
| `&[aria-invalid=true]`               | `_invalid`     |
| `&[aria-grabbed=true]`               | `_grabbed`     |
