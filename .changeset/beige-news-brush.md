---
"@chakra-ui/theme": major
---

Sets a specific CSS color attribute on coloScheme gray buttons and variants
solid, ghost and outline. May break code that relied on inheriting color on
buttons set to grey colorScheme on variants solid, ghost, and outline. The
change was made because color attrib was inconsistent: some colorSchemes and
variants have it fixed while other (colorScheme gray on variant solid, ghost and
outline) inherit it. This also breaks using LightMode and DarkMode. A consumer
should update their code: add color attrib to Buttons that previously relied on
inherit, in situations where your inherited color is different from the color
set by the Chakra Theme.
