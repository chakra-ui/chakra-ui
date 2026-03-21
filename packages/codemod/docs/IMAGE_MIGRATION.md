# Image Component Migration Guide

This guide explains how to migrate from Chakra UI v2 Image/Img components to the
v3 Image component.

## Overview

In Chakra UI v3, the Image component has been simplified by removing built-in
fallback functionality and consolidating the `Img` and `Image` components. The
fallback logic has been removed in favor of native browser behavior and external
solutions.

## Running the Codemod

```bash
npx @chakra-ui/codemod@latest image <path>
```

This will automatically transform all `Img` and `Image` components in your
codebase.

## Component Transformations

### Img → Image Rename

The `Img` component has been renamed to `Image` for consistency.

**Before (v2):**

```tsx
import { Img } from "@chakra-ui/react"

function App() {
  return <Img src="photo.jpg" alt="Photo" />
}
```

**After (v3):**

```tsx
import { Image } from "@chakra-ui/react"

function App() {
  return <Image src="photo.jpg" alt="Photo" />
}
```

**Changes:**

- Component: `Img` → `Image`
- Import: `Img` → `Image`

---

### Prop Transformations

#### fit → objectFit

The `fit` prop has been renamed to `objectFit` to match the CSS property name.

**Before (v2):**

```tsx
import { Image } from "@chakra-ui/react"

function App() {
  return <Image src="photo.jpg" fit="cover" />
}
```

**After (v3):**

```tsx
import { Image } from "@chakra-ui/react"

function App() {
  return <Image src="photo.jpg" objectFit="cover" />
}
```

**Changes:**

- Prop: `fit` → `objectFit`

---

#### align → objectPosition

The `align` prop has been renamed to `objectPosition` to match the CSS property
name.

**Before (v2):**

```tsx
import { Image } from "@chakra-ui/react"

function App() {
  return <Image src="photo.jpg" align="center" />
}
```

**After (v3):**

```tsx
import { Image } from "@chakra-ui/react"

function App() {
  return <Image src="photo.jpg" objectPosition="center" />
}
```

**Changes:**

- Prop: `align` → `objectPosition`

---

### Removed Props

The following fallback-related props have been removed in v3:

#### fallbackSrc

**Before (v2):**

```tsx
import { Image } from "@chakra-ui/react"

function App() {
  return (
    <Image
      src="photo.jpg"
      fallbackSrc="https://via.placeholder.com/150"
      alt="Photo"
    />
  )
}
```

**After (v3):**

```tsx
import { Image } from "@chakra-ui/react"

function App() {
  return <Image src="photo.jpg" alt="Photo" />
}
```

