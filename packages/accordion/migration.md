# Migration Notes

## Changes

- We've changed `AccordionHeader` to `AccordionButton`. This is to remove the
  notion that it's a header when it's actually a `button`.

  WAI-ARIA guidelines require that accordion buttons be wrapped in the
  appropriate heading tag `h2-h6`. We think `AccordionHeader` might mislead
  users in thinking we handle this out of the box when we don't.

- You can no longer use `AccordionItem` in isolation, it must be used within
  `Accordion`. We think most users don't do this by default but it's worth
  noting.

## Features

- Keyboard Navigation: Accordion now support keyboard navigation between
  accordion buttons. Pressing the up and down arrow keys will move focus between
  each button.
