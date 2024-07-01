import { ComponentPreview } from "@/components/component-preview"
import * as Playground from "@/components/playground"
import { Container } from "@chakra-ui/react"

export default function Page() {
  return (
    <Container py="20" fontSize="sm" maxW="4xl">
      <Playground.Section>
        <Playground.SectionContent>
          <ComponentPreview name="select-with-avatar" />
        </Playground.SectionContent>
      </Playground.Section>
    </Container>
  )
}
