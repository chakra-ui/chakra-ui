import { Button, Heading, Text, VStack } from '@chakra-ui/react'
import NextLink from 'next/link'
import * as React from 'react'
import { FaHome } from 'react-icons/fa'
import Header from 'components/header'
import SEO from 'components/seo'
// import { AdBanner } from 'components/chakra-pro/ad-banner'

const NotFoundPage = () => {
  return (
    <>
      <SEO title='404: Not found' description='Page not found' />
      {/* <AdBanner /> */}
      <Header />
      <VStack
        justify='center'
        spacing='4'
        as='section'
        mt={['20', null, '40']}
        textAlign='center'
      >
        <Heading>404 | Page Not Found</Heading>
        <Text fontSize={{ md: 'xl' }}>
          You just hit a route that doesn't exist... the sadness.😢
        </Text>
        <NextLink href='/' passHref>
          <Button as='a' colorScheme='teal' size='lg'>
            <FaHome />
            Back to Home
          </Button>
        </NextLink>
      </VStack>
    </>
  )
}

export default NotFoundPage
