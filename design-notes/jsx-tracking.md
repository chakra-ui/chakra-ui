# JSX Tracking in `@chakra-ui/panda-preset`

## Why this matters here

`@chakra-ui/panda-preset` ships Chakra's theme as a Panda preset: tokens,
semantic tokens, recipes, slot recipes, global styles. Panda's own docs point
people at it, so anyone pairing Panda with Chakra's design language depends on
the recipes in this package resolving to CSS.

Those are **config recipes**, and config recipes have a matching rule that is
easy to get wrong. This note writes the rule down and lists the places our
preset currently breaks it. The fix is config-only; no component code changes.

## The rule

A config recipe emits CSS for `<Button size="lg" />` only when Panda can match
that **tag name** to the recipe. The match is by name, not by import — a local
function called `Button` is enough, and a correctly-imported `IconButton` is
not.

The default names come from the **theme key**, not from `className`:

```
theme.recipes.button      ->  Button
theme.slotRecipes.card    ->  Card, Card.Root, CardRoot
```

`capitalize` uppercases the **first character only**.

Two rules when you override with `jsx`:

- On a **plain recipe**, `jsx` _replaces_ the default. Leave `Button` out of the
  list and `<Button>` stops being tracked.
- On a **slot recipe**, `jsx` replaces the root name only. The `{Key}.{Slot}`
  compounds are still derived from the theme key.

`cva` / `sva` need none of this — defining them emits every variant. Only config
recipes depend on tag matching, and this package is all config recipes.

## Where our preset breaks it

### 1. A theme key that can't produce the component name

The switch slot recipe is keyed `swittch`, because `switch` is a reserved word
and the generated recipe function would be an invalid identifier:

```ts
// packages/panda-preset/src/slot-recipes/index.ts
export const slotRecipes = {
  // ...
  swittch: switchSlotRecipe,
}
```

Panda therefore looks for `Swittch` and `Swittch.Root`. Nothing renders those,
so `<Switch.Root size="lg">` emits **zero** classes. This is the only key in the
preset with the problem, and it is invisible — no error, just missing CSS.

### 2. One recipe, several component names

Several components carry another recipe's variants under a different tag. The
button recipe is the clearest case:

```ts
export interface IconButtonProps extends ButtonProps {}
export interface CloseButtonProps extends IconButtonProps {}
```

`<IconButton variant="plain">` and `<CloseButton size="xl">` are button variants
on tags Panda isn't looking for, so they emit nothing.

### 3. `*.RootProvider`

Panda auto-derives `{Key}.Root` and `{Key}Root` for slot recipes, but not
`{Key}.RootProvider`. Every component that exposes a `RootProvider` — and most
of the Ark-backed ones do — can carry variant props on a tag that is never
matched.

## The shape of the fix

An explicit `jsx` list on the affected recipes, covering both the flat export
and the namespaced form:

```ts
// slot recipe: `jsx` replaces the root name, so list what's actually rendered
export const switchSlotRecipe = defineSlotRecipe({
  className: "switch",
  jsx: ["Switch", "Switch.Root", "SwitchRoot", "Switch.RootProvider"],
  // ...
})

// plain recipe: `jsx` replaces the default, so `Button` has to be listed too
export const buttonRecipe = defineRecipe({
  className: "button",
  jsx: ["Button", "ButtonGroup", "CloseButton", "IconButton"],
  // ...
})
```

This is additive. A `jsx` entry only produces CSS when that tag actually appears
in a consumer's source, so recipes nobody renders stay out of the output.

## Rules for adding a recipe

1. Does `capitalize(themeKey)` equal the exported component name? If not, set
   `jsx`.
2. Does another component spread this recipe's props? Add those tags.
3. Slot recipe? List the root-side tags; the slot compounds derive from the key.
4. Don't add a `jsx` entry that merely restates the default — that's config that
   does nothing.

## Reference

- [Tracking JSX](https://panda-css.com/docs/recipes/jsx-tracking)
- [Config recipes](https://panda-css.com/docs/recipes/config-recipe)
