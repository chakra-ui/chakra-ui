# TypeScript Guidelines

We like to some standards across the codebase and suggest that every contributor
follow the TypeScript guidelines.

- Only use named exports, no export default.
- When importing a package, always try to find community maintained types
  instead of typing ourselves.
- Opt for using Interfaces for objects and functions.
- Type aliases should be used for primitives, unions and tuples
- Every function should type it’s input
- Enums are great, but beware they map to index numbers if not redefined

The end goal of this ensure all Chakra UI components are as strongly typed as
possible to enable teams leverage the library.

It is important to keep types as simple as possible. Primarily we should avoid
Generics. Generic code can be highly reusable, but that can also come with the
greater chance of breaking things.
