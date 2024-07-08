import { Card, CardGroup } from "@/components/card"
import { EditPageButton } from "@/components/edit-page-button"
import { MDXContent } from "@/components/mdx-content"
import { Pagination } from "@/components/pagination"
import { SearchButton } from "@/components/search-button"
import { SideNav } from "@/components/sidenav"
import { SocialLinks } from "@/components/social-links"
import { Container, Stack } from "@chakra-ui/react"
import { pages } from ".velite"

export default function Page() {
  return (
    <Container py="20" fontSize="sm" maxW="4xl">
      <Stack gap="10">
        <SocialLinks
          items={[
            { type: "x", href: "https://twitter.com/chakra_ui" },
            { type: "github", href: "https://github.com/chakra_ui" },
            { type: "discord", href: "https://discord.com/chakra_ui" },
          ]}
        />
        <SideNav
          currentHref="/quickstart"
          label="Getting Started"
          items={[
            { label: "Quick Start", href: "/quickstart" },
            { label: "Installation", href: "/installation" },
            { label: "Chakra UI", href: "/chakra-ui" },
            { label: "Theming", href: "/theming" },
            { label: "Dark Mode", href: "/dark-mode", status: "new" },
          ]}
        />
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
