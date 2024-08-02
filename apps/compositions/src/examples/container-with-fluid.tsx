import { Container } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const ContainerWithFluid = () => {
  return (
    <Container fluid>
      <DecorativeBox px="2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        consectetur, tortor in lacinia eleifend, dui nisl tristique nunc.
      </DecorativeBox>
    </Container>
  )
}
