# Migration Notes

## Changes

- Support for `size` has been deprecated. Use `boxSize` prop. We've reserved the
  `size` prop to refer to component size variants.

For example, `<Button size="md">Click</Button>`

```jsx
// before
<Box size="40px" />

// after
<chakra.div boxSize="40px"/>
```

- Addition of chakra jsx elements to make it even easier to style components
  without having to use the `as` prop in Box

```jsx
// before
<Box as="h2" fontSize="40px" />

// after
<chakra.h2 fontSize="40px"/>

// still want Box? No problem!
const Box = chakra.div

<Box>This is your box</Box>
```

- [Link] Due to accessibility reasons, We're deprecating the `isDisabled` prop
  from link. A link should never be allowed to be disabled.

- [Stack] To reduce the API surface, we're deprecating the `isInline` and
  `isReversed` prop in favor of `direction` prop

- [Stack] We're deprecating support for `shouldWrapChildren` prop because we now
  use css to manage the stack rather than `React.cloneElement`. Thanks to
  [https://github.com/chakra-ui/chakra-ui/pull/277]

- [Stack] We're constrained Stack's direction to only `row` and `column`.
  Support for reversing the direction is no longer available.

- New components ✨: We've added new layout components such as Wrap, Spacer, and
  Center.

- AspectRatioBox now renamed to just `AspectRatio` to keep it concise

- All components can now take the pseudo style props (`_hover`, `_active`, etc.)

## Features

Stack

- Support for responsive `direction` and `spacing` prop

```jsx
// before
// how the heck do I make this responsive ?? 😡
<Stack isInline>
  <Box />
  <Box />
</Stack>

// after
// cool! now that's amazing 🤩
<Stack direction={["column", "row"]}>
  <Box />
  <Box />
</Stack>
```

- Support for divider prop between stacked element. Dividers also work with
  responsive direction and spacing.

```jsx
// before
// how the heck do I add a divider ?? 😡
<Stack isInline>
  <Box />
  <Divider />
  <Box />
</Stack>

// after
// cool! now that's amazing 🤩
<Stack divider={<StackDivider />}>
  <Box />
  <Box />
</Stack>
```
