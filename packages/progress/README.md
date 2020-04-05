# Progress

The Progress component is an element that displays the progress status for a
task that takes a long time or consists of several steps.

## Installation

```sh
yarn add @chakra-ui/progress

# or

npm i @chakra-ui/progress
```

## Import Components

```jsx
import {
  Progress,
  ProgressLabel
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/progress"
```

## Usage

```jsx
<Progress value={50} />
```

## Color

Pass the `color` prop to apply any color that exists in the theme to the
progressbar

```jsx
<Progress color="pink" value={20} />
```

## Sizes

There are two ways you can increase the height of the progressbar:

- Pass the `size` prop to increase the height of the progressbar.
- Pass the `height` prop to manually set a height.
