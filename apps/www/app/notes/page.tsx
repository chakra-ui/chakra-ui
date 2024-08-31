import { MDXContent } from "@/components/mdx-content"
import { Container } from "@chakra-ui/react"
import { notes } from ".velite"

export default function Page() {
  return (
    <Container py="20" fontSize="sm">
      <MDXContent code={notes[0].code} />
    </Container>
  )
}
