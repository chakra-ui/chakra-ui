"use client"

import {
  ChakraProvider,
  Container,
  Flex,
  Heading,
  HStack,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "../components/ColorModeSwitcher"
import { Logo } from "../components/Logo"
import { NextChakraLink } from "../components/NextChakraLink"

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <Container maxWidth="1200px">
            <header>
              <Flex
                py={4}
                justifyContent="space-between"
                alignItems="center"
                mb={8}
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <nav>
                    <HStack spacing={12}>
                      <NextChakraLink
                        href="/"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Logo h="1.5rem" pointerEvents="none" mr={4} />
                        <Heading size="lg">Chakra ts</Heading>
                      </NextChakraLink>
                      <NextChakraLink href="/properties" fontWeight="bold">
                        View Properties
                      </NextChakraLink>
                    </HStack>
                  </nav>
                </Flex>
                <ColorModeSwitcher justifySelf="flex-end" />
              </Flex>
            </header>
            {children}
          </Container>
        </ChakraProvider>
      </body>
    </html>
  )
}
