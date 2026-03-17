---
"@chakra-ui/cli": patch
"@chakra-ui/react": patch
---

fix: CLI typegen --outdir now generates working imports

Fixed CLI typegen to use absolute imports from @chakra-ui/react instead of
relative paths. This resolves the issue where --outdir generated files with
broken relative imports that don't exist in custom directories.
