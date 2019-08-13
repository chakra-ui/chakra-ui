/** @jsx jsx */
import {
  Box,
  CSSReset,
  Heading,
  KeyboardKey,
  PseudoBox,
  Text,
  ThemeProvider,
  ColorModeProvider,
  Code,
} from "@chakra-ui/core";
import { jsx } from "@emotion/core";
import NextLink from "next/link";
import theme from "prism-react-renderer/themes/nightOwl";
import { forwardRef } from "react";
import CodeEditor from "./CodeEditor";
import PrismHighlight from "./PrismHighlight";

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

const PreComponent = ({ className, ...props }) => {
  const childrenProps = props.children.props;
  const language =
    childrenProps.className && childrenProps.className.split("-")[1];
  const isJSX = language && language === "jsx";
  const isJsxCodeOnly = language && language === "jsxCodeOnly";

  if (isJsxCodeOnly) {
    return (
      <CodeEditor
        disabled
        theme={theme}
        language="jsx"
        code={childrenProps.children}
        {...props}
      />
    );
  }

  if (isJSX) {
    return (
      <CodeEditor theme={theme} code={childrenProps.children} {...props} />
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

const HeadingWithLink = ({ children, ...props }) => {
  const id = children
    .toLowerCase()
    .split(" ")
    .join("-");

  return (
    <Heading as="h3" my={4} id={id} {...props}>
      {children}
    </Heading>
  );
};

const MDXComponents = {
  h1: props => <Heading as="h1" size="xl" my={5} {...props} />,
  h2: props => <HeadingWithLink as="h2" size="lg" my={4} {...props} />,
  h3: props => <HeadingWithLink as="h3" my={4} {...props} />,
  inlineCode: props => (
    <Code variantColor="yellow" fontSize="0.84em" {...props} />
  ),
  pre: PreComponent,
  kbd: KeyboardKey,
  br: props => <Box height="24px" {...props} />,
  hr: props => <Box as="hr" height="px" my={8} bg="gray.200" {...props} />,
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
      <ColorModeProvider value="light">
        <CSSReset />
        {children}
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export { MDXComponents, ChakraProvider };
