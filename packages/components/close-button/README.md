# Close Button

CloseButton is essentially a button with a close icon. It is used to handle the
close functionality in feedback and overlay components like Alerts, Toasts,
Drawers and Modals.

## Installation

```sh
yarn add @chakra-ui/close-button

# or

npm i @chakra-ui/close-button
```

## Import component

```jsx
import { CloseButton } from "@chakra-ui/close-button"
```

## Usage

```jsx
<CloseButton />
```

## Disabled

Pass the `isDisabled` prop to put the close button component in a disabled
state.

```jsx
<CloseButton isDisabled />
```

## Sizes

Pass the size prop to adjust the size of the close button. Values can be sm, md
or lg.

```jsx
<>
  <CloseButton size="sm" />
  <CloseButton size="md" />
  <CloseButton size="lg" />
</>
```