**⚠️ Breaking Change:** The `fallbackSrc` prop is no longer supported. See
[Handling Image Failures](#handling-image-failures) for alternatives.

---

#### fallback

**Before (v2):**

```tsx
import { Image, Spinner } from "@chakra-ui/react"

function App() {
  return <Image src="photo.jpg" fallback={<Spinner />} alt="Photo" />
}
```

**After (v3):**

```tsx
import { Image } from "@chakra-ui/react"

function App() {
  return <Image src="photo.jpg" alt="Photo" />
}
```

**⚠️ Breaking Change:** The `fallback` prop is no longer supported. See
[Handling Image Failures](#handling-image-failures) for alternatives.

---

#### ignoreFallback

**Before (v2):**

```tsx
import { Image } from "@chakra-ui/react"

function App() {
  return (
    <Image
      src="photo.jpg"
      fallbackSrc="placeholder.jpg"
      ignoreFallback
      alt="Photo"
    />
  )
}
```

**After (v3):**

```tsx
import { Image } from "@chakra-ui/react"

function App() {
  return <Image src="photo.jpg" alt="Photo" />
}
```

**Changes:** The `ignoreFallback` prop is removed as fallback functionality no
longer exists.

---

#### fallbackStrategy

**Before (v2):**

```tsx
import { Image } from "@chakra-ui/react"

function App() {
  return (
    <Image
      src="photo.jpg"
      fallbackSrc="placeholder.jpg"
      fallbackStrategy="onError"
      alt="Photo"
    />
  )
}
```

**After (v3):**

```tsx
import { Image } from "@chakra-ui/react"

function App() {
  return <Image src="photo.jpg" alt="Photo" />
}
```

**Changes:** The `fallbackStrategy` prop is removed as fallback functionality no
longer exists.

---

## Complete Example

**Before (v2):**

```tsx
import { Box, Image, Img } from "@chakra-ui/react"

function Gallery() {
  return (
    <Box>
      <Img
        src="photo1.jpg"
        fit="cover"
        align="center"
        fallbackSrc="placeholder1.jpg"
        alt="Photo 1"
      />
      <Image
        src="photo2.jpg"
        fit="contain"
        fallbackSrc="placeholder2.jpg"
        ignoreFallback={false}
        alt="Photo 2"
      />
    </Box>
  )
}
```

**After (v3):**

```tsx
import { Box, Image } from "@chakra-ui/react"

function Gallery() {
  return (
    <Box>
      <Image
        src="photo1.jpg"
        objectFit="cover"
        objectPosition="center"
        alt="Photo 1"
      />
      <Image src="photo2.jpg" objectFit="contain" alt="Photo 2" />
    </Box>
  )
}
```

---

## Handling Image Failures

Since fallback functionality has been removed, here are alternative approaches
for handling image loading failures:

### Option 1: Use the `onError` Event

Handle image errors manually using the `onError` event:

```tsx
import { Image } from "@chakra-ui/react"
import { useState } from "react"

function App() {
  const [imgSrc, setImgSrc] = useState("photo.jpg")

  return (
    <Image
      src={imgSrc}
      onError={() => setImgSrc("placeholder.jpg")}
      alt="Photo"
    />
  )
}
```

### Option 2: Create a Custom Image Component

Build a wrapper component with fallback logic:

```tsx
import { Image as ChakraImage } from "@chakra-ui/react"
import { useState } from "react"

interface ImageWithFallbackProps {
  src: string
  fallbackSrc: string
  alt: string
  [key: string]: any
}

function ImageWithFallback({
  src,
  fallbackSrc,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isError, setIsError] = useState(false)

  const handleError = () => {
    if (!isError) {
      setIsError(true)
      setImgSrc(fallbackSrc)
    }
  }

  return <ChakraImage src={imgSrc} alt={alt} onError={handleError} {...props} />
}

// Usage
function App() {
  return (
    <ImageWithFallback
      src="photo.jpg"
      fallbackSrc="placeholder.jpg"
      alt="Photo"
    />
  )
}
```

### Option 3: Use Native Browser Features

Use the native `<img>` element with better error handling:

```tsx
import { chakra } from "@chakra-ui/react"

const StyledImg = chakra("img")

function App() {
  return (
    <picture>
      <source srcSet="photo.webp" type="image/webp" />
      <source srcSet="photo.jpg" type="image/jpeg" />
      <StyledImg src="photo.jpg" alt="Photo" objectFit="cover" />
    </picture>
  )
}
```

### Option 4: Use a Third-Party Library

Consider using specialized image libraries that provide more robust fallback and
loading features:

- [react-image](https://github.com/mbrevda/react-image)
- [next/image](https://nextjs.org/docs/api-reference/next/image) (for Next.js
  projects)
- [react-lazy-load-image-component](https://github.com/Aljullu/react-lazy-load-image-component)

---

## Import Handling

The codemod automatically handles import updates:

### Single Component

```tsx
// Before
import { Img } from "@chakra-ui/react"
// After
import { Image } from "@chakra-ui/react"
```

### Both Components Imported

```tsx
// Before
import { Img, Image, Box } from '@chakra-ui/react'

// After (Img import removed, merged with Image)
import { Image, Box } from '@chakra-ui/react'
```

### Image Already Imported

```tsx
// Before
import { Image, Box } from '@chakra-ui/react'

// After (no change needed)
import { Image, Box } from '@chakra-ui/react'
```

---

## Preserved Props

The following props are preserved and work the same way in v3:

- `src` - Image source URL
- `srcSet` - Responsive image sources
- `alt` - Alternative text
- `width`, `height` - Dimensions
- `loading` - Native lazy loading (`"lazy"` | `"eager"`)
- `crossOrigin` - CORS settings
- `referrerPolicy` - Referrer policy
- All style props (`objectFit`, `objectPosition`, `borderRadius`, etc.)

```tsx
// These props work the same in both v2 and v3
<Image
  src="photo.jpg"
  alt="Photo"
  width="200px"
  height="200px"
  loading="lazy"
  crossOrigin="anonymous"
  referrerPolicy="no-referrer"
  borderRadius="md"
  objectFit="cover"
/>
```

---

## Manual Migration Steps

After running the codemod, review your code for:

1. **Fallback logic** - Decide how to handle image loading failures (see
   [Handling Image Failures](#handling-image-failures))
2. **Loading states** - If you were using `fallback={<Spinner />}`, implement
   custom loading UI
3. **Error states** - Add error handling if critical for your UX
4. **Performance** - Consider using native `loading="lazy"` for better
   performance

---

## Testing

After migration, test:

1. **Image loading** - Verify images load correctly
2. **Error scenarios** - Test behavior when images fail to load
3. **Responsive images** - Check that `srcSet` and responsive images work
4. **Style props** - Verify `objectFit` and `objectPosition` work as expected
5. **Accessibility** - Ensure `alt` text is present and meaningful

---

## Common Issues

### Issue: Images don't have fallback behavior

**Solution:** Implement custom fallback logic using the `onError` event handler
or create a wrapper component (see
[Handling Image Failures](#handling-image-failures)).

### Issue: Spinner/Loading state is gone

**Solution:** Use a parent container with conditional rendering:

```tsx
import { Image, Skeleton } from "@chakra-ui/react"
import { useState } from "react"

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Skeleton isLoaded={isLoaded}>
      <Image src="photo.jpg" alt="Photo" onLoad={() => setIsLoaded(true)} />
    </Skeleton>
  )
}
```

### Issue: `fit` and `align` props not working

**Solution:** These were renamed by the codemod. If the codemod didn't run,
manually rename them to `objectFit` and `objectPosition`.

---

## Need Help?

If you encounter issues during migration:

1. Check the
   [Image component documentation](https://chakra-ui.com/docs/components/image)
2. Review the [migration guide](https://chakra-ui.com/docs/migration)
3. Open an issue on [GitHub](https://github.com/chakra-ui/chakra-ui/issues)

---

## See Also

- [Image Component Documentation](https://chakra-ui.com/docs/components/image)
- [Chakra UI v3 Migration Guide](https://chakra-ui.com/docs/migration)
- [React Image Loading Best Practices](https://web.dev/image-loading/)
