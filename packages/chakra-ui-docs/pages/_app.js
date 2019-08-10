import { Box, Button, Flex, Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/core";
import { MDXProvider } from "@mdx-js/react";
import React, { useState } from "react";
import { DiGithubBadge } from "react-icons/di";
import { IoMdMenu } from "react-icons/io";
import { ChakraProvider, MDXComponents } from "../components/MDXComponents";
import Navigation from "../components/Navigation";

export default ({ Component, pageProps }) => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <MDXProvider components={MDXComponents}>
      <ChakraProvider>
        <Flex>
          <Navigation isDrawerOpen={isOpen} onDrawerClose={() => setIsOpen(false)} />
          <Box flex={1} paddingLeft={[0, "260px"]}>
            <Flex
              px="16px"
              zIndex="1"
              bg="white"
              minHeight="60px"
              position="fixed"
              alignItems="center"
              borderBottomWidth="1px"
              justifyContent={["space-between", "flex-end"]}
              width={["full", "calc(100% - 260px)"]}
            >
              <Box display={["block", "none"]}>
                <Button size="sm" onClick={() => setIsOpen(true)}>
                  <IoMdMenu />
                </Button>
              </Box>
              <Flex alignItems="center" justifyContent="space-between">
                <InputGroup>
                  <InputLeftElement>
                    <Icon name="search" />
                  </InputLeftElement>
                  <Input placeholder="Search..." />
                </InputGroup>
                <Box paddingLeft="8px">
                  <a
                    href="https://github.com/segunadebayo/chakra"
                    target="__blank"
                  >
                    <Box color="black">
                      <DiGithubBadge size="2.5rem" />
                    </Box>
                  </a>
                </Box>
              </Flex>
            </Flex>
            <Box maxWidth="700px" mx="auto" my="80px" px="16px">
              <Component {...pageProps} />
            </Box>
          </Box>
        </Flex>
      </ChakraProvider>
    </MDXProvider>
  );
};
