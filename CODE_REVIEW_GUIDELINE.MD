# Code Review Guidelines

The goal of this document is to outline all the requirements for any Chakra
components. At Chakra, we want the entire code base to be beginner friendly,
easy to understand and high quality.

## Components Architecture

Every component package must implement the following:

### Components API

- filename: `[component].api.md`
- purpose: document your ideas for this component's API and usage examples. You
  can also link to existing libraries written in either jQuery, React, Vue,
  vanilla JavaScript.

### Aria Guidelines

- filename: `[component].aria.md`
- purpose: This is where you write out the accessibility requirements for this

components, and link to any existing

> Ensure you exclude all the *notes.md, *aria.md, files from the compiler
> (tsconfig.json)
