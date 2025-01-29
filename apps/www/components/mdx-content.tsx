import { Kbd } from "@chakra-ui/react"
import { AspectRatioTokenDoc } from "compositions/lib/aspect-ratio-token-doc"
import { BorderRadiusTokenDoc } from "compositions/lib/border-radius-token-doc"
import { BreakpointDoc } from "compositions/lib/breakpoint-doc"
import {
  ColorSemanticTokenDoc,
  ColorTokenDoc,
} from "compositions/lib/color-token-doc"
import { ConditionalStylesReferenceDoc } from "compositions/lib/conditional-styles-reference-doc"
import { CursorTokenDoc } from "compositions/lib/cursor-token-doc"
import { DurationTokenDoc, KeyframeDoc } from "compositions/lib/keyframe-doc"
import { ShadowTokenDoc } from "compositions/lib/shadow-token-doc"
import { SizesTokenDoc } from "compositions/lib/sizes-token-doc"
import { SpacingTokenDoc } from "compositions/lib/spacing-token-doc"
import * as TypographyDocs from "compositions/lib/typography-token-doc"
import { ZIndexTokenDoc } from "compositions/lib/z-index-token-doc"
import * as runtime from "react/jsx-runtime"
import {
  Example,
  ExampleCode,
  ExampleCodeWrapper,
  ExamplePreview,
  ExampleTabs,
} from "./example"
import { Anchor } from "./mdx/anchor"
import { Blockquote } from "./mdx/blockquote"
import { Callout } from "./mdx/callout"
import { Card, CardGroup } from "./mdx/card"
import { Code, Pre } from "./mdx/code"
import { CodeBlock } from "./mdx/code-block"
import { CodeGroup } from "./mdx/code-group"
import { ComponentGrid } from "./mdx/component-grid"
import { H1, H2, H3, H4 } from "./mdx/heading"
import { Hr } from "./mdx/hr"
import { Img } from "./mdx/image"
import { Li, Ol, Ul } from "./mdx/list"
import { PropTable } from "./mdx/prop-table"
import { ResourceCard } from "./mdx/resource-card"
import { Steps } from "./mdx/steps"
import { Table } from "./mdx/table"
import { P, Strong } from "./mdx/text"
import { FeaturedVideo } from "./mdx/video-card"

const sharedComponents = {
  a: Anchor,
  blockquote: Blockquote,
  img: Img,
  Image: Img,
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
  ExampleCode(props: { name: string }) {
    return (
      <ExampleCodeWrapper maxHeight="480px" height="auto" mb="2" mt="6">
        <ExampleCode name={props.name} />
      </ExampleCodeWrapper>
    )
  },
  ExampleTabs: ExampleTabs,
  ExamplePreview: ExamplePreview,
  card: Card,
  "card-group": CardGroup,
  Card,
  hr: Hr,
  PropTable,
  ComponentGrid,
  FeaturedVideo,
  ResourceCard: ResourceCard,
  "code-block": CodeBlock,
  ColorTokenDoc,
  ColorSemanticTokenDoc,
  ShadowTokenDoc,
  BorderRadiusTokenDoc,
  ...TypographyDocs,
  SpacingTokenDoc,
  KeyframeDoc,
  BreakpointDoc,
  DurationTokenDoc,
  AspectRatioTokenDoc,
  SizesTokenDoc,
  ZIndexTokenDoc,
  CursorTokenDoc,
  ConditionalStylesReferenceDoc,
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
  return <Component components={{ ...sharedComponents, ...components }} />
}
