---
"@chakra-ui/styled-system": minor
---

## Improve performance

Styled system core functions use `localCompare` to sort the transformed styles
before passing it to emotion. This seems to be slower compared to its
alternative `Intl.Collator`.

Here's a benchmark I ran on my Chrome, Macbook Pro:

```js
// Create an array of 2000 random items
const arr = []
for (let i = 0; i < 2000; i++) {
  arr.push(`test-${Math.random()}`)
}

// #1 - localeCompare: 169.665ms
arr.sort((a, b) =>
  a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: "base",
  }),
)

// #2 - collator: 10.915ms
const collator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
})
arr.sort((a, b) => collator.compare(a, b))
```

To improve performance, I had to do the following:

- Move the core functions from `@styled-system/core` into our own codebase (we
  could create a PR to styled-system to improve the community)
- Rewrite the functions to TypeScript. Since they're written in JavaScript
- Change the sorting function to use `Intl.Collator`
- Change the `merge` function to use `lodash.mergeWith`

To learn more, check
[here](https://stackoverflow.com/questions/14677060/400x-sorting-speedup-by-switching-a-localecompareb-to-ab-1ab10/25775469)
to see this benchmark.
