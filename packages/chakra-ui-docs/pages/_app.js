import { Box } from "@chakra-ui/core";
import { MDXProvider } from "@mdx-js/react";
import React from "react";
import { ChakraProvider, MDXComponents } from "../components/MDXComponents";

export default ({ Component, pageProps }) => (
  <MDXProvider components={MDXComponents}>
    <ChakraProvider>
      <Box maxWidth="700px" mx="auto" my="80px">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  </MDXProvider>
);
