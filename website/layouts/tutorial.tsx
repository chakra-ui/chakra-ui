import { IconButton, Menu } from '@chakra-ui/react'
import Pagination from 'components/pagination'
import TutorialContainer from 'components/tutorial/tutorial-container'
import { TutorialApp, packageJson } from 'configs/sandpack-contents/tutorial'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import type { Frontmatter, FrontmatterHeading } from 'src/types/frontmatter'
import { findRouteByPath, removeFromLast } from 'utils/find-route-by-path'
import { RouteItem, getRouteContext } from 'utils/get-route-context'
import { getRoutes } from './mdx'

interface MDXTutorialLayoutProps {
  frontmatter: Frontmatter
  children: ReactNode
}

interface Props {
  headings: FrontmatterHeading[]
  routes: RouteItem[]
}

const TutorialMenu = (props: Props) => {
  const { headings, routes } = props
  const { asPath } = useRouter()

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton aria-label='Tutorial'>
          <AiOutlineMenu />
        </IconButton>
      </Menu.Trigger>
      <Menu.Content>
        {routes.map((route) => {
          if (route.path === asPath) {
            return (
              <>
                <Menu.Separator key={'1'} />
                <Menu.Group
                  key={route.path}
                  title={route.title}
                  color='teal.500'
                >
                  {headings.map((heading) => (
                    <Menu.Item asChild key={heading.id} fontSize='sm'>
                      <a href={`#${heading.id}`}>{heading.text}</a>
                    </Menu.Item>
                  ))}
                </Menu.Group>
                <Menu.Separator key={'2'} />
              </>
            )
          }
          return (
            <Menu.Item
              key={route.path}
              asChild
              fontSize='sm'
              fontWeight='semibold'
              color='teal.500'
            >
              <Link href={route.path}>{route.title}</Link>
            </Menu.Item>
          )
        })}
      </Menu.Content>
    </Menu.Root>
  )
}

const getFiles = (slug: string) => {
  switch (true) {
    case slug.includes('/basics'):
      return {
        '/App.tsx': TutorialApp,
        '/package.json': packageJson,
      }
    default:
      return {
        '/App.tsx': TutorialApp,
        '/package.json': packageJson,
      }
  }
}

export default function MDXTutorialLayout({
  frontmatter,
  children,
}: MDXTutorialLayoutProps) {
  const routes = getRoutes(frontmatter.slug)
  const route = findRouteByPath(removeFromLast(frontmatter.slug, '#'), routes)
  const routeContext = getRouteContext(route, routes)

  const files = getFiles(frontmatter.slug)

  return (
    <TutorialContainer
      frontmatter={frontmatter}
      pagination={
        <Pagination
          next={routeContext.nextRoute}
          previous={routeContext.prevRoute}
        />
      }
      sidebar={
        <TutorialMenu
          headings={frontmatter.headings}
          routes={routes[0].routes}
        />
      }
      files={files}
    >
      {children}
    </TutorialContainer>
  )
}
