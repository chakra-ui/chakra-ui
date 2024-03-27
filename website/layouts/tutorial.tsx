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
      <Menu.Trigger
        as={IconButton}
        icon={<AiOutlineMenu />}
        aria-label='Tutorial menu'
        variant='outline'
      />
      <Menu.Content>
        {routes.map((route) => {
          if (route.path === asPath) {
            return (
              <>
                <Menu.Divider key={'1'} />
                <Menu.Group
                  key={route.path}
                  title={route.title}
                  color='teal.500'
                >
                  {headings.map((heading) => (
                    <Menu.Item
                      as='a'
                      key={heading.id}
                      href={`#${heading.id}`}
                      fontSize='sm'
                    >
                      {heading.text}
                    </Menu.Item>
                  ))}
                </Menu.Group>
                <Menu.Divider key={'2'} />
              </>
            )
          }
          return (
            <Link key={route.path} href={route.path} passHref>
              <Menu.Item fontSize='sm' fontWeight='semibold' color='teal.500'>
                {route.title}
              </Menu.Item>
            </Link>
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
