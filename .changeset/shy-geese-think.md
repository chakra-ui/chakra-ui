---
"@chakra-ui/system": minor
---

The `styled` function allows a functional `baseStyle` property:

```js
import { styled } from '@chakra-ui/react'

const MyComponent = styled('div', { 
  baseStyle: (props) => ({ 
    bg: props.highlightColor 
  })
})

// ...

<MyComponent highlightColor="red.500" />
```
