# Spinner

Spinners provide a visual cue that an action is processing, awaiting a course of
change or a result.

## Installation

```sh
yarn add @chakra-ui/spinner

# or

npm i @chakra-ui/spinner
```

## Import component

```jsx
import { Spinner } from "@chakra-ui/spinner"
```

## Usage

```jsx
<Spinner />
```

## Spinner with different sizes

Change the size of the spinner by passing the `size` prop.

```jsx
<>
  <Spinner size="xs" marginRight={3} />
  <Spinner size="sm" marginRight={3} />
  <Spinner size="md" marginRight={3} />
  <Spinner size="lg" marginRight={3} />
  <Spinner size="xl" />
</>
```

## Spinner with color

Change the background color of the moving section of the spinner by passing the
`color` prop.

```jsx
<Spinner color="red.500" />
```

## Spinner with empty area color

Change the background color of the spinner by passing the `emptyColor` prop.

```jsx
<Spinner color="red.500" emptyColor="gray.200" />
```

## Spinner with different speed

Change the spinner's animation speed area by passing the `speed` prop. The unit
of the value matches the
[`animation-duration CSS property`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration)
property.

```jsx
<Spinner color="red.500" emptyColor="gray.200" speed="0.65s" />
```
