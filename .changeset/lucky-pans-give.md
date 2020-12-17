---
"@chakra-ui/styled-system": minor
---

Add gradient support to chakra style props. This PR adds to props:

- `bgGradient`: a shorthand, convenient style prop to apply theme-aware
  gradients.
- `bgClip`: a shorthand for `background-clip` CSS attribute. Useful when
  creating text gradients.
- `backgroundClip`: the typical `background-clip` CSS attribute. Useful when
  creating text gradients.

## The Background Gradient API

To add a gradient to a component, pass the `bgGradient` prop and set its value
following the API below:

`<direction> <from>:<to>`

The direction can be either of the following values:

```js
"to-t" // 'to top'
"to-tr" // 'to top right'
"to-r" // 'to right'
"to-br" // 'to bottom right'
"to-b" // 'to bottom'
"to-bl" // 'to bottom left'
"to-l" // 'to left'
"to-tl" // 'to top left'

```

```jsx
<Box w="500px" h="200px" bgGradient="to-r gray.300:pink.200" />
```

You can use both theme-aware color tokens or raw CSS color values.

```jsx
<Box w="500px" h="200px" bgGradient="to-l #7928CA:#FF0080" />
```

### Multiple Color Stops

`<direction> <from>:<via>:<via>:<to>` - This is a gradient with multiple stops

```jsx
<Box w="500px" h="200px" bgGradient="to-r gray.300:yellow.400:pink.200" />
```

## The Text Gradient API

To add a text gradient, pass the `bgGradient` following the API and `bgClip`
prop to `text`.

```jsx
<Text
  bgGradient="to-l #7928CA:#FF0080"
  bgClip="text"
  fontSize="7xl"
  fontWeight="extrabold"
>
  Welcome to Chakra UI
</Text>
```

## Tips

- We set the gradient's direction to `to right` by default so you can omit that
  and specify just the color stops

```jsx
// omitted `to-r` direction
<Box w="500px" h="200px" bgGradient="gray.300:pink.200" />
```

- If you pass only `from` color stop, we'll default the `to` color stop to
  `transparent`.

```jsx
// omitted `to` color stop, we'll use rgba(255,0,0,0) or transparent
<Box w="500px" h="200px" bgGradient="to-t gray.300" />
```
