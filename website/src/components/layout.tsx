import { Box } from "@chakra-ui/core"
import { SkipNavContent, SkipNavLink } from "@chakra-ui/skip-nav"
import { MDXProvider } from "@mdx-js/react"
import { useRouter } from "next/router"
import { Fragment } from "react"
import type { ReactNode } from "react"

import { BottomNav } from "./bottom-nav"
import { Footer } from "./footer"
import { Header } from "./header"
import { MDXComponents } from "./mdx-components"
import { Sidebar } from "./sidebar/sidebar"

const Main = (props) => (
  <Box as="main" minH="72vh" pt={8} px={5} mt="4rem" {...props} />
)

const DocsLayout = ({ children }) => {
  return (
    <MDXProvider components={MDXComponents}>
      <Header />
      <Box>
        <Sidebar
          display={["none", null, "block"]}
          maxWidth="18rem"
          width="full"
        />
        <Box pl={[0, null, "18rem"]} py={2} mb={20}>
          <SkipNavContent />
          <Main>{children}</Main>
          <Footer />
        </Box>
      </Box>
    </MDXProvider>
  )
}

const GuidesLayout = ({ children }) => {
  return (
    <MDXProvider components={MDXComponents}>
      <Header />
      <Box mb="80px">
        <SkipNavContent />
        <Main>{children}</Main>
        <Footer />
      </Box>
    </MDXProvider>
  )
}

const layoutMap = {
  docs: DocsLayout,
  guides: GuidesLayout,
}

type LayoutProps = {
  children: ReactNode
  pageContext: {
    layout: string
  }
}

const Layout = ({ children, pageContext }: LayoutProps): JSX.Element => {
  const { pathname } = useRouter()

  const Container = layoutMap[pageContext?.layout] || Fragment

  return (
    <>
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <Container pathname={pathname}>{children}</Container>
      <BottomNav />
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default Layout
