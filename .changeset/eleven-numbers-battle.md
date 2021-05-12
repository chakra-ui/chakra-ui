---
"@chakra-ui/styled-system": minor
---

**Ring styles**

Added ring style props to make it easier to style an element's focus ring
shadows. Props are `ring`, `ringColor`, `ringOffset`, and `ringOffsetColor`.

```jsx live=false
// adds a 2px box-shadow with `gray.400` color
<Box ring="2px" ringColor="gray.400">
  Sample
</Box>

// adds main box-shadow + offset box-shadow
<Box ring="2px" ringColor="gray.400" ringOffset="3px" ringOffsetColor="white">
 Sample
</Box>
```

**Filter styles**

Added css variable based API to apply css filter properties (blur,
backdrop-blur) to an element. Props are `filter`, `blur`, `sepia`, `brightness`,
`invert`, `saturation`, `backdropFilter`, `backdropBlur`, `sepia`, `saturation`,
etc.

To use this API, you'll need to set `filter` to `auto`, same for
`backdropFilter`.

```jsx live=false
// adds a 3px blur filter to this element
<Image src="boruto.png" filter="auto" blur="3px" />

// adds a 3px blur and 40% saturation filter to this element
<Image src="boruto.png" filter="auto" blur="3px" saturation={0.4} />
```

**Transform styles**

Added css variable based API to apply css transform properties (translateX,
translateY, scale, etc.). Props are `translateX`, `translateY`, `rotate`,
`scaleX`, `scaleY`, and `scale`.

To use this API, you'll need to set `transform` to `auto` or `auto-gpu` (for the
GPU accelerated version).

```jsx live=false
<Circle transform="auto" translateX="4" _hover={{ translateX: "8" }}>
  <CheckIcon />
</Circle>
```

- Add `mixBlendMode`, `backgroundBlendMode`, and `bgBlendMode` props to apply
  blend modes to elements

- Automatic wrapping of `backgroundImage` or `bgImage` props with `url()` so you
  can just pass the image URL directly.

```jsx live=false
// You can now do this!
<Box bgImage="naruto.png" />

// This still works
<Box bgImage="url(naruto.png)" />
```

- text decoration styles: Added `textDecorationColor`, `textDecorationLine`,
  `textDecorationStyles` style props.

- Add `isolation` style prop to create a new stacking context.

**High Contrast Mode**

Fixed issue where setting `outline:0` or `outline:none` and using `box-shadow`
for focus outlines don't work in high-contrast mode.

To fix this, we've added `outline: 2px solid transparent` whenever you set
`outline:0` to make your components work in high-constrast mode by default.

[Learn more](https://sarahmhigley.com/writing/whcm-quick-tips/)
