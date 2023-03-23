---
"@chakra-ui/theme": major
"@chakra-ui/tag": major
---

- Fix issue where the tag component is not setting bg and color css variables
  the variables are called `--badge-bg` and `--badge-color`. Those values are
  already passed as CSS variable but not read. Editing the tag.ts file and make
  a reference for those variables
