/* eslint-disable jsx-a11y/alt-text */
import { Box, Kbd } from "@chakra-ui/react"
import { BorderRadiusTokenDoc } from "compositions/lib/border-radius-token-doc"
import { ColorTokenDoc } from "compositions/lib/color-token-doc"
import { FontTokenDoc } from "compositions/lib/font-token-doc"
import { ShadowTokenDoc } from "compositions/lib/shadow-token-doc"
import { SpacingTokenDoc } from "compositions/lib/spacing-token-doc"
import * as runtime from "react/jsx-runtime"
import { Card, CardGroup } from "./card"
import { Example, ExamplePreview, ExampleTabs } from "./example"
import { Anchor } from "./mdx/anchor"
import { Blockquote } from "./mdx/blockquote"
import { Callout } from "./mdx/callout"
import { Code, Pre } from "./mdx/code"
import { CodeBlock } from "./mdx/code-block"
import { CodeGroup } from "./mdx/code-group"
import { ComponentGrid } from "./mdx/component-grid"
import { H1, H2, H3, H4 } from "./mdx/heading"
import { Img } from "./mdx/image"
import { Li, Ol, Ul } from "./mdx/list"
import { PropTable } from "./mdx/prop-table"
import { ResourceCard } from "./mdx/resource-card"
import { Steps } from "./mdx/steps"
import { Table } from "./mdx/table"
import { P, Strong } from "./mdx/text"

const sharedComponents = {
  a: Anchor,
  blockquote: Blockquote,
  img: Img,
  p: P,
  strong: Strong,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  kbd: Kbd,
  pre: Pre,
  code: Code,
  ol: Ol,
  ul: Ul,
  li: Li,
  table: Table,
  steps: Steps,
  callout: Callout,
  "code-group": CodeGroup,
  Example: Example,
  ExampleTabs: ExampleTabs,
  ExamplePreview: ExamplePreview,
  card: Card,
  "card-group": CardGroup,
  Card,
  PropTable,
  ComponentGrid,
  ResourceCard: ResourceCard,
  "code-block": CodeBlock,
  ColorTokenDoc,
  ShadowTokenDoc,
  BorderRadiusTokenDoc,
  FontTokenDoc,
  SpacingTokenDoc,
}

const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

interface MDXProps {
  code: string
  components?: Record<string, React.ComponentType>
}

export const MDXContent = (props: MDXProps) => {
  const { code, components = {} } = props
  const Component = useMDXComponent(code)
  return (
    <Box fontSize="sm">
      <Component components={{ ...sharedComponents, ...components }} />
    </Box>
  )
}
