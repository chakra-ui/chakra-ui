## chakra custom components

To make Chakra style props available to your custom component, you can wrap your
component in the chakra factory function (don't know what we call this, please
correct)

```jsx
import { chakra } from '@chakra-ui/system'
import { CustomComponent } from 'custom-component'

const ChakraCustomComponent = chakra(CustomComponent)

// now chakra style props can be used

<ChakraCustomComponent bg="green.200" _hover={{ bg: "green.300" }}/>

// chakra can also be applied to native HTML elements

const CustomButton = chakra('button')
```

## chakra elements

Chakra elements are DOM primitive elements with chakra-powered styles, there is
a chakra element for every HTML element. They should work like the native HTML
elements, accepting their respective props, AND all of chakra's
[style props](https://chakra-ui.com/style-props).

```jsx
import { chakra } from '@chakra-ui/system'

// to make a custom h2, we can apply chakra function to the native HTML h2
const CustomH2 = chakra('h2')

<CustomH2 bg="green.200" _hover={{ bg: "green.300" }}>
	A chakra powered h2
</CustomH2>

// OR we can use the chakra element without having to create a named component
<chakra.h2 bg="green.200" _hover={{ bg: "green.300" }}>
	A chakra powered h2
</chakra.h2>
```

The elements are mostly used to create layout or container components. They also
expose the ability to apply theme-aware style objects from the theme using the
`apply` prop. Particularly useful in styling `mdx` components.

```tsx
// 1. define styles anywhere in the theme object

const theme = {
  config: {
    shouldMapElementToStyles: true,
  },
  styles: {
    h1: {
      fontSize: 40,
      lineHeight: 1.3,
      letterSpacing: "2em"
    }
  }
}

// 2. apply styles from the theme
// If shouldMapElementToStyles is true, `chakra.h1` gets styled automatically with `styles.h1`

<chakra.h1> Heading </chakra.h1>

// 3. override styles from applied theme

<chakra.h1 apply="styles.h1" fontSize="45px"> Heading </chakra.h1>
```
