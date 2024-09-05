import { MDXContent } from "@/components/mdx-content"
import { Container } from "@chakra-ui/react"
import { Metadata } from "next"
import { notes } from ".velite"

export const metadata: Metadata = {
  title: "Notes",
  openGraph: {
    images: `/og?title=Notes`,
  },
}

export default function Page() {
  return (
    <Container py="20" fontSize="sm">
      <MDXContent code={notes[0].code} />
    </Container>
  )
}
