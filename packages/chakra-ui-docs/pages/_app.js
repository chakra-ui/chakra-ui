import { Box, Text } from "@chakra-ui/core";
import { MDXProvider } from "@mdx-js/react";
import { useRouter } from "next/router";
import React from "react";
import Header from "../components/Header";
import { ChakraProvider, MDXComponents } from "../components/MDXComponents";
import SideNav from "../components/SideNav";

const Main = props => <Box as="main" mx="auto" mb="3rem" {...props} />;

const Footer = props => (
  <Box textAlign="center" pt="12" pb="4" fontSize="sm" opacity="0.6" {...props}>
    <Text>Proudly made in 🇳🇬 </Text>
    <Text mt="5">Released under the MIT License.</Text>
    <Text>Copyright &copy; {new Date().getFullYear()} Segun Adebayo</Text>
  </Box>
);

const DocsLayout = ({ children }) => (
  <Box>
    <Header />
    <SideNav display={["none", null, "block"]} maxWidth="18rem" width="full" />
    <Box pl={[0, null, "18rem"]} mt="4rem">
      <Main maxWidth="46rem" pt={8} px={5}>
        {children}
        <Footer />
      </Main>
    </Box>
  </Box>
);

const HomeLayout = ({ children }) => <Box>{children}</Box>;

export default ({ Component, pageProps }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  let Layout;

  if (router.pathname === "/") {
    Layout = HomeLayout;
  } else {
    Layout = DocsLayout;
  }

  return (
    <ChakraProvider>
      <MDXProvider components={MDXComponents}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </ChakraProvider>
  );
};
