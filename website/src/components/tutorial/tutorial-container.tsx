import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  SkipNavContent,
  SkipNavLink,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react'
import { nightOwl } from '@codesandbox/sandpack-themes'
import EditPageLink from 'components/edit-page-button'
import Header from 'components/header'
import { PageHeading } from 'components/heading'
import SEO from 'components/seo'
import { useRouter } from 'next/router'
import mainPackageJson from 'package.json'
import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Frontmatter } from 'src/types/frontmatter'

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
  frontmatter: Frontmatter
  children: React.ReactNode
  sidebar?: React.ReactElement
  pagination?: React.ReactElement
  files: {
    [x: string]: string
  }
}

function TutorialContainer({
  frontmatter,
  children,
  pagination,
  sidebar,
  files,
}: PageContainerProps) {
  useHeadingFocusOnRouteChange()

  if (!frontmatter) return <></>

  const { title, description, editUrl } = frontmatter

  const dependenciesNames = [
    '@chakra-ui/react',
    'typescript',
    '@emotion/react',
    '@emotion/styled',
    'framer-motion',
  ]

  const dependencies = dependenciesNames.reduce((prev, cur) => {
    return { ...prev, [cur]: mainPackageJson.dependencies[cur] }
  }, {})

  return (
    <Box minH='100vh'>
      <SEO title={title} description={description} />
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <Header maxWidth={'full'} />
      <Box as='main' w='full'>
        <SkipNavContent />
        <Box id='content'>
          <ErrorBoundary
            FallbackComponent={() => (
              <Center>
                <VStack
                  justify='center'
                  gap='4'
                  as='section'
                  mt={['20', null, '40']}
                  textAlign='center'
                >
                  <Heading>Ooops something broke</Heading>
                  <Text fontSize={{ md: 'xl' }}>
                    You just found a really nasty issue. We are aware of it.
                    Just hit 'Reload' and code on!
                  </Text>
                  <Text fontSize={{ md: 'lg' }}>
                    Try to have no code selected in the sandbox before copying
                    new code 😉
                  </Text>
                  <Button
                    aria-label='Reload'
                    colorPalette='teal'
                    size='lg'
                    onClick={() => window.location.reload()}
                  >
                    Reload
                  </Button>
                </VStack>
              </Center>
            )}
          >
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore - sandpack has not yet fully provided React 18 support */}
            <SandpackProvider
              files={files}
              customSetup={{
                dependencies,
              }}
              template='react-ts'
              theme={nightOwl}
              style={{
                color: 'inherit',
              }}
            >
              <div>
                <HStack gap={0}>
                  <Box
                    overflowY={'auto'}
                    minW={{ base: '40%', xl: '35%' }}
                    h='calc(100vh - 4.5rem)'
                  >
                    <HStack
                      bg='white'
                      _dark={{ bg: 'gray.800' }}
                      position='sticky'
                      top='0'
                      zIndex={'dropdown'}
                      pb='4'
                      pt='1'
                      pl='6'
                      gap={4}
                    >
                      {sidebar}
                      <PageHeading as='h1' tabIndex={-1} outline={0}>
                        {title}
                      </PageHeading>
                    </HStack>
                    <Flex px={'6'} direction='column' height='95%'>
                      <Box flex='1'>{children}</Box>
                      <Box mt='40px'>
                        <Box>{editUrl && <EditPageLink href={editUrl} />}</Box>
                        {pagination || null}
                      </Box>
                    </Flex>
                  </Box>
                  <Box minW={{ base: '60%', xl: '65%' }}>
                    <SandpackLayout
                      style={{
                        borderRadius: 0,
                        borderTop: 'none',
                        borderBottom: 'none',
                      }}
                    >
                      <Stack h='calc(100vh - 4.5rem)' w={'full'}>
                        <SandpackCodeEditor
                          showLineNumbers
                          style={{
                            height: '50%',
                          }}
                        />
                        <SandpackPreview style={{ minHeight: '50%' }} />
                      </Stack>
                    </SandpackLayout>
                  </Box>
                </HStack>
              </div>
            </SandpackProvider>
          </ErrorBoundary>
        </Box>
      </Box>
    </Box>
  )
}

export default TutorialContainer
