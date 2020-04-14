# Migration Notes

## Changes

- Support for the `variantColor` prop has been deprecated. Use `colorScheme`
  prop instead.

For example, `<Tag colorScheme="blue"/>`

```jsx
// before
<Tag variantColor="blue"/>

// after
<Tag colorScheme="blue"/>
```

- Support for the `isDisabled` prop for the TagCloseButton

```jsx
<Tag variant="solid" size="sm" colorScheme="cyan">
  <TagLabel>Tab Label</TagLabel>
  <TagCloseButton isDisabled={true} />
</Tag>
```
