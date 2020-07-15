import React, { ReactNode } from "react"
import Head from "next/head"
import NextLink from "next/link"
import {
  Flex,
  Link as ChakraLink,
  HStack,
  Container,
  Heading,
} from "@chakra-ui/core"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"

type Props = {
  children?: ReactNode
  title?: string
}

export const Layout = ({
  children,
  title = "This is the default title",
}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Container maxWidth="1200px">
      <header>
        <Flex py={4} justifyContent="space-between" alignItems="center" mb={8}>
          <Flex justifyContent="space-between" alignItems="center">
            <nav>
              <HStack spacing={12}>
                <NextLink href="/">
                  <ChakraLink
                    display="flex"
                    alignItems="center"
                    justifyContent=""
                  >
                    <Logo h="1.5rem" pointerEvents="none" mr={4} />
                    <Heading fontSize="lg">Chakra ts</Heading>
                  </ChakraLink>
                </NextLink>
                <NextLink href="/properties">
                  <ChakraLink fontWeight="bold">View Properties</ChakraLink>
                </NextLink>
              </HStack>
            </nav>
          </Flex>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </header>
      {children}
    </Container>
  </div>
)
