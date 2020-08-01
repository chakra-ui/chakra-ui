import React from "react"
import {
  Box,
  Heading,
  Kbd,
  Text,
  chakra,
  Code,
  Alert,
  useColorModeValue,
} from "@chakra-ui/core"
import CodeBlock from "./codeblock"
import CarbonAd from "./carbon-ad"

const Pre = (props) => <chakra.div my="2em" borderRadius="sm" {...props} />

const Table = (props) => (
  <chakra.div overflowX="auto">
    <chakra.table textAlign="left" mt="32px" width="full" {...props} />
  </chakra.div>
)

const THead = (props) => (
  <chakra.th
    bg={useColorModeValue("gray.50", "whiteAlpha.100")}
    fontWeight="semibold"
    p={2}
    fontSize="sm"
    {...props}
  />
)

const TData = (props) => (
  <chakra.td
    p={2}
    borderTopWidth="1px"
    borderColor="inherit"
    fontSize="sm"
    whiteSpace="normal"
    {...props}
  />
)

const LinkedHeading = (props) => (
  <Heading
    fontWeight="semibold"
    css={{
      "&[id]": {
        pointerEvents: "none",
      },
      "&[id]::before": {
        display: "block",
        height: " 6rem",
        marginTop: "-6rem",
        visibility: "hidden",
        content: `""`,
      },
      "&[id]:hover a": { opacity: 1 },
    }}
    {...props}
  >
    <chakra.div pointerEvents="auto">
      {props.children}
      {props.id && (
        <chakra.a
          aria-label="anchor"
          color="teal.500"
          fontWeight="normal"
          outline="none"
          _focus={{ opacity: 1, boxShadow: "outline" }}
          opacity={0}
          ml="0.375rem"
          href={`#${props.id}`}
        >
          #
        </chakra.a>
      )}
    </chakra.div>
  </Heading>
)

const InlineCode = (props) => (
  <chakra.code
    bg="gray.100"
    rounded="md"
    px="1"
    border="1px"
    fontSize="0.875em"
    borderColor="gray.300"
    color="gray.900"
    mx="2px"
    py="2px"
    wordBreak="keep-all"
    lineHeight="normal"
    {...props}
  />
)

const MDXComponents = {
  h1: (props) => <Heading as="h1" size="2xl" my="6" {...props} />,
  h2: (props) => <LinkedHeading mt="12" mb="4" size="lg" {...props} />,
  h3: (props) => (
    <LinkedHeading as="h3" size="md" fontWeight="medium" {...props} />
  ),
  h4: (props) => (
    <Heading
      as="h4"
      size="xs"
      fontWeight="bold"
      textTransform="uppercase"
      letterSpacing="wide"
      mt="6"
      {...props}
    />
  ),
  inlineCode: InlineCode,
  code: CodeBlock,
  pre: Pre,
  kbd: Kbd,
  br: (props) => <Box height="24px" {...props} />,
  hr: (props) => <chakra.hr borderTopWidth="1px" my={8} {...props} />,
  table: Table,
  th: THead,
  td: TData,
  a: (props) => (
    <chakra.a
      color="teal.500"
      fontWeight="semibold"
      transition="color 0.15s"
      transitionTimingFunction="ease-out"
      _hover={{
        color: "teal.600",
      }}
      {...props}
    />
  ),
  p: (props) => <Text mt={4} lineHeight="tall" {...props} />,
  ul: (props) => <chakra.ul ml="8" pt="8px" {...props} />,
  ol: (props) => <chakra.ol ml="8" pt="8px" {...props} />,
  li: (props) => <chakra.li pb="4px" {...props} />,
  blockquote: (props) => (
    <Alert
      role="presentation"
      mt={4}
      variant="left-accent"
      status="warning"
      css={{ "> *:first-of-type": { marginTop: 0 } }}
      {...props}
    />
  ),
  "carbon-ad": CarbonAd,
}

export default MDXComponents
