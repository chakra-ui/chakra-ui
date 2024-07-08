import { Card, CardGroup } from "@/components/card"
import { EditPageButton } from "@/components/edit-page-button"
import { MDXContent } from "@/components/mdx-content"
import { Pagination } from "@/components/pagination"
import { SearchButton } from "@/components/search-button"
import { Container, Stack } from "@chakra-ui/react"
import { pages } from ".velite"

export default function Page() {
  return (
    <Container py="20" fontSize="sm" maxW="4xl">
      <Stack gap="10">
        <Pagination
          next={{ label: "Card", href: "#" }}
          previous={{ label: "Button", href: "#" }}
        />
        <EditPageButton href="#" />
        <SearchButton />
        <CardGroup>
          <Card title="Card" icon="📦" href="#">
            How to add Chakra UI to your project and customize the theme.
          </Card>
          <Card title="Card" icon="📦" href="#">
            How to add Chakra UI to your project and customize the theme.
          </Card>
          <Card title="Card" icon="📦" href="#">
            How to add Chakra UI to your project and customize the theme.
          </Card>
          <Card title="Card" icon="📦" href="#">
            How to add Chakra UI to your project and customize the theme.
          </Card>
        </CardGroup>
        <MDXContent code={pages[0].code} />
      </Stack>
    </Container>
  )
}
