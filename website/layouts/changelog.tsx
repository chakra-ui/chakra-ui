import { List } from '@chakra-ui/react'
import PageContainer from 'components/page-container'
import Sidebar from 'components/sidebar/sidebar'
import SidebarLink from 'components/sidebar/sidebar-link'
import TocNav from 'components/toc-nav'
import communitySidebar from 'configs/community.sidebar.json'
import componentsSidebar from 'configs/components.sidebar.json'
import figmaSidebar from 'configs/figma.sidebar.json'
import gettingStartedSidebar from 'configs/getting-started.sidebar.json'
import hooksSidebar from 'configs/hooks.sidebar.json'
import styledSystemSidebar from 'configs/styled-system.sidebar.json'
import tutorialSidebar from 'configs/tutorial.sidebar.json'
import { allChangelogs } from 'contentlayer/generated'
import { ReactNode } from 'react'
import semverRSort from 'semver/functions/rsort'
import { Frontmatter } from 'src/types/frontmatter'
import { RouteItem } from 'utils/get-route-context'

export function getRoutes(slug: string): RouteItem[] {
  // for home page, use docs sidebar
  if (slug === '/') {
    return gettingStartedSidebar.routes as RouteItem[]
  }

  const configMap = {
    '/getting-started': gettingStartedSidebar,
    '/docs/styled-system': styledSystemSidebar,
    '/docs/hooks': hooksSidebar,
    '/docs/components': componentsSidebar,
    '/tutorial': tutorialSidebar,
    '/community': communitySidebar,
    '/figma': figmaSidebar,
  }

  const [, sidebar] =
    Object.entries(configMap).find(([path]) => slug.startsWith(path)) ?? []

  const routes = sidebar?.routes ?? []
  return routes as RouteItem[]
}

export function getVersions(): RouteItem[] {
  return semverRSort(
    allChangelogs
      .filter(({ version }) => version.startsWith('2.'))
      .map(({ version }) => version),
  ).map((version) => ({
    title: `v${version}`,
    path: `/changelog/v${version}`,
  }))
}

interface MDXLayoutProps {
  frontmatter: Frontmatter
  children: ReactNode
  hideToc?: boolean
  maxWidth?: string
}

export default function MDXLayout(props: MDXLayoutProps) {
  const { frontmatter, children, maxWidth } = props

  const routes = getRoutes(frontmatter.slug)
  const versions = getVersions()
  return (
    <PageContainer
      hideToc={true}
      maxWidth={maxWidth}
      frontmatter={frontmatter}
      leftSidebar={<Sidebar routes={routes} />}
      rightSidebar={
        <TocNav title='Versions'>
          <List.Root ms='1rem' mt='2'>
            {versions.map(({ title, path }) => (
              <List.Item key={path}>
                <SidebarLink href={path}>{title}</SidebarLink>
              </List.Item>
            ))}
          </List.Root>
        </TocNav>
      }
    >
      {children}
    </PageContainer>
  )
}
