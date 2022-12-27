---
"@chakra-ui/styled-system": minor
---

Allow multiple token values to be converted in shortand spacing props

For the props `margin`, `m`, `padding`, and `p` you can supply multiple tokens
as you would for the standard CSS conventions with `top right bottom left`, and
the tokens will be converted accordingly.

For example: `margin="3 4"`

converts to `margin: "var(--chakra-space-3) var(--chakra-space-4)"`

Or (mixing with unit values)...

`p="1 10px 5"`

converts to

`padding: "var(--chakra-space-1) 10px var(--chakra-space-5)"`

and so on!

> 🚨 Note: This does not work for spacing shorthands like `paddingX` or
> `marginY`, where they should only except one value.
