# Migration Notes

## Changes

- Ensure consistent usage of the `icon` prop. `leftIcon` and `rightIcon` props
  are now react elements not react element types.

  Here's what I mean

  ```tsx
  // before
  const Before = () => <Button leftIcon={PhoneIcon}>Call</Button>

  // after
  const After = () => <Button leftIcon={<PhoneIcon />}>Call</Button>
  ```

- Change `variantColor` prop to `colorScheme` for better intuitiveness.

## New Features

- Spinner uses the same alignment as the leftIcon and respects the `iconSpacing`

- Add support for `spinner` prop to allow users add their custom spinners.
