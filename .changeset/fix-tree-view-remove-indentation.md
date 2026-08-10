---
"@chakra-ui/react": patch
"@chakra-ui/panda-preset": patch
---

- Fix `TreeView` `--tree-indentation: 0px` not fully removing nested indentation
- `--tree-indentation` is now the full per-level indent
  (`indent-size + half icon-size`). Custom non-zero values no longer get an
  extra half-icon offset on top
- Remove internal `--tree-icon-offset` variable from the recipe
