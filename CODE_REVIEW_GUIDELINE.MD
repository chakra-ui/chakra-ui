# Code Review Guidelines

The goal of this document is to outline all the requirements for any Chakra components. At Chakra, we want the entire
code base to be beginner friendly, easy to understand and high quality.

At the end of the day, most of these documented knowledge will be used directlyon the docs website.

## Components Architecture

Every component package must implement the following:

- docs/
  - [component].api.md
  - [component].aria.md
  - readme.md: This is the main website docs
- stories/
  - basic.stories.tsx
  - advanced.stories.tsx
- src/
  - [component].hook.tsx (optional): Any amazing hook that's local to this component.
  - [component].utils.tsx (optional): Any utility that's local to this component
  - [component].tsx: Base component that consumes the hook.
- test/
  - utils.test.tsx
  - hooks.test.tsx
  - component.test.tsx
  - accessbility.test.tsx
- readme.md: A basic guideline for this package, installation guide, contribution guide, and sample examples.

### Docs / Components API

- filename: `[component].api.md`
- purpose: document your ideas for this component's API and usage examples. You can also link to existing libraries
  written in either jQuery, React, Vue, vanilla JavaScript.

### Docs / Aria Guidelines

- filename: `[component].aria.md`
- purpose: This is where you write out the accessibility requirements and html structure for this component. You can
  also link to existing accessibility guidelines or website.

> Ensure you exclude all the `*.notes.md, *.aria.md`, in tsconfig.json

## Code Guidelines

- Write small functions, and compose them: Resist the urge to write a complex function or abstraction in your components
  or hooks.

- Test those small functions in isolation and ensure they work as expected

- TypeScript: Hook props should be named as `[hook]HookProps` and it's return type should be `[hook]HookReturn`

- TypeScript: Component prop types should be named with `[compoonent]Props`

- Ensure you update the component dependencies, anytime you import a chakra component

## Hooks

- If a hook is for a component with multiple parts, try to export all the required props for those component parts from
  the hook.

- If the "remaining" props for a hook-consuming component is going to be spread unto a component, then return the
  "remaining" props from the hook to prevent unnecessary destructuring

- Add a `data-chakra-*` signature to all components so it's easier to spot chakra components anywhere online :)

## Resources

### TypeScript:

- https://github.com/labs42io/clean-code-typescript
