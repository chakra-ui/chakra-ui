import { Example } from "@/components/example"
import * as Playground from "@/components/playground"
import { PropTable } from "@/components/prop-table"
import { Container } from "@chakra-ui/react"

export default function Page() {
  return (
    <Container py="20" fontSize="sm" maxW="4xl">
      <Playground.Section>
        <Playground.SectionContent>
          <Example name="select-with-avatar" />
          <PropTable component="Select" part="Root" />
        </Playground.SectionContent>
      </Playground.Section>
    </Container>
  )
}
