import { Badge, Box, Flex, SkipNavContent, SkipNavLink } from '@chakra-ui/react'
import EditPageLink from 'components/edit-page-button'
import Footer from 'components/footer'
import Header from 'components/header'
import SEO from 'components/seo'
import TableOfContent from 'components/table-of-content'
import { useRouter } from 'next/router'
import * as React from 'react'
import { FrontmatterHeading } from 'src/types/frontmatter'
import { convertBackticksToInlineCode } from 'utils/convert-backticks-to-inline-code'
import { AdBanner } from './chakra-pro/ad-banner'
import { MdxHeading } from './mdx-components/linked-heading'

function useHeadingFocusOnRouteChange() {
  const router = useRouter()

  React.useEffect(() => {
    const onRouteChange = () => {
      const [heading] = Array.from(document.getElementsByTagName('h1'))
      heading?.focus()
    }
    router.events.on('routeChangeComplete', onRouteChange)
    return () => {
      router.events.off('routeChangeComplete', onRouteChange)
    }
  }, [router.events])
}

interface PageContainerProps {
  frontmatter: {
    slug?: string
    title: string
    description?: string
    editUrl?: string
    version?: string
    headings?: FrontmatterHeading[]
  }
  hideToc?: boolean
  maxWidth?: string
  children: React.ReactNode
  leftSidebar?: React.ReactElement
  rightSidebar?: React.ReactElement
  pagination?: React.ReactElement
}

function PageContainer(props: PageContainerProps) {
  const {
    frontmatter,
    children,
    leftSidebar,
    rightSidebar,
    pagination,
    hideToc,
    maxWidth = '48rem',
  } = props

  useHeadingFocusOnRouteChange()

  if (!frontmatter) return <></>

  const { title, description, editUrl, version, headings = [] } = frontmatter

  return (
    <>
      <SEO title={title} description={description} />
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <AdBanner />
      <Header />
      <Box as='main' className='main-content' w='full' maxW='8xl' mx='auto'>
        <Box display={{ md: 'flex' }}>
          {leftSidebar || null}
          <Box flex='1' minW='0'>
            <SkipNavContent />
            <Box id='content' px={5} mx='auto' minH='76vh'>
              <Flex>
                <Box
                  minW='0'
                  flex='auto'
                  px={{ base: '4', sm: '6', xl: '8' }}
                  pt='10'
                >
                  <Box maxW={maxWidth}>
                    <MdxHeading size='h1' as='h1' tabIndex={-1} outline={0}>
                      {convertBackticksToInlineCode(title)}
                    </MdxHeading>
                    {version && (
                      <Badge colorPalette='teal' letterSpacing='wider'>
                        v{version}
                      </Badge>
                    )}
                    {children}
                    <Box mt='40vh'>
                      <Box>{editUrl && <EditPageLink href={editUrl} />}</Box>
                      {pagination || null}
                    </Box>
                    <Box pb='20'>
                      <Footer />
                    </Box>
                  </Box>
                </Box>
                {!hideToc && (
                  <TableOfContent
                    visibility={headings.length === 0 ? 'hidden' : 'initial'}
                    headings={headings}
                  />
                )}
                {rightSidebar}
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default PageContainer
