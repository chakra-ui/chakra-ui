/** @jsx jsx */
import {
  Box,
  Code,
  ColorModeProvider,
  CSSReset,
  Heading,
  KeyboardKey,
  PseudoBox,
  Text,
  ThemeProvider,
} from "@chakra-ui/core";
import { jsx } from "@emotion/core";
import NextLink from "next/link";
import { forwardRef } from "react";
import CodeBlock from "./CodeBlock";

const Pre = props => <Box my="2em" rounded="sm" {...props} />;

const Table = props => (
  <Box as="table" textAlign="left" mt="32px" width="full" {...props} />
);

const THead = props => (
  <Box
    as="th"
    bg="gray.50"
    fontWeight="semibold"
    p={2}
    fontSize="sm"
    {...props}
  />
);

const TData = props => (
  <Box
    as="td"
    p={2}
    borderTopWidth="1px"
    borderColor="inherit"
    fontSize="sm"
    whiteSpace="normal"
    {...props}
  />
);

const Link = forwardRef((props, ref) => (
  <PseudoBox
    as="a"
    ref={ref}
    bg="blue.50"
    borderBottom="1px"
    cursor="pointer"
    borderColor="blackAlpha.200"
    textDecoration="none"
    color="inherit"
    _hover={{ bg: "blue.100", borderColor: "gray.300" }}
    {...props}
  />
));

const MDXComponents = {
  h1: props => <Heading as="h1" size="xl" my={5} {...props} />,
  h2: props => <Heading as="h2" my={4} size="lg" mb={3} mt={7} {...props} />,
  h3: props => <Heading as="h3" my={4} {...props} />,
  inlineCode: props => (
    <Code variantColor="yellow" fontSize="0.84em" {...props} />
  ),
  code: CodeBlock,
  pre: Pre,
  kbd: KeyboardKey,
  br: props => <Box height="24px" {...props} />,
  hr: props => <Box as="hr" borderTopWidth="1px" my={8} {...props} />,
  table: Table,
  th: THead,
  td: TData,
  a: ({ href, ...props }) => (
    <NextLink href={href} passHref>
      <Link {...props} />
    </NextLink>
  ),
  p: props => <Text as="p" mt={4} lineHeight="tall" {...props} />,
  ul: props => <Box as="ul" pt="8px" pl="16px" {...props} />,
  li: props => <Box as="li" pb="4px" {...props} />,
  blockquote: props => (
    <Box
      bg="yellow.100"
      borderLeftWidth="4px"
      as="blockquote"
      px={5}
      py={2}
      mt={5}
      my={7}
      borderColor="yellow.400"
      css={{ "> *:first-of-type": { marginTop: 0 } }}
      {...props}
    />
  ),
};

const ChakraProvider = ({ children, theme }) => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        {children}
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export { MDXComponents, ChakraProvider };
