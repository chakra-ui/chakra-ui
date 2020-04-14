# Textarea

The Textarea component allows you to easily create multi-line text inputs.

## Installation

```sh
yarn add @chakra-ui/textarea
```

## Import component

```jsx
import { Textarea } from "@chakra-ui/textarea"
```

## Basic Usage

```jsx
<Textarea defaultValue="This is a textarea" placeholder="A simple textarea" />
```

## Disabled

Pass the `isDisabled` prop to put the textarea in the disabled state

```jsx
<Textarea isDisabled placeholder="A disabled textarea" />
```

## Invalid

Pass the `isInvalid` prop to put the textarea in the invalid state

```jsx
<Textarea isInvalid placeholder="An invalid textarea" />
```

## Sizes

Pass the `size` prop to change the size of the textarea

```jsx
<>
  <Textarea
    size="sm"
    placeholder="A sample placeholder"
    defaultValue="This is a small textarea"
  />
  <Textarea
    placeholder="A sample placeholder"
    defaultValue="This is a default textarea"
  />
  <Textarea
    size="lg"
    placeholder="A sample placeholder"
    defaultValue="This is a large textarea"
  />
</>
```

## Resize

Pass the `resize` prop to resize to textarea in the vertical or horizontal
direction

```jsx
<Textarea placeholder="Here is a sample placeholder" resize="horizontal" />
```
