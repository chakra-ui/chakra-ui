---
"@chakra-ui/system": patch
---

Fixed a bug in `useToken` where it wasn't possible to resolve some tokens which
contain dots like `useToken('space','1.5')`. (see #4834)

The problem occured because we used `@chakra-ui/utils/objects/get` to resolve
the token.

`get` is designed to resolve a nested value from any object. The different
object levels are determined by using the 'dot-notation'.

Our general usage of `useToken` is `useToken('colors','blue.500')` Internally
this became `colors.blue.500` which splitted by dot and then is searched and
found in `theme`

But when using tokens with dots like `1.5` in `space` e.g.
`useToken('space','1.5')`the path resolved to `space.1.5` which can not be found
since the structure in theme is

```
{
    ...
    space:{
        1.5:0.375rem
        ...
    }
}
```

To fix this we now use a similar approach like we do when getting the value for
the css by accessing ` theme.__cssMap?.[val]?.value` which isn't affacted by the
nesting since we have a flat map in `__cssMap`
