# Code Review Guidelines

The goal of this document is to outline all the requirements for any Chakra
components. At Chakra, we want the entire code base to be beginner friendly,
easy to understand and high quality.

At the end of the day, most of these documented knowledge will be used directly
on the docs website.

## Components Architecture

Every component package must implement the following:

- `src/`

  - `tests/`
    - [component].test.tsx: Write tests for the components here.
  - [component].hook.tsx (optional): Any amazing hook that's local to this
    component.
  - [component].utils.tsx (optional): Any utility that's local to this component
  - [component].tsx: Base component that consumes the hook.
  - [component].stories.tsx: Write stories for components here

- `types/` : For adding custom types for 3rd party packages
- `README.md`: A basic guideline for this package, installation guide,
  contribution guide, and sample examples.

## Code Guidelines

- Write small functions, and compose them: Resist the urge to write a complex
  function or abstraction in your components or hooks.

- Test those small functions in isolation and ensure they work as expected

- TypeScript: Hook props should be named as `[hook]HookProps` and it's return
  type should be `[hook]HookReturn`

- Ensure you add a jsDoc comment for each type definition

- TypeScript: Component prop types should be named with `[component]Props`

- Ensure you update the component dependencies, anytime you import a chakra
  component

## Hooks

- If a hook is for a component with multiple parts, try to export all the
  required props for those component parts from the hook.

- If the "remaining" props for a hook-consuming component is going to be spread
  unto a component, then return the "remaining" props from the hook to prevent
  unnecessary destructuring

- Add a `data-chakra-*` signature to all components so it's easier to spot
  chakra components anywhere online :)

- Consider using prop getters as the return values for your hooks, it makes it
  easy to merge in any external props passed to the consuming component.

## Resources

TypeScript:

- Clean Code Guide: https://github.com/labs42io/clean-code-typescript

- Best TypeScript
  Practices:https://github.com/typescript-cheatsheets/react-typescript-cheatsheet

Testing:

- [Chakra Component Test Checklist](COMPONENT_TEST_CHECKLIST.md)

- Common React testing library scenarios:
  https://react-testing-library-examples.netlify.com/

- Common Testing Practices:
  https://github.com/mawrkus/js-unit-testing-guide#unit-tests
