import { Button, Heading, Text, VStack } from '@chakra-ui/react'
import Header from 'components/header'
import SEO from 'components/seo'
import NextLink from 'next/link'
import { FaHome } from 'react-icons/fa'
// import { AdBanner } from 'components/chakra-pro/ad-banner'

const NotFoundPage = () => {
  return (
    <>
      <SEO title='404: Not found' description='Page not found' />
      {/* <AdBanner /> */}
      <Header />
      <VStack
        justify='center'
        gap='4'
        as='section'
        mt={['20', null, '40']}
        textAlign='center'
      >
        <Heading>404 | Page Not Found</Heading>
        <Text fontSize={{ md: 'xl' }}>
          You just hit a route that doesn't exist... the sadness.😢
        </Text>
        <Button asChild colorPalette='teal' size='lg'>
          <NextLink href='/'>
            <FaHome />
            Back to Home
          </NextLink>
        </Button>
      </VStack>
    </>
  )
}

export default NotFoundPage
