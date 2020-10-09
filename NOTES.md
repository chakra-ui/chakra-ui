Stat

- Support `animate` prop, so the number can animate in on-mount

Stack

- Support `animate` prop, so the items in the stack can animate automatically by
  leveraging `staggerChildren` in framer-motion

Tabs

- Use Shared animation for the Tabs indicator

Drawer

- Leverage framer motions's drag feature to implement "Swipe to close"
- Move to dialog package
- Figure out how to add permanent drawer

Transition

Create motion presets for the following

- Collapse
- Fade
- Slide: Use functional variants to handle the several directions (Example
  here)[https://codesandbox.io/s/framer-motion-image-gallery-pqvx3?fontsize=14&module=/src/Example.tsx&file=/src/Example.tsx]
- Grow
- OffsetSlide
- ViewportTransition: A way to transition an element only when it's in the
  viewport. Grab a `useInViewport` hook from NPM and use that to trigger the
  animation.

Tag Group

- Add support for children animation so that when a new tag is added or removed,
  there's some smooth transition effect.
- Use the Wrap component

Move `use-descendant` and `use-clickable` to `hooks` package

Toast

- Steal from here https://codesandbox.io/s/framer-motion-notifications-5cvo9
- Aim for Vercel style toast
