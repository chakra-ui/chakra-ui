import * as Chakra from '@chakra-ui/react'
import {
  ColorPalette,
  ColorPalettes,
  ColorWrapper,
} from 'components/color-palette'
import { JoinCommunityCards } from 'components/community-card'
import { FeaturesOverview } from 'components/features-overview'
import { FrameworkLinks } from 'components/framework-link'
import { Anchor } from 'components/mdx-components/anchor'
import { InlineCode } from 'components/mdx-components/inline-code'
import { LinkedHeading } from 'components/mdx-components/linked-heading'
import { Pre } from 'components/mdx-components/pre'
import { Table, TData, THead } from 'components/mdx-components/table'
import { PackageManagers } from 'components/package-managers'
import SandpackEmbed from 'components/sandpack-embed'
import { TutorialCodeBlock } from 'components/tutorial/tutorial-code-block'
import { TutorialFileAction } from 'components/tutorial/tutorial-file-action'
import NextImage from 'next/image'
import { FiFigma } from 'react-icons/fi'
import PropsTable from '../props-table'
import CarbonAd from './carbon-ad'
import CodeBlock from './codeblock/codeblock'
import ComponentLinks from './component-links'
import { FeaturesCourses } from './course-banner'
import { VideoPlayer } from './video-player'

const { Alert, AspectRatio, Box, chakra, Kbd, Link } = Chakra

export const MDXComponents = {
  ...Chakra,
  FiFigma,
  Image: ({ ratio, border, src, ...props }: any) => (
    <AspectRatio
      my='5'
      position='relative'
      borderWidth={border ? '1px' : undefined}
      ratio={ratio}
    >
      <NextImage
        src={src}
        alt=''
        layout='fill'
        objectFit='contain'
        {...props}
      />
    </AspectRatio>
  ),
  LinkedImage: ({ href, ...props }) => (
    <Link display='block' my='10' href={href} isExternal>
      <MDXComponents.Image {...props} />
    </Link>
  ),
  h1: (props) => <chakra.h1 apply='mdx.h1' {...props} />,
  h2: (props) => <LinkedHeading apply='mdx.h2' {...props} />,
  h3: (props) => <LinkedHeading as='h3' apply='mdx.h3' {...props} />,
  h4: (props) => <LinkedHeading as='h4' apply='mdx.h4' {...props} />,
  hr: (props) => <chakra.hr apply='mdx.hr' {...props} />,
  strong: (props) => <Box as='strong' fontWeight='semibold' {...props} />,
  code: InlineCode,
  pre: (props) => {
    if (typeof props.children === 'string') return <Pre {...props} />
    if (props.children.props.type === 'tutorial') {
      const className = props.children.props.className || ''
      const code = props.children.props.children.trim() || ''
      const language = className.replace(/language-/, '')
      return (
        <TutorialCodeBlock
          language={language}
          code={code}
          path={props.children.props.path}
          showLineNumbers={props.showLineNumbers}
        />
      )
    }
    return <CodeBlock {...props} />
  },
  kbd: Kbd,
  br: ({ reset, ...props }) => (
    <Box
      as={reset ? 'br' : undefined}
      height={reset ? undefined : '24px'}
      {...props}
    />
  ),
  table: Table,
  th: THead,
  td: TData,
  a: Anchor,
  p: (props) => <chakra.p apply='mdx.p' {...props} />,
  ul: (props) => <chakra.ul apply='mdx.ul' {...props} />,
  ol: (props) => <chakra.ol apply='mdx.ul' {...props} />,
  li: (props) => <chakra.li pb='4px' {...props} />,
  blockquote: (props) => (
    <Alert.Root
      mt='4'
      role='none'
      status='warning'
      variant='left-accent'
      as='blockquote'
      rounded='4px'
      my='1.5rem'
      {...props}
    />
  ),
  'carbon-ad': CarbonAd,
  ComponentLinks,
  IconsList: null,
  PropsTable,
  FrameworkLinks,
  VideoPlayer,
  AspectRatio,
  ColorPalette,
  ColorPalettes,
  ColorWrapper,
  FeaturesCourses,
  JoinCommunityCards,
  SandpackEmbed: (props) => (
    <Box my={6}>
      <SandpackEmbed {...props} />
    </Box>
  ),
  FeaturesOverview,
  TutorialFileAction,
  PackageManagers,
}
