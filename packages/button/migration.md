# Migration Notes

## Changes

- Ensure consistent usage of the `icon` prop. `leftIcon` and `rightIcon` props
  are now accepts a react element not react element type.

  Here's what I mean

  ```tsx
  // before
  const Before = () => <Button leftIcon={PhoneIcon}>Call</Button>

  // after
  const After = () => <Button leftIcon={<PhoneIcon />}>Call</Button>
  ```

- Change `variantColor` prop to `colorScheme` for better intuitiveness.

## New Features

- Add support for `spinner` prop to allow you render custom spinners.

```jsx
<Button
  isLoading
  colorScheme="blue"
  spinner={<BeatLoader size={8} color="white" />}
>
  Click me
</Button>
```
