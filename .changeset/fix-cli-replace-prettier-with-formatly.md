---
"@chakra-ui/cli": patch
---

Remove the hard Prettier dependency from the CLI.

`chakra typegen` formats generated files with the project's own formatter when
one is detected. In-memory formatting still uses Prettier if it is installed.
