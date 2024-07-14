import { Card, CardGroup } from "@/components/card"
import { EditPageButton } from "@/components/edit-page-button"
import { Pagination } from "@/components/pagination"
import { SearchButton } from "@/components/search-button"
import { SideNav } from "@/components/sidenav"
import { SocialLinks } from "@/components/social-links"
import { VersionMenu } from "@/components/version-menu"
import { Container, Stack } from "@chakra-ui/react"

export default function Page() {
  return (
    <Container py="20" fontSize="sm" maxW="4xl">
      <Stack gap="10">
        <VersionMenu
          items={[
            { title: "v3", value: "3.1.0", url: "/v3" },
            { title: "v2", value: "2.8.x", url: "/v2" },
            { title: "v1", value: "1.5.x", url: "/v1" },
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
          currentUrl="/quickstart"
          title="Getting Started"
          items={[
            { title: "Quick Start", url: "/quickstart" },
            { title: "Installation", url: "/installation" },
            { title: "Chakra UI", url: "/chakra-ui" },
            { title: "Theming", url: "/theming" },
            { title: "Dark Mode", url: "/dark-mode", status: "new" },
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
      </Stack>
    </Container>
  )
}
