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

## Linear Progress

```jsx
<Progress value={50} />
```

## Color

Pass the `color` prop to apply any color that exists in the theme to the
progress

```jsx
<Progress color="pink" value={20} />
```

## Sizes

Pass the `size` prop to increase the height of the progress

```jsx
<Progress size="sm" value={20} />
<Progress size="lg" value={20} />
```

## Indeterminate

Pass the `value` for the progress as `undefined` to put the progress component
in the indeterminate state

```jsx
<Progress margin="20px" size="xs" value={undefined} />
```

## With stripe

Pass the `hasStripe` prop to have a beautiful gradient to create a striped
effect on the progress

```jsx
<Progress color="green" hasStripe value={20} />
```

## With animation

Pass the `isAnimated` prop combined with the `hasStrip` prop to get a
beautifully animated progress

```jsx
<Progress hasStripe isAnimated value={20} />
```

## With label

Use the `ProgressLabel` utility component to have a label for the progress
component

```jsx
<Progress value={60}>
  <ProgressLabel>60%</ProgressLabel>
</Progress>
```

## Circular progress

```jsx
<CircularProgress value={50} />
```

## Circular progress size

Pass the `size` prop to change the size of the circular progress. You can also
pass the `thickness` prop to change the thickness of the circular progress. The
`thickness` prop is a fractional value whose actual value is determined by the
`size` of the circular progress. In this example the circular progress will have
a thickness of 30px. 50% of size (120px) => 30px

```jsx
<CircularProgress size="120px" thickness={0.5} value={60} />
```

## Circular progress color

Pass the `color` prop to apply any color that exists in the theme

```jsx
<CircularProgress color="pink" value={20} />
```

## Circular progress with label

Use the `CircularProgressLabel` utility component to have a label for the
circular progress

```jsx
<CircularProgress value={60}>
  <CircularProgressLabel>60%</CircularProgressLabel>
</CircularProgress>
```

## Accessibility

- Progress has a role set to progressbar to denote that it is a progress bar
- Progress has aria-valuenow set to the percentage completion value passed to
  the component, to ensure the progress percent is visible to screen readers.

## Note

The CircularProgress and the Spinner may seem to serve the same purpose, but
semantically, they don't. In the `indeterminate` state the have the following
difference.

### CircularProgress

It is used to denote the progress of a determinate operation. Take for example
an image upload operation:

- Before upload begins, the upload progress is indeterminate (at this point,
  it’s just spinning),
- Once we know the size of the image and begin upload (using axios) then we
  update the progress value of the CircularProgress (at this point, it shows the
  progress). CircularProgress also comes with the aria-\* attributes to make its
  progress value accessible to screenreaders.

CircularProgress also comes with the aria-\* attributes to make its progress
value accessible to screenreaders.

### Spinner

It is more of a “presentational” loading indicator you can use on a page or a
component, while it’s loading or before it renders. It doesn’t have any semantic
meaning.

To give meaning to a Spinner/loading indicator, ARIA standards require that you
mark the area of the component/page that’s loading with `aria-busy=true`.
