import { Box, Flex, chakra } from "@chakra-ui/core"
import { SkipNavContent, SkipNavLink } from "@chakra-ui/skip-nav"
import { Container } from "components/container"
import { EditPageLink } from "components/edit-page-button"
import { Footer } from "components/footer"
import { Header } from "components/header"
import { SEO } from "components/seo"
import type { ReactNode } from "react"

type PageContainerProps = {
  frontmatter: {
    title: string
    description: string
    editUrl: string
  }
  children: React.ReactNode
  sidebar?: ReactNode
  pagination?: ReactNode
}

export function PageContainer({
  frontmatter,
  children,
  sidebar,
  pagination,
}: PageContainerProps): JSX.Element {
  const { title, description, editUrl } = frontmatter

  return (
    <>
      <SEO title={title} description={description} />
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <Header />
      <Container>
        <Flex>
          {sidebar || null}
          <div style={{ flex: 1 }}>
            <SkipNavContent />
            <Box pt={3} px={5} mt="4.5rem" mx="auto" maxW="48rem" minH="80vh">
              <Box>
                <chakra.h1 apply="mdx.h1">{title}</chakra.h1>
              </Box>
              {children}
              <Box mt="40px">{editUrl && <EditPageLink href={editUrl} />}</Box>
              {pagination || null}
            </Box>
            <Footer />
          </div>
        </Flex>
      </Container>
    </>
  )
}
