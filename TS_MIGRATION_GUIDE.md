Hi @everyone,

Thanks for showing interest in contributing to the Typescript Migration. Here's
a quick guide to help to contribute better:

## Converting JS to TS

You'll be working from the `packages/chakra-ui/src` folder, that's where the
components live. Each component consist of `index.js`, and `index.d.ts`. We're
changing that structure a bit to: `[Component].tsx`, `tests/[Component].ts`, and
`index.ts`.

- Create the components in the `[Component].tsx` file and export all it's types
  and components in the `index.ts`
- Use the `index.d.ts` file in the `master` branch as a base to create the types
  within the typescript file. Most types might not be 100% accurate, so you'll
  need to double check them.

## Support for Generics

In some cases, users might need to leverage the `as` prop from `@emotion/styled`
to enable them use the functionality from another library with Chakra
components. For example:

```jsx
<Box as={ReachLink} to="/home">
  I'm a router link
</Box>
```

In this scenario, Typescript will throw a type error because `to` isn't a
defined in the types for `Box`. So solve this, we're currently experimenting
with generics. Here's what it'll look like now:

```jsx
  import { Link as ReachLink, LinkProps } from "@reach/router"

  <Box<LinkProps>  as={ReachLink} to="/home">I'm a router link</Box>
```

what we're doing is extending the types for the `Box` component to support Reach
router's `props`,

## New Monorepo Structure

We're currently looking to put some structure to the codebase and split some
packages to reduce the overall size of the library. Here's the structure we're
looking to get:

1. `@chakra-ui/layout`: This will include all layout related components like,
   `Box`, `Stack`, `Flex`, `Grid`, `SimpleGrid`

> We're deprecating `PseudoBox` and adding all it's functionality to the `Box`
> component to reduce the number of components

2. `@chakra-ui/icons`: This will include only common UI icons we think most
   users/Chakra components might need. Nothing more.

3. `@chakra-ui/utils`: This includes common utilities that we've used in more
   than 2 or 3 files. If a utility function hasn't been used by more than 2
   components, then it should live within the Component file NOT the `utils`

4. `@chakra-ui/hooks`: This will store shared react hooks most components need.
   Like `useId`, `useCreateContext`, etc. It could be in `utils` but we decided
   to use utils for only javascript utility functions.

5. `@chakra-ui/forms`: This includes all form controls components like `Input`,
   `Select`, `NativeSelect`, `Textarea`, `NumberInput`,`Checkbox` etc.

6. `@chakra-ui/overlays`: This includes `Toast`, `Popover`, `Menu`, `Dialog`,
   `Drawer`

7. `@chakra-ui/themes`: When we improve the theming framework for Chakra, we'll
   support more themes, so you can pass a "stripe" theme and have all components
   look like stripe's components

8. `@chakra-ui/core`: This will bring together all the components listed above
   to make this package optional, and allow users install on parts they need.

I hope this gives a clear direction for our migration.

## Progress

Here's a list components and the status

- ✅ Completed and Reviewed
- ☑️ Ready for Review
- 🛠 In progress
- 🧤 Up for grabs (Indicate your interest by commenting in the TS Migration
  Issue)
