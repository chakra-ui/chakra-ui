import {
  Button,
  ButtonProps,
  Link,
  SystemStyleObject,
  Wrap,
} from '@chakra-ui/react'
import React from 'react'
import { FaGithub, FaNpm, FaYoutube } from 'react-icons/fa'
import StorybookIcon from '../storybook-icon'

interface ComponentLinkProps extends ButtonProps {
  icon: React.ElementType
  url: string
  iconSize?: string
  iconColor?: SystemStyleObject['color']
}

function ComponentLink(props: ComponentLinkProps) {
  const { icon: BtnIcon, url, children, iconSize, iconColor, ...rest } = props
  return (
    <Button
      asChild
      size='sm'
      fontWeight='normal'
      variant='outline'
      color={{ base: 'gray.600', _dark: 'whiteAlpha.700' }}
      _hover={{
        color: { base: 'gray.700', _dark: 'whiteAlpha.900' },
        boxShadow: 'sm',
        transform: 'translateY(-2px)',
        textDecor: 'none',
      }}
      css={{
        '& span': {
          width: iconSize,
        },
        '& svg': {
          color: iconColor,
          width: 'full',
          height: 'auto',
        },
      }}
      {...rest}
    >
      <Link href={url} external>
        <BtnIcon />
        {children}
      </Link>
    </Button>
  )
}

export type ComponentLinksProps = {
  theme?: { componentName: string }
  github?: { url?: string; package?: string }
  npm?: { package: string }
  storybook?: { url: string }
  video?: { url: string }
}
function ComponentLinks(props: ComponentLinksProps) {
  const { theme, github, npm, storybook, video, ...rest } = props

  const githubRepoUrl = 'https://github.com/chakra-ui/chakra-ui'
  const githubLink = (github?.url || github?.package) && (
    <ComponentLink
      url={
        github.url ||
        `${githubRepoUrl}/tree/main/packages/components/src/${github.package}`
      }
      icon={FaGithub}
      iconColor={{ base: 'gray.600', _dark: 'inherit' }}
      iconSize='1rem'
    >
      Source
    </ComponentLink>
  )

  const npmLink = npm?.package && (
    <ComponentLink
      url={`https://www.npmjs.com/package/${npm.package}`}
      icon={FaNpm}
      iconSize='2rem'
      iconColor='red.500'
    >
      {npm.package}
    </ComponentLink>
  )

  // Note: Currently an unused component
  const storybookLink = storybook?.url && (
    <ComponentLink
      url={storybook.url}
      icon={StorybookIcon}
      iconSize='1.25rem'
      iconColor='pink.500'
    >
      Storybook
    </ComponentLink>
  )

  // Note: Currently an unused component
  const videoLink = video?.url && (
    <ComponentLink
      url={video.url}
      icon={FaYoutube}
      iconSize='1.2rem'
      iconColor='red.500'
    >
      Video
    </ComponentLink>
  )

  const themeComponentLink = theme && (
    <ComponentLink
      url={`${githubRepoUrl}/tree/main/packages/theme/src/components/${theme.componentName}.ts`}
      icon={FaGithub}
      iconColor={{ base: 'gray.600', _dark: 'inherit' }}
      iconSize='1rem'
    >
      Theme Source
    </ComponentLink>
  )

  return (
    <Wrap gap='3' flexWrap='wrap' overflow='visible' {...rest}>
      {githubLink}
      {themeComponentLink}
      {npmLink}
      {storybookLink}
      {videoLink}
    </Wrap>
  )
}

export default ComponentLinks
