import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { getRoutes } from './mdx'
import Pagination from 'components/pagination'
import { findRouteByPath, removeFromLast } from 'utils/find-route-by-path'
import { getRouteContext, RouteItem } from 'utils/get-route-context'
import { packageJson, TutorialApp } from 'configs/sandpack-contents/tutorial'
import type { Frontmatter, FrontmatterHeading } from 'src/types/frontmatter'
import TutorialContainer from 'components/tutorial/tutorial-container'

interface MDXTutorialLayoutProps {
  frontmatter: Frontmatter
  children: ReactNode
}

const TutorialMenu = ({
  headings,
  routes,
}: {
  headings: FrontmatterHeading[]
  routes: RouteItem[]
}) => {
  const { asPath } = useRouter()

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<AiOutlineMenu />}
        aria-label='Tutorial menu'
        variant='outline'
      />
      <MenuList>
        {routes.map((route) => {
          if (route.path === asPath) {
            return (
              <>
                <MenuDivider key={'1'} />
                <MenuGroup
                  key={route.path}
                  title={route.title}
                  color='teal.500'
                >
                  {headings.map((heading) => (
                    <MenuItem
                      as='a'
                      key={heading.id}
                      href={`#${heading.id}`}
                      fontSize='sm'
                    >
                      {heading.text}
                    </MenuItem>
                  ))}
                </MenuGroup>
                <MenuDivider key={'2'} />
              </>
            )
          }
          return (
            <Link key={route.path} href={route.path} passHref>
              <MenuItem fontSize='sm' fontWeight='semibold' color='teal.500'>
                {route.title}
              </MenuItem>
            </Link>
          )
        })}
      </MenuList>
    </Menu>
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
