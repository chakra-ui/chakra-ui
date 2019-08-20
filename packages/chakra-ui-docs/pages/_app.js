import { Box } from "@chakra-ui/core";
import { MDXProvider } from "@mdx-js/react";
import { useRouter } from "next/router";
import React from "react";
import Header from "../components/Header";
import { ChakraProvider, MDXComponents } from "../components/MDXComponents";
import SideNav from "../components/SideNav";

const Main = props => <Box as="main" mx="auto" mb="3rem" {...props} />;

const DocsLayout = ({ children }) => (
  <Box>
    <Header />
    <SideNav display={["none", null, "block"]} maxWidth="18rem" width="full" />
    <Box pl={[0, null, "18rem"]} mt="4rem">
      <Main maxWidth="46rem" pt={8} px={5}>
        {children}
      </Main>
    </Box>
  </Box>
);

export default ({ Component, pageProps }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  console.log({ router, pageProps });
  return (
    <ChakraProvider>
      <MDXProvider components={MDXComponents}>
        <DocsLayout>
          <Component {...pageProps} />
        </DocsLayout>
      </MDXProvider>
    </ChakraProvider>
  );
};
