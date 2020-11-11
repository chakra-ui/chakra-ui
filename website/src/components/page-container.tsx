import { Box, chakra } from "@chakra-ui/core"
import { SkipNavContent, SkipNavLink } from "@chakra-ui/skip-nav"
import Container from "components/container"
import EditPageLink from "components/edit-page-button"
import Footer from "components/footer"
import Header from "components/header"
import SEO from "components/seo"
import { useRouter } from "next/router"
import * as React from "react"
import PageTransition from "./page-transition"

function useHeadingFocusOnRouteChange() {
  const router = useRouter()

  React.useEffect(() => {
    const onRouteChange = () => {
      const [heading] = Array.from(document.getElementsByTagName("h1"))
      heading?.focus()
    }
    router.events.on("routeChangeComplete", onRouteChange)
    return () => {
      router.events.off("routeChangeComplete", onRouteChange)
    }
  }, [])
}

interface PageContainerProps {
  frontmatter: any
  children: React.ReactNode
  sidebar?: any
  pagination?: any
}

function PageContainer(props: PageContainerProps) {
  const { frontmatter, children, sidebar, pagination } = props
  useHeadingFocusOnRouteChange()

  const { title, description, editUrl } = frontmatter

  return (
    <>
      <SEO title={title} description={description} />
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <Header />
      <Container>
        <Box display={{ base: "block", md: "flex" }}>
          {sidebar || null}
          <div style={{ flex: 1 }}>
            <SkipNavContent />
            <Box pt={3} px={5} mt="4.5rem" mx="auto" maxW="48rem" minH="80vh">
              <PageTransition>
                <chakra.h1 tabIndex={-1} outline={0} apply="mdx.h1">
                  {title}
                </chakra.h1>
                {children}
              </PageTransition>
              <Box mt="40px">{editUrl && <EditPageLink href={editUrl} />}</Box>
              {pagination || null}
            </Box>
            <Footer />
          </div>
        </Box>
      </Container>
    </>
  )
}

export default PageContainer
