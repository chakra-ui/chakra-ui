import { Card, CardGroup } from "@/components/card"
import { EditPageButton } from "@/components/edit-page-button"
import { MDXContent } from "@/components/mdx-content"
import { Pagination } from "@/components/pagination"
import { SearchButton } from "@/components/search-button"
import { SideNav } from "@/components/sidenav"
import { SocialLinks } from "@/components/social-links"
import { VersionMenu } from "@/components/version-menu"
import { Container, Stack } from "@chakra-ui/react"
import { pages } from ".velite"

export default function Page() {
  return (
    <Container py="20" fontSize="sm" maxW="4xl">
      <Stack gap="10">
        <VersionMenu
          items={[
            { label: "v3", value: "3.1.0", href: "/v3" },
            { label: "v2", value: "2.8.x", href: "/v2" },
            { label: "v1", value: "1.5.x", href: "/v1" },
          ]}
        />
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
