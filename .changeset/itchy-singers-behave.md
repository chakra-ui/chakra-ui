---
"@chakra-ui/layout": patch
---

### Add support for `area` prop on `GridItem`

Deprecated `area` prop on `Grid` and added support for `area` prop to be used
with `GridItem` instead. This allows for usage of `GridItem`'s that have named
template areas to be used in conjunction with a `Grid` that has a defined
template area.

```jsx live=false
<Grid templateAreas='"one two three"'>
   <GridItem area='one'>one</Grid>
   <GridItem area='two'>two</Grid>
   <GridItem area='three'>three</Grid>
</Grid>
```
