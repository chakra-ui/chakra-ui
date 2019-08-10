import React from "react";
import { Box, Flex, Heading, IconButton, List } from "@chakra-ui/core";
import NavigationLink from "./NavigationLink";

export default function NavigationBox() {
  return (
    <Box
      position={["relative", "fixed"]}
      width={["full", "260px"]}
      height="screenHeight"
      bg="gray.100"
    >
      <Flex
        px={6}
        mb="16px"
        zIndex={10}
        bg="gray.100"
        minHeight="60px"
        position="fixed"
        alignItems="center"
        borderBottomWidth="1px"
        width={["full", "260px"]}
        justifyContent="space-between"
      >
        <Heading>Chakra UI</Heading>
        <IconButton icon="sun" />
      </Flex>

      <Box pt="76px" height="100vh" overflowY="auto">
        <Box borderBottomWidth="1px" pb="16px" mb="16px">
          <Heading size="xs" px={6} py={2} textTransform="uppercase">
            Getting started
          </Heading>

          <List type="none">
            <NavigationLink
              px={6}
              py={1}
              as="a"
              // href="/"
              passHref
              display="block"
              color="gray.600"
              textDecoration="none"
              _hover={{ bg: "gray.200" }}
            >
              Installation
            </NavigationLink>
            <NavigationLink
              as="a"
              // href="/alert"
              passHref
              display="block"
              color="gray.600"
              textDecoration="none"
              _hover={{ bg: "gray.200" }}
              px={6}
              py={1}
            >
              Theming
            </NavigationLink>
            <NavigationLink
              as="a"
              // href="/"
              passHref
              display="block"
              color="gray.600"
              textDecoration="none"
              _hover={{ bg: "gray.200" }}
              px={6}
              py={1}
            >
              Responsive design
            </NavigationLink>
            <NavigationLink
              as="a"
              display="block"
              color="gray.600"
              textDecoration="none"
              _hover={{ bg: "gray.200" }}
              px={6}
              py={1}
              // href="/"
              passHref
            >
              Pseudo styles
            </NavigationLink>
          </List>
        </Box>

        <Box borderBottomWidth="1px" pb="16px" mb="16px">
          <Heading size="xs" px={6} py={2} textTransform="uppercase">
            Components
          </Heading>

          <List type="none">
            <NavigationLink
              as="a"
              // href="/"
              passHref
              color="gray.600"
              display="block"
              textDecoration="none"
              _hover={{ bg: "gray.200" }}
              px={6}
              py={1}
            >
              Installation
            </NavigationLink>
            <NavigationLink
              as="a"
              display="block"
              color="gray.600"
              textDecoration="none"
              _hover={{ bg: "gray.200" }}
              // href="/"
              passHref
              px={6}
              py={1}
            >
              Theming
            </NavigationLink>
            <NavigationLink
              as="a"
              // href="/"
              passHref
              display="block"
              color="gray.600"
              textDecoration="none"
              _hover={{ bg: "gray.200" }}
              px={6}
              py={1}
            >
              Responsive design
            </NavigationLink>
            <NavigationLink
              // href="/"
              passHref
              as="a"
              display="block"
              color="gray.600"
              textDecoration="none"
              _hover={{ bg: "gray.200" }}
              px={6}
              py={1}
            >
              Pseudo styles
            </NavigationLink>
          </List>
        </Box>
      </Box>
    </Box>
  );
}
