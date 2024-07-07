import { MDXContent } from "@/components/mdx-content"
import { Container } from "@chakra-ui/react"
import { pages } from ".velite"

export default function Page() {
  return (
    <Container py="20" fontSize="sm" maxW="4xl">
      <MDXContent code={pages[0].code} />
    </Container>
  )
}
