---
"@chakra-ui/menu": minor
---

Add `closeOnSelect` to `MenuItem` and `MenuItemOption`.

This allows menu items to override their parent `Menu`'s `closeOnSelect`
behavior.

Can be useful for menus with a combination of `MenuItem`s (that generally close
their menu when selected) and `MenuItemOption`s (that should keep the menu open
for further edition).
