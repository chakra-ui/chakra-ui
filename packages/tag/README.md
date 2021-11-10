# Tag

This component is displayed as an accessible tag with an optional link and/or
button to remove it.

## Installation

```sh
yarn add @chakra-ui/tag
```

## Import component

```jsx
import { Tag } from "@chakra-ui/tag"
```

## Basic Usage

```jsx
<Tag />
```

## Sizes

Pass the `size` prop to change the size of the tag.

```jsx
<>
  <Tag size="sm" colorScheme="gray">
    Gray
  </Tag>
  <Tag colorScheme="gray">Gray</Tag>
  <Tag size="lg" colorScheme="gray">
    Gray
  </Tag>
</>
```

## Color

Pass the `colorScheme` prop to change the background color of the tag component

```jsx
<>
  <Tag colorScheme="pink">Pink</Tag>
</>
```

## With icon

The tag component can contain an Icon. This is done by using the `TagIcon`
component withtin the tag component.

```jsx
<>
  <Tag colorScheme="cyan">
    <TagIcon size="12px" as={AddIcon} />
    <TagLabel>Green</TagLabel>
  </Tag>
</>
```

## With close button

Use the `TagCloseButton` to apply a close button to the tag component.

```jsx
<Tag variant="solid" size="sm" colorScheme="cyan">
  <TagLabel>Tab Label</TagLabel>
  <TagCloseButton />
</Tag>
```

## With custom element

Tag component can contain a custom element. This is done by placing the custom
element within the tag component.

```jsx
<Tag size="lg" colorScheme="red" borderRadius="full">
  <Avatar
    src="https://bit.ly/sage-adebayo"
    size="xs"
    name="Segun Adebayo"
    ml={-1}
    mr={2}
  />
  <TagLabel>Segun</TagLabel>
  <TagCloseButton />
</Tag>
```
