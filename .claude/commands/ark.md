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

3. **Recipes**
   - If variants or sizes are needed, create a recipe in  
     `@packages/react/src/recipes/$ARGUMENTS.ts`

4. **Examples**
   - Add an example at  
     `@apps/compositions/src/examples/$ARGUMENTS-basic.tsx`

5. **Documentation**
   - Add docs at `@apps/www/content/docs/components/$ARGUMENTS.mdx`
   - Follow the style of existing component docs (usage, variants, examples)

6. **Reference implementation**
   - Use `segment-group` (`@packages/react/src/components/segment-group/`) as a
     guide for:
     - `component.tsx` → style context setup
     - `index.ts` → exports
     - `namespace.ts` → dot-notation support

## Goal

A fully functional `$ARGUMENTS` component with consistent exports, typings,
styles, recipes, documentation, and an example.
