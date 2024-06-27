import * as Playground from "@/components/playground"
import { Container } from "@chakra-ui/react"
import { StepsWithIcon } from "compositions/examples/steps-with-icon"

export default function Page() {
  return (
    <Container py="20" fontSize="sm" maxW="4xl">
      <Playground.Section>
        <Playground.SectionContent>
          <StepsWithIcon />
        </Playground.SectionContent>
      </Playground.Section>
    </Container>
  )
}
