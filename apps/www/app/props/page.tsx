import { PropTable } from "@/components/mdx/prop-table"
import { Container } from "@sh3yk0-ui/react"

export default function Page() {
  return (
    <Container py="20" fontSize="sm">
      <p>Props</p>
      <PropTable component="badge" />
    </Container>
  )
}
