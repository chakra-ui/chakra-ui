# @chakra-ui/layout

A set of layout primitives that make it super easy to manage page and
components.

## Installation

```sh
yarn add @chakra-ui/layout

# or

npm i @chakra-ui/layout
```

## Import Components

```jsx
import { Box, Flex, Stack, Grid, Wrap, AspectRatio } from "@chakra-ui/layout"
```

## Usage

Box is just `div` on steroids. It gives you the ability to pass style props

```jsx
<Box color="tomato" _hover={{ bg: "red.500", color: "white" }}>
  Welcome to Box
</Box>
```

Flex is just a `Box` with `display: flex`

```jsx
<Flex>
  <Box flex="1">Box 1</Box>
  <Box>Box 2</Box>
</Flex>
```

Stack is used to group elements and apply a spacing between them. It stacks it's
children vertically by default.

```jsx
<Stack spacing="20px">
  <Box>Box 1</Box>
  <Box>Box 2</Box>
</Stack>
```

AspectRatio is used to constrain it's child to specific aspect ratio. It's
mostly used for embedding videos, images, and maps.

```jsx
<AspectRatio ratio={16 / 9}>
  <img src="./some-ig-story" alt="Instagram story" />
</AspectRatio>
```

Wrap is used to manage the distribution of child elements that are liable to
wrap. It's mostly used for button groups, tag group, badge group, and chips.

```jsx
<AspectRatio ratio={16 / 9}>
  <img src="./some-ig-story" alt="Instagram story" />
</AspectRatio>
```

Badge is used to render a badge. It can comes in different variants and color
schemes as defined in the `theme.components.Badge`

```jsx
<Badge variant="solid" colorScheme="green">
  Verified <FaCheck />
</Badge>
```

Center is used to vertically and horizontally center it's child

```jsx
<Center bg="blue.500" borderRadius="4px" boxSize="40px">
  <FaPhoneIcon />
</Center>
```

Container is used to manage content areas on a website or blog. It center's
itself using `margin-left: auto` and `margin-right: auto`. It also applies a
default max-width of `60ch` (60 characters)

```jsx
<Container>
  <BlogContent />
</Container>
```

Spacer is a component that takes up the remaining space in a flex container.
It's mostly useful to manage space and wrapping in flex containers

```jsx
<Flex>
  <Box boxSize="40px" />
  <Spacer />
  <Box boxSize="40px" />
</Flex>
```
