---
"@chakra-ui/react": patch
---

- **System**
  - Fix variants named after a CSS shorthand, such as `rounded`, `bg` or `p`,
    being dropped in `cva` and `sva`.
  - Fix a `!` inside a style value being treated as `!important`, which broke
    values like `content: '"!"'` and `url(/a!b.png)`. Only a trailing `!` or
    `!important` is recognized now.
  - Fix SSR hydration mismatches on `className` caused by the style cache
    ignoring property order.
  - Fix tokens with a value of `0` returning the fallback instead, e.g.
    `useToken("zIndex", "base")`.
