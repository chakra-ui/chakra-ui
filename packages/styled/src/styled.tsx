import React from "react"
import { parser } from "@chakra-ui/parser"
import createStyled from "./create-styled"
import { As, Options, Component, PropsOf } from "./styled.types"
import { pseudo, truncate, domElements, DOMElements } from "./styled.utils"

function styled<T extends As, P>(component: T, options?: Options<T, P>) {
  return createStyled(component, options)(parser, pseudo, truncate)
}
type ChakraDOMComponents = {
  [Tag in DOMElements]: Component<Tag, PropsOf<Tag>>
}

const chakra = domElements.reduce((acc, tag) => {
  //@ts-ignore
  acc[tag] = styled(tag)
  return acc
}, {} as ChakraDOMComponents)

const Box = styled("div")

const Test = () => (
  <Box as="a" href="www.google.com" marginTop="40px">
    <chakra.button as="a" target="blank">
      Welcome home
    </chakra.button>
  </Box>
)

// const Button = chakra("button", { themeKey: "Button" })

// const TT = () => (
//   <chakra.div>
//     <chakra.h1
//       as="a"
//       color="green.200"
//       margin="20px"
//       fontWeight="bold"
//       _hover={{ color: "red.200" }}
//     >
//       Welcome home buddy
//     </chakra.h1>
//     <Button variant="solid" size="sm">
//       Click me
//     </Button>
//     <chakra.button>Click me</chakra.button>
//   </chakra.div>
// )
