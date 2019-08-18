import { Box, Flex } from "@chakra-ui/core";
import { MDXProvider } from "@mdx-js/react";
import React, { useState } from "react";
import Header from "../components/Header";
import { ChakraProvider, MDXComponents } from "../components/MDXComponents";
import SideNav from "../components/SideNav";

const Main = props => <Box as="main" mx="auto" mb="3rem" {...props} />;

export default ({ Component, pageProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChakraProvider>
      <MDXProvider components={MDXComponents}>
        <Header />
        <Box>
          <SideNav maxWidth="18rem" width="full" />
          <Box pl="18rem" mt="4rem">
            <Main maxWidth="42rem" pt={8}>
              <Component {...pageProps} />
            </Main>
          </Box>
        </Box>
      </MDXProvider>
    </ChakraProvider>
  );
};
