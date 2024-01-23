import {
  Box,
  chakra,
  Stack,
  HStack,
  Flex,
  Button,
  Center,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react'
import { useRouter } from 'next/router'
import * as React from 'react'
import EditPageLink from 'components/edit-page-button'
import Header from 'components/header'
import SEO from 'components/seo'
import mainPackageJson from 'package.json'
import { t } from 'utils/i18n'
import { ErrorBoundary } from 'react-error-boundary'
import { nightOwl } from '@codesandbox/sandpack-themes'
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
      <SkipNavLink zIndex={20}>
        {t('component.page-container.skip-to-content')}
      </SkipNavLink>
      <Header maxWidth={'full'} />
      <Box as='main' w='full'>
        <SkipNavContent />
        <Box id='content'>
          <ErrorBoundary
            FallbackComponent={() => (
              <Center>
                <VStack
                  justify='center'
                  spacing='4'
                  as='section'
                  mt={['20', null, '40']}
                  textAlign='center'
                >
                  <Heading>{t('tutorialError.heading')}</Heading>
                  <Text fontSize={{ md: 'xl' }}>
                    {t('tutorialError.message')}
                  </Text>
                  <Text fontSize={{ md: 'lg' }}>
                    {t('tutorialError.submessage')}
                  </Text>
                  <Button
                    aria-label='Reload'
                    colorScheme='teal'
                    size='lg'
                    onClick={() => window.location.reload()}
                  >
                    {t('tutorialError.reload')}
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
                <HStack spacing={0}>
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
                      spacing={4}
                    >
                      {sidebar}
                      <chakra.h1 tabIndex={-1} outline={0} apply='mdx.h1'>
                        {title}
                      </chakra.h1>
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
