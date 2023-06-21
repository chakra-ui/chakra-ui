---
"@chakra-ui/styled-system": minor
---

Reinstate the use of custom class selectors in semantic tokens

Prior to the added feature of nested semantic tokens, a user had the ability to
supply a custom class selector in the semantic.

For example, if the semantic was

```ts
colors: {
  text: {
    default: 'gray.900',
    ['.myClass']: 'red.500'
  }
}
```

This would render the following CSS

```css
:root {
  --colors-text: var(--colors-gray-900);
}

.myClass {
  --colors-text: var(--colors-red-500);
}
```

Which would then be used in a component like

```tsx live=false
<Box className="myClass">
  <Text color="text"> Some Text </Text>
</Box>
```

In updating the semantic tokens theming to support nested tokens, restrictions
had to be placed on the naming of keys, eliminating the use of the class
selector as a key such as the example above.

Now, we can apply a class name similar to pseudo props by naming it using the
convention of the underscore prefix and pascalCase text.

So this will work!

```ts
colors: {
  text: {
    default: 'gray.900',
    _myClass: 'red.500'
  },
  // OR...
  body: {
    base: {
      default: 'gray.200',
      _myClass: 'yellow.300'
    }
  }
}
```

> 🚨 IMPORTANT: This is only for class names. And when using the custom class in
> a component's `className` prop, you would have to also write it in pascalCase.
>
> i.e. `className="myClass"`
