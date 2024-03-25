import * as Chakra from '@chakra-ui/react'
import {
  ColorPalette,
  ColorPalettes,
  ColorWrapper,
} from 'components/color-palette'
import { JoinCommunityCards } from 'components/community-card'
import { FeaturesOverview } from 'components/features-overview'
import { FrameworkLinks } from 'components/framework-link'
import { InlineCode } from 'components/mdx-components/inline-code'
import { LinkedHeading } from 'components/mdx-components/linked-heading'
import { Pre } from 'components/mdx-components/pre'
import { TData, THead, Table } from 'components/mdx-components/table'
import { PackageManagers } from 'components/package-managers'
import SandpackEmbed from 'components/sandpack-embed'
import { TutorialCodeBlock } from 'components/tutorial/tutorial-code-block'
import { TutorialFileAction } from 'components/tutorial/tutorial-file-action'
import Image from 'next/image'
import CarbonAd from './carbon-ad'
import CodeBlock from './codeblock/codeblock'
import ComponentLinks from './component-links'
import { FeaturesCourses } from './course-banner'
import { VideoPlayer } from './video-player'

const { Alert, AspectRatio, Box, chakra, Kbd, Link } = Chakra

const MdxList = chakra('ul', {
  base: {
    mt: '0.5rem',
    ml: '1.25rem',
    'blockquote &': { mt: 0 },
    '& > * + *': {
      mt: '0.25rem',
    },
  },
})

export const MDXComponents = {
  ...Chakra,
  Image: ({ ratio, border, src, ...props }: any) => (
    <AspectRatio
      my='5'
      position='relative'
      borderWidth={border ? '1px' : undefined}
      ratio={ratio}
    >
      <Image src={src} alt='' fill objectFit='contain' {...props} />
    </AspectRatio>
  ),
  LinkedImage: ({ href, ...props }) => (
    <Link display='block' my='10' href={href} external>
      <MDXComponents.Image {...props} />
    </Link>
  ),
  h1: (props) => <LinkedHeading as='h1' size='h1' {...props} />,
  h2: (props) => <LinkedHeading as='h2' size='h2' {...props} />,
  h3: (props) => <LinkedHeading as='h3' size='h3' {...props} />,
  h4: (props) => <LinkedHeading as='h4' size='h4' {...props} />,
  hr: (props) => <chakra.hr my='4rem' {...props} />,
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
  a: (props) => <Link variant='underline' colorPalette='purple' {...props} />,
  p: (props) => (
    <chakra.p
      css={{
        mt: '1.25rem',
        lineHeight: 1.7,
        'blockquote &': { mt: 0 },
      }}
      {...props}
    />
  ),
  ul: (props) => <MdxList {...props} />,
  ol: (props) => <MdxList as='ol' {...props} />,
  li: (props) => <chakra.li pb='4px' listStyleType='disc' {...props} />,
  blockquote: (props) => (
    <Alert.Root
      as='blockquote'
      mt='4'
      role='none'
      fontSize='md'
      status='warning'
      borderWidth='1px'
      borderColor='orange.200'
      variant='subtle'
      rounded='lg'
      my='1.5rem'
      px='1.25rem'
      py='1rem'
      {...props}
    />
  ),
  'carbon-ad': CarbonAd,
  ComponentLinks,
  IconsList: null,
  PropsTable: () => null,
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
