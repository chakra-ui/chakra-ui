import { Box, HStack, Stack } from '@chakra-ui/react'
import { MDXComponents } from 'components/mdx-components'
import { Doc } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import NextLink from 'next/link'
import { ReactNode } from 'react'
import { TabsData } from 'utils/contentlayer-utils'
import MDXLayout from './mdx'
import { themes } from 'utils/available-themes'

function MDXContent({ doc }: { doc: Doc | undefined }) {
  const Component = useMDXComponent(doc?.body?.code ?? '')
  return <Component components={MDXComponents as any} />
}

export default function ComponentDocsLayout({
  children,
  frontmatter,
  tabsData,
}: {
  children: ReactNode
  frontmatter: any
  tabsData?: TabsData
}) {
  const id = frontmatter.package?.split('/').pop()
  const hasTheme = themes.includes(id)

  return (
    <MDXLayout frontmatter={frontmatter}>
      {id && (
        <Stack gap='5'>
          <MDXComponents.p>{frontmatter.description}</MDXComponents.p>
          <MDXComponents.ComponentLinks
            theme={hasTheme && { componentName: id }}
            github={{ package: id }}
            npm={{ package: frontmatter.package }}
          />
        </Stack>
      )}

      <Box as='nav' aria-label='Component navigation' mt='8'>
        <HStack as='ul' listStyleType='none' borderBottomWidth='1px'>
          {tabsData.map((item) => (
            <Box as='li' key={item.id}>
              <Box
                mb='-1px'
                asChild
                display='block'
                fontSize='sm'
                px='5'
                py='3'
                fontWeight='medium'
                borderBottom='2px solid transparent'
                data-selected={item.match ? '' : undefined}
                _selected={{
                  color: 'fg.accent',
                  borderColor: 'currentColor',
                }}
              >
                <NextLink href={item.href} replace>
                  {item.label}
                </NextLink>
              </Box>
            </Box>
          ))}
        </HStack>
      </Box>

      {tabsData.map((item, index) => (
        <Box key={index} id={item.id} hidden={!tabsData[index].match}>
          {index === 0 ? children : <MDXContent doc={item.doc} />}
        </Box>
      ))}
    </MDXLayout>
  )
}
