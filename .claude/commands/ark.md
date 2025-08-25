---
description: Implement a new Ark UI component
argument-hint: [componentName]
---

## Context

Ark UI is a headless UI library styled with `@ark-ui/react`.  
Reference: https://ark-ui.com/llms-react.txt

## Task

Implement a new component named **$ARGUMENTS** with the following steps:

1. **Component setup**
   - Create a folder in `@packages/react/src/components/$ARGUMENTS`
   - Add the component implementation in `$ARGUMENTS.tsx`
   - Add an `index.ts` to re-export typings and the component in long form
   - Add a `namespace.ts` to support dot-notation imports

2. **Exports**
   - Update `@packages/react/src/components/index.ts` to include `$ARGUMENTS`

3. **Anatomy**
   - If the component isn't exported from ark-ui anatomy, add it to
     `@packages/react/src/anatomy.ts`
   - Import anatomy:
     `import { componentAnatomy as arkComponentAnatomy } from "@ark-ui/react/component"`
   - Export anatomy: `export const componentAnatomy = arkComponentAnatomy`

4. **Recipes**
   - If variants or sizes are needed, create a recipe in  
     `@packages/react/src/theme/recipes/$ARGUMENTS.ts`
   - Import anatomy and use `defineSlotRecipe`
   - **Important**: Add recipe to theme system:
     - Import in `@packages/react/src/theme/slot-recipes.ts`
     - Add to `slotRecipes` export object

5. **Examples**
   - Add an example at  
     `@apps/compositions/src/examples/$ARGUMENTS-basic.tsx`

6. **Storybook**
   - Create stories at `@packages/react/__stories__/$ARGUMENTS.stories.tsx`
   - Export examples from compositions with proper naming

7. **Documentation**
   - Add docs at `@apps/www/content/docs/components/$ARGUMENTS.mdx`
   - Follow the style of existing component docs (usage, variants, examples)
   - Include descriptive paragraphs for each example explaining:
     - What the example demonstrates
     - When to use this pattern
     - Benefits and use cases

8. **Reference implementation**
   - Use `segment-group` (`@packages/react/src/components/segment-group/`) as a
     guide for:
     - `component.tsx` → style context setup
     - `index.ts` → exports
     - `namespace.ts` → dot-notation support

## Goal

A fully functional `$ARGUMENTS` component with consistent exports, typings,
styles, recipes, documentation, and an example.

## Implementation Checklist

### Core Files

- [ ] `packages/react/src/components/$ARGUMENTS/$ARGUMENTS.tsx`
- [ ] `packages/react/src/components/$ARGUMENTS/index.ts`
- [ ] `packages/react/src/components/$ARGUMENTS/namespace.ts`
- [ ] `packages/react/src/components/index.ts` updated
- [ ] `packages/react/src/anatomy.ts` updated (if needed)

### Styling

- [ ] `packages/react/src/theme/recipes/$ARGUMENTS.ts`
- [ ] `packages/react/src/theme/slot-recipes.ts` updated (import + export)

### Examples & Stories

- [ ] `apps/compositions/src/examples/$ARGUMENTS-basic.tsx`
- [ ] Additional examples (grouped, disabled, variants, etc.)
- [ ] `packages/react/__stories__/$ARGUMENTS.stories.tsx`

### Documentation

- [ ] `apps/www/content/docs/components/$ARGUMENTS.mdx`
- [ ] Add descriptive paragraphs for each example

## Common Issues & Solutions

1. **Check ark-ui anatomy first**: Use
   `node -e "console.log(require('@ark-ui/react/component').componentAnatomy.keys())"`
   to see available parts
2. **Recipe not working**: Ensure it's added to `slot-recipes.ts` both import
   and export
3. **Component parts mismatch**: Verify the ark-ui component API matches your
   implementation
4. **TypeScript errors**: Check imports and ensure all required types are
   exported
5. **Missing anatomy**: Add anatomy import/export to `anatomy.ts` if not
   available from ark-ui
6. **Icons**: Use `react-icons/lu` (Lucide icons) for consistency across the
   codebase
