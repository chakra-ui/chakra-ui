import {
  Button,
  ButtonProps,
  Link,
  useColorModeValue,
  Wrap,
} from '@chakra-ui/react'
import React from 'react'
import { FaGithub, FaNpm, FaYoutube } from 'react-icons/fa'
import { t } from 'utils/i18n'
import StorybookIcon from '../storybook-icon'

type ComponentLinkProps = ButtonProps & {
  icon: React.ElementType
  url: string
  iconSize?: string
  iconColor?: string
}

function ComponentLink(props: ComponentLinkProps) {
  const { icon: BtnIcon, url, children, iconSize, iconColor, ...rest } = props
  return (
    <Button
      as={Link}
      href={url}
      isExternal
      size='sm'
      fontWeight='normal'
      variant='outline'
      color={useColorModeValue('gray.600', 'whiteAlpha.700')}
      _hover={{
        color: useColorModeValue('gray.700', 'whiteAlpha.900'),
        boxShadow: 'sm',
        transform: 'translateY(-2px)',
        textDecor: 'none',
      }}
      leftIcon={<BtnIcon />}
      sx={{
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
      {children}
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
  const iconColor = useColorModeValue('gray.600', 'inherit')

  const githubRepoUrl = 'https://github.com/chakra-ui/chakra-ui'

  const githubLink = (github?.url || github?.package) && (
    <ComponentLink
      url={
        github.url ||
        `${githubRepoUrl}/tree/main/packages/components/src/${github.package}`
      }
      icon={FaGithub}
      iconColor={iconColor}
      iconSize='1rem'
    >
      {t('component.mdx-components.component-links.view-source')}
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
      {t('component.mdx-components.component-links.view-storybook')}
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
      {t('component.mdx-components.component-links.view-video')}
    </ComponentLink>
  )

  const themeComponentLink = theme && (
    <ComponentLink
      url={`${githubRepoUrl}/tree/main/packages/theme/src/components/${theme.componentName}.ts`}
      icon={FaGithub}
      iconColor={iconColor}
      iconSize='1rem'
    >
      {t('component.mdx-components.component-links.view-theme-source')}
    </ComponentLink>
  )

  return (
    <Wrap spacing='3' flexWrap='wrap' overflow='visible' {...rest}>
      {githubLink}
      {themeComponentLink}
      {npmLink}
      {storybookLink}
      {videoLink}
    </Wrap>
  )
}

export default ComponentLinks
