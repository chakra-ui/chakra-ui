import {
  Box,
  CSSReset,
  Heading,
  KeyboardKey,
  LightMode,
  Text,
  ThemeProvider,
  PseudoBox,
} from "@chakra-ui/core";
import React, { forwardRef } from "react";
import CodeBlock from "../components/CodeBlock";
import NextLink from "next/link";
import PrismHighlight from "./PrismHighlight";
import theme from "prism-react-renderer/themes/shadesOfPurple";

const Code = props => (
  <Box
    as="code"
    fontFamily="mono"
    fontSize="0.84em"
    px={1}
    color="purple.500"
    bg="gray.50"
    {...props}
  />
);

const Pre = props => (
  <Box
    as="pre"
    fontFamily="mono"
    my="2em"
    lineHeight="normal"
    bg="gray.100"
    fontSize="sm"
    whiteSpace="pre"
    p="14px"
    flex="1"
    textAlign="left"
    position="relative"
    rounded="sm"
    {...props}
  />
);

const Table = props => (
  <Box as="table" textAlign="left" width="full" {...props} />
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

const PreComponent = ({ className, ...props }) => {
  const childrenProps = props.children.props;
  const language = childrenProps.className.split("-")[1];
  const isJSX = childrenProps && childrenProps.className === "language-jsx";

  if (isJSX) {
    return (
      <CodeBlock
        theme={theme}
        code={childrenProps.children}
        {...props}
      ></CodeBlock>
    );
  }

  return (
    <PrismHighlight
      language={language}
      code={childrenProps.children}
      theme={theme}
      preComponent={Pre}
    />
  );
};

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
  h1: props => <Heading as="h1" size="xl" my={3} {...props} />,
  h2: props => <Heading as="h2" size="lg" my={2} {...props} />,
  inlineCode: Code,
  pre: PreComponent,
  kbd: KeyboardKey,
  br: props => <Box height="24px" {...props} />,
  table: Table,
  th: THead,
  td: TData,
  a: ({ href, ...props }) => (
    <NextLink href={href}>
      <Link {...props} />
    </NextLink>
  ),
  p: props => <Text lineHeight="tall" {...props} />,
};

const ChakraProvider = ({ children, theme }) => {
  return (
    <ThemeProvider theme={theme}>
      <LightMode>
        <CSSReset />
        {children}
      </LightMode>
    </ThemeProvider>
  );
};

export { MDXComponents, ChakraProvider };
