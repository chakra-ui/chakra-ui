---
"@chakra-ui/transition": minor
---

- Add support for tweaking the enter-exit transitions.

> Affected components: `Fade`, `Slide`, `SlideFade`, `SlideScale`, `Collapse`

```jsx live=false
<Fade
  transition={{
    enter: { duration: 0.3 },
    exit: { duration: 0.1 },
  }}
/>
```

- Fix issue where `Collapse` animation hide overflow when it expands.

> Collapse transition how shows overflow when it's expanded and hides overflow
> when it's collapsed.

- Add support for `delay` prop for all transition components.

```jsx live=false
// as a number
<Fade delay={0.3} />

// or based on state (enter/exit only)
<Fade delay={{ enter: 0.2 }} />

// or both
<Fade delay={{ enter: 0.2, exit: 0.1 }} />
```

> Note: this only works when you're using our built-in transition definition. If
> you're passing your own transition definition, pass the delay there.

```jsx live=false
// adding delay to your custom transition definition
<Fade
  transition={{
    enter: { duration: 0.2, delay: 0.1 },
  }}
/>
```
