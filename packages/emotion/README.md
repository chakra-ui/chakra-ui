# @chakra-ui/emotion

Opt-in runtime styling for Chakra UI v4's Panda engine. The core is zero-Emotion
and build-time; this additive package gives back a v3-familiar `css`/`styled`/
`keyframes` runtime API for genuinely dynamic styles — values computed per
render, from props, from fetched data, or from user input. Reach for it only for
that dynamic remainder; keep static styling on style props, recipes, and
patterns. Its `token` helper resolves Chakra token paths to the same CSS
variables Panda emits, so runtime and build-time styles share one source of
truth.

```tsx
import { ChakraEmotionProvider, css, token } from "@chakra-ui/emotion"

;<ChakraEmotionProvider>
  <Box
    className={css({
      color: token("colors.red.500"),
      transform: `translateX(${x}px)`,
    })}
  />
</ChakraEmotionProvider>
```

See [`design-notes/emotion-opt-in.md`](../../design-notes/emotion-opt-in.md).
