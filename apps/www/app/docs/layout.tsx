import { Box, Container, Flex } from "@chakra-ui/react"
import { Header } from "./header"
import { SidebarStart } from "./sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      css={{
        "--header-height": "104px",
        "--content-height": "calc(100dvh - var(--header-height))",
      }}
    >
      <Header />
      <Container pt="var(--header-height)" minHeight="var(--content-height)">
        <Flex>
          <SidebarStart />
          {children}
        </Flex>
      </Container>
    </Box>
  )
}
