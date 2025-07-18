---
"@chakra-ui/react": patch
---

- **Tabs**: Export missing types

- **Hooks**: Export entrypoint for better tree-shaking `@chakra-ui/react/hooks`

- **Theme**: Expose smaller bits of the theme in the entrypoint for better
  tree-shaking `@chakra-ui/react/theme`. We now expose `recipes`, `slotRecipes`,
  `breakpoints`, `keyframes`, `textStyles`, `layerStyles`, `animationStyles`,
  `globalCss`, `cssVarsPrefix`, `cssVarsRoot`, `semanticTokens`, `tokens` as
  dedicated modules.

- **Dialog**: Use `dvh` and `dvw` units instead of `vh` and `vw` to dynamically
  adjust to viewport size changes.
