import { Badge, BadgeProps, HStack, Link } from '@chakra-ui/react'
import { FiExternalLink } from 'react-icons/fi'

interface ComponentLinkProps extends BadgeProps {
  url: string
}

function ComponentLink(props: ComponentLinkProps) {
  const { url, children, ...rest } = props
  return (
    <Badge asChild fontWeight='semibold' px='2' py='1' {...rest}>
      <Link href={url} external>
        {children}
        <FiExternalLink />
      </Link>
    </Badge>
  )
}

export interface ComponentLinksProps {
  theme?: { componentName: string }
  github?: { url?: string; package?: string }
}

export function ComponentLinks(props: ComponentLinksProps) {
  const { theme, github, ...rest } = props

  const githubRepoUrl = 'https://github.com/chakra-ui/chakra-ui'
  const githubLink = (github?.url || github?.package) && (
    <ComponentLink
      url={
        github.url ||
        `${githubRepoUrl}/tree/main/packages/components/src/${github.package}`
      }
    >
      Source
    </ComponentLink>
  )

  const themeComponentLink = theme && (
    <ComponentLink
      url={`${githubRepoUrl}/tree/main/packages/theme/src/components/${theme.componentName}.ts`}
    >
      Theme Source
    </ComponentLink>
  )

  return (
    <HStack gap='3' flexWrap='wrap' overflow='visible' {...rest}>
      {githubLink}
      {themeComponentLink}
    </HStack>
  )
}
