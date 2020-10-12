import {
  Alert,
  CodeProps,
  Box,
  chakra,
  HeadingProps,
  Kbd,
  PropsOf,
  useColorModeValue,
  BoxProps,
  AlertProps,
  DividerProps,
  ListItemProps,
  ListProps,
  TextProps,
} from "@chakra-ui/core"

import { CarbonAd } from "./carbon-ad"
import { CodeBlock } from "./codeblock/codeblock"

const Pre = (props: BoxProps): JSX.Element => (
  <chakra.div my="2em" borderRadius="sm" {...props} />
)

const Table = (props: PropsOf<"table">): JSX.Element => (
  <chakra.div overflowX="auto">
    <chakra.table textAlign="left" mt="32px" width="full" {...props} />
  </chakra.div>
)

const THead = (props: PropsOf<"th">): JSX.Element => (
  <chakra.th
    bg={useColorModeValue("gray.50", "whiteAlpha.100")}
    fontWeight="semibold"
    p={2}
    fontSize="sm"
    {...props}
  />
)

const TData = (props: PropsOf<"td">): JSX.Element => (
  <chakra.td
    p={2}
    borderTopWidth="1px"
    borderColor="inherit"
    fontSize="sm"
    whiteSpace="normal"
    {...props}
  />
)

const LinkedHeading = (props: HeadingProps) => (
  <chakra.h2
    css={{
      "&[id]": {
        pointerEvents: "none",
      },
      "&[id]::before": {
        content: `""`,
        display: "block",
        height: " 6rem",
        marginTop: "-6rem",
        visibility: "hidden",
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
          _focus={{ boxShadow: "outline", opacity: 1 }}
          opacity={0}
          ml="0.375rem"
          href={`#${props.id}`}
        >
          #
        </chakra.a>
      )}
    </chakra.div>
  </chakra.h2>
)

const InlineCode = (props: CodeProps): JSX.Element => (
  <chakra.code
    apply="mdx.code"
    color={useColorModeValue("purple.500", "purple.200")}
    {...props}
  />
)

export const MDXComponents = {
  a: (props: PropsOf<"a">): JSX.Element => (
    <chakra.a apply="mdx.a" {...props} />
  ),
  blockquote: (props: AlertProps): JSX.Element => (
    <Alert
      mt="4"
      role="none"
      status="warning"
      variant="left-accent"
      as="blockquote"
      rounded="4px"
      my="1.5rem"
      {...props}
    />
  ),
  br: (props: BoxProps): JSX.Element => <Box height="24px" {...props} />,
  "carbon-ad": CarbonAd,
  code: CodeBlock,
  h1: (props: PropsOf<"h1">): JSX.Element => (
    <chakra.h1 apply="mdx.h1" {...props} />
  ),
  h2: (props: HeadingProps): JSX.Element => (
    <LinkedHeading apply="mdx.h2" {...props} />
  ),
  h3: (props: HeadingProps): JSX.Element => (
    <LinkedHeading as="h3" apply="mdx.h3" {...props} />
  ),
  h4: (props: HeadingProps): JSX.Element => (
    <LinkedHeading as="h4" apply="mdx.h4" {...props} />
  ),
  hr: (props: DividerProps): JSX.Element => (
    <chakra.hr apply="mdx.hr" {...props} />
  ),
  inlineCode: InlineCode,
  kbd: Kbd,
  li: (props: ListItemProps): JSX.Element => <chakra.li pb="4px" {...props} />,
  ol: (props: ListItemProps): JSX.Element => (
    <chakra.ol apply="mdx.ul" {...props} />
  ),
  p: (props: TextProps): JSX.Element => <chakra.p apply="mdx.p" {...props} />,
  pre: Pre,
  strong: (props: BoxProps): JSX.Element => (
    <Box as="strong" fontWeight="semibold" {...props} />
  ),
  table: Table,
  td: TData,
  th: THead,
  ul: (props: ListProps): JSX.Element => (
    <chakra.ul apply="mdx.ul" {...props} />
  ),
}
