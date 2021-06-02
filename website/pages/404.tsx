import { Button, Heading, Text, VStack } from "@chakra-ui/react"
import { FaHome } from "react-icons/fa"
import { AdBanner } from "components/chakra-pro/ad-banner"
import Header from "components/header"
import SEO from "components/seo"
import * as React from "react"
import NextLink from "next/link"

const NotFoundPage = () => {
  return (
    <>
      <SEO title="404: Not found" description="Page not found" />
      <AdBanner />
      <Header />
      <VStack
        justify="center"
        spacing="4"
        as="section"
        mt={["20", null, "40"]}
        textAlign="center"
      >
        <Heading>404 | Page Not Found</Heading>
        <Text fontSize={{ md: "xl" }}>
          You just hit a route that doesn&#39;t exist... the sadness.😢
        </Text>
        <NextLink href="/" passHref>
          <Button
            as="a"
            aria-label="Back to Home"
            leftIcon={<FaHome />}
            colorScheme="teal"
            size="lg"
          >
            Back to Home
          </Button>
        </NextLink>
      </VStack>
    </>
  )
}

export default NotFoundPage
