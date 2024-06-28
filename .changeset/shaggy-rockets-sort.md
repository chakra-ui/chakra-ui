---
"@chakra-ui/cli": minor
---

Change CLI name and command structure.

- Change the CLI name from `chakra-cli` to `chakra`.

- Change `tokens` command to `typegen` to better reflect its purpose since its
  generates types for more than just the tokens.

- Scaffold new `composition` command to help users scaffold new compositions
  easily. Compositions are snippets of Chakra UI component composition them
  easier to reuse across projects.
